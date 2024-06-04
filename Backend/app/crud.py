from sqlalchemy.orm import Session
from . import models , schemas
from geoalchemy2.functions import ST_DWithin, ST_MakePoint
from sqlalchemy import cast, Numeric , String , func , or_ , distinct
import pandas as pd




latitude = 37.4052
longitude = 127.0854
distance_meters = 100000


def email_check(email , db:Session):
    user = db.query(models.User).filter(models.User.email == email).first()
    if user :
        return True 
    return False    

def sign_up_user(body , db:Session):
    user = models.User(
        name = body.name,
        email = body.email,
        phone = body.phone,
        addr = body.address,
        gender = body.gender,
        password = body.password
        )
    db.add(user)
    db.commit()
    db.refresh(user)
    return True 



def get_userdata(email , db:Session) -> schemas.User:
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        return 
    return schemas.User.from_orm(user)

    
def get_wishstation(email, db: Session, skip=0, limit=15) -> list[schemas.chargetStations]:
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        return []


    stations = (
        db.query(models.ChargeStation)
        .join(models.user_favorite_stations, models.ChargeStation.id == models.user_favorite_stations.c.station_id)
        .filter(models.user_favorite_stations.c.user_id == user.id)
        .offset(skip)
        .limit(limit)
        .all()
    )
    total_count = (
    db.query(func.count(distinct(models.ChargeStation.id)))
    .join(models.user_favorite_stations, models.ChargeStation.id == models.user_favorite_stations.c.station_id)
    .filter(models.user_favorite_stations.c.user_id == user.id)
    .scalar()
)   
    print(total_count)
    # ORM 객체를 스키마 객체로 변환
    return [schemas.chargetStations.from_orm(station) for station in stations]



def get_FavStation(email,db: Session):
    user = db.query(models.User).filter(models.User.email == email).first()
    stations = []
    if user:
       for station in user.favorite_stations:
            stations.append(station.id)
       return stations 
    return []


def isRight_password(email, password , db:Session) -> bool :
    dbPassword = db.query(models.User.password).filter(models.User.email == email).first()
    print(dbPassword[0])
    if password == dbPassword[0]:
        return True 
    else:
        return False    








def add_FavStation(item_id, email, db: Session):
    user = db.query(models.User).filter(cast(models.User.email, String) == cast(email, String)).first()
    if user:
        station = db.query(models.ChargeStation).filter(models.ChargeStation.id == item_id).first()
        if station:
            # 이미 즐겨찾기에 있는지 확인
            if station not in user.favorite_stations:
                user.favorite_stations.append(station)
                db.commit()
                print([s.id for s in user.favorite_stations])  # ID 리스트 출력
            return True
        else:
            # 해당 ID의 충전소가 없음
            return False
    else:
        # 사용자를 찾을 수 없음
        return False


def del_FavStation(item_id, email, db: Session):
    user = db.query(models.User).filter(cast(models.User.email, String) == cast(email, String)).first()
    if user:
        station = db.query(models.ChargeStation).filter(models.ChargeStation.id == item_id).first()
        if station:
            # 이미 즐겨찾기에 있는지 확인
            if station in user.favorite_stations:
                user.favorite_stations.remove(station)
                db.commit()
                print([s.id for s in user.favorite_stations])  # ID 리스트 출력
            return True
        else:
            # 해당 ID의 충전소가 없음
            return False
    else:
        # 사용자를 찾을 수 없음
        return False



def get_stations(db: Session , skip: int = 0 , limit: int = 100):
    return db.query(models.ChargeStation).filter(
     ST_DWithin(
            ST_MakePoint(
                cast(models.ChargeStation.longitude, Numeric), 
                cast(models.ChargeStation.latitude, Numeric),
                4326
            ),
            ST_MakePoint(longitude, latitude,4326), 
            distance_meters)
    ).offset(skip).limit(limit).all()




def group_stations(stations):
    grouped = {}
    for station in stations:
        name = station['name']
        if name not in grouped:
            grouped[name] = [station]
        else:
            grouped[name].append(station)
    return grouped

def search_stations(search_request ,db: Session ):
    search_term = f"%{search_request.city}%"
    query = db.query(models.ChargeStation).filter(
        func.lower(models.ChargeStation.city).like(func.lower(search_term))
    )
    if search_request.type != "":
        query = query.filter(models.ChargeStation.charger_type == search_request.type)  
    if search_request.speed != "":
        query = query.filter(models.ChargeStation.charger_type_major == search_request.speed)
    
    return query.offset(search_request.skip).limit(50).all()


def get_user(db:Session ,email:str , password:str):
    user = db.query(models.User).filter(
        models.User.email == email
        and models.User.password == password
    ).first()
    return user  
from sqlalchemy.orm import Session
from . import models , schemas
from geoalchemy2.functions import ST_DWithin, ST_MakePoint,ST_DistanceSphere,ST_SetSRID
from geoalchemy2 import Geography
from sqlalchemy import cast, Numeric , String , func , distinct , Float
from datetime import datetime , timedelta
from typing import List, Tuple









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

def sign_up_kakao(nickname: str, email: str, db: Session):
    user = models.User(
        name=nickname+"d",
        email=email,
        phone="입력 해주세요",  # 전화번호는 빈 문자열로 설정
        addr="입력 해주세요",  # 주소도 빈 문자열로 설정
        gender="입력 해주세요",  # 성별도 빈 문자열로 설정
        password="323.ㅇ9924%%##$!"  # 비밀번호도 빈 문자열로 설정
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




def get_messages(ct_id: int, db: Session) -> Tuple[List[schemas.MessageOut]]:
    messages = db.query(models.Message).filter(models.Message.chargestation_id == int(ct_id)).order_by(models.Message.created_at).all()
    user_ids = [message.user_id for message in messages]
    users = db.query(models.User).filter(models.User.id.in_(user_ids)).all()
    user_schemas = [schemas.UserSchema.from_orm(user) for user in users]
    print(len(user_schemas))
    return [
        schemas.MessageOut(
            id=message.id,
            message=message.message,
            created_at=message.created_at,
            user= message.user
        )
        for message in messages
    ]


def send_message(user_id , ct_id , text , db:Session):

    utc_now = datetime.utcnow()
    korea_now = utc_now + timedelta(hours=9)
    message = models.Message(
        message = text,
        user_id = user_id,
        chargestation_id = ct_id,
        created_at=korea_now
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return True 




    
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
            ST_MakePoint(37.465828, 127.132397,4326), 
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
        func.lower(models.ChargeStation.address).like(func.lower(search_term))
    )
  
  
    print(search_request.lng, search_request.lat,search_request.meter)
    if search_request.lng is not None and search_request.meter != 0 :
        point = func.geography(ST_SetSRID(ST_MakePoint(search_request.lng, search_request.lat), 4326))

        query = db.query(models.ChargeStation).filter(
            ST_DWithin(
                func.geography(ST_SetSRID(ST_MakePoint(models.ChargeStation.longitude, models.ChargeStation.latitude), 4326)),
                point,
                search_request.meter
            )
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


def change_avatar(db:Session ,email:str , image : str ):
    user = db.query(models.User).filter(
        models.User.email == email
    ).first()
    if user is None :
        return None
    user.avatar = image 
    db.commit()
    db.refresh(user)



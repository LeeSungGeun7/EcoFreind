from pydantic import BaseModel, EmailStr 
from typing import List, Set
from datetime import date




class Email(BaseModel):
    to: str
    subject: str
    message: str


class SignUpRequsest(BaseModel):
    name : str 
    email : str 
    password : str 
    gender : str 
    phone: str
    address : str 

   



class User(BaseModel):


    name : str
    email : str
    password : str
    gender : str
    phone : str
    addr :  str
    created_at : date
    favorite_station_ids : Set[int] = set()
    
    class Config:
        orm_mode = True
        from_attributes=True


class FavStation(User):
    favorite_station_ids : Set[int] = set() or []

    class Config:
        orm_mode : True




class chargeStation(BaseModel):
    installation_year : int
    city : str 
    address : str
    station_name : str 
    facility_type_major : str
    facility_type_minor : str
    charger_type_major : str
    charger_type_minor : str
    operator_minor : str
    rapid_charge_capacity : str
    charger_type : str
    user_restriction : str
    latitude : float
    longitude : float

    class Config:
        orm_mode = True
        from_attributes=True



class searchRequest(BaseModel):
    city : str or None 
    station_name : str or None    
    type : str or None 
    speed : str or None 
    skip : int or 0

class chargetStations(chargeStation):
    id : int

    class Config:
        orm_mode = True 




class UserCreateRequest(BaseModel):
    email: EmailStr
    password: str



class UserResponse(BaseModel):
    email: EmailStr
    session_id: str



    
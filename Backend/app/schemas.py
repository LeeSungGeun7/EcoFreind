from pydantic import BaseModel, EmailStr 
from typing import  Set , Optional
from datetime import datetime , date




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

   
class UserSchema(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True
        from_attributes=True


class RequestSendMessage(BaseModel):
    message: str
    user_id: int
    chargestation_id: int
    

class MessageOut(BaseModel):
    id: int
    message: str
    user: Optional[UserSchema]
    created_at: datetime

    class Config:
        orm_mode = True


class Message(BaseModel):
    id: Optional[int] = None
    message: str
    created_at: datetime
    user_id: int
    chargestation_id: int
    user: Optional[UserSchema] = None



    class Config:
        orm_mode = True
        from_attributes=True

class User(BaseModel):

    id : int
    name : str
    email : str
    password : str
    gender : str
    phone : str
    addr :  str
    created_at : datetime
    favorite_station_ids : Optional[Set[int]] = None
    
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
    charger_type : str
    user_restriction : str
    latitude : float or None 
    longitude : float or None

    class Config:
        orm_mode = True
        from_attributes=True



class searchRequest(BaseModel):
    city : str or None 
    station_name : str or None    
    type : str or None 
    speed : str or None 
    skip : int or 0
    lat : Optional[float] = None
    lng : Optional[float] = None
    meter : Optional[int] = None

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
    name : str
    userId : int



    
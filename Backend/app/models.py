from .db_connection import Base 
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Set
from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Float , 
    ARRAY ,
    DateTime, 
    Table 
)


user_favorite_stations = Table(
    "user_favorite_stations",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("user.id", ondelete="CASCADE")),
    Column("station_id", Integer, ForeignKey("charge_stations.id", ondelete="CASCADE"))
)



class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)

    name = Column(String(10), nullable=False, unique=True )
    email = Column(String(255) , nullable=False, unique=True)
    password = Column(String , nullable=False)
    gender = Column(String, nullable=False)
    phone = Column(String , nullable=False)
    addr = Column(String , nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    favorite_station_ids = Column(ARRAY(Integer) , nullable=True)
    favorite_stations = relationship("ChargeStation", secondary="user_favorite_stations", back_populates="favorited_by")    




class ChargeStation(Base):
    __tablename__ = "charge_stations"

    id = Column(Integer, primary_key=True)

    installation_year= Column(Integer)
    city= Column(String)
    district= Column(String)
    address= Column(String)
    station_name= Column(String)
    facility_type_major= Column(String)
    facility_type_minor= Column(String)
    charger_type_major= Column(String)
    charger_type_minor= Column(String)
    operator_major= Column(String)
    operator_minor= Column(String)
    rapid_charge_capacity= Column(String)
    charger_type= Column(String)
    user_restriction= Column(String)
    charger_id= Column(Integer)
    station_id= Column(String)
    latitude = Column(Float , nullable=True)
    longitude = Column(Float , nullable=True)
    favorited_by = relationship("User", secondary="user_favorite_stations", back_populates="favorite_stations")



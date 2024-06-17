from .db_connection import Base 
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Float , 
    ARRAY ,
    DateTime, 
    Table ,
    Text , 
    func
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

    name = Column(String(10), nullable=False)
    email = Column(String(255) , nullable=False, unique=True)
    password = Column(String , nullable=False)
    gender = Column(String, nullable=False)
    phone = Column(String , nullable=False)
    addr = Column(String , nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    favorite_station_ids = Column(ARRAY(Integer) , nullable=True)
    favorite_stations = relationship("ChargeStation", secondary="user_favorite_stations", back_populates="favorited_by")    

    messages = relationship("Message", back_populates="user")




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

    messages = relationship("Message", back_populates="chargestation")


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    chargestation_id = Column(Integer, ForeignKey("charge_stations.id", ondelete="CASCADE"), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    user = relationship("User", back_populates="messages")
    chargestation = relationship("ChargeStation", back_populates="messages")

    def __repr__(self):
        return f"Message(id={self.id}, user_id={self.user_id}, chargestation_id={self.chargestation_id}, message='{self.message[:20]}...', created_at={self.created_at})"

import os 
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base , sessionmaker

DEV_DATABASE_URL = os.getenv("DEV_DATABASE_URL")

engine = create_engine(
    DEV_DATABASE_URL,
    pool_size=10,  # 최대 연결 풀 크기
    max_overflow=20,  # 연결 풀 초과 허용 개수
    pool_timeout=30, 
)


SessionLocal = sessionmaker(autocommit=False , autoflush=True , bind=engine)


Base = declarative_base()



            

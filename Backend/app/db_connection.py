# import os 
# from sqlalchemy import create_engine 
# from sqlalchemy.orm import declarative_base , sessionmaker
# import sqlalchemy
# DEV_DATABASE_URL = os.getenv("DEV_DATABASE_URL")
# #"postgresql+psycopg2://postgres:postgres@dev-db:5432/inventory"

# #postgresql+psycopg2://postgres:postgres@127.0.0.1:5433/inventory

# DB_USER= "postgres"
# DB_PASS='postgres'
# DB_HOST='34.64.189.90'
# DB_PORT = 5432
# DB_NAME='deno'





# # engine = create_engine(
# #     DATABASE_URL
# #     ,
# #     pool_size=10,  # 최대 연결 풀 크기
# #     max_overflow=20,  # 연결 풀 초과 허용 개수
# #     pool_timeout=30, 
# # )
# engine = create_engine(
#         # Equivalent URL:
#         # postgresql+pg8000://<db_user>:<db_pass>@<db_host>:<db_port>/<db_name>
#         sqlalchemy.engine.url.URL.create(
#             drivername="postgresql+pg8000",
#             username=DB_USER,
#             password=DB_PASS,
#             host=DB_HOST,
#             port=DB_PORT,
#             database=DB_NAME,
#         ),
#          pool_size=10,  # 최대 연결 풀 크기
#         max_overflow=20,  # 연결 풀 초과 허용 개수
#         pool_timeout=30, 
#     )

# SessionLocal = sessionmaker(autocommit=False , autoflush=True , bind=engine)


# Base = declarative_base()



import os

from google.cloud.sql.connector import Connector, IPTypes
import pg8000
from sqlalchemy.orm import declarative_base , sessionmaker
import sqlalchemy

def connect_with_connector() -> sqlalchemy.engine.base.Engine:
    """
    Initializes a connection pool for a Cloud SQL instance of Postgres.

    Uses the Cloud SQL Python Connector package.
    """
    # Note: Saving credentials in environment variables is convenient, but not
    # secure - consider a more secure solution such as
    # Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
    # keep secrets safe.

    instance_connection_name = os.environ[
        "INSTANCE_CONNECTION_NAME"
    ]  # e.g. 'project:region:instance'
    db_user = os.environ["DB_USER"]  # e.g. 'my-db-user'
    db_pass = os.environ["DB_PASS"]  # e.g. 'my-db-password'
    db_name = os.environ["DB_NAME"]  # e.g. 'my-database'
    print(db_name,db_user,db_pass)
    ip_type = IPTypes.PRIVATE if os.environ.get("PRIVATE_IP") else IPTypes.PUBLIC

    # initialize Cloud SQL Python Connector object
    connector = Connector()

    def getconn() -> pg8000.dbapi.Connection:
        conn: pg8000.dbapi.Connection = connector.connect(
            instance_connection_name,
            "pg8000",
            user=db_user,
            password=db_pass,
            db=db_name,
            ip_type=ip_type,
        )
        return conn

    # The Cloud SQL Python Connector can be used with SQLAlchemy
    # using the 'creator' argument to 'create_engine'
    pool = sqlalchemy.create_engine(
        "postgresql+pg8000://",
        creator=getconn,
        # ...
    )
    return pool

engine = connect_with_connector()

SessionLocal = sessionmaker(autocommit=False , autoflush=True , bind=engine)


Base = declarative_base()


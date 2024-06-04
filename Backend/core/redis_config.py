import os
from dotenv import load_dotenv
import redis

load_dotenv()

REDIS_HOST = str = os.getenv("REDIS_HOST")
REDIS_PORT = integer = os.getenv("REDIS_PORT")
REDIS_DATABASE = integer = os.getenv("REDIS_DATABASE")

# r = redis.Redis(
#     host=REDIS_HOST,
#     port=REDIS_PORT,
#     db=REDIS_DATABASE
# )
  
r = redis.Redis(
    host='redis-17562.c294.ap-northeast-1-2.ec2.redns.redis-cloud.com',
    port=17562,
    password='9jhZJtkps1qvCFnlbLRccbmsVbAx21X1'
)  

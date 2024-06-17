from fastapi import Request,Response ,FastAPI , Depends , HTTPException , File , UploadFile

from fastapi_socketio import SocketManager




app = FastAPI()
manager = SocketManager(app, cors_allowed_origins='*')

@manager.on('join')
async def handle_join(sid: str):
    print(f'New client has joined with SID: {sid}')
    await manager.emit('join', {'Sid': sid})
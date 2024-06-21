from fastapi import Request,Response ,FastAPI ,WebSocket, WebSocketDisconnect, Depends , File , UploadFile
from sqlalchemy.orm import Session
from app import crud , models , schemas
from app.db_connection import SessionLocal , engine
import csv
import ast
from uuid import uuid4
import secrets
from core.redis_config import r 
import json
from fastapi.middleware.cors import CORSMiddleware
from smtplib import SMTP_SSL
from email.mime.text import MIMEText
import random
import aiohttp
import asyncio





OWN_EMAIL = "sungkeno3o@gmail.com"
OWN_EMAIL_PASSWORD = "ssgo alpk jqfh wnvc"






def get_session(request, response, session_id, user_data):
    # 세션 정보 저장
    user_data = {"email":  user_data.email}
    r.set(session_id, json.dumps(user_data) )
    r.expire(session_id, 13600)
     # 응답에 세션 ID 설정
    response.set_cookie("session_id", session_id)



app = FastAPI()




models.Base.metadata.create_all(bind=engine)










def get_db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



def generate_session_id():
    return str(uuid4())

session_data = {}

origins = [
    "https://deno-front-sjdz3b63yq-du.a.run.app",
    "https://deno-front-sjdz3b63yq-du.a.run.app/serveice",
    "https://deno-front-sjdz3b63yq-du.a.run.app:3000"
    "https://deno-front-sjdz3b63yq-du.a.run.app/car",
    "https://frontend-deno-sjdz3b63yq-uc.a.run.app:3000/car",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3000/car"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)




count = 0 
active_connections = []
@app.websocket("/ws/{roomId}")
async def websocket_endpoint(websocket: WebSocket, roomId: str, db: Session = Depends(get_db_session)):
    await websocket.accept()
    active_connections.append(websocket)

    try:
        async for data in websocket.iter_text():
            user_id, message , name = data.split("|", 2)

            # 연결이 종료되지 않은 경우에만 메시지 브로드캐스트
            if websocket.application_state == websocket.application_state.CONNECTED:
                for connection in active_connections:
                    if connection.application_state == websocket.application_state.CONNECTED:
                        await connection.send_text(f"{user_id},{message},{name}")

            crud.send_message(user_id, roomId, message, db)

    except WebSocketDisconnect:
        active_connections.remove(websocket)

        # 연결이 종료되지 않은 클라이언트에게만 메시지 전송
        for connection in active_connections:
            if connection.application_state == websocket.application_state.CONNECTED:
                await connection.send_text("A client disconnected")

    # WebSocket 연결 종료
    await websocket.close()


def generate_unique_code():
    digits = [str(i) for i in range(10)]
    code = ''.join(random.sample(digits, 6))
    return code


@app.post('/callback/kakao')
async def token(request: Request , db : Session = Depends(get_db_session)):
    data = await request.json()
    code = data.get('code')
    async with aiohttp.ClientSession() as session:
        headers = {"Content-Type": "application/x-www-form-urlencoded"}
        data = {"grant_type": "authorization_code", "client_id": '077a5dc8a1b357781c172273b7c2d678', "redirect_uri": 'https://deno-front-sjdz3b63yq-du.a.run.app/callback/kakao', "code": code}
        async with session.post("https://kauth.kakao.com/oauth/token", headers=headers, data=data) as response:
            data = await response.json()
        access_token = data.get('access_token')

        headers = {"Authorization": f"Bearer {access_token}"}
        async with session.get("https://kapi.kakao.com/v2/user/me", headers=headers) as rsp:
            user_data = await rsp.json()

        email = user_data.get('kakao_account', {}).get('email')
        nickname = user_data.get('properties', {}).get('nickname')

        isUser = crud.email_check(email , db)
        if not isUser :
            crud.sign_up_kakao(nickname,email,db)


        user_datas = {"email":  email}
        session_id = secrets.token_hex(32)
        r.set(session_id, json.dumps(user_datas) )
        r.expire(session_id, 13600)
        return schemas.UserResponse(
            userId= 1,
            name = nickname,
            email= email,
            session_id=session_id,
            user="로그인 작업"
        )
        return email , nickname , access_token


@app.get('/get/message' )
async def get_message( ct_id , db: Session = Depends(get_db_session)):
    res = crud.get_messages(ct_id , db)

    return res 



@app.post('/send/message' , response_model= bool)
async def send_message( body : schemas.RequestSendMessage , db: Session = Depends(get_db_session)):
    res = crud.send_message(body.user_id , body.chargestation_id , body.message , db)

    return res 





@app.post('/signup' , response_model=bool)
async def sign_up( body : schemas.SignUpRequsest , db: Session = Depends(get_db_session)):
    res = crud.sign_up_user(body,db)
    if res :
        return True
    return False    


@app.post('/userdata' ,response_model= schemas.User)
async def get_user(request:Request ,db: Session = Depends(get_db_session)):
    data = await request.json()
    session_id = data.get('session_id')
    email = r.get(session_id)
    s = email.decode('utf-8')
    
    e = json.loads(s)['email']
    
    res = crud.get_userdata(e,db)
    
    return res




@app.get('/email/codecheck' , response_model=bool)
async def code_check(email: str , code : str):
    rediscode = r.get(email)

    s = code.encode('utf-8')
    print(email,s)
    if s == rediscode:
        r.expire(email,0)
        return True
    else:
        return False    


@app.post("/email")
async def send_email(body: schemas.Email):
    code = generate_unique_code()  # 여기서 생성된 코드를 사용
    
    r.set(body.to, code)
    r.expire(body.to, 300)

    msg = MIMEText(f"""
    <html>
      <body>
        <h1>에코프렌즈 회원가입</h1>
        <p>인증 코드: <strong>{code}</strong></p>
        <p>{body.message}</p>
      </body>
    </html>
    """, "html")
    
    msg['Subject'] = body.subject
    msg['From'] = 'sungkeno3o@gmail.com'
    msg['To'] = body.to
    
    port = 465  # For SSL
    server = SMTP_SSL("smtp.gmail.com", port)
    server.login(OWN_EMAIL, OWN_EMAIL_PASSWORD)
    
    server.send_message(msg)
    server.quit()
    
    return {"message": "Email sent successfully", "code": code}





@app.post("/session", response_model=bool)
async def get_sessions(request: Request, response: Response):
    data = await request.json()
    
    session_id = data.get('session_id')
    print(session_id)
    if session_id:
        # Redis 연결 및 초기화 코드 추가 필요
        exist = r.get(session_id)
        print(exist)
        if exist is None:
            return False
        else:
            return True
    else:
        return False   



@app.post("/emailcheck" , response_model= bool)
async def email_check(request:Request,db: Session = Depends(get_db_session)):
    data = await request.json()
    print(data)
    email = data.get("email")
    return crud.email_check(email , db)



@app.post("/login" , response_model=schemas.UserResponse)
async def read_root(
    response: Response , 
    request: Request,
    user_data: schemas.UserCreateRequest,
    db: Session = Depends(get_db_session) 
    ):

    user = crud.get_user(db,user_data.email,user_data.password)

    if user:
        session_id = secrets.token_hex(32)
        get_session(request, response, session_id,user_data)

        return schemas.UserResponse(
            userId = user.id ,
            name = user.name,
            email=user_data.email,
            session_id=session_id,
            user="로그인 작업"
        )
    else:
        return {
            "email" : "이메일@입력요망.com",
            "session_id" : "세션 생성 실패"
        }
        

@app.post('/user/password' , response_model= bool)
async def isRight_password(request:Request , db : Session = Depends(get_db_session)):
    data = await request.json()
    session_id = data.get('session_id')
    email = r.get(session_id)
    password = data.get('password')

    if email :
        p = json.loads(email)

        if p :
            return crud.isRight_password(p['email'] , password , db)






@app.post("/logout")
async def logout(request:Request , response:Response):
    session_id = request.cookies.get("session_id")
    if session_id:
        r.expire(session_id , 0)
        response.delete_cookie("session_id")
        return True
    else:
        return False




@app.get("/station", response_model=list[schemas.chargetStations])
async def getStation(db: Session = Depends(get_db_session)):
    stations = crud.get_stations(db, skip=0 , limit=100)
    return stations
    


@app.post('/search' , response_model=list[schemas.chargetStations])
async def searchStation(search_request:schemas.searchRequest ,db: Session = Depends(get_db_session)):
    stations = crud.search_stations(search_request,db)
    return stations


@app.post('/getfav' )
async def getFav(request:Request, db: Session = Depends(get_db_session)):
    data = await request.json()
    session_id = data.get('session_id')
    email = r.get(session_id)
    if email :
        p = json.loads(email)

        if p :
            favStations = crud.get_FavStation(p["email"],db)
            print(favStations)
            return favStations
    return []



@app.post('/wishstation')
async def get_wishstation(request:Request, db: Session = Depends(get_db_session)):
    data = await request.json()
    session_id = data.get('session_id')
    email = r.get(session_id)
    if email :
        p = json.loads(email)

        if p :
            favStations = crud.get_wishstation(p["email"],db)
            print(favStations)
            return favStations
    return []


@app.post('/addfav', response_model=bool)
async def addFav(request:Request,db: Session = Depends(get_db_session)):
    
    data = await request.json()
    session_id = data.get('session_id')

    email = r.get(session_id)
    if email is None:
        return False
    p = json.loads(email)
    
    try:
        data = await request.json()
        item_id = data.get('itemId')
        if item_id is None:
            return False

        res = crud.add_FavStation(item_id, p["email"], db)
        return res
    except Exception as e:
        # 예외 처리 로직 추가
        print(f"Error: {e}")
        return False

@app.delete('/delfav', response_model=bool)
async def delFav(request:Request,db: Session = Depends(get_db_session)):
    data = await request.json()
    session_id = data.get('session_id')
    email = r.get(session_id)
    if email is None:
        return False
    p = json.loads(email)   
    try:
        data = await request.json()
        item_id = data.get('itemId')
        if item_id is None:
            return False

        res = crud.del_FavStation(item_id, p["email"], db)
        return res
    except Exception as e:
        # 예외 처리 로직 추가
        print(f"Error: {e}")
        return False





@app.post("/upload_csv")
async def upload_csv(csv_file: UploadFile = File(...)):
    contents = await csv_file.read()
    decoded_contents = contents.decode("utf-8").splitlines()
    reader = csv.DictReader(decoded_contents)

   
    db = SessionLocal()

    for row in reader:
        location_str = row["위도경도"].strip()  # 좌우 공백 제거
        if location_str:  # 데이터가 있는 경우에만 처리
            location = ast.literal_eval(location_str)
            latitude = float(location[0])
            longitude = float(location[1])
        else:  # 데이터가 없는 경우 기본값 할당 또는 건너뛰기
            latitude = None
            longitude = None
        station = models.ChargeStation(
            installation_year=row["설치년도"],
            city=row["시도"],
            district=row["군구"],
            address=row["주소"],
            station_name=row["충전소명"],
            facility_type_major=row["시설구분(대)"],
            facility_type_minor=row["시설구분(소)"],
            charger_type_major=row["기종(대)"],
            charger_type_minor=row["기종(소)"],
            operator_major=row["운영기관(대)"],
            operator_minor=row["운영기관(소)"],
            rapid_charge_capacity=row["급속충전량"],
            charger_type=row["충전기타입"],
            user_restriction=row["이용자제한"],
            charger_id=int(row["충전기ID"]),
            station_id=row["충전소ID"],
            latitude=latitude,
            longitude=longitude,
            # 다른 컬럼들을 할당합니다.
        )

        db.add(station)
        db.commit()


    return {"message": "CSV file uploaded and data saved to database."}


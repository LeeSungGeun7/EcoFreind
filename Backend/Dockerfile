# 베이스 이미지 선택 
FROM python:3.12.1

# 작업 디렉토리 설정 
WORKDIR /app



# 호스트 파일 시스템에서 파일이나 디렉토리를 이미지 내부로 복사 
# COPY requirements.txt .
COPY ./requirements.txt /app/

#컨테이너 내에서 실행할 명령어 정의. 패키지 설치, 파일 복사, 응용프로그램 빌드 등
RUN pip install -r requirements.txt

COPY . .


CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]


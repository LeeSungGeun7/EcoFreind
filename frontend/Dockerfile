FROM node:v16.20.0

WORKDIR /app/frontend

# package.json과 yarn.lock 파일만 먼저 복사
COPY frontend/package.json frontend/yarn.lock ./

# 의존성 설치
RUN yarn install

# 프론트엔드 소스 파일 복사
COPY frontend/ ./

# 프로덕션 빌드
RUN yarn build

# serve 패키지 전역 설치
RUN yarn global add serve

EXPOSE 3000

# 빌드된 앱 실행
CMD ["serve", "-s", "build", "-l", "3000"]


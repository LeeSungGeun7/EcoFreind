# 에코프렌즈 [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FLeeSungGeun7%2FEcoFreind&count_bg=%2379C83D&title_bg=%23555555&icon=hypothesis.svg&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

<a href="https://imgbb.com/"><img src="https://i.ibb.co/V9Nfhqb/icon-512-maskable.png" alt="icon-512-maskable" border="0"></a><br /><a target='_blank' href='https://imgbb.com/'></a><br />




## 프로젝트 정보 


```
개인프로젝트 (2024 .05 .01 ~ 진행중) 
전기차충전소 공공데이터를 활용한 위치데이터 제공 해주는 서비스 
```


## 배포 주소

https://deno-front-sjdz3b63yq-du.a.run.app/

카카오로 간편가입 or 
test 계정 : test , 1234


## 프로젝트 소개 

리액트 SPA 와 Fast-api CSR방식

---

도커와 구글클라우드 런 으로 빠른 CI/CD 환경 구축

---
구글 cloud sql 대용량 csv 파일 업로드

---






## 시작가이드

**Requirements**

For Building and running the application you need:
- Node.js 14
- python:3.12.1


**Installation**

```
$ https://github.com/LeeSungGeun7/EcoFreind.git 
```


**Backend**

```
$ cd Backend
$ python -m venv venv
$ source venv/bin/activate  # On Windows use venv\Scripts\activate
$ pip install -r requirements.txt
$ uvicorn main:app --reload
```


**Frontend**

```
$ cd frontend 
$ nvm use 14
$ yarn install
$ yarn start
```




## Stacks


Frontend

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/axios api-5A29E4?style=for-the-badge&logo=axios&logoColor="white">
<img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">

Backend

<img src="https://img.shields.io/badge/fastapi-009688?style=for-the-badge&logo=fastapi&logoColor=white">
<img src="https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">


Deploy 

<img src="https://img.shields.io/badge/docker-blue?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/google 
 cloud-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white">
<img src="https://img.shields.io/badge/github action-black?style=for-the-badge&logo=githubactions&logoColor=white">





## PAGES 


<a href="https://ibb.co/K2D7bTK"><img src="https://i.ibb.co/Lxr6YVN/Untitled-1.jpg" alt="Untitled-1" border="0"></a><br /><a target='_blank' href='https://imgbb.com/'></a><br />



## 주요기능 

> 전기차 충전소  검색
- 주변 3km , 1km , 500m 이내 조회가능 
- 옵션 필터링 가능 25만건 데이터 제공
- 카카오맵 마커를 통해 위치 표시


> 전기차 충전소 채팅 
- 웹소켓 사용
- 선택한 전기차 충전소 에서 유저간의 채팅

> 회원관리 
- 서버세션과 이메일 인증 Redis 활용 
- 카카오 소셜 로그인 및 회원가입
- Cloudflare 이미지 저장소 업로드 프로필 사진관리


## 아키텍쳐

<a href="https://imgbb.com/"><img src="https://i.ibb.co/YWYzdm3/image.jpg" alt="image" border="0"></a><br /><a target='_blank' href='https://imgbb.com/'></a><br />



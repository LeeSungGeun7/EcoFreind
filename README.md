# 에코프렌즈

구글클라우드 런 + 도커 배포 https://deno-front-sjdz3b63yq-du.a.run.app/


> 기존에 학원에서 진행했던  미니 프로젝트 서버인 자바 스프링부트를 파이썬 fastapi 로 변경하고 리액트까지 최적화와 UI  개선 및 코드를 수정 

![title](https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/bd2933c9-c1d6-458c-54ae-d029c0ef1e00/medium)   


### 서비스 
공공데이터를 활용한 전기차 충전소 위치를 보여주는 서비스 



### 기술스택 

React , styled-components , Axios-api , context-api 

fast-api , postgresql , Redis 

docker 


유저 인증은 서버 세션을 Redis 에 보관해서 진행하였습니다. 



최적화 : 

반응형 웹 적용 ,
코드 스플리팅 다이나믹 임포트 ,
axios api 한곳에 모아진 코드 -> 파일 세분화 , 
필요 없는 코드 제거 ,
이미지 최적화 webp 변경 , 
폰트 최적화 , 
리렌더링 최소화 ,

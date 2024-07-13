import React from 'react';
import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import styled from "styled-components";
import { authApi } from '../api/auth';
import { useUserStore } from '../store/userState';
import LoginLoading from '../Components/Loading/LoginLoading.tsx';
import { useQuery } from '@tanstack/react-query'

    
const Container = styled.div`

  .Container {

    background-color: ${props => props.theme.colors.black1} ;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  .loginbar {
    color : ${props => props.theme.colors.blue};
    background-color : ${props => props.theme.colors.black2};
    box-shadow: 0 14px 28px rgba(0,0,0,0.25);
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: space-evenly;

    @media (max-width: 600px) {
      width: 90%;  
      height: 90%; 
    }   
    @media (min-width: 1000px) {
      width: 40%;  
      height: 70%; 
    }   
    width: 85%;
    height: 85%;
    border-radius: 5%;
    border-width: 30%;


    .top {
      width: 100%;
      display: flex;
      justify-content: space-around;

      div {
        width: 33%;
      }
      .sign {
        font-size:13px;
        background-color: black;
        border-radius:15px;
        color:white;
        width: 60px;
        height: 35px;
        display:flex;
        justify-content:center;
        align-items:center;
      }

    }
  }
  input {
    @media (max-width: 600px) {
      width: 80%;  
      height: 10%; 
    } 
    width: 50%;
    height: 10%;
    box-shadow: 1px ;
    font-size: 15px;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding-left: 20px;
    background-color: white;
  }
  .login-btn {
    
    border-radius: 10%;
    background-color : ${props => props.theme.colors.blue};
    color : ${props => props.theme.colors.black1};
    border : none;
    width: 11%;
    height:8%;
    cursor: pointer;

  }
  .title {
    font-size: 20px;
    weight: bold;
    color : ${props => props.theme.colors.blue};
  }
  a {
    text-decoration: none;
  }

  .kakao {
    display:flex;
    justify-content:center;
    height: 50px;
    width: 50px;
    background-color: #FEE500;
    border-radius: 15px;
    img {
      width: 100%;
      height:100%;
    }
  }

`

const Login = () => {
    const navigate = useNavigate(); // 라우터 이동을 하기위해서
    // 키보드 입력
    const [inputId , setInputId] = useState("");
    const [inputPw , setInputPw] = useState("");
    const [loading , setLoading] = useState(false);

    const { setAvatar,setEmail,setName,setUserId,setIsLogin} = useUserStore();


    const onChangeId = (e) => {
       setInputId(String(e.target.value));
    }

    const onChangePw = (e) => {
      setInputPw(String(e.target.value))
    }

    

  const onClickLogin = async() => {
    const { data:sessionId , status} = await authApi.memberLogin(inputId,inputPw)
    setLoading(true);
    
    if (status === 200 && sessionId) {
      setLoading(false)
      setAvatar(sessionId.avatar)
      setEmail(sessionId.email)
      setName(sessionId.name)
      setUserId(sessionId.userId)
      setIsLogin(true)
      navigate('/')
    } else if (status === 422){
      setLoading(false)
      alert("로그인실패")
    }
  }



  return (
    <>
    <Header/>
    <Container>

      <div className="Container">

        <div className="loginbar">

          <div className='top'>
            <div></div>
            <div className="title">LOGIN</div>
            <Link className='sign' onClick={(e)=>{e.preventDefault(); navigate("/signup")}}>Sign Up</Link>
          </div>

          <input type="text" placeholder="이메일 입력" value={inputId} onChange={onChangeId} />
          <input type="password" placeholder="비밀번호 입력" value={inputPw} onChange={onChangePw} />


          {
            loading ?
            <LoginLoading/>
            :
            <>
          <button className='login-btn' onClick={onClickLogin}>Login</button>
          
          <Link className='kakao' to={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`}>
            <img src={'/kakaoLogin.webp'} alt="" />
          </Link>  
          </>
            }

        </div>
      </div>
      <Footer />
    </Container>
    </>
  );
};

export default Login;
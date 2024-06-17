import React from 'react';
import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import styled from "styled-components";
import { useAuth } from '../context/AuthContextProvider';
import { authApi } from '../api/auth';


    
const Container = styled.div`

  .Container {
    background-color: white ;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  .loginbar {
    
    color: #30A7FE;
    background-color: #EFF2F3;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25);
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: space-evenly;
    //border: solid 1px black;
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
    //#30A7FE;
   
    border-radius: 10%;
    background-color:  lightblue;
    border : none;
    width: 15%;
    height:10%;
    cursor: pointer;
    
  }
  .title {
    font-size: 20px;
    weight: bold;
  }
  a {
    text-decoration: none;
    color: #3
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
    const {userdata , setUserData} = useAuth()
    const navigate = useNavigate(); // 라우터 이동을 하기위해서
    // 키보드 입력
    const [inputId , setInputId] = useState("");
    const [inputPw , setInputPw] = useState("");
    


    const onChangeId = (e) => {
       setInputId(String(e.target.value));
    }

    const onChangePw = (e) => {
      setInputPw(String(e.target.value))
    }

    

  const onClickLogin = async() => {
    const { data:sessionId , status} = await authApi.memberLogin(inputId,inputPw)
    
    console.log(JSON.stringify(sessionId))
    if (status === 200) {
      localStorage.setItem('session_id', JSON.stringify(sessionId))
      setUserData({...userdata,islogin:true,email: sessionId.email,name: sessionId.name , userId : sessionId.userId})
      navigate('/')
    } else {
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
          <button className='login-btn' onClick={onClickLogin}>Login</button>
          
          <Link className='kakao' to={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`}>
            <img src="https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/e695240c-9c41-4098-9724-4b741c70ca00/avatar" alt="" />
          </Link>  

        </div>
      </div>
      <Footer />
    </Container>
    </>
  );
            };

export default Login;
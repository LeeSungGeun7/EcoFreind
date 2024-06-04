import React from 'react';
import {useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";

import cookies from 'react-cookies';
import debounce from "lodash/debounce"

import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useAuth } from '../context/AuthContextProvider';


    
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
  button {
    //#30A7FE;
   
    border-radius: 10%;
    background-color:  #F5F278;
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
    color: #333333;
  }
`
const Login = () => {
    const {userdata , setUserData} = useAuth()
    
   const clientId = "157067894615-cai8h2gq8gatlmoqpkfe08os9rhq92vp.apps.googleusercontent.com";
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
    const {data:sessionId , status: status} = await AxiosApi.memberLogin(inputId,inputPw)
    
    console.log(JSON.stringify(sessionId))
    if (status == 200) {
      localStorage.setItem('session_id', JSON.stringify(sessionId))
      setUserData({...userdata,islogin:true,email: sessionId.email})
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
          <div className="title">LOGIN</div>
          <input type="text" placeholder="이메일 입력" value={inputId} onChange={onChangeId} />
          <input type="password" placeholder="비밀번호 입력" value={inputPw} onChange={onChangePw} />
          <button onClick={onClickLogin}>Login</button>
          <a onClick={()=>{navigate("/findpass")}}>Forgot to Password?</a>
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
              onSuccess={async(res) => {
                const result = await AxiosApi.googlelogin(res.credential);
                console.log(jwtDecode(res.credential));
                console.log(result);
                navigate("/signUp", {state : { data : jwtDecode(res.credential)}});
              }}
              onFailure={(err) => {
                console.log(err);
              }}
/>
          </GoogleOAuthProvider>

        </div>
      </div>
      <Footer />
    </Container>
    </>
  );
            };

export default Login;
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import styled from "styled-components";
import { SlEarphonesAlt } from "react-icons/sl";
import { FaSearch } from 'react-icons/fa';

import { useContext } from "react";
import { useAuth } from "../context/AuthContextProvider";


const Contain = styled.div`
    background-color:#EFF2F3;
    .Container {

        display : flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 150vh;
       // border-top : solid 1px #333333;
        font-family: 'Do Hyeon', sans-serif;
    }

    .top {

        background-color: white;
        display: flex;
        align-items: center;
        justify-content:center;
        width: 70%;
        height: 10%;
      //  border: solid 1px black;
        color : #333333;
        font-family: 'Do Hyeon', sans-serif;
        font-size: 35px;
        weight : bold;
    }

    .mid {
        // background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9y8Eyh7fgV9hJo8YzDPg7n-Zmu4pgp7ncu04PFJJGFa8COiMjK_QLDXdgWQsAoNiLFw&usqp=CAU") ;
        background-size: 100% 100%;
        background-color: #72DEFF;        
        background-repeat: no-repeat;
        width: 70%;
        height: 20%;
        align-items:center;
        display:flex;
        justify-content:center;
        flex-direction: row;
      
      //  border: solid 1px black;
        margin-bottom: 50px;
    }

    .bottom {
        width: 70%;
        height: 60%;
     //   border: solid 1px black;
    }


    .top  , .bottom {
        display: flex;
        align-items: center;
        justify-content:center;
        flex-direction:column;
    }

    .live-chat , .FAQ , .custom , .post{
        display:flex;
        flex-direction: row;
        width:100%;
        height: 25%;
    }
    .live-chat1 , .custom-name , .post1{
        font-weight:bold;
        width: 30%;
    }
    .live-chat2 , .custom-box , .post2{
        width: 70%;
    }
    .live-chat2 button {
        width: 10%;
        border:none;
        background-color: black;
        color: white;
    }

    .FAQ1 {
        font-weight:bold;
        width: 30%;
    }
    .FAQ2 , .live-chat2{
        display:flex;
        flex-direction: column;
        width: 70%;

    }
    .FAQ2 {
        height: 100%;
        position: relative;
    }
    .FAQ2 input {
        
        border : none;
        width: 50%;
        border-bottom: solid 1px;
    }
    .Search {
       position: absolute;
        right: 340px;
    }
    .custom-box {
        height:100%;
        display:flex;
        flex-direction:row;
    }

    .custom-item1 , .custom-item2 {
        display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:column;
        background-color: beige;
        width: 45%;
        height: 95%;
        margin-right:10px;
       // border: 1px solid black;
    }

    .custom-item1:hover{

    color: rgb(255, 255, 102);
    filter: drop-shadow(0 0 2px rgba(255, 255, 102, 0.7))
    drop-shadow(0 0 5px rgba(255, 255, 102, 0.7))
    drop-shadow(0 0 15px rgba(255, 255, 102, 0.7));
    }

    .questions {
        overflow : scroll;
        height:60%;
    }
    @media (max-width: 1000px) {
        * {
            font-size: 0.8em;
        }
    }
    @media (max-width: 480px) {
            * {
                font-size: 0.4em;
            }
    }
 
`


  

const ServiceCenter = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const {email} = useAuth();

    return(
        <>
        <Header/>
        <Contain>
            
            <div className="Container">


                    <div className="top">고객센터
                    
                    
                    </div>


                
                    <div className="mid">

                        <div style={{minWidth:"10%",fontSize:"2.5em"}}>24시간 연중무휴 채팅상담</div>
                        <div style={{color: "white",marginLeft: "120px" , fontSize: "100px"}}>< SlEarphonesAlt/></div>
                    </div>

                  <div className="bottom"> 
        
                        <div className="live-chat">
                                <div className="live-chat1">
                                    에코프렌즈 라이브챗
                                </div>
                                <div className="live-chat2">
                                    L I V E C H A T
                                    <p style={{fontSize: "10px"}}>상담원과 실시간으로 상담을 해보세요</p>
                                    <button>상담하기</button>
                                </div>
                        </div>

                        <div className="FAQ">

                                 <div className="FAQ1">
                                    FAQ    
                                </div>  
                                <div className="FAQ2">
                                    <input type="text" />
                                    자주하는 질문 
                                        <div className="questions">
                                            <div className="question">
                                                (회원가입이 안되요!)
                                            </div>
                                            <div className="question">
                                                (로그인이안되요!)
                                            </div>
                                            <div className="question">
                                                (!)
                                            </div>
                                            <div className="question">
                                                (구글회원가입은어떻게해야되나요!)
                                            </div>
                                            <div className="question">
                                                (전기차충전은 어떻게하나요!)
                                            </div>
                                            <div className="question">
                                                (서비스센터 수리점도알려주세요!)
                                            </div>
                                        </div>
                                    <div className="Search"><FaSearch/></div>
                                </div> 
                        </div>

                        <div className="custom">

                                <div className="custom-name">
                                    1:1문의
                                </div>
                        


                 {!isLoggedIn ? (
                      <div className="custom-box">
                                   
                      <div onClick={()=> {navigate("/check")}} style={{backgroundColor: "#FFE83C"}} className="custom-item1">

                          1:1문의 및 조회
                          <p style={{fontSize:"10px" , backgroundColor: "#FFE83C"}}>궁금한 점이 있으시면 1:1문의를 남겨주세요</p>
                          <p style={{fontSize:"5px" , fontWeight: "100"}}>^&^</p>
                      </div>
                      <div onClick={()=> {navigate("/answer")}} className="custom-item2" style={{backgroundColor: "#C2FF30"}}>
                          관리자전용-답변달기-기능
                      </div>
                  </div>
                ) : (
                   <div className="custom-box">
                                   
                  <div style={{backgroundColor: "#FFE83C"}} className="custom-item1">

                        1:1문의하기 (로그인후 이용가능)
                       
                    </div>
                    <div className="custom-item2" style={{backgroundColor: "#C2FF30"}}>
                        문의내역 조회 (로그인후 이용가능)
                    </div>
                        </div>
                    
                )}


                                {/* <div className="custom-box">
                                   
                                    <div style={{backgroundColor: "#FFE83C"}} className="custom-item1">

                                        1:1문의하기
                                        <p style={{fontSize:"10px" , backgroundColor: "#FFE83C"}}>궁금한 점이 있으시면 1:1문의를 남겨주세요</p>
                                        <p style={{fontSize:"5px" , fontWeight: "100"}}>로그인후 이용가능</p>
                                    </div>
                                    <div className="custom-item2" style={{backgroundColor: "#C2FF30"}}>
                                        문의내역 조회
                                    </div>
                                </div> */}

                        </div>  

                        <div className="post">
                        
                                <div className="post1">
                                    <div>
                                        공지사항
                                    </div>
                                </div>

                                <div className="post2">
                                    <div>5/9 오후 7:00 (개인정보 처리방침이 변경되었습니다.)</div>
                                </div>

                        </div>  
                    </div>    


            </div>
        <Footer/>

        </Contain>
        </>
    );
}

export default ServiceCenter;
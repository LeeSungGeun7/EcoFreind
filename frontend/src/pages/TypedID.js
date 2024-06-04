import React, { useState } from "react";
import styled from "styled-components";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import AxiosApi from "../api/AxiosApi";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Container = styled.div`
   * {
      box-sizing: border-box;
   }

    .Container {
        background-color: mintcream;
        display: flex;
        /* flex-wrap: wrap; */
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: 100%;
        min-width: 780px;
    }

    .TopMenu {
        display: flex;
        width: 100%;
        height: 60px;
        background-color: #D9D9D9;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        list-style: none;
    }

    .top_findId, .top_findPw {
        text-decoration: none;
        color: #FFF;
        font-size: 20px;
        margin: 0 30px;



    }

    .top_findId:hover  {
        color: yellow;
    }

    .top_findPw:hover {
        color: yellow;
    }

    .wrap {
        /* display: flex; */
        align-items: center;
        justify-content: center;
        margin: auto;
        width: auto;
        height: 100%;
    }
    
    .logo_area {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .logo2 {
        font-size: 50px;
        color: black;
    }

    .title {
        font-size: 20px;
    }

    .input_area {
        align-items: center;
        text-align: center;
        justify-content: center;
    }

    .nextBtn {
        display: flex;
        width: 100%;
        height: 50px;
        background-color: black;
        text-decoration: none;
        color: white;
        font-size: 20px;
        border-radius: 5px;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
    }

    .link_area {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin: 30px;
        margin-bottom: 150px;

    }
    
    .text {
        margin-right: 10px;
    }

    .link_findID {
        text-decoration: none;
        color: royalblue;
        font-weight: bold;
    }

    .inputBox {
    width: 100%;
    height: 50px;
    margin: 10px 0;
    }
`

const TypedID = () => {
    const navigate = useNavigate("");

    const [inputEmail, setInputEmail] = useState("");

    const onChangeEmail = (e) => {
        setInputEmail(e.target.value);
    }

    const onClickFindPassword = async () => {
        const response = await AxiosApi.getCustomerInfo(inputEmail);
        
        if(response.status === 200) {
            navigate(`/findpass/${inputEmail}`);
            console.log(response.data);
        }else {
            setModalOpen(true);
            setModalText("존재하지 않는 아이디입니다.");
        }
    }

    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState("");

    const confirmBtn = () => {
        setModalOpen(false);
        console.log("확인 버튼이 눌러졌습니다.");
    }
    const closeModal= () => {
        setModalOpen(false);
    }

    const data = {
        email : "pooh9609@naver.com"
    }

    return(
        <>
        <Header />
        <Container>
            <div className="Container">
                <div className="TopMenu">
                    <a href="/FindID" className="top_findId"><li>아이디 찾기</li></a>
                    <a href="/TypedID" className="top_findPw"><li>비밀번호 찾기</li></a>
                </div>
                <div className="wrap">
                    <div className="logo_area">
                        <h1 className="logo2">Eco Friends</h1>
                        <h2 className="title">비밀번호를 찾고자 하는 아이디를 입력해주세요.</h2>
                    </div>
                    <div className="input_area">
                        <input className="inputBox" onChange={onChangeEmail}></input>
                        <br></br>
                        <a href className="nextBtn">
                            <span className="nextButton" onClick={onClickFindPassword}>다음</span>
                        </a>
                    </div>
                    <div className="link_area">
                        <p className="text">아이디가 기억나지 않는다면?</p>
                        <a href="/FindID" className="link_findID">아이디 찾기</a>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
        </>
    );
};
export default TypedID;
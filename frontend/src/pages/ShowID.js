import React from "react";
import styled from "styled-components";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import AxiosApi from "../api/AxiosApi";

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

    .title {
        position: relative;
        right: 270px;
        margin-top: 80px;
    }

    .FindID {
        display: inline-block;
        width: auto;
        height: auto;
        min-width: 700px;
        min-height: 260px;
        margin: 30px;
        padding: 50px 30px;
        border: 1px solid gray;
        border-radius: 3px;
    }

    .text {
        margin: 0 0 40px 30px;
        
    }

    .showID {
        display: flex;
        width: 100%;
        height: 100%;
        border: 1px solid gray;
        padding: auto;
        align-items: center;
        justify-content: center;
        background-color: #FFF;
    }

    .userID, .dateSignup {
        margin: 40px;
    }

    .btn_area {
        display: flex;
        width: 100%;
        height: 200px;
        align-items: center;
        justify-content: center;
        margin-bottom: 145px;
    }

    .loginBtn, .findPwBtn {
        display: flex;
        width: 130px;
        height: 40px;
        margin: 10px;
        border: 1px solid gray;
        border-radius: 5px;
        background-color: #FFF;
        font-size: 18px;
        font-weight: bold;
        text-decoration: none;
        align-items: center;
        justify-content: center;
        color: black;
    }
`

const ShowID = () => {

    
    return(
        <>
        <Container>
            <Header />
            <div className="Container">
                <div className="TopMenu">
                    <a href="/FindID" className="top_findId"><li>아이디 찾기</li></a>
                    <a href="/TypedID" className="top_findPw"><li>비밀번호 찾기</li></a>
                </div>
                <h2 className="title">아이디 찾기</h2>
                <div className="FindID">
                    <p className="text">고객님의 정보와 일치하는 아이디입니다.</p>
                    <div className="showID">
                        <h3 className="userID">IDIDIDID</h3>
                        <p className="dateSignup">가입 : 2023.05.22</p>
                    </div>
                </div>
                <div className="btn_area">
                    <a href="/Login" className="loginBtn"><span>로그인 하기</span></a>
                    <a href="/TypedID" className="findPwBtn"><span>비밀번호 찾기</span></a>
                </div>
            </div>
            <Footer />
        </Container>
        </>
    );
};
export default ShowID;
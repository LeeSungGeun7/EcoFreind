import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link, useParams } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    background-color: #FFF;
    padding: 100px;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    min-width: 720px;

    .Container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .Mypage {
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
        height: 100%;
        width: 100%;
        max-width: 1200px;
        min-width: 720px;
        background-color: #FFF;
        border-radius: 20px;
        border: 1px solid #202632;  
    }

    .top {
        width: 100%;
        height: 60px;
        background-color: #202632;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;

    }

    .table {

    }
    
    .topMenu {
        display: flex;
        align-items: center;
        justify-content : space-evenly;
        font-size: 22px;
        width: 100%;
        height: 7vh;
        min-height: 50px;
        background-color: #202632;
        margin: 0;
        padding: 0;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;

    }

    .menu1, .menu2, .menu3, .menu4 {
        width: 130px;
        height: 50px;
        display: block;
        list-style: none;
        float: left;
        margin-right: 20px;
        background-color: #202632;
    }

    .mypage, .modifyInfo, .interestStation, .inquriyCost {
        display: flex;
        width: 130px;
        height: 50px;
        text-decoration: none;
        color: white;
        align-items: center;
        
    }

    .text {
        /* margin: 30px; */
        margin-left: 100px;
    }

    .InfoTable {
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border-top: 1px solid #444444;
        border-bottom: 1px solid #444444;
        border-collapse: collapse;
        background-color: white;
        margin-bottom: 30px;
    }

    .tr {
        
    }

    .name, .id, .phone, .email {
        /* float: left; */
        height: 60px;
        width: 140px;
        border-right: 1px solid gray;
        border-bottom: 1px solid gray;
        background-color: #72DEFF;
    }

    .payment {
        /* float: left; */
        height: 60px;
        width: 140px;
        border-right: 1px solid gray;
        background-color: #FFFFFF;
    }

    .loginName, .loginId, .loginPhone, .loginEmail {
        border-bottom: 1px solid gray;
        height: 60px;
        padding: 5px;
    }

    .modifyPhone, .modifyEmail {
        width: 300px;
        height: 30px;
    }

    .info {
        margin: 0 5px;
        font-size: 14px;
        color: red;
    }

    .card, .card2, .card3 {
        text-decoration: none;
    }

    .card, .card3 {
        color: black;
    }

    .card2 {
        color: white;
    }

    .cardRegister {
        background-color: #D9D9D9;
        border: none;
    }

    .naverPay {
        background-color: rgb(0, 199, 60);
        border: none;
    }

    .kakaoPay {
        background-color: #F7E600;
        border: none;
    }
    
    .cardRegister, .naverPay, .kakaoPay {
        width: 130px;
        height: 40px;
        border-radius: 10px;
        margin: 0px 20px;
    }

    .saveButton {
        width: 100%;
        align-items: center;
        margin-bottom: 20px;
        
    }
    .saveInfoBtn {
        display: block;
        margin: auto;
        width: 150px;
        height: 50px;
        border-radius: 10px;
        border: none;
        background-color: #5EBBFF;
        font-size: 16px;
        font-weight: bold;
        align-items: center;
        justify-content: center;
    }

    .saveInfo {
        text-decoration: none;
        color: #FFF;
    }

    .modifyInfo {
        color: #5EBBFF;
    }
`;


const ModifyInfo = () => {

    const [myInfo, setMyInfo] = useState("");
    const { id } = useParams();

    const data = {
        name : "신형환",
        nicName : "kh"
    }

    useEffect(() => {
        const myInfo = async(id) => {
            const rsp = AxiosApi.getMyInfo(id);
            if(rsp.status === 200)setMyInfo(rsp.data);
            console.log(rsp.data);
        }
    }, []);



    return(

        <>
        <Header overlap={false}/>
        <Container>
            <div className="Container">
                <div className="Mypage">
                    <div className="top">
                        <ul className="topMenu">
                        <Link to="/MyPage"><li className="menu1"><a className="mypage" href="/">마이페이지</a></li></Link>
                        <Link to="/ModifyInfo"><li className="menu2"><a className="modifyInfo" href="/ModifyInfo">내 정보 수정</a></li></Link>
                        <Link to="/InterestStation"><li className="menu3"><a className="interestStation" href="/">관심 충전소</a></li></Link>
                        <Link to="/InquriyCost"><li className="menu4"><a className="inquriyCost" href="/">결제 내역</a></li></Link>
                        </ul>
                        <br></br>

                        <h4 className="text">*모든 항목은 필수입력 사항입니다.</h4>

                    </div>
                    <div className="table">
                        <table className="InfoTable"> 
                            <tr>
                                <th className="name">이름</th>
                                <td className="loginName">{data.name}</td>
                            </tr>
                            <tr>
                                <th className="id">닉네임</th>
                                <td className="loginId">{data.nicName}</td>
                            </tr>
                            <tr>
                                <th className="phone">휴대전화번호</th>
                                <td className="loginPhone">
                                    <input className="modifyPhone"></input><p className="info">*휴대전화 없을 시 유선전화번호 입력</p>
                                </td>
                            </tr>
                            <tr>
                                <th className="email">이메일</th>
                                <td className="loginEmail">
                                    <input className="modifyEmail"></input><p className="info">*입력예시:Ecofriend@naver.com</p>
                                </td>
                            </tr>
                            <tr>
                                <th className="payment">결제 수단</th>
                                <td>
                                    <button className="cardRegister"><a className="card" href="/">카드 등록</a></button>
                                    <button className="naverPay"><a className="card2" href="/">NAVER PAY</a></button>
                                    <button className="kakaoPay"><a className="card3" href="/">KaKao PAY</a></button>
                                </td>
                            </tr>
                        </table>
                        
                        <div className="saveButton">
                            <button className="saveInfoBtn"><a className="saveInfo" href="/">수정하기</a></button>
                        </div>

                    </div>

                </div>

            </div>

        </Container>
        <Footer />
        </>
    );
};
export default ModifyInfo
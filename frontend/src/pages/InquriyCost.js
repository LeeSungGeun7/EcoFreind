import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import arrow_down from "../images/free-icon-expand-arrow-down60799.png"
import arrow_up from "../images/free-icon-expand-arrow-up60799.png"
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
        margin-bottom: 50px;
    }

    .receipt {
        display: flex;
        align-items: center;
        /* justify-content: center; */
        width: 95%;
        height: 95%;
        margin: auto;
        margin-bottom: 20px;
        background-color: #FFFEF3;
        border: 1px solid #202632;
    }

    .hide-menu {
        display: flex;
        align-items: center;
        /* justify-content: center; */
        width: 95%;
        height: 95%;
        margin: auto;
        margin-bottom: 20px;
        background-color: #FFFEF3;
        border: 1px solid #202632;
    }

    .show-menu {
        display: flex;
        align-items: center;
        /* justify-content: center; */
        width: 95%;
        height: 95%;
        margin: auto;
        margin-bottom: 20px;
        background-color: #FFFEF3;
        border: 1px solid #202632;
    }

    .stationInfo {
        display: inline;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin: 0 40px;
    }

    .infoTable {
        margin: 20px;
    }

    .detailInfo {
        display: flex;
    }

    .category {
        margin: 5px;
        width: 150px;
        text-align: left;
        align-items: center;
        justify-content: center;
        float: left;
    }

    .content {
        margin: 5px;
        align-items: center;
        justify-content: center;
        float: right;
    }

    .charge {
        align-items: center;
        justify-content: center;
        float: right;
    }

    .arrowIcon_down, .arrowIcon_up {
        display: flex;
        float: right;
        align-items: center;
        justify-content: right  ;
        margin: 20px;
        width: 80px;
        height: 80px;
        }

    .inquriyCost {
        color: #5EBBFF;
    }
`;



const InquriyCost = () => {

    // const [payLog, setPayLog] = useState();
    
    // useEffect(() => {
    //     const payLog = async() => {
    //         const rsp = await AxiosApi.payLog();
    //         if(rsp.status === 200)setPayLog(rsp.data);
    //         console.log(rsp.data);
    //     }
    //     payLog("결제 내역");
    // }, []);

    
    //테스트용 데이터

    const data = [
        {
            paydate : "2023.5.14",
            addr : "강남 N 타워 전기차충전소",
            chargeTp : "완속",
            chargeAmount : 400,
            payment : 33000,
            bankNm : "신한은행"
        },
        {
            paydate : "2023.5.15",
            addr : "논현1동 주민센터 전기차충전소",
            chargeTp : "급속",
            chargeAmount : 500,
            payment : 28000,
            bankNm : "기업은행"
        },
        {
            paydate : "2023.5.17",
            addr : "서초2동 주민센터 전기차 충전소",
            chargeTp : "급속",
            chargeAmount : 380,
            payment : 20000,
            bankNm : "KaKao Pay"
        }
    ]

    

    const [isOpen, setIsOpen] = useState(false);

    const viewDetail = () => {
        setIsOpen(isOpen => !isOpen);
    }


    return(

        <>
        <Header overlap={false}/>
        <Container>
            <div className="Container">
                <div className="Mypage">
                    <div className="top">
                        <ul className="topMenu">
                        <Link to="/MyPage"><li className="menu1"><a className="mypage" href="/">마이페이지</a></li></Link>
                        {/* <Link to="/ModifyInfo"><li className="menu2"><a className="modifyInfo" href="/ModifyInfo">내 정보 수정</a></li></Link> */}
                        <Link to="/InterestStation"><li className="menu3"><a className="interestStation" href="/">관심 충전소</a></li></Link>
                        <Link to="/InquriyCost"><li className="menu4"><a className="inquriyCost" href="/">결제 내역</a></li></Link>
                        </ul>
                        <br></br>

                        {data && data.map(e => (
                            <div className="receipt">
                                <div className="stationInfo">
                                    <h2 key={data}>{e.addr}</h2>
                                    <p key={data}>{e.paydate}</p>
                                    <h3 key={data} className="charge">{e.payment}</h3>
                                </div>
                                <div className="pointerIcon">
                                    {/* <button>
                                        펼치기/접기
                                    </button>
                                    <uncontrolledCollapse toggler="#toggle" className="m-0 p-0">
                                        <card>
                                            <cardBody>
                                                내용내용내용내용내용내용내용
                                            </cardBody>
                                        </card>
                                    </uncontrolledCollapse> */}
                                </div>
                                <div className="arrowIcon_down">
                                    <a href="/"><img className="arrow_down" src={arrow_down} alt="arrow_down_icon"></img></a>
                                </div>
                            </div>
                        ))}

                        {/* <div className="receipt">

                            <div className="stationInfo">
                                <h2>서울 논현1동 주민센터 전기차 충전소</h2>
                                <p>2023.03.21</p>
                                <h3 className="charge">18,000원</h3>
                            </div>
                            <div className="arrowIcon_down">
                                <a href="/"><img className="arrow_down" src={arrow_down} alt="arrow_down_icon"></img></a>
                            </div>
                        </div>
                        <div className="receipt">
                            <div className="stationInfo">
                                <h2>서울 서초구 서초2동 주민센터 전기차충전소</h2>
                                <p>2023.3.19</p>
                                <h3 className="charge">33,000원</h3>
                            </div>
                            <div className="arrowIcon_down">
                                <a href="/"><img onClick={()=>viewDetail()} className="arrow_down" src={arrow_down} alt="arrow_down_icon"></img></a>
                            </div>
                        </div> */}

                        <div className={isOpen ? "show-menu" : "hide-menu"}>
                            <div className="stationInfo">
                                <h2>서울 서초구 서초2동 주민센터 전기차충전소</h2>
                                <table className="infoTable">
                                    <tr className="detailInfo">
                                        <th className="category">날짜</th>
                                        <td className="content">2023.3.19</td>
                                    </tr>
                                    <tr className="detailInfo">
                                        <th className="category">주소</th>
                                        <td className="content">서울 서초구 서초대로70길 51 (서초동 1332-6)</td>
                                    </tr>
                                    <tr className="detailInfo">
                                        <th className="category">충전타입</th>
                                        <td className="content">DC콤보</td>
                                    </tr>
                                    <tr className="detailInfo">
                                        <th className="category">충전량</th>
                                        <td className="content">400kW</td>
                                    </tr>
                                    <tr className="detailInfo">
                                        <th className="category">결제금액</th>
                                        <td className="content">33,000원</td>
                                    </tr>
                                    <tr className="detailInfo">
                                        <th className="category">결제수단</th>
                                        <td className="content">신한카드</td>
                                    </tr>
                                </table>
                            </div>
                            <div className="arrowIcon_up">
                                <a href="/"><img onClick={()=>viewDetail()} className="arrow_up" src={arrow_up} alt="arrow_up_icon"></img></a>
                            </div>

                        </div>

                    </div>

                </div>
                
            </div>  

        </Container>
        <Footer />
        </>
    );
};
export default InquriyCost;
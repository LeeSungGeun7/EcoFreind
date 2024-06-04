import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import AxiosApi from "../api/AxiosApi";
import { useAuth } from "../context/AuthContextProvider";
import cookies from 'react-cookies';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    /* border: solid 1px blue; */
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: white;
    
    h1{
        color: black;
    }

    .total{
        /* border: solid 1px red; */
        align-items: center;
        justify-content: center;
        width: 1000px;
        background-color: #FCFCFC;
        margin-top: 100px;
        margin-bottom: 100px;
        border-radius: 5%;
    }

    form{
        text-align: center;
        justify-content: center;
        align-items: center;
        color: white;
    }

    input[type="text"] {
        width:30%;
        padding: 10px;
        font-size: 11px;
        /* text-align: center; */
        border-radius: 10%;
    }

    label {
        position: relative;
        top: 50px;
        left: 200px;
        width: 80px;
        display: flex;
        margin: 20px;
        /* border: solid 1px; */
        justify-content: center;
        background-color: white;
        color: black;
        border-radius: 10%;
        font-weight: bold;
    }

    button[type="submit"] {
        padding: 5px 20px;
        font-size: 20px;
        margin-top: 30px;
        margin-bottom: 10px;
        text-align: center;
        background-color: #3b5998;
        color : white
    }
`;
const PaymentPage  = () => {    
    const [email,setEmail] = useState("");
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [credit, setCredit] = useState('');
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      // 입력된 결제 정보 유효성 검사
      if (cardNumber.trim() === '' || expirationDate.trim() === '' || cvc.trim() === '' || name.trim() === '' || price.trim() === '' ||  credit.trim() === '') {
        alert('결제 정보를 모두 입력해주세요.');
        return;
      }
      payOnclick();
  
      // 실제 결제 처리 로직을 추가
      //  결제가 완료되었다는 메시지를 출력
      // alert('결제가 완료되었습니다!');
    };

    const payOnclick = async () => {
      const rsp = await AxiosApi.insertCard(name, email, credit, cardNumber, expirationDate, cvc, price);
      if(rsp.data === true) {
        console.log(rsp.data); 
        alert('결제가 완료되었습니다!');
      } else console.log(rsp.data);
    };

    // 카카오페이 모듈 추가하고 카카오페이에 보내는 데이터가 post로 성공했을 경우 콜백함수로 payOnclikc 함수 불러올 예정.
    useEffect(() => {
      const getMyInfo = async() => {
          const rsp = await AxiosApi.getSession(cookies.load("sessionId"));
          if (rsp.status === 200) {
            console.log(rsp.data);
            if(rsp.data){    
              setEmail(rsp.data.custEmail);
            } 
          }
        }
      getMyInfo();
  }, []);


  
    return (
        
      <Container>
        <Header/>
        
        <div className="total">
        <h1 style={{textAlign:"center"}}>충전 정보 입력</h1>
        <form onSubmit={handleFormSubmit}>
          
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="이름"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <div>
            <label htmlFor="price">카드사</label>
            <input
              type="text"
              id="credit"
              name="credit"
              placeholder=" CREDIT"
              value={credit}
              onChange={(event) => setCredit(event.target.value)}
              required
            />
          </div>
            <label htmlFor="card-number">카드 번호</label>
            <input
              type="text"
              id="card-number"
              name="card-number"
              placeholder="카드 번호"
              value={cardNumber}
              onChange={(event) => setCardNumber(event.target.value)}
              required
            />
          <div>
            <label htmlFor="expiration-date">만료 날짜</label>
            <input
              type="text"
              id="expiration-date"
              name="expiration-date"
              placeholder="MM/YY"
              value={expirationDate}
              onChange={(event) => setExpirationDate(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="cvc">CVC</label>
            <input
              type="text"
              id="cvc"
              name="cvc"
              placeholder="CVC"
              value={cvc}
              onChange={(event) => setCvc(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="chargeprice">충전가격</label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="PRICE"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
          </div>
          
          <button type="submit">충전</button>
        </form>
        </div>
      <Footer/>
      </Container>
    );
  }
  
  export default PaymentPage;

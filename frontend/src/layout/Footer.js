import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserStore } from "../store/userState";
import { media } from "../styles/media";
import Modal from "../utils/Modal";


const Footerst = styled.footer`
    ${media.phone`
      display: none;
    `}
    display : flex;
    width: 100%;
    align-items: center;
    justify-content : center;
    font-size: 10px;
    border: solid 1px black;
    
    background-color: black;
    color : white;

    @import url('https://fonts.googleapis.com/css2?family=Foldit:wght@300&display=swap');

    footer{

        flex-direction: column;
        align-items: center;
        display: flex;
        justify-content: center;
    }
   
    .div1 a {
    color : white;
    margin-right: 20px;
    text-align: center;
    justify-content: center;
    cursor: pointer;
   }

   .div2 h2 {
    font-family: 'Foldit', cursive;
    font-size: 50px;
    left: 10px;
    position: relative;
    left: 10px;
    text-align: center;
    justify-content: center;
   }

   nav ul  {
    display : flex;
    padding: 15px;
    text-align: center;
    margin-left: 32px;
    justify-content: center;
   }


   h3 {
    font-size: 5px;
    margin-top: 5px;
    position: relative;
    text-align: center;
   }
   `;

   const MobileFooter = styled.div`
      display: none; 
      ${media.phone`
        display:flex;
        justify-content: space-evenly;
        align-items:center;
        width: 100vw;
        height: 70px;
        background-color: black;
      `}

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50px;
      }
   `
   const RouteBtn = styled.button`
      width: 70px;
      height: 40px;
      background-color: white;
      color : black;
      border-radius: 30px;
      border:none;
      &:hover {

      }
   `

      const Footer = () => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [modalContents, setModalContents] = useState("");
        const [modalTitle, setModalTitle] = useState("");
        const {isLogin, avatar} = useUserStore();
        const navi = useNavigate();
      

        const moveRoute = (route_path) => {
          navi(`/${route_path}`)
        }
      
        const handleCloseModal = () => {
          setIsModalOpen(false);
          setModalContents("");
        };
        return(
          <>
        <Footerst>
        <footer>
          <div className="div1">
            
          </div>
          <div className="div2">
            <h2>ECO FRIEND</h2>
          </div>
          <div className="addr">
            <h3>
              서울특별시 강남구 테헤란로14길 6 3층 &nbsp;&nbsp;&nbsp; Eco Friend
              대표전화 1588-0000
            </h3>
          </div>
        </footer>

          <Modal isOpen={isModalOpen} onClose={handleCloseModal} 
          contents={modalContents} title1={modalTitle} />
      </Footerst>
        <MobileFooter>
            <RouteBtn onClick={()=>{moveRoute('car')}}>car</RouteBtn>
            {
              isLogin ?
            <img onClick={()=>{moveRoute('mypage')}} className="avatar" src={avatar !== "" ? avatar :`/avatar.jpeg`}/>
            : 
            <RouteBtn onClick={()=>{moveRoute('login')}}>로그인</RouteBtn>
            }
            <RouteBtn >temp</RouteBtn>
        </MobileFooter>
      </>
        );
      };
    
  export default Footer;
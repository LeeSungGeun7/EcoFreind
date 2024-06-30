import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContextProvider";
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
        const {userdata , setUserData} = useAuth()
        const navi = useNavigate();
        const handleOpenModal = (index) => {
          setIsModalOpen(true);
          if (index === 0) {
            setModalContents("대표 홈페이지는 정보주체의 자유와 권리 보호를 위해 개인정보 보호법 및 관계 법령이 정한 바를 준수하여,적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 개인정보 보호법 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원할하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립.공개합니다.");
            setModalTitle("개인정보처리방침")
          } else if (index === 1) {
            setModalContents("본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며 이를 위반 시 정보통신망법에 의해 형사처벌 됨을 유념하시기 바랍니다. [게시일 2023년 05월11일]");
            setModalTitle("이메일무단수집거부")
          } else if (index === 2) {
            setModalContents("전기차 충전소 찾기 에코프렌즈에서 제공하는 모든 콘텐츠 즉, 웹 문서,첨부파일,DB정보 등은 저작권법에 의하여 보호받는 저작물로써, 별도의 저작권 표시 또는 다른 출처를 명시한 경우를 제외하고는 원칙적으로 에코프렌즈공사에 저작권이 있습니다.");
            setModalTitle("저작권정책");
          }
        };

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
              userdata.islogin ?
            <img onClick={()=>{moveRoute('mypage')}} className="avatar" src={userdata.avatar !== "" ? userdata.avatar :`/avatar.jpeg`}/>
            : 
            <RouteBtn onClick={()=>{moveRoute('login')}}>로그인</RouteBtn>
            }
            <RouteBtn >temp</RouteBtn>
        </MobileFooter>
      </>
        );
      };
    
  export default Footer;
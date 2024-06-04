import React, { useState,useContext,useEffect, useRef,useAuth } from "react";
import styled from "styled-components";
import vd from "../images/KakaoTalk_Video_2023-05-03-16-40-25.mp4";
import vd2 from "../images/KakaoTalk_Video_2023-05-03-16-40-25.mp4";
import vd3 from "../images/original-087fcdef6dd7e801b337d6dbdc8c0ba9.mp4";  
import CardSlider from "../Components/CardSlider";
import News from "../Components/News";
import {  useNavigate} from "react-router-dom"; 
import ImageSlider from "../Components/ImageSlider";
import { FaSearch } from 'react-icons/fa';
import CarSearch from "../pages/CarSearch";

import AxiosApi from "../api/AxiosApi";
import cookie from 'react-cookies'; 
import axios from "axios";




import MainBottom from "../Components/MainBottom";
import Mainitem from "./Mainitem";


const Mainst = styled.main`
  margin-bottom: 50px;
  width: 100vw;
  display: flex;
    justify-content:center;
    align-items:center;
  .top {
    //padding: 50px;
    display: flex;
    justify-content:center;
    align-items:center;
   // grid-column: 1 / 3;
    background-color: black;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 15px;
    width: 90.5%;
    height: 90vh;

    // border: solid 1px black;
  }
  .top video {
    object-fit: cover;
    width: 100%;
    border-radius: 15px;

  }
  
  .Homeinput {
    left: 50%;
    bottom: 70%;
		right:  50%; 
		transform: translate(-50%, -50%);
    position: absolute;
    width: 25%;

    width: 50%;
    height: 30px;
    margin: 10px auto;
    font-size: 15px;
    color: #222222;
    border: none;
  }
  .Homeinput button {
    width: 15%;
    color: white;

    border-top-right-radius: 25%;
    border-bottom-right-radius: 25%;
    background-color: #333333;
    border: none;
  }

  .Homeinput input {
    font-weight: bold;
    outline: none;
    padding-left: 20px;
    position: relative;
    border: 1px solid #F1F1F1;
    border-radius: 50px;
    width: 100%;
    height: 100%;
    right:0%;
  }
  .content {
    position: absolute;
    color: white;
    font-size: 50px;
    font-family:'Do Hyeon', sans-serif;
    top : 90%;
    left: 0;
  }
  .fa {
    color: #808080;
    position: absolute;
    display: flex;
  justify-content: space-between;
  position: absolute;

  bottom: 5px;  
  left: 90%;
  }
  .mainitem {
    border-radius: 15px;

   // border: solid 1px;
    width: 92.5%;
    height: 100vh;
    overflow: hidden;
  }

`;

const Main = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");


  const handleSubmit = () => {
    navigate(`/Car/${searchValue}`);
  };

  const inputEl = useRef(null);
  const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
      }
  
      const images = [
        { image: "https://i.pinimg.com/474x/d4/a4/46/d4a44668707dcd5e14dffff6d5436a44.jpg", text: '충전이 어려우시다구요?' },
        
        
        
      ];
     


  const [vdValue, setVdValue] = useState(vd3);
  const vdClick = () => {
    setVdValue(vd2);
    if (vdValue === vd2) {
      setVdValue(vd);
    }
  };



    

  return (
    <Mainst>
      <div className="top">
        <video
          src={vdValue}
          autoPlay
          muted
          loop
          width="100%"
          height="100%"
          controls={false}
        />
        <div className="Homeinput">
          <input type="text" className="input" ref={inputEl} value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} onKeyDown={handleKeyDown}/><FaSearch onClick={handleSubmit} className="fa"/>
          <div className="content">Find your<b style={{color:"#F5F278"}}>#Charge</b> </div>
        </div>
      </div>
   
    </Mainst>
  );
  };

export default Main;

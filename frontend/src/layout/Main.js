import React, { useState, useRef, useMemo, useCallback } from "react";
import styled from "styled-components";
import {  useNavigate} from "react-router-dom"; 
import { FaSearch } from 'react-icons/fa';
import Scrollanimation from "./Scrollanimation";
import { motion } from "framer-motion";
import { duration } from "@mui/material";





const MainWrapper = styled.main`
  display:flex;
  align-items:center;
  justify-content:center;
  background-color:  ${props => props.theme.colors.black2};
  transition: background-color 0.2s ease-in, color 0.2s ease-in;
  width: 100vw;
  height: 90vh;
  padding:40px;
`;

const Content = styled.main`
  display:flex; 
  flex-direction:column;
  align-items:center;
  justify-content:center;
  background-color:  ${props => props.theme.colors.blue};
  transition: background-color 0.2s ease-in, color 0.2s ease-in;
  width: 100vw;
  height: 1000vh;
`;


const TypeGraph = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  width: 40%;
  margin:30px;
  height: 50%;
  background-color: ${props => props.theme.colors.black2};
  color: ${props => props.theme.colors.blue};

  h1 {
    font-size: 50px;
    /* color: ${props => props.theme.colors.black1} */
  }
  .main_img {
    width: 320px;
    height: 400px;
  }
`

const Input = styled.input`
  width: 80%;
  padding: 10px;
  border-radius: 20px;
  border : 1px solid black;
`

const SearchBar = styled


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
  
     

const BottomUpTransition = useCallback(({children ,duration = 0.3 , delay ,...props}) => {
  return (
    <motion.div
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration , delay }}
    {...props}
    >
      {children}
    </motion.div>
  )
},[duration])



    

  return (
    <>
    <MainWrapper>
      <TypeGraph>
          <BottomUpTransition>
          <h1>Charge_Station</h1>
          </BottomUpTransition>
          
          <BottomUpTransition>
            <h1>Search </h1>   
          </BottomUpTransition> 
            <BottomUpTransition duration={0.5} delay={0.5}>
              <Input onChange={(e)=>{setSearchValue(e.target.value)}} onKeyDown={(e)=>{{handleKeyDown(e)}}}  />
            </BottomUpTransition>
      </TypeGraph>
      <TypeGraph>
          <BottomUpTransition duration={0.5} delay={0.5}>
            <img className="main_img" src={'/image/example2.png'} alt="" />
          </BottomUpTransition>
      </TypeGraph>
    </MainWrapper>
    <Content>
      

    </Content>
    </>
   
  );
  }
export default Main;

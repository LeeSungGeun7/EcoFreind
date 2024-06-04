import React from "react";


import styled , {css}from "styled-components";

import {Link, Route } from "react-router-dom";







const Loginst = styled.div`

display: flex;
align-items:center;
justify-content:center;
button {
min-width: 100% ;

  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 70%;
  font-size: 12px;
  cursor: pointer;
  

    #btn1 {
        font-size : 0.5rem;
        color : white;
        position : absolute;
        top : 30px;
        right : 100px;
        background-color: black;
        border-radius: 100%;
        border-width : 10px;
        padding : 15px 15px;
        border : none;
        box-shadow : 0 15px 35px rgba(0, 0, 0, 0.2);
        font-weight : 600;
        transition : 0.25s;
    }
    #btn1:hover{
        background : gray;
    }
    #btn2:hover{
        background : gray;
        
    }
    #btn2 {
        font-size : 0.5rem;
        color : white;
        position : absolute;
        top : 30px;
        right : 5px;
        background-color: black;
        border-radius: 100%;
        border-width : 10px;
        padding : 15px 15px;
        border : none;
        box-shadow : 0 15px 35px rgba(0, 0, 0, 0.2);
        font-weight : 600;
        transition : 0.25s;
    }


}
  button:hover {
    background-color: #0069d9;
  }
`;

const LoginBtn = (props) => {


    return(
        <Loginst>
            <div id="btn_group">
                <Link to= {props.Link}> 
                <button id = {props.type}>
                {props.name} </button>
                </Link> 
            </div>  
        </Loginst>
    

    );


}

export default LoginBtn;
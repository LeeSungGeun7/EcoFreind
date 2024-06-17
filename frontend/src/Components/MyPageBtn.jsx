import React from "react";
import { MdPerson} from "react-icons/md";
import {  useNavigate } from "react-router-dom";
import styled from "styled-components";



const MyPageBtnst = styled.div`
     display:flex ;
        justify-content : center;
        align-items: center;
    width: 30%;
    .person {
        display:flex ;
        justify-content : center;
        align-items: center;
        font-size: 20px;
        color: white;
        background-color:  black;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 100%;
       

        
    }
    


`;


const MyPageBtn = (props) => {
    const navigate = useNavigate();

    const navHandle = () => {
        navigate("/myPage");
    }
    return(
       <MyPageBtnst>
       <div onClick={navHandle} className="person">
        
        <MdPerson>
        </MdPerson>
        
        
       </div>
       </MyPageBtnst>  
    );

};

export default MyPageBtn;

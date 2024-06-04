import React, { useState , useEffect} from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import cookies from 'react-cookies';

const Questst = styled.div`
    height: 100vh;
    .quest {
        display : flex;
        flex-direction: column;
        height: 80%;
        justify-content: center;
        align-items:center;
    }
    textarea {
        background-color: beige;
        padding: 10px;
        height: 100%
        display:flex;
        justify-content: center;
        align-items:center;
        font-family:'Do Hyeon', sans-serif;
        font-size: 30px;
        border: 1px solid;
        border-radius: 15px;
    }
    textarea::placeholder{
        font-size: 1.5em;  
    }
    .title input {
        border:none;
        margin:10px;
        display:flex;
        text-align: center;
        justify-content: center;
        align-items:center;
        height:30px;
       border-bottom: 1px solid;
       
        width: 90%;
    }
    .content {
        overflow: scroll;
        border : 1px solid ;
    }
    .content-items {
        margin:30px;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        overflow: scroll;
        background-color: lightblue;
    }
    .content-title {
        
        width:100%;
        text-align: center;
        background-color: white;
    }
    .content-writer {
        font-size: 10px;
    }
  
`;

const Answer = () => {
    async function fetchUnanswered() {
        const response = await AxiosApi.getUnAnswered();
        setData(response);
      }
    
    const[answer,setAnswer] = useState("");
    const [title,setTitle] = useState("");
    const [content, setContent] = useState("");
    const [email,setEmail] = useState("");

    const [data,setData] = useState([]);

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
        fetchUnanswered();
        getMyInfo();
      },[])

    return(
        <>
         <Header></Header>
        <Questst>
       

      
        <div className="quest">

            
            <div className="content">
                {data && 
                data.map((data,key) => 
                <div key={key} className="content-items"> 
                         <div className="content-title">{data.inqTitle}</div> 
                         <div  className="content-content">{data.inqContent}</div> 
                         <p className="content-writer">[{data.inqNo}] {data.email} </p>
                         <input onChange={(e)=>{setAnswer(e.target.value)} } type="text" />
                         <button onClick={()=>{AxiosApi.postAnswer(data.inqNo,answer)}}>답변하기</button>
                 </div>

                )
                }
                
            </div>

        </div>
         <button onClick={()=>{AxiosApi.getInQuire(email)}}>문의내역조회</button>

        </Questst>
        <Footer/>
        </>
    )


}

export default Answer;
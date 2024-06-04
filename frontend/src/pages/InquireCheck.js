
import React, { useState , useEffect} from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useNavigate } from 'react-router-dom';
import cookies from 'react-cookies';
import { AiFillAliwangwang } from "react-icons/ai";
import { InquireModal } from "../utils/InquireModal";

const InquireCheckst = styled.div`
    height: 100vh;
    font-family: 'Do Hyeon', sans-serif;
    .container {
        height:100%;
        width: 100%;
        display:flex;
        justify-content:flex-start;
        flex-direction:row;
        align-items:center;
    }
    .list {
        height:100%;
       // border:1px solid;
        overflow: scroll;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        align-items:center;
        flex:3;
        font-size: 20px;
    }
    .card {
        flex:1;
    }
    .inquire {
        height:100%;
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        align-items:center;
        flex:1;
    }

    .content-items {
      //  border:1px solid;
        width: 100%;
        height: 70%;
        margin:10px;


    }
    .content-group {

        margin: 30px;
      //  border-top: 1px solid #FFFFF1;
        width: 100%;
        height: auto;
      //  border: 1px solid;
    }
    .question , .answer {
        padding:10px;
        width: 70%;
        border-radius:20px;
       // border: 1px solid;
       border:1px;
       text-align:center;
    }
    .question {
        margin:10px;
        background-color: #F5F051;
        height: 100px;
        display: inline-block;
        height: auto;
      //  border-radius: 5px;
      //  border-color:#F4FAF7;
        width: 70%;

    }
    .answer {
       // margin:10px;
        position:relative;
        left: 20%;
        display: inline-block;
        height: auto;
      //  border-radius: 5px;
        background-color: #EDF6F9;
        width: 70%;
        padding: 10px;
        border:none;
    }
    .content-title {
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .chatbar {
        
        margin: 30px;
        text-align:center;
        position: relative;
    }
    .chatbar button {
        position: absolute;
        left:88%;
        bottom: 5%;
        border:none;
        background-color: white;
        border-radius: 15px;
        color:black;
    }
    .chatbar textarea {
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: #EFF2F3;
        resize:none;
    }
    .chatbar input {
        border: solid 1px #EFF2F3;
        border-radius: 30px;

    }
`;

const InquireCheck = () => {
    const [modalOpen,setModalOpen] = useState(false);
    const [modalContent,setModalContent] = useState("");

    const [title,setTitle] = useState("");
    const [content, setContent] = useState("");
    const [email,setEmail] = useState("");
   

    const isFormComplete = () => {
        return title.length > 2 && content.length > 10;
    }

    const handleClick = (movie) => {
        setModalOpen(true);
    }

    const handleClick2 = (movie) => {
        setModalOpen(false);
    }


    
  
    const [data,setData] = useState([]); 
    const [memberData,setMemberData] = useState([]);
    
    async function getInQuire(email) {
        const response = await AxiosApi.getInQuire(email);
        setData(response);
        console.log(response);
      }

    useEffect(() => { 
        const getMyInfo = async() => {
          const rsp = await AxiosApi.getSession(cookies.load("sessionId"));
          if (rsp.status === 200) {
            console.log(rsp.data);
               if(rsp.data){
                setMemberData(rsp.data);
                setEmail(rsp.data.custEmail);
               }
               
          }
        } 
       
        getMyInfo();
        
      },[])

      useEffect(() => {
        if(memberData.custEmail) getInQuire(memberData.custEmail);
    }, [memberData.custEmail]);

   

    return(
        <>
        <Header/>
        <InquireCheckst>
         
        
        <InquireModal modalOpen={modalOpen} handleClose={handleClick2}>
                <p>{modalContent}</p>
        </InquireModal>

           
        <div className="container">
            <div className="inquire"> 
                <h4>나의 문의내역</h4> 
    
            </div>

            <div className="list">
                {!data && <h2>내역이 없습니다.</h2>}
                {data && 
                data.map((data,key) => 
                <div key={key} className="content-items"> 
                         <div className="content-group">
                               <div className="question">
                                    <b className="content-title">{data.inqTitle}</b>
                                    <div  className="content-content">{data.inqContent}</div> 
                                 </div> 
                             { data.answerContent &&  
                             <div>
                                <div className="emoji"><AiFillAliwangwang/></div>
                                <div className="answer">{data.answerContent}</div> 
                             </div>          
                            }
                         </div> 
                        
                 </div>
                )
                }
                <div className="chatbar" style={{width:"100%"}}>문의하기
                    <input onChange={(e)=> setTitle(e.target.value)} style={{width:"95%",height:"30px",borderRadius:"5px"}} type="text" placeholder="2글자이상 입력"/>
                    <textarea onChange={(e)=> setContent(e.target.value)} style={{width:"95%"}} name="" id="" cols="30" rows="10" placeholder="11글자 이상 입력"></textarea>
                    <button  style={{color: isFormComplete() ? "black" : "silver" }} disabled={!isFormComplete()} onClick={async()=>
                          {
                            try {
                              const rsp =  await AxiosApi.inQuire(email,title,content); 
                              if(rsp.status === 200){
                             
                                setModalContent("정상적으로 보내졌습니다!!");
                                handleClick();
                              } else {

                                setModalContent("보내지지 않았습니다.");
                                handleClick();
                              }
                            } catch (error) {
                              console.error(error);
                              setModalContent("오류가 발생했습니다.");
                            }
                          }}>SEND</button>
                </div>
            </div>

            <div className="card">
                <div>고객센터 바로가기</div>
            </div>
            </div>     
        
        <Footer/>
        </InquireCheckst>
        </>
    )


}

export default InquireCheck;
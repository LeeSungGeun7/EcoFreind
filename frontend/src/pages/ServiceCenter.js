import React, { useEffect, useRef, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { BsEmojiSunglasses  } from "react-icons/bs";
import { HiOutlineEmojiSad } from "react-icons/hi";

import { elapsedTime } from "../utils/time";
import { chatApi } from "../api/chat";
import { userApi } from "../api/user";


const center = `
    display:flex;
    justify-content: space-evenly;
    align-items: center;
`

const Message = styled.div`
    display:flex;
    ${center};
    flex-direction: ${props => props.role  ? 'row':"row-reverse"};
    
    width: 100%;
    white-space: normal;
    .content {
     background-color :  ${props => props.role  ? '#F9F871':"white"};
     width: 80%;   
     margin : 15px;
     padding: 8px;
     ${center}
     flex-wrap: wrap;
     border-radius : 10px;   
     white-space : normal; 
     height: auto; 
     min-height: 50px; 
    }
   

    .time {
        ${center}
        margin:5px;
    }

    .user-name {
        position: relative;
        ${center}
        flex-direction:column;
        border-radius: 30px;
        width: 80px;
        height: 40px;
        background-color :  ${props => props.role  ? '#F9F871':"white"};
    }
`


const Container = styled.div`
    weight : 100vw;
    height: 100vh;
    ${center}
    flex-direction: column;
    background-color : #00D2FC;

    .title {
        height: 20px;
        color : white;
        font-size: 30px;
        margin : 30px;
    }
    .body {
        overflow: scroll;
        background-color: none;
        width: 80%;
        height: 80%;
    }


    .send {
        display:flex;
        width: 80%;
        height: 50px;
        border-radius: 30px;
        input , button  {
            border:none;
            padding:10px;
            border-radius: 15px;;
            width: 80%;
        }
        button {
            margin: 10px;
            color: white;
            background-color : black ;
            width: 20%;
        }
    }



    .user {
        display:flex;
        flex-direction: row;
        button {
            margin:20px;
            border : none ; 
            border-radius : 50px;
            background-color : white;
            height: 50px;

            &:hover {
                color:white;
                background-color: black;
            }
        }
    }
`




// 고유 ID 충전소 실시간 채팅방 
// 충전 상태 , 소통
// 

const ServiceCenter = () => {
    const { id , name } = useParams();
    
    const [currentUser , setCurrentUser] = useState({
        name : "ff" ,
        id : 0 , 
    })
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [connected, setConnected] = useState(false);
    const ws = useRef(null);

    const getChatMessage = async () => {
        const res = await chatApi.getMessages(id)
        if (res.status === 200) {
            setMessages(res.data)
        }
    }
    const getUserData = async () => {
        const res = await userApi.getCustomerInfo()
        if (res.status ===200 ) {
            setCurrentUser({...currentUser , name : res.data.name , id : res.data.id})
            return true
        }
    }

    useEffect(() => {
        getChatMessage();
        getUserData();


        const socket = new WebSocket(`wss://backend-deno-sjdz3b63yq-du.a.run.app/ws/${id}`);
        
        socket.onopen = () => {
          console.log('WebSocket connected');
          setConnected(true);
        };
    
        socket.onmessage = (event) => {
          const message = event.data;
          const r = message.split(',')
          setMessages(prev => [...prev, {message : r[1] , user : {name : r[2] },created_at : new Date() }  ]);
        
        };
        
        socket.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
    
        socket.onclose = () => {
          console.log('WebSocket disconnected');
          setConnected(false);
        };
        
        ws.current = socket;
    
        return () => {
          socket.close();
        };
    
      }, []);
    
    const sendMessage = (e) => {
        e.preventDefault();
        if (inputText && ws.current.readyState === WebSocket.OPEN) {
            const messageData = `${currentUser.id}|${inputText}|${currentUser.name}`;
            ws.current.send(messageData);
          setInputText('');
        }
    }; 
    

    const sendTemp = (type) => {
        setInputText(type === 1 ? '이용 가능해요' : '이용이 안되요')
        if (inputText && ws.current.readyState === WebSocket.OPEN) {
            const messageData = `${currentUser.id}|${inputText}|${currentUser.name}`;
            ws.current.send(messageData);
          setInputText('');
        }
    }
    

// id , message , user , created_at
    return(
        <>
        <Header/>
            <Container>
                <div className="title">{name}</div>
                <p>참여자 : {currentUser.id}</p>
                <div className="body"> 
                {
                    messages.map((item,idx)=>{
                        return(
                            <Message role={item.user.name === currentUser.name}  key={idx}>
                                <div className="content">{item.message}</div>
                                <div className="avatar">
                                    <div className="user-name">{item.user.name ? item.user.name : item}</div>
                                    <div className="time">{elapsedTime(item.created_at)}</div>  
                                </div>

                            </Message>
                        )
                    })
                }
                </div>
                <div className="send">
                    <input onKeyPress={(e)=>{if(e.key==="Enter"){sendMessage(e)}}} onChange={(e)=>{setInputText(e.target.value)}} value={inputText} type="text" />
                    <button onClick={(e)=>{sendMessage(e)}}>SEND</button>
                </div>
                <div className="user">
                    <div>
                        <BsEmojiSunglasses/>
                        <button onClick={()=>{sendTemp(1)}}>이용 가능해요</button>
                    </div>
                    <div>
                        <HiOutlineEmojiSad/>
                        <button onClick={()=>{sendTemp(2)}}>이용이 안되요</button>
                    </div>
                </div>
            </Container>
        <Footer/>
        </>
    );
}

export default ServiceCenter;
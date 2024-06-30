import React, { useEffect, useRef, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsEmojiSunglasses  } from "react-icons/bs";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { elapsedTime } from "../utils/time";
import { chatApi } from "../api/chat";
import { userApi } from "../api/user";


const center = `
    display:flex;
    align-items: center;
`

const Message = styled.div`
    display:flex;
    ${center};
    flex-direction: ${props => props.role  ? 'row':"row-reverse"};
    justify-content: ${props => props.role  ? 'end':"start"};
    width: 100%;
    white-space : normal; 
    .content {
     background-color :  ${props => props.role  ? '#00A3FF':"#EEF4FD"};
     
     min-width: 200px; 
     width: auto;  
     margin : 15px;
     padding: 8px;
     ${center}
     justify-content:center;
     display:flex;
     flex-wrap: wrap;
     border-radius : 10px;   
     white-space : normal; 
     word-break:break-all;
     color : ${props => props.role  ? 'white':"black"};
     min-height: 40px; 
     height: auto; 
    }
    
   
    .avatar_img {
        border-radius: 50px;
        width: 4rem;
        height: 4rem;
    }

    .time {
        ${center}
        margin:5px;
        font-size:10px;
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
    background-color : white;
    position:relative;
    .back-btn {
        position: absolute;
        top: 7%;
        left: 10%;
        transform: translate(-50%, -50%);
        padding:5px;
        /* left:10%;
        top: 12%; */
        width: 50px;
        height: 50px;
    }

    .title {
        height: 20px;
        color : black;
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
            margin-top : 10px;
            border-radius: 15px;;
            width: 80%;
            background-color: #E1E8F1;
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
    const location = useLocation();
    const navigate = useNavigate();
    const [currentUser , setCurrentUser] = useState({
        name : "ff" ,
        id : 0 , 
        avatar : ''
    })
    const [messages, setMessages] = useState([]);

    const [inputText, setInputText] = useState('');
    const [connected, setConnected] = useState(false);
    const ws = useRef(null);

    
    const [msg , setMsg] = useState({})
    const getChatMessage = async () => {
        const res = await chatApi.getMessages(id)
        if (res.status === 200) {
            setMessages(res.data)
            const newMsg = { ...msg };
            res.data.forEach(e => {
              const userId = e.user.id;
              newMsg[userId] = e.avatar;
            });
            setMsg(newMsg);
            
        }
    }
    const getUserData = async () => {
        const res = await userApi.getCustomerInfo()
        if (res.status ===200 ) {
            setCurrentUser({...currentUser , name : res.data.name , id : res.data.id , avatar: res.data.avatar})
            return true
        }
    }
    
    useEffect(() => {
        getChatMessage();
        getUserData();
        const socket = new WebSocket(`wss://backend-deno-sjdz3b63yq-du.a.run.app/ws/${id}`);
        socket.onopen = () => {
          setConnected(true);
        };
        socket.onmessage = (event) => {
          const message = event.data;
          const r = message.split(',')
          setMessages(prev => [...prev, {message : r[1] , user : {name : r[2] , id : r[0]},created_at : new Date() }  ]);   
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
          alert(JSON.stringify(messages))
        }
        
    }; 
    

    const SendClickMessage = (type) => {
        setInputText(type)
        if (inputText && ws.current.readyState === WebSocket.OPEN) {
            const messageData = `${currentUser.id}|${inputText}|${currentUser.name}`;
            ws.current.send(messageData);
          setInputText('');
        }
    }

    useEffect(()=>{
        return () => {
            setTimeout(()=>{
                localStorage.removeItem('storedData')
                localStorage.removeItem('scrollItem')
            },[1000])
        }
    },[])

    const chatRef = useRef(null);
    useEffect(()=>{
        scrollToBottom();
    },[messages])
    const scrollToBottom = () => {
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    };
    
    

    // 채팅방 입장시 해당 채팅기록을 가져옴 user들의 프로필사진을 
    // 객체 오브젝트에
    // {key : userId  value : imgUrl }
    // 이런식으로 저장하고 
    // 메세지마다 프로필 사진 이미지 src 는 key 값의 value로 설정

    return(
        <>
        <Header/>
            <Container>
                <IoMdArrowRoundBack className="back-btn" onClick={()=>{navigate(-1)}}>{'<'}</IoMdArrowRoundBack>
                <div className="title">{name}</div>
                <div className="body" ref={chatRef}> 
                {
                    messages.map((item,idx)=>{
                        return(
                            <Message role={item.user.name === currentUser.name}  key={idx}>
                                <div className="content">
                                    <div>
                                        {item.message}
                                    </div>

                                </div>

                                <div className="avatar">
                                <img className="avatar_img" src={msg[item.user.id]}/>
                                <div className="time">{elapsedTime(item.created_at)}</div>  
                                </div>
                                {/* <div className="avatar">
                                    <div className="user-name">{item.user.name ? item.user.name : item}</div>
                                    <div className="time">{elapsedTime(item.created_at)}</div>  
                                </div> */}
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
                        <button onClick={()=>{SendClickMessage('이용 가능해요')}}>이용 가능해요</button>
                    </div>
                    <div>
                        <HiOutlineEmojiSad/>
                        <button onClick={()=>{SendClickMessage('이용이 안되요')}}>이용이 안되요</button>
                    </div>
                </div>
            </Container>
        {/* <Footer/> */}
        </>
    );
}

export default ServiceCenter;
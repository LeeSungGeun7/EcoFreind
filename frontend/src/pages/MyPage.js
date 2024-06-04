import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link, useParams } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import cookies from 'react-cookies';
import { FaStar } from "react-icons/fa";

import DataModal from "../Components/DataModal";
import { FaCaretDown ,FaCaretUp} from "react-icons/fa";
import { z } from 'zod';

const center = `
display: flex;
align-items: center;
justify-content: center;
`


const Container = styled.div`
    position:relative;
    font-family:'Do Hyeon', sans-serif;
    font-size: 1.5rem;
    ${center}
    flex-direction:column;
    background-color: #DCDCDC;
    min-height: 100vh;
    height: auto;
    width: 100vw;
`;

const SideBar = styled.div`
    ${center} 
    justify-content:space-evenly;
    @media (min-width: 1000px) {
    width: 50%;
}
    width : 100% ; 
    height: 8% ;
    //30
    background-color: black;
    .logo {
        ${center}
        height: 30%;
        width: 20%;
        color: skyblue;
    }
    .menu {
        ${center}
        justify-content:space-evenly;
        height: 100%;
        //30
        width: 100%;
        background-color:skyblue;
        font-size: 1rem;
        
        div {
            /* border-top-left-radius: 10px;
            border-top-right-radius: 10px; */
            background-color:black;
            color: white;
            width: 34%;
            height: 50px;
            ${center}
        }
    }

`

const Main = styled.div`
    ${center}
    width: 100%;
    height: 70%;
    background-color: #DCDCDC;


    @media (min-width: 1000px) {
    width: 50%;
    height: 50%;
    }

    form {
        min-height : 500px;
        background-color: white;
        width : 100%;
        ${center}
        flex-direction: column;
        input {
            border : none ;
            background-color: black;
            border-radius: 30px;
            width: 200px;
            height: 50px;
            color: white;
            font-size:30px;
            text-align:center;
        }
        button {
            border : none ; 
            background-color: skyblue;
            border-radius: 10px;
            width: 40px;
            height: 30px;
            margin: 10px;
            color: white;
        }
        div {
            ${center}
        }
    }
`

const MyInfo = styled.div`
    ${center}
    flex-direction: column;
    justify-content:start;
    align-items:start;
    width: 100%;
    height: auto;
    overflow-y: scroll;
    background-color:none;
    box-shadow : 1px 1px silver;


   
`

const Infodetail = styled.div`
    ${center}
    justify-content:space-evenly;
    width: 100%;
    height: 200px;
    background-color: white ;
    flex-direction: column;
    font-size: 15px;
`


const Item = styled.div`
    width: 100%;
    display:flex;
    justify-content:space-evenly;
    flex-direction: row;
    align-items:center;
    .name {
        ${center}
        background-color:none;
        width: 50%;
        height: 80px;
        font-size: 19px;
        border-left : 0.2px solid white;
    }
    .content {
        font-size: 15px;
        ${center}
        //border : 0.05px solid silver;
        background-color:none;
        width: 50%;
        white-space : normal;
    }
    .btn {
        font-size: 10px;
        ${center}
        height:30px;
        width: 50%;
        cursor : pointer;
    }
`



const MyInfoItem = ({on , favdata , setFavData , name , content , data}) => {

    const handleFav = (id , type ) => {
    const newD = favdata.map((e) => {
        if (e.id === id) {
            return { ...e, isClick: type ? true : false  }; // 기존 객체를 복사하고 isClick 속성을 true로 설정
        }
        return e; // 조건에 맞지 않는 객체는 그대로 반환
    });
    setFavData(newD);
    }
    return (

            <Item key={data&& data.id} >
                <div className="name">
                    {name}
                </div>
                <div className="content">
                    {content}
                </div>

                {on && data && data.isClick &&
                <FaCaretUp onClick={()=>{handleFav(data.id,false)}} className="btn"> </FaCaretUp> 
                }
                {on && data && !data.isClick &&
                <FaCaretDown onClick={()=>{handleFav(data.id,true)}} className="btn"> </FaCaretDown> 
                }
                
            </Item>
    )
}

const passwordSchema = z.string().min(5).max(30)



const Mypage = () => {
    const [password ,setPassword] = useState("");

    const handelFav = async (id) => { {
        const res = await AxiosApi.delwishStation(id);
        if (res && res === true) {
            const data = favdata.filter((e)=> e.id !== id)
            setFavData(data);
        }
    }
    }
    const isRightPassword = async () => {
        const res = await AxiosApi.isRightPassword(password)
        if (res.status === 200 && res.data ) {
            setHidden(true);
        } else {
            alert("틀립니다.")
        }
    }
    
    const [menu , setMenu] = useState(3)
    const [userdata,setUserData] = useState({})
    const [favdata,setFavData] = useState([])

    const fetchData = async () => {
        const res = await AxiosApi.getCustomerInfo()
        if (res.status === 200) {
            setUserData(res.data)
            console.log(res);
        }
    }

    const fetchFav = async () => {
        const res = await AxiosApi.getWishStation()
        if (res.status === 200) {
            setFavData([...res.data, {isClick:false}])
        }
    } 

    useEffect(()=>{
        fetchData();
        fetchFav();
    },[])

    const [hidden, setHidden] = useState(false) ; 

    return(

        <>
        
        <Header overlap={false}/>
        <Container>
            <SideBar>
                {/* <div className="logo">MY</div> */}
                <div className="menu">
                    <div  onClick={()=>{setMenu(1)}}> 내 정보</div>
                    <div  onClick={()=>{setMenu(2)}}> 관심충전소</div>
                    <div  onClick={()=>{setMenu(3)}}> 정보수정</div>
                </div>
            </SideBar>
            <Main>
                    
                    {
                        menu == 1 &&
                    <MyInfo >
                         <MyInfoItem on={false} key={1} name="이름" content={userdata.name}/> 
                         <MyInfoItem key={2} name="성별" content={userdata.gender == 'M' ? "남자" : "여자"}/> 
                         <MyInfoItem key={3} name="주소" content={userdata.addr}/> 
                         <MyInfoItem key={4} name="핸드폰" content={userdata.phone}/> 
                         <MyInfoItem key={5} name="가입일" content={userdata.created_at}/> 
                    </MyInfo>
                    }
                    {
                        menu == 2 && 
                        <MyInfo >
                            {
                                favdata.map((item,idx)=>{
                                    return(
                                        <>
                                        <MyInfoItem on={true} favdata={favdata} setFavData={setFavData} data={item}  key={idx} name={<FaStar onClick={()=>{handelFav(item.id)}} style={{color: "skyblue" }}/>} content={item.station_name}/>
                                            {
                                            item.isClick &&
                                            <Infodetail>
                                                <div>
                                                주소 : {item.address}
                                                </div>
                                                <div>
                                                운영기관 : {item.operator_minor} | {item.facility_type_major} | {item.facility_type_minor}
                                                </div>
                                                <div>
                                                    타입 : {item.charger_type}
                                                </div>
                                                <div>
                                                    {item.user_restriction}
                                                </div>

                                            </Infodetail>
                                            }
                                        </>
                                    )
                                })
                            }
                        </MyInfo>
                    }

                    {
                        menu == 3 && !hidden && 
                        <form action="">
                            <div>비밀번호 확인</div>
                            <div>
                                <input onChange={(e)=>{setPassword(e.target.value)}} name={"password"} maxLength={20} type="password" />
                            </div>
                            <button type="button" onClick={()=>{isRightPassword()}}>확인</button>
                        </form>
                    }

                    {
                        menu == 3 && hidden && 
                        <form action="">

                            ddsss
                        </form>
                    }
                    
            </Main>
        </Container>
        <Footer />
        </>
    );
};
export default Mypage;
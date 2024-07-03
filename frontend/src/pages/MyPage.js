import React, { Suspense, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { FaStar } from "react-icons/fa";
import { FaCaretDown ,FaCaretUp} from "react-icons/fa";
import { z } from 'zod';
import { chargerApi } from "../api/charger";
import { userApi } from "../api/user";
import { BsPencilSquare } from "react-icons/bs";
import SkeletonLoader, { SkeletonRow } from "../Components/SkeletonLoader";
import LoadingSquare from "../Components/LoadingSquare";
import { useAuth } from "../context/AuthContextProvider";

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
    background-color:  ${props => props.theme.colors.black2};
    min-height: auto;
    width: 100vw;

    .loading {
        height: 80vh;
        width: 100vw;
    }
`;


const Avatar = styled.div`
    ${center}
    width : 100%;
    height: 100px;
    margin: 30px;
    img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
    }
    .avatar_group {
        position: relative;
    }
    .modify {
        color: ${props => props.theme.colors.white};
        font-size: 1rem;
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
`


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
        width: 100%;
        font-size: 1rem;
        
        div {
            /* border-top-left-radius: 10px;
            border-top-right-radius: 10px; */
            /* background-color: #0AD1F8; */
            background-color:  ${props => props.theme.colors.black1};
            color: white;
            width: 34%;
            height: 50px;
            ${center}
        }

        .active {
            color : ${props => props.theme.colors.blue};
        }
    }

`

const Main = styled.div`
    ${center}
    width: 100%;
    height: 70%;
    background-color:  ${props => props.theme.colors.black2};
    color : ${props => props.theme.colors.white};


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
            background-color:  skyblue;
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
    //box-shadow : 1px 1px silver;   
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



const MyInfoItem = ({on ,keys, favdata , setFavData , name , content , data}) => {

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

            <Item key={keys} >
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


const ImgForm = ({avatar}) => {
    const imgRef = useRef(null)
    const [selectedImage , setSelectedImage] = useState(avatar ? avatar : "/avatar.jpeg");
    const { setUserData } = useAuth()
    useEffect(()=>{
        setSelectedImage(avatar)
    },[avatar])

    const handleSelectIamge = () => {
        imgRef.current.click()
    }

    const handleChangeImage = async (e) => {
        if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]
        const read = new FileReader();
        read.readAsDataURL(file);
        
        const form = new FormData()
        form.append('file' , file , file.name)

            read.onload = () => {
                setSelectedImage(read.result)
            }
            const res = await userApi.getcloudImageURL(form)
            if (res === true) {
                alert('프로필 사진이 변경되었습니다.')
                setUserData(prev => ({...prev , avatar: selectedImage}))
            } else {
                alert('프로필 사진 변경 실패하였습니다.')
            }
    }   
    }

    
    return (
        <>
        <form className="avatar_group">
            <Suspense fallback={<SkeletonLoader/>}>
            <img onClick={(e)=>{handleSelectIamge(e)}} src={selectedImage} alt=""/>
            </Suspense>
            <input accept="image/*"  onChange={handleChangeImage} ref={imgRef} hidden type="file" name="" id="" />
            <BsPencilSquare className="modify"></BsPencilSquare>
        </form>
        </>
    )
}



const Mypage = () => {
    const [password ,setPassword] = useState("");

    const handelFav = async (id) => { {
        const res = await chargerApi.delwishStation(id);
        if (res && res === true) {
            const data = favdata.filter((e)=> e.id !== id)
            setFavData(data);
        }
    }
    }
    const isRightPassword = async () => {
        const res = await userApi.isRightPassword(password)
        if (res.status === 200 && res.data ) {
            setHidden(true);
        } else {
            alert("틀립니다.")
        }
    }
    
    const [menu , setMenu] = useState(2)
    const [userdata,setUserData] = useState({})
    const [favdata,setFavData] = useState([])
    const [loading , setLoading] = useState(false)

    const fetchData = async () => {
        const res = await userApi.getCustomerInfo()
        if (res.status === 200) {
            setUserData(res.data)
        }
    }

    const fetchFav = async () => {
        const res = await chargerApi.getWishStation()
        if (res.status === 200) {
            setFavData([...res.data, {isClick:false}])
        }
    } 

    useEffect(()=>{
        // fetchData();
        // fetchFav();
        const loadData = async () => {
            setLoading(true);
            try {
              await Promise.all([fetchData(), fetchFav()]);
            } catch (error) {
              console.error("Error loading data:", error);
              // 에러 처리 로직 추가
            } finally {
              setLoading(false);
            }
          };
        
          loadData();
    },[])

    const [hidden, setHidden] = useState(false) ; 

    return(

        <>
        <Header overlap={false}/>
        <Container>
            <Avatar>
                {loading ? 
                <LoadingSquare/>
                :
                <ImgForm avatar={userdata.avatar}/>
                }
                
            </Avatar>
            <SideBar>
                <div className="menu">
                    <div className={`${menu === 1 && 'active'}`} onClick={()=>{setMenu(1)}}> 내 정보</div>
                    <div className={`${menu === 2 && 'active'}`} onClick={()=>{setMenu(2)}}> 관심충전소</div>
                    <div className={`${menu === 3 && 'active'}`} onClick={()=>{setMenu(3)}}> 정보수정</div>
                </div>
            </SideBar>
            <Main>
                    
                    {
                        menu === 1 &&
                    <MyInfo >
                         <MyInfoItem on={false} key={1} name="이름" content={userdata.name}/> 
                         <MyInfoItem key={2} name="성별" content={userdata.gender === 'M' ? "남자" : "여자"}/> 
                         <MyInfoItem key={3} name="주소" content={userdata.addr}/> 
                         <MyInfoItem key={4} name="핸드폰" content={userdata.phone}/> 
                         <MyInfoItem key={5} name="가입일" content={userdata.created_at}/> 
                    </MyInfo>
                    }
                    {
                        menu === 2 && 
                        
                        <MyInfo >

                            {
                                 loading ? <SkeletonRow className="loading"/>:

                                favdata.map((item,idx)=>{
                                    if (idx === favdata.length - 1 && !item.station_name) {
                                        return null; 
                                      }
                                    return(
                                        <>
                                        <MyInfoItem on={true} favdata={favdata} setFavData={setFavData} data={item}  keys={item.id} name={<FaStar onClick={()=>{handelFav(item.id)}} style={{color: "#FCE205" }}/>} content={item.station_name}/>
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
                        menu === 3 && !hidden && 
                        <form action="">
                            <div>비밀번호 확인</div>
                            <div>
                                <input onChange={(e)=>{setPassword(e.target.value)}} name={"password"} maxLength={20} type="password" />
                            </div>
                            <button type="button" onClick={()=>{isRightPassword()}}>확인</button>
                        </form>
                    }

                    {
                        menu === 3 && hidden && 
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
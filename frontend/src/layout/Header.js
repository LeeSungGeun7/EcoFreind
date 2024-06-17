
import React  from "react";
import styled  from "styled-components";
import { useNavigate} from "react-router-dom"; 
import MyPageBtn from "../Components/MyPageBtn";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContextProvider";
import { authApi } from "../api/auth";

const center = `
display:flex;
justify-content: center;
align-items:center;`

const Container = styled.div`
    display:flex;
    justify-content: space-evenly;
    align-items:center;
    flex-direction: row;
    height: 80px;
    width: 100%;
    font-family: 'Do Hyeon', sans-serif;
    color:#333333;    


    .logo {
        font-size: 2rem;

    }
    @media all and (max-width:407px) {
        .logo {
            font-size: 1rem;
        }
    }

`   
;


const Menu = styled.div`
    position : relative;
    width: 33%;
    ${center}      

    .menu-list {
        z-index : 10;
        border-radius : 15px;
        position: absolute;
        height: ${props => props.height};
        width: 100px;
        background-color: #04BADE;
        top : ${props => props.top};
        display : none;
    }
  
    &:hover .menu-list {

        ${center}
        justify-content : space-evenly;
        flex-direction: column;
    }

    button {
        border: none;
        border-radius: 15px;
        background-color: black ;
        color:white;
        height: 50px;
        width: 80px;
    }
`;






const MenuItem = ({name, addr}) => {
    const navigate = useNavigate();
    return(
        <div onClick={()=>{navigate(`/${addr}`)}}>
            {name}
        </div>
    )
}



const Header = (props) => {
    const navigate = useNavigate();

    const {userdata , setUserData} = useAuth()

    const handleLogout = async () => {
       const res =  await authApi.logout()
       if (res.status === 200) {
          localStorage.removeItem('session_id')
          setUserData({...userdata, islogin:false , email: ''})  
       }
    }
    
// 최초로그인 로컬스토리지에 세션아이디 저장 
// 로그아웃시 서버에서 세션제거


const isExist = async () => {
    const session_ = localStorage.getItem('session_id');
    if (!session_) return
    const parsedData = JSON.parse(session_);
    const session = parsedData.session_id;
    console.log(session)
    if (session_ && session && session !== undefined) {
      try {
        const res = await authApi.isExist(session);
        if (res.data === true) {
          setUserData({...userdata,islogin:true})  
        } else {
            localStorage.removeItem('session_id')
            setUserData({...userdata,islogin:false})  
        }
      } catch (error) {
        console.error("오류 발생:", error);
      }
    } else {
      alert("세션 정보가 없음");
    }
  };


useEffect(()=>{

    isExist();
},[])    


    
    return(
        <Container overlap={props.overlap} > 

            <Menu height={"100px"} top={'20px'}>
                Menu
                <div className="menu-list">
                    <MenuItem addr={"car"} name={"전기차 충전소"}  />
                    <MenuItem addr={"pay"} name={"페이먼츠"}  />
                    <MenuItem addr={"service"} name={"고객센터"}  />
                </div>
            </Menu>

             <div className="logo"  onClick={()=> {navigate("/")}}>Eco Friend</div>


            {
            userdata.islogin ? 
            <Menu height={"100px"} top={'30px'}>
                 <MyPageBtn/>
                 <div className="menu-list">
                        <MenuItem addr={"mypage"} name={"마이페이지"} />
                        <button onClick={()=>{handleLogout()}} className="logout">로그아웃</button>
                 </div>
            </Menu>
            :
            <Menu>
            <button style={{height:"30px", width:"60px"}} onClick={()=>{navigate('/login')}} className="logout">로그인</button>   
            </Menu>
            }
        </Container>
    );
};

export default Header;



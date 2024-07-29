import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { media } from '../../styles/media'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import SocialLoginBtn from './SocialLoginBtn'
import { IoArrowBack } from "react-icons/io5";
import { Link } from 'react-router-dom';


const Container = styled.form`
        display : flex; 
        flex-direction: column;
        justify-content: space-evenly;
        background-color: white; 
        width: 60%;
        height: 500px; 
        padding:20px;   

    ${media.desktop`
        background-color: white; 
        width: 70%;
        height: 350px;    
    `}
    
    ${media.phone`
        background-color: white; 
        width: 100%;
        height: 50vh;   
    `}
    .group {
        display:flex;
        justify-content: space-between;
    }
    a {
        margin: 5px;
    }

`
interface LoginFormProps {
    onSubmit: (username: string, password: string) => void;
}

const LoginBox:React.FC<LoginFormProps> = ({onSubmit}:LoginFormProps) => {
  const navigate = useNavigate();
  const handleNavi = (url?:string , back?:Boolean) => {
    back && navigate(-1)
    navigate(`/${url}`)
  }
  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');


  const handleSubmit = () => {
     onSubmit(username, password);
  };

  return (
    <Container> 
        <Button w='100%' h='50px'>
            <div className='group'> 
            <IoArrowBack onClick={()=>{handleNavi('',true)}} className='back'/>
                <div className=''>
                    <Link to="/signup">회원가입</Link>
                    <Link to="">패스워드 찾기</Link>
                </div>  
            </div>
        </Button>
        <Input onChange={(e)=> {setUsername(e.target.value)}} placeholder='아이디를 입력하세요' style={{padding:'10px',bgColor: 'white' , w: "94%"}}  />
        <Input onChange={(e)=> {setPassword(e.target.value)}} type="password" placeholder='비밀번호를 입력하세요' style={{padding:'10px',bgColor: 'white' , w: "94%"}}  />
        
        <SocialLoginBtn onClick={handleSubmit} radius="15px" color="white" name='로그인' w='black' bgColor='black' />
        <SocialLoginBtn onClick={()=>{handleNavi('callback/kakao')}} icon='/kakaoLogin.webp' w={"100%"} name='카카오 로그인' bgColor='#fae100'/>
    </Container>
  )
}

export default LoginBox
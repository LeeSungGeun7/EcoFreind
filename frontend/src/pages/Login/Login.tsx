import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../../Components/organism/LoginForm'
import LoginTemplate from '../../Components/templates/Login/LoginTemplate'
import { useAuth } from '../../hooks/useAuth'
import Footer from '../../layout/Footer'
import Header from '../../layout/Header'
import { useUserStore } from '../../store/userState'



function Login() {
  const { login, error } = useAuth();
  const { setAvatar,setEmail,setName,setUserId,setIsLogin} = useUserStore();
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (username: string, password: string) => {
    try {
      const { data:sessionId , status}= await login(username, password);
      if (status === 200 ) {
        setLoading(false)
        setAvatar(sessionId.avatar)
        setEmail(sessionId.email)
        setName(sessionId.name)
        setUserId(sessionId.userId)
        setIsLogin(true)
        navigate('/')
      } else if (status === 422){
        setLoading(false)
        alert("로그인실패")
    }
    } catch (err) {
        alert('아이디 또는 비밀번호가 잘못되었습니다.')
    }

};

  return (
    <LoginTemplate>
     <Header />
     <LoginForm onSubmit={handleLogin}/>
     <Footer />
    </LoginTemplate>
  )
}

export default Login
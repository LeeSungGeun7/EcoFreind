import axios from 'axios';
import { React ,useEffect  }from 'react';
import { useNavigate } from 'react-router-dom';
import { EF_DOMAIN } from '../api/utils';
import { useAuth } from '../context/AuthContextProvider';


axios.defaults.withCredentials = true

function redirection() {
    const {userdata , setUserData} = useAuth()  
    const navi = useNavigate()
    useEffect(()=>{
    const code = new URL(window.location.toString()).searchParams.get('code');
    if (code) {
      axios.post(`${EF_DOMAIN}/callback/kakao`, 
  { code: code },
  { 
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
  }
)
    .then((result)=>{
        setUserData({...userdata , islogin:true , email:result.data[0]})
        navi('/');
    })
  }
  },[])  
}

export default redirection


// 카카오로그인성공시 로컬스토리지 토큰보관
// app.js useEffect 빈배열에 해당 토큰을 
// 카카오에 요청해서 context api 에 이메일이랑 로그인여부 설정
// 카카오 로그아웃시 로컬에서 토큰지우고 홈으로 이동 
// 그러면 app.js 에서 해당 context api 로그아웃 설정
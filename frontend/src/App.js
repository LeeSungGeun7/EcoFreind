import React , { Suspense, lazy, useEffect } from 'react'; 
import {BrowserRouter as Router , Route , Routes, useNavigate} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import LoadingMain from './Components/LoadingMain';
import { useDarkmode } from './store/darkTheme';
import { userData, useUserStore } from './store/userState';
import { darkTheme, theme } from './styles/theme';

const CarSerach = React.lazy(()=>(import('./pages/CarSearch')));
const MyPage = React.lazy(()=>(import('./pages/MyPage')));
const Login = React.lazy(()=>(import('./pages/Login/Login')));
const SignUp = React.lazy(()=>(import('./pages/SignUp')));
const Layout = lazy(()=>(import('./layout/Layout')));
const ServiceCenter = lazy(()=>(import('./pages/ServiceCenter')));
const Redirection = lazy(()=>(import('./pages/Redirection')));
const Temp = lazy(()=>(import('./pages/Test')));
const NotFound = lazy(()=>(import('./pages/NotFound')));

function App() {



const { isLogin } = useUserStore();
const { darkmode } = useDarkmode();

//  useEffect(() => {
//   const user = localStorage.getItem('userData')
//     if (!user) {
//       handleLogout();
//     }
//   }, []);


//   const handleLogout = () => {
//     setUserData({...userdata , islogin:false})
//   };

  return (
   <>
   <ThemeProvider theme={darkmode ? darkTheme : theme}>
   <Router>
      <Suspense fallback={<LoadingMain/>}>
      <Routes>
      <Route path="/Car" element={<CarSerach/>}/>
        <Route path="/Car/:searchValue" element={<CarSerach/>} />
        <Route path="/login" element={isLogin? <Layout/>:<Login />} />
        <Route path="/signup" element={isLogin ?<Layout/> : <SignUp />} />
        <Route path="/" element={<Layout />} />

        <Route path="/callback/kakao" element={<Redirection/>} />

        <Route path="/Mypage" element={isLogin ? <MyPage /> : <Login/>} />
        <Route path="/Service/:id/:name" element={isLogin ? <ServiceCenter/> : <Login/> } />

  
        <Route path="/pay" element={<Temp/>} />
        <Route path="/*" element={<NotFound />} />

      </Routes>
      </Suspense>
    </Router>
    </ThemeProvider>
   </>
  );
}

export default App;

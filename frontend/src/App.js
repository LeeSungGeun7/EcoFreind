import React , { Suspense, lazy, useEffect } from 'react'; 
import {BrowserRouter as Router , Route , Routes, useNavigate} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import LoadingMain from './Components/LoadingMain';
import { useAuth } from './context/AuthContextProvider';

import { darkTheme, theme } from './styles/theme';

const CarSerach = React.lazy(()=>(import('./pages/CarSearch')));
const MyPage = React.lazy(()=>(import('./pages/MyPage')));
const Login = React.lazy(()=>(import('./pages/Login')));
const SignUp = React.lazy(()=>(import('./pages/SignUp')));
const Layout = lazy(()=>(import('./layout/Layout')));
const ServiceCenter = lazy(()=>(import('./pages/ServiceCenter')));
const Payment = lazy(()=>(import('./pages/Payment')));
const Redirection = lazy(()=>(import('./pages/Redirection')));
const Temp = lazy(()=>(import('./pages/Test')));
const NotFound = lazy(()=>(import('./pages/NotFound')));

function App() {
 
const {userdata , setUserData , darkmode } = useAuth()

const user = localStorage.getItem('userData')

  useEffect(() => {
    if (!user) {
      handleLogout();
    }
  }, [user]);

  const handleLogout = () => {
    setUserData({...userdata , islogin:false})
  };

  return (
   <>
   <ThemeProvider theme={darkmode ? darkTheme : theme}>
   <Router>
      <Suspense fallback={<LoadingMain/>}>
      <Routes>
      <Route path="/Car" element={<CarSerach/>}/>
        <Route path="/Car/:searchValue" element={<CarSerach/>} />
        <Route path="/login" element={userdata.islogin? <Layout/>:<Login />} />
        <Route path="/signup" element={userdata.islogin ?<Layout/> : <SignUp />} />
        <Route path="/" element={<Layout />} />

        <Route path="/callback/kakao" element={<Redirection/>} />

        <Route path="/Mypage" element={userdata.islogin ? <MyPage /> : <Login/>} />
        <Route path="/Service/:id/:name" element={userdata.islogin ? <ServiceCenter/> : <Login/> } />

  
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

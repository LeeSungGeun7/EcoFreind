import React , { Suspense, lazy } from 'react'; 
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';
import { useAuth } from './context/AuthContextProvider';


const CarSerach = React.lazy(()=>(import('./pages/CarSearch')));
const MyPage = React.lazy(()=>(import('./pages/MyPage')));
const Login = React.lazy(()=>(import('./pages/Login')));
const SignUp = React.lazy(()=>(import('./pages/SignUp')));
const Layout = lazy(()=>(import('./layout/Layout')));
const ServiceCenter = lazy(()=>(import('./pages/ServiceCenter')));
const Payment = lazy(()=>(import('./pages/Payment')));
const Redirection = lazy(()=>(import('./pages/Redirection')));


function App() {
 
  const {userdata , setUserData} = useAuth()
  return (
   <>
   <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
      <Route path="/Car" element={<CarSerach/>} />
        <Route path="/Car/:searchValue" element={<CarSerach/>} />
        <Route path="/login" element={userdata.islogin? <Layout/>:<Login />} />
        <Route path="/signup" element={userdata.islogin ?<Layout/> : <SignUp />} />
        <Route path="/" element={<Layout />} />

        <Route path="/callback/kakao" element={<Redirection/>} />

        <Route path="/Mypage" element={userdata.islogin ? <MyPage /> : <Login/>} />
        <Route path="/Service/:id/:name" element={userdata.islogin ? <ServiceCenter/> : <Login/> } />


        <Route path="/pay" element={<Payment />} />

      </Routes>
      </Suspense>
    </Router>
    
   </>
  );
}

export default App;

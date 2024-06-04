import React, { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';
import Layout from './layout/Layout';
import CarSerach from './pages/CarSearch';
import ModifyInfo from './pages/ModifyInfo';
import InterestStation from "./pages/InterestStation"
import InquriyCost from './pages/InquriyCost';

import Payment from './pages/Payment';

import ServiceCenter from './pages/ServiceCenter';
import MyPage from './pages/MyPage';
import Main from './layout/Main';
import Quest from './pages/Quest';
import Answer from './pages/Answer';
import InquireCheck from './pages/InquireCheck'

import FindID from './pages/FindID';
import ShowID from './pages/ShowID';
import TpyedID from './pages/TypedID';
import FindPassword from './pages/FindPassword';
import ChangePassword from './pages/ChangePassword';
import TypedID from './pages/TypedID';





function App() {
  return (
   <>
   <Router>
      <Routes>
      <Route path="/Car" element={<CarSerach/>} />
        <Route path="/Car/:searchValue" element={<CarSerach/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Layout />} />



        <Route path="/Mypage" element={<MyPage />} />
        <Route path="/Service" element={<ServiceCenter />} />
        <Route path="/quest" element={<Quest />} />
        <Route path="/answer" element={<Answer />} />
        <Route path="/check" element={<InquireCheck />} />


        <Route path="/findid" element={<FindID />} />
        <Route path="/showid" element={<ShowID />} />
        <Route path="/typedid" element={<TypedID />} />
        <Route path="/findpass/:email" element={<FindPassword />} />
        <Route path="/change" element={<ChangePassword />} />
        


        <Route path="/ModifyInfo" element={<ModifyInfo />} />
        <Route path="/InterestStation" element={<InterestStation />} />
        <Route path="/InquriyCost" element={<InquriyCost />} />

        <Route path="/pay" element={<Payment />} />

      </Routes>
    </Router>
    
   </>
  );
}

export default App;

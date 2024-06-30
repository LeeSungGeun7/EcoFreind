import React from 'react'
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Header from '../layout/Header';

const Container = styled.main`
  background-color: silver;
  display:flex;
  justify-content:center;
  align-items:center;
  width: 100vw;
  height: 100vh;
`;

function LoadingMain() {
  
  return (
    <>
    <Header/>
    <Container>
        <Skeleton style={{borderRadius:'50px'}} width={'80%'} height={'100%'}  className="text"   />
    </Container>
    </>
  )
}

export default LoadingMain
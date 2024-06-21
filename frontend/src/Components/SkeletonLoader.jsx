import React from 'react'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components';
import 'react-loading-skeleton/dist/skeleton.css'



const Container = styled.div`
  display:flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color : none;
  z-index: -1;
`



function SkeletonLoader() {
   
  return (
    <Container>
        <Skeleton width={'100vw'} height={'100vh'}  className="text"   />
    </Container>
  )
}

export default SkeletonLoader

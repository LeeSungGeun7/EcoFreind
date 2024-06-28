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
  z-index: 3;
`

const Rows = styled.div`
  margin: 30px;
  height: 80vh;
  width: 100%;
  .row-item {
    height: 20%;
    width: 80%;
  }
  .item {
   
  }
`


function SkeletonLoader() {
   
  return (
    <Container>
        <Skeleton width={'100vw'} height={'100vh'}  className="text"   />
    </Container>
  )
}

export default SkeletonLoader



export const SkeletonRow = () => {
  return (
    <Container>

        <Rows className=''>
          <div className='row-item'>
           <Skeleton className='item'/>
           </div>
           <div className='row-item'>
           <Skeleton className='item'/>
           </div>

           <Skeleton className='item'/>
        </Rows>

    </Container>
  )
}
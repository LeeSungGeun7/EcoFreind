import React from 'react'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components';
import 'react-loading-skeleton/dist/skeleton.css'

const Container = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`


function LoadingSquare() {
  return (
    <Container>
        <Skeleton style={{borderRadius:'50px'}} width={'100%'} height={'100%'}  className="text"   />
    </Container>
  )
}

export default LoadingSquare


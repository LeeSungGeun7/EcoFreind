import styled from "styled-components";
import React from 'react'
import Header from '../layout/Header'
import { Common } from "../styles/theme";



const Container = styled.div`
    ${Common.center};
    width: 100vw;
    height:100vh;
    color :  ${(props:any) => props.theme.colors.blue};
    background-color:  ${(props:any) => props.theme.colors.black2};
    font-size : 3rem;
`


function NotFound() {
  return (
    <>
    <Header/>
    <Container>
        Page Not Found
    </Container>
    </>
  )
}

export default NotFound


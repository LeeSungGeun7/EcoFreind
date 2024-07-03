import React, { useState } from 'react'
import styled from "styled-components";
import { Common } from '../styles/theme';


const Wrapper = styled.div`
    position: relative;
    ${Common.center}
    flex-wrap : nowrap;
    overflow: hidden;
    width : 100vw;
    height: 50vh;
    background-color:silver;
    @media (max-width:807px) {
        height: 20vh;
    }
`;


function Sllider({items}:any) {

  return (
    <Wrapper>
      {items}
    </Wrapper>
  )
}

export default Sllider

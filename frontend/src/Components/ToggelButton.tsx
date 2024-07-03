import Button from '@mui/material/Button';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import * as React from 'react';
import { Common } from '../styles/theme';


declare module '@mui/material/styles' {
    interface Theme {
      colors: {
        black1: string;
        black2: string;
        blue: string;
        // 기타 커스텀 색상들...
      };
    }
    interface ThemeOptions {
      colors?: {
        black1?: string;
        black2: string;
        blue: string;
        // 기타 커스텀 색상들...
      };
    }
  }

interface Props {
    trueName? : string ; 
    falseName? : string ; 
    state : boolean; 
    setState : (boolean:boolean) => void ;
    trueIcon? : React.ReactNode;
    falseIcon? : React.ReactNode;
    style?:  React.CSSProperties;
}




const TogelButton = ({
    style,
    trueName, 
    falseName, 
    state, 
    setState,
    trueIcon,
    falseIcon 
    }:Props) => {
    const handleClick = () => setState(!state);
    

const Container = styled.div`
    ${Common.center};
    border-radius: 50px;
    width: 30px;
    height: 30px;
    background-color: ${state ? 'white' : 'black'};
    color : ${state ? 'black' : 'white'} ;   
`

    return (
        <>
        <Container onClick={handleClick} style={style} >
            {state ? trueIcon : falseIcon}
            {state ? trueName : falseName}
        </Container>
        
       </>
    )

}

export default TogelButton;
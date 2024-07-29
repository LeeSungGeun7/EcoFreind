import styled from '@emotion/styled'
import React from 'react'


const Container = styled.button<Props>`
    display:flex;
    justify-content: center;
    align-items:center;
    padding: 10px;
    width: ${(props:any)=> props.w ? props.w : '300px' };
    height: 60px;
    color: ${(props:any)=> props.color ? props.color : 'black' };
    cursor: pointer;
    border-radius: ${(props:any)=> props.radius ? props.radius : '' };;
    border: none;
    background-color: ${(props:any)=> props.bgColor };
    img {
        width: 40px;
        height: 40px;
        background-color: none;
        border-radius: 100%;
        margin: 10px;

    }
    /* div {
        width: 33%;
    }
    span {
        width: 33%;
    } */
`
interface Props {
    name? : string;
    bgColor? : string;
    imgWidth? : string;
    imgHeight? : string;
    w? : string;
    h? : string;
    icon?: string;
    color? : string;
    radius? : string;
    type? : "button" | "submit" | "reset";
    onClick? : () => void ;
}

function SocialLoginBtn({
    name,
    bgColor,
    imgWidth,
    imgHeight,
    w,
    h,
    radius,
    icon,
    color,
    type,
    onClick
}:Props) {
  return (
    <Container type={type || 'button'} radius={radius} color={color} onClick={onClick} imgWidth={imgWidth} imgHeight={imgHeight} w={w} h={h}  bgColor={bgColor}>
        {icon && <img src={icon} alt="" />}
        <span>
            {name}
        </span>
        <div></div>
    </Container>
  )
}

export default SocialLoginBtn
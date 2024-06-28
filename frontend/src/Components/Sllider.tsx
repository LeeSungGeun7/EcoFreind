import React, { useState } from 'react'
import styled from "styled-components";
import { FaCaretLeft , FaCaretRight } from "react-icons/fa";
   


interface Props {
  items :  number []
  children : React.ReactNode
}

interface ItemStyle { 
    len : number;
    px : number ; 
    idx: number;
    direction? : string;
}

const center = `
    display: flex;
    justify-content : center;
    align-items : center; 
`;

const Item = styled.div<ItemStyle>`
    position: absolute;
    left : ${({idx}:ItemStyle) => `${idx*200}px`};
    transition: transform 0.5s ease;
    transform: translateX(${(props:ItemStyle) => props.px}px);
    ${center}
    width : ${(props : ItemStyle) => props.len < 3 ? '30%' :'30%' };
    height: 80%;
    row-gap: 50px;
    background-color: white;
    margin:30px;
`;


const Wrapper = styled.div`
    position: relative;
    ${center}
    flex-wrap : nowrap;
    overflow: hidden;
    width : 100vw;
    height: 50vh;
    background-color:silver;
    @media (max-width:807px) {
        height: 20vh;
    }
`;



const Arrow = styled.button`
    width: 30px;
    height:30px;
    border-radius: 20px;
    border:none;
    ${center}
    position: absolute;
    z-index: 100;
    left : ${(props : ItemStyle) => props.direction === 'left' && 0};
    right : ${(props : ItemStyle) => props.direction === 'right' && 0};
`


// Wrapper 기본적인 틀 , items 슬라이드쇼 아이템 , item 개수에 따라 슬라이드 px  

function Sllider({items , children  }:Props) {
    const [slidePx, setSlidePx] = useState(0);

    const toPrev = () => {
      slidePx < 0 && setSlidePx(slidePx + 150);
    };
  
    const toNext = () => {
      slidePx > -(items.length * 150) && setSlidePx(slidePx - 150);
    }
  return (
    <Wrapper>
        {slidePx < 0 && <Arrow direction={'left'} onClick={()=>{toPrev()}} ><FaCaretLeft/></Arrow>}
        {
            items.map((e , idx)=>{
                return(
                    <>
                    <Item idx={idx} px={slidePx} len={items.length}>{e}</Item>
                    </>
                )
            })
        }
        {slidePx > -(items.length * 105) && <Arrow direction={'right'} onClick={()=>{toNext()}}><FaCaretRight/></Arrow>}
    </Wrapper>
  )
}

export default Sllider

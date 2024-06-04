import React from 'react'
import styled , {css} from "styled-components";




const Container = styled.div`
  width : 80vw ; 
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform: translateX(-100%); /* 초기 위치 설정 */
  transition: transform 0.3s ease-in-out; /* 부드러운 애니메이션을 위한 전환 효과 */

  /* 메뉴창이 열려있을 때 */
  ${props => props.isOpen && 
  css`
    transform: translateX(0); /* 열려있을 때 위치 */
  `}
`;

const Input = styled.input`
  width : 50%;
  height: 20px;
`


function Filter({isOpen}) {

  return (
    <Container isOpen={isOpen}>
      <Input type='text' name=''  value={'500'}/>
    </Container>
  )
}

export default Filter
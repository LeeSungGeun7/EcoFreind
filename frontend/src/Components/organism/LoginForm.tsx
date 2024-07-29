import React from 'react'
import styled from 'styled-components'
import { Common } from '../../styles/theme'
import LoginBox from '../molecules/LoginBox'


const Container = styled.main`
    width : 100% ; 
    height: auto ; 
    ${Common.center}
`
interface LoginFormProps {
    onSubmit: (username: string, password: string) => Promise<void>;
  }

function LoginForm({onSubmit}:LoginFormProps) {
  return (
    <Container>
        <LoginBox onSubmit={onSubmit}/>
    </Container>
  )
}

export default LoginForm
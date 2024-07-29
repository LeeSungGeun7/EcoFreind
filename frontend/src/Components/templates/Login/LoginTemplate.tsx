import { ReactJSXElementChildrenAttribute } from "@emotion/react/types/jsx-namespace";
import styled from 'styled-components'

const Container = styled.div`
    background-color: ${(props:any) => props.theme.colors.black1} ;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between; 
    align-items: center;
`

const LoginTemplate = ({ children }:ReactJSXElementChildrenAttribute) => {
    return (
      <Container>
        {children}
      </Container>
    );
};

export default LoginTemplate;
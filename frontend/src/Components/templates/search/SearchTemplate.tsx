import { ReactJSXElementChildrenAttribute } from "@emotion/react/types/jsx-namespace";
import styled from 'styled-components'

const Container = styled.div`
  
`

const SearchTemplate = ({ children }:ReactJSXElementChildrenAttribute) => {
    return (
      <Container>
        {children}
      </Container>
    );
};

export default SearchTemplate;
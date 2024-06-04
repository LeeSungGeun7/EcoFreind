import React from "react";
import Header  from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import Main from "./Main";

const Container = styled.div`

    position: relative;
    display: flex;
    flex-direction:column;
    justify-content:space-evenly;

  // grid-template-columns: 1fr ;
  // grid-template-rows: repeat(2,minmax(140px,auto));
    width: 100%;
    height:100%;
   body {
     margin:0;
     padding:0;
   }
   .Container{
    display:flex;
  flex-direction:column;
  justify-content:space-evenly;
    align-items:space-evenly;

   }

`;




const Layout = () => {

    return(
        <>
        <Header overlap={false}/>
        <Container>
            {/* <Header overlap={false}/> */}
            <div className="Container">
            {/* <Header overlap={false}/> */}
                
                <Main>
                
                </Main>

            <Footer/>
            </div>
        </Container>
        </>
    );
}

export default Layout;
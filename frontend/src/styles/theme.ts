import { createGlobalStyle } from "styled-components";


export const GlobalStyles = createGlobalStyle`
    transition: background-color 0.2s ease-in, color 0.2s ease-in;
`;


export const theme = {
    colors : {
        black1 : "white",
        black2 :  "#F8F6F4",
        black3 : "black",
        blue : "black",
        white: "black",

    }
}


export const darkTheme = {
    colors : {
    black1 : "#020303",
    black2 :  "#10110F",
    black3 : "#30312D",
    blue : "#0AD1F8",
    white: "white"
    }
}



export const Common = 

{
    center : `
    display: flex;
    justify-content:center;
    align-items : center;
    `,

    


}

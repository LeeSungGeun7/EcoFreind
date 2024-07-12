import { useState } from "react";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import styled from "styled-components";

var cardId = "whale";


const Card = styled(motion.div)`
    width : 200px;
    height: 200px;
`

const Main = styled.div`
    width: 100%;
    height: 1000vh;
    background-color: ${props => props.theme.colors.black1};
`


function Scrollanimaiton() {
  let [revealed, setRevealed] = useState(false);

  let clickHandler = () => setRevealed((prevRevealed) => !prevRevealed);

  return (
    <Main className="">

    </Main>
  );
}



export default Scrollanimaiton
import { motion } from 'framer-motion'
import styled from 'styled-components'
import React from 'react'


const LoadingMotion = styled(motion.div)`
    height: 80px;
    width : 80px;
    background-color: ${(props:any) => props.theme.colors.blue};
`


function LoginLoading() {
  return (
    <LoadingMotion
    animate={{
      scale: [1, 1.5, 1.5, 1, 1],
      rotate: [0, 0, 180, 180, 0],
      borderRadius: ["0%", "0%", "50%", "50%", "0%"]
    }}
    transition={{
      duration: 2,
      ease: "easeInOut",
      times: [0, 0.2, 0.5, 0.8, 1],
      repeat: Infinity,
      repeatDelay: 1
    }}
  />
  )
}

export default LoginLoading
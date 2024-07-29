import { motion } from 'framer-motion';
import React from 'react'
import styled from 'styled-components';

interface ButtonStyleProps {
  backgroundColor?: string;
  color?: string;
  padding?: string;
  w? : string ;
  h? : string;
}


interface ButtonProps extends ButtonStyleProps {
  onClick?: () => void;
  title?: string;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const ButtonContainer = styled(motion.button)<ButtonStyleProps>`
  background-color: ${({ backgroundColor, theme }:any) => backgroundColor || theme.colors.black1};
  color: ${({ color, theme }:any) => color || theme.colors.white};
  padding: ${({ padding }:ButtonStyleProps) => padding || '10px 20px'};
  border: none;
  border-radius: 4px;
  width: ${({ w }:any) => w || '200px'};
  cursor: pointer;
`;

function Button({
  onClick,
  title,
  w,
  h,
  children,
  type = 'button',
  ...styleProps
}: ButtonProps) {
  return (
    <ButtonContainer w={w} h={h} onClick={onClick} type={type} {...styleProps}>
      {title || children}
    </ButtonContainer>
  )
}

export default Button;
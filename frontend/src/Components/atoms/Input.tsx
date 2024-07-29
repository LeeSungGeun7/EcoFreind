import React from 'react'
import styled from 'styled-components';
import { string } from 'zod';

interface InputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder? : string;
  type? : string;
}

interface InputStyleProps extends InputProps {
  style?: {
    bgColor?: string;
    color?: string;
    padding?: string;
    w?: string;
    h?: string;
    fontsize? : string;
  }
}

const StyledInput = styled.input<InputStyleProps>`
  background-color: ${({ style }:InputStyleProps) => style?.bgColor || 'silver'};
  width: ${({ style }:InputStyleProps) => style?.w || '200px'};
  height: ${({ style }:InputStyleProps) => style?.h || '50px'};
  color: ${({ style }:InputStyleProps) => style?.color || 'black'};
  padding: ${({ style }:InputStyleProps) => style?.padding || '0'};
  border :  solid 1px silver;
  margin: 2px;
  outline : none;
  border-radius: 12px;
  font-size : ${({ style }:InputStyleProps) => style?.fontsize || '1rem'};
`;

function Input({ 
  onChange,
  value, 
  style,
  type,
  placeholder 
    }: InputStyleProps) {
  return (
    <StyledInput max type={type} placeholder={placeholder} style={style} onChange={onChange} value={value} />

  )
}

export default Input;
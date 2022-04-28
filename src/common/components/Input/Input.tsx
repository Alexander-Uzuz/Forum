import React, { forwardRef } from "react";
import styled from "styled-components";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  placeholder: string;
  type?: string;
  width?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {

  return (
    <InputContainer>
      <InputField {...props} ref={ref} />
      {props.error ? <ErrorMessage>{props.error}</ErrorMessage> : ''}
    </InputContainer>
  );
});

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const InputField = styled.input<{
  width?: string;
}>`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;
  width: ${({ width }) => (width ? width : "380px")};
  padding: 15px;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    font-weight: 300;
    font-size: 13px;
    line-height: 15px;
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const ErrorMessage = styled.p`
  font-weight: 500;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: 0.02em;
  text-indent: 15px;
  color: ${({theme}) => theme.colors.red};
  margin-bottom: 10px;
`;

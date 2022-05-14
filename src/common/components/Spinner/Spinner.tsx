import React from 'react';
import styled from 'styled-components';
import Loading from 'assets/icons/Spinner.svg';

type Props = {}

export const Spinner = (props: Props) => {
  return (
    <SpinnerContainer><img src={Loading} alt="Spinner" /></SpinnerContainer>
  )
}


export const SpinnerContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height:100vh;
`
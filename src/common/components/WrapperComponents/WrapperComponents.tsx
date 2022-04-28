import React,{FC} from 'react';
import {Outlet} from 'react-router-dom';
import { Header } from '../Header/Header';
import styled from 'styled-components';

type Props = {}

export const WrapperComponents:FC<Props> = () => {
  return (
    <Wrapper>
        <Header/>
        <Outlet/>
    </Wrapper>
  )
}

const Wrapper = styled.div``;


import React,{BaseSyntheticEvent, FC, useState} from 'react';
import {Outlet} from 'react-router-dom';
import { Header } from '../Header/Header';
import styled from 'styled-components';
import { ForumRules } from "common/components/ForumRules/ForumRules";

type Props = {}

export const WrapperComponents:FC<Props> = () => {
  const [activeRules, setActiveRules] = useState(false);



  return (
    <Wrapper>
        <Header handleRules={setActiveRules}/>
        <Outlet/>
        <ForumRules activeRules={activeRules} handleRules={setActiveRules}/>
    </Wrapper>
  )
}

const Wrapper = styled.div``;


import React,{FC} from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {useAppDispatch} from 'core/redux/hooks';
import {removeUser} from 'modules/authorization/authSlice';

type Props = {
  active:boolean;
  handleActive:(active:boolean) => void;
};

export const ProfileMenu:FC<Props> = ({active, handleActive}) => {
    const dispatch = useAppDispatch();

    const handleExit = () => {
        localStorage.removeItem('user');
        dispatch(removeUser())
        handleMenu()
    }

    const handleMenu = () => handleActive(false)


  return (
    <ProfileMenuContainer display={active ? 'block' : 'none'}>
      <ProfileMenuItem to="/profile" onClick={handleMenu}>Настройки</ProfileMenuItem>
      <ProfileMenuItem to="" onClick={handleMenu}>Помощь</ProfileMenuItem>
      <ProfileMenuItem to="/login" onClick={handleExit}>Выйти</ProfileMenuItem>
    </ProfileMenuContainer>
  );
};

export const ProfileMenuContainer = styled.div<{
  display:'block' | 'none';
}>`
  display:${({display}) => display};
  position: absolute;
  right: 50px;
  top: 97px;
  background: #F48023;
  padding: 10px 0;
  border-radius: 10px;
`;

export const ProfileMenuItem = styled(Link)`
  display: block;
  width:300px;
  text-decoration: none;
  cursor: pointer;
  font-weight: 300;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.05em;
  color: #FFF;
  padding:0 25px;

  :hover{
    background:#FFA500;
  }
`;

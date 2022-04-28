import React, { FC } from "react";
import {
  ProfileMenuContainer,
  ProfileMenuItem,
} from "../ProfileMenu/ProfileMenu";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "core/redux/hooks";
import {fetchRemovePost} from 'modules/posts/PostThunk'

type Props = {
  active: boolean;
  id:number | null | undefined;
};


export const PocoMenu: FC<Props> = ({ active,id }) => {
  const {token} = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  const handleRemove = () =>{
    dispatch(fetchRemovePost({id,token}))
  }

  return (
    <PocoMenuContainer display={active ? "block" : "none"} className="pocoMenu">
      <PocoMenuItem to={`addPost/${id}`}>Изменить</PocoMenuItem>
      <PocoMenuItem as={'div'} onClick={handleRemove}>Удалить</PocoMenuItem>
    </PocoMenuContainer>
  );
};

const PocoMenuContainer = styled.div<{
  display: "block" | "none";
}>`
  position: absolute;
  top:41px;
  right:0;
  display: ${({ display }) => display};
  background: #f48023;
  padding: 10px 0;
  border-radius: 10px;
  z-index: 999;
`;

const PocoMenuItem = styled(Link)`
  display: block;
  width: 200px;
  text-decoration: none;
  cursor: pointer;
  font-weight: 300;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.05em;
  color: #fff;
  padding: 0 25px;

  :hover {
    background: #ffa500;
  }
`;

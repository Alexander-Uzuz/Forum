import React, { FC } from "react";
import {
  ProfileMenuContainer,
  ProfileMenuItem,
} from "../ProfileMenu/ProfileMenu";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "core/redux/hooks";
import {fetchRemovePost} from 'modules/posts/PostThunk';
import {} from 'modules/posts/PostThunk';

type Props = {
  active: boolean;
  onChange:React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete:() => void;
  id:number | null | undefined;
  role?:'comment' | 'post';
  top?:string;
  right?:string;
};


export const PocoMenu: FC<Props> = ({ active,id, onChange,role,handleDelete,...props }) => {
  const {token} = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  const handleRemove = () =>{
    handleDelete()
  }

  return (
    <PocoMenuContainer display={active ? "block" : "none"} className="pocoMenu" {...props}>
      <PocoMenuItem to={`addPost/${id}`} display={role === 'comment' ? 'none' : 'block'}>Изменить</PocoMenuItem>
      <PocoMenuItem as={'div'} onClick={handleRemove} display="block">Удалить</PocoMenuItem>
    </PocoMenuContainer>
  );
};

const PocoMenuContainer = styled.div<{
  display?: "block" | "none";
  top?:string;
  right?:string;
}>`
  position: absolute;
  top:${({top}) => top ? top : '41px'};
  right:${({right}) => right ? right : '0px'};
  display: ${({ display }) => display};
  background: #f48023;
  padding: 10px 0;
  border-radius: 10px;
  z-index: 999;
`;

const PocoMenuItem = styled(Link)<{
  display:'block' | 'none';
}>`
  display: ${({display}) => display ? display : 'block'};
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

import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppDispatch } from "core/redux/hooks";
import { removeUser } from "modules/authorization/authSlice";

type Props = {
  token: any;
  display: boolean;
  handleMenu: (activeBurger: boolean) => void;
};

export const NavBar: FC<Props> = ({ token, display, handleMenu }) => {
  const dispatch = useAppDispatch();

  const handleExit = () => {
    localStorage.removeItem("user");
    dispatch(removeUser());
    handleMenu(false);
  };

  return (
    <NavBarContainer display={display ? "flex" : "none"}>
      {token ? (
        <NavBarLinkContainer flag={display}>
          <NavBarLink to="/posts/addPost">Ask a question</NavBarLink>
          <NavBarLink as="a" href="rulesForum.docx" download>
            Get data about Admin
          </NavBarLink>
          <NavBarLink to="/profile">Settings</NavBarLink>
          <NavBarLink to="/login" onClick={handleExit}>
            Exit
          </NavBarLink>
        </NavBarLinkContainer>
      ) : (
        <NavBarLinkContainer flag={display}>
          <NavBarLink to="/login">Login</NavBarLink>
          <NavBarLink to="/registration">Registration</NavBarLink>
        </NavBarLinkContainer>
      )}
    </NavBarContainer>
  );
};

const NavBarContainer = styled.div<{
  display: "flex" | "none";
}>`
  /* display: ${({ display }) => display};
  position: absolute;
  left: 0;
  top: 80px;
  display: ${({ display }) => display};
  justify-content: center;
  align-items: center;
  z-index: 999; */
  position: absolute;
  display: ${({ display }) => (display)};
  top: 91px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
`;

const NavBarLinkContainer = styled.div<{
    flag:boolean;
}>`
  width: 100vw;
  background: #f48023;
  display: block;
  text-align: center;
  padding-top: 20px;
  transition: 0.4s ease;
  position: absolute;
  left:${({flag}) => flag ? '0px' : '-900px'};
`;

const NavBarLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: #fff;
  margin-bottom: 20px;
`;

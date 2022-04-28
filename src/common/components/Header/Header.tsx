import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { ProfileMenu } from "../ProfileMenu/ProfileMenu";
import Logo from "assets/icons/Logo.svg";
import Arrow from "assets/icons/arrow-down.svg";
import { Button } from "../Button/Button";
import RegisterImg from "assets/icons/buttonRegister.svg";
import Plus from "assets/icons/askQuestionPlus.svg";
import Avatar from "assets/icons/avatar.svg";
import { useAppSelector } from "core/redux/hooks";
import { useParams, Link,useLocation } from "react-router-dom";

type Props = {};

export const Header: FC<Props> = (props: Props) => {
  const { user } = useAppSelector((state) => state.user);
  const [active, setActive] = useState(false);
  const history = useLocation();

  useEffect(() =>{setActive(false)}, [history.pathname])


  const handleMenu = () => setActive(!active)

  return (
    <HeaderContainer>
      <HeaderImgLink to="/posts"><HeaderImg src={Logo}/></HeaderImgLink>
      <HeaderTitle></HeaderTitle>
      {user.token ? (
        <HeaderButtonsContainer>
          <Button
            text="Ask a question"
            padding="12px 20px 12px 45px"
            images={Plus}
            as={Link}
            to="posts/addPost"
          />
          <HeaderSetting onClick={handleMenu}>
            <AvatarImg src={user.avatarUrl ? user.avatarUrl : Avatar} />
            <HeaderImg src={Arrow} className="arrow" />
          </HeaderSetting>
        </HeaderButtonsContainer>
      ) : (
        <HeaderButtonsContainer>
          <Button
            images={RegisterImg}
            text="Registration"
            margin="0 16px 0 0"
            padding="12px 20px 12px 45px"
            as={Link}
            to="/registration"
          />
          <Button
            text="Login"
            background="#EAEAEA"
            color="#1682FD"
            as={Link}
            to="/login"
          />
        </HeaderButtonsContainer>
      )}
      <ProfileMenu active={active} handleActive={setActive}/>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid #eaeaea;
  padding: 23px 50px;
`;

const HeaderSetting = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HeaderImgLink = styled(Link)``

const HeaderImg = styled.img`
  &.arrow {
    width: 10px;
    height: 10px;
    margin-left:10px;
  }
`;

const HeaderButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderTitle = styled.h1``;

const AvatarImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 30px;
`;

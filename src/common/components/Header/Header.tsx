import React, { BaseSyntheticEvent, FC, useEffect, useState } from "react";
import styled from "styled-components";
import { ProfileMenu } from "../ProfileMenu/ProfileMenu";
import Logo from "assets/icons/Logo.svg";
import Arrow from "assets/icons/arrow-down.svg";
import { Button } from "../Button/Button";
import RegisterImg from "assets/icons/buttonRegister.svg";
import Plus from "assets/icons/askQuestionPlus.svg";
import Avatar from "assets/icons/avatar.svg";
import { useAppSelector } from "core/redux/hooks";
import { NavBar } from "../NavBar/NavBar";
import { LangMenu } from "../LangMenu/LangMenu";
import { useTranslation } from "react-i18next";
import { useParams, Link,useLocation } from "react-router-dom";
import Burger from 'assets/icons/burger.svg';
import World from 'assets/icons/world.png';

type Props = {
  handleRules:(activeRules:boolean) => void;
};

export const Header: FC<Props> = ({handleRules}) => {
  const {t, i18n} = useTranslation();
  const {user} = useAppSelector(state => state?.user)
  const [active, setActive] = useState(false);
  const [activeBurger, setActiveBurger] = useState(false);
  const [activeLang, setActiveLang] = useState(false);
  const history = useLocation();

  useEffect(() => {
    const handleBurger = (e:any) =>{
      if(activeBurger && !e.target.closest('.burger')){
        setActiveBurger(false)
      }
    }

    document.addEventListener('click', (e) => handleBurger(e))

    document.removeEventListener('click', (e) => handleBurger(e))
  },[activeBurger])

  useEffect(() =>{setActive(false)}, [history.pathname])

  const changeLanguage = (lang:string) =>{
    i18n.changeLanguage(lang);
  }

  const handleLang = () => setActiveLang(!activeLang);

  const handleBurgerMenu = () => {
    setActiveBurger(!activeBurger);
  }

  const handleMenu = () => setActive(!active)

  return (
    <HeaderContainer>
      <HeaderImgLink to="/posts"><HeaderImg src={Logo}/></HeaderImgLink>
      <HeaderTitle></HeaderTitle>
      {user?.token ? (
        <HeaderButtonsContainer>
          <Button
            text={t("buttonAsk")}
            padding="12px 20px 12px 45px"
            images={Plus}
            as={Link}
            to="posts/addPost"
          />
          <Button 
          text={t("buttonGetAboutAdmin")}
          margin="0 0 0 20px"
          as={'a'}
          download
          href="rulesForum.docx"
          />
          <Button
            text={t("buttonForumRules")}
            margin="0 0 0 20px"
            background="#1682FD"
            handle={handleRules}
          />
          <WorldImg src={World} onClick={handleLang}/>
          <HeaderSetting onClick={handleMenu}>
            <AvatarImg src={user.avatarUrl ? user.avatarUrl : Avatar} />
            <HeaderImg src={Arrow} className="arrow" />
          </HeaderSetting>
        </HeaderButtonsContainer>
      ) : (
        <HeaderButtonsContainer>
          <Button
            images={RegisterImg}
            text={t("buttonRegister")}
            margin="0 16px 0 0"
            padding="12px 20px 12px 45px"
            as={Link}
            to="/registration"
          />
          <Button
            text={t("buttonLogin")}
            background="#EAEAEA"
            color="#1682FD"
            as={Link}
            to="/login"
          />
        </HeaderButtonsContainer>
      )}
      <LangMenu display={activeLang} handler={changeLanguage}/>
      <MenuBurger src={Burger} onClick={handleBurgerMenu}  className='burger'/>
      <NavBar display={activeBurger} token={user?.token} handleMenu={setActiveBurger}/>
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

const HeaderImgLink = styled(Link)`
  @media ${({theme}) => theme.media.tablet}{
    margin-bottom: 10px;
  }
`

const HeaderImg = styled.img`
  &.arrow {
    width: 10px;
    height: 10px;
    margin-left:10px;
  }
`;

const WorldImg = styled.img`
  width:24px;
  height:24px;
  margin-left: 20px;
  cursor:pointer;
`

const MenuBurger = styled.img`
  display: none;

  @media ${({theme}) => theme.media.laptop}{
    display:block;
    cursor: pointer;
  }
`

const HeaderButtonsContainer = styled.div`
  display: flex;
  align-items: center;

  @media ${({theme}) => theme.media.laptop}{
    display:none;
  }
`;

const HeaderTitle = styled.h1``;

const AvatarImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 30px;
`;

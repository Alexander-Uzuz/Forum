import React,{FC} from 'react';
import styled from 'styled-components'
import FlagRu from 'assets/icons/flagRu.png';
import FlagEn from 'assets/icons/flagEn.png';

type Props = {
    display:boolean;
    handler:(lang:string) => void;
}

export const LangMenu:FC<Props> = ({display, handler}) => {
  return (
    <LangMenuContainer display={display ? 'block' : 'none'}>
        <LangMenuItemContainer>
            <LangMenuImg src={FlagRu} onClick={() => handler("ru")}/>
        </LangMenuItemContainer>
        <LangMenuItemContainer>
            <LangMenuImg src={FlagEn} onClick={() => handler("en")}/>
        </LangMenuItemContainer>
    </LangMenuContainer>
  )
}

const LangMenuContainer = styled.div<{
    display:'block' | 'none'
}>`
    display:${({display}) => display};
    position:absolute;
    right:147px;
    top:107px;
`

const LangMenuItemContainer = styled.div``

const LangMenuImg = styled.img`
    width:30px;
    height:30px;
    cursor: pointer;
`
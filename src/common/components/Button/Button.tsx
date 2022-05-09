import React,{FC} from "react";
import { Link } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import RegisterImg from '../../../assets/icons/buttonRegister.svg';

type Props = {
    images?:any;
    background?:string;
    color?:string;
    text:string;
    margin?:string;
    padding?:string;
    width?:string;
    top?:string;
    type?:'button' | 'submit';
    as?:any;
    to?:string;
    activeRules?:boolean;
    handle?:any;
    download?:boolean;
    href?:string;
};

export const Button:FC<Props> = ({as, to,handle, download,href, ...props}) => {

  const handleButton = () =>{
    if(handle){
      handle(true)
    }
  }


  return (
    <ButtonContainer{...props} as={as} to={to} download={download ? true : false} href={href}>
      {
          props.images && <ButtonIcon src={props.images} {...props}/>
      }
      <ButtonBtn onClick={handleButton}  {...props}>{props.text}</ButtonBtn>
    </ButtonContainer>
  );
};



const ButtonContainer = styled.div<{
  margin?:string;
}>`
    position:relative;
    margin:${({margin}) => margin ? margin : '0'};
    text-decoration: none;
`;

interface IButtonBtn{
    images?:string;
    background?:string;
    color?:string;
    width?:string;
    padding?:string;
};

export const ButtonBtn = styled.button<IButtonBtn>`
  display:block;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  /* background: ${({ theme }) => theme.colors.orange}; */
  color: ${({ theme }) => theme.colors.white};
  font-weight: 900;
  font-size: 12px;
  line-height: 14px;
  padding: ${({padding}) => padding ? padding : '12px 20px'};
  background:${({background}) => background ? background : '#F48023'};
  color:${({color}) => color ? color :'#FFFFFF'};
  width:${({width}) => width ? width : 'auto'};
  text-decoration: none;
  text-align: center;
`;

const ButtonIcon = styled.img<{
  top?:string;
}>`
    position:absolute;
    left:20px;
    top:${({top}) => top ? top : '11px'};
`;

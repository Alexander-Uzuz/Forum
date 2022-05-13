import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";

type Props = {
  file: any;
  onRemove?: any;
  index?:number;
  type:'images' | 'video' | 'audio';
};
export const ImageFieldPost: FC<Props> = ({ file, onRemove,index, type}) => {

  const handleRemove = () =>{
    onRemove(index)
  }

  return (
    <ImageContainer>
      {
        type === 'images' ? <ImageImg alt="image" src={file} /> : (type === 'video' ? <Video src={file} controls/> : <Audio src={file} controls/>)
      }
      <ImageRemove onClick={handleRemove}>
        <p>x</p>
      </ImageRemove>
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  position: relative;
  max-width: 530px;
  max-height: 195px;
`;

const ImageImg = styled.img`
  display: block;
  max-width: 230px;
  max-height: 95px;
  width: auto;
  height: auto;
`;

const Video = styled.video`
  height:112px;
  margin-top: 10px;
`

const Audio = styled.audio`
  margin-top:10px;
`

const ImageRemove = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.colors.white};
  left: 0;
  top: 0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

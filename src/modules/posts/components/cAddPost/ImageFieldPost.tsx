import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";

type Props = {
  file: any;
  onRemove?: any;
  index: any;
};
export const ImageFieldPost: FC<Props> = ({ file, onRemove, index }) => {
  const [fileUrl, setFileUrl] = useState<any>(null);

  useEffect(() => {
    if (file) {
      setFileUrl(URL.createObjectURL(file));
    }
  }, [file]);

  return (
    <ImageContainer>
      <ImageImg alt="image" src={fileUrl} />
      <ImageRemove onClick={() => onRemove(index)}>
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

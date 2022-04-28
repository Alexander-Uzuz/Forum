import React, { FC } from "react";
import styled from "styled-components";

type Props = {
  title:string;
  subtitle:string
};

export const Title: FC<Props> = ({title,subtitle}) => {
  return (
    <TitleContainer>
      <TitleMain>{title}</TitleMain>
      <TitleSub>
        {subtitle}
      </TitleSub>
    </TitleContainer>
  );
};

const TitleContainer = styled.div``;

const TitleMain = styled.h1`
  font-weight: 900;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0.05em;
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 20px;
`;

const TitleSub = styled.h3`
  font-weight: 300;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.black};
  width: 380px;
  margin-bottom: 20px;
`;

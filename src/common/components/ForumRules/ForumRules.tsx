import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

type Props = {
  activeRules: boolean;
  handleRules: (activeRules: boolean) => void;
};

export const ForumRules: FC<Props> = ({ activeRules, handleRules }) => {
  const {t} = useTranslation();
  const handleHide = () => {
    handleRules(false);
  };

  return (
    <>
      <ForumRulesWrapper flag={activeRules} />
      <ForumRulesContainer flag={activeRules}>
        <ForumRulesFlex>
          <ForumRulesTitle>{t("forumRulesTitle")}</ForumRulesTitle>
          <ForumRulesHide onClick={handleHide}>{t("forumRulesHide")}</ForumRulesHide>
        </ForumRulesFlex>
        <ForumRulesText>
          {t("forumRulesSubtitle")}
        </ForumRulesText>
      </ForumRulesContainer>
    </>
  );
};

const ForumRulesWrapper = styled.div<{
  flag: boolean;
}>`
  position: fixed;
  display: ${({ flag }) => (flag ? "block" : "none")};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ForumRulesContainer = styled.div<{
  flag: boolean;
}>`
  width: 80vw;
  margin: 0px auto;
  background: #f48023;
  border-radius: 10px;
  color: #fff;
  padding: 10px;
  transition: 0.4s ease;
  position: fixed;
  top: ${({ flag }) => (flag ? "100px" : "-300px")};
  left: 10%;
`;

const ForumRulesFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ForumRulesTitle = styled.h1`
  margin-bottom: 20px;
`;

const ForumRulesHide = styled.p`
  cursor: pointer;
  max-width:375px;
`;

const ForumRulesText = styled.p``;

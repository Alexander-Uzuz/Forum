import React,{FC, useState} from 'react';
import { useAppDispatch, useAppSelector } from 'core/redux/hooks';
import { fetchRemoveComments } from 'modules/comments/commentsThunk';
import styled from "styled-components";
import Avatar from "assets/icons/avatar.svg";
import Edit from "assets/icons/edit.svg";
import Eye from "assets/icons/eye.svg";
import Message from "assets/icons/messageActivity.svg";
import Arrow from "assets/icons/arrow-up.svg";
import {IPost} from 'modules/posts/interfaces/IPost';
import {IComment} from 'modules/comments/interfaces/IComment'
import {PocoMenu} from 'common/components/PoCoMenu/PocoMenu';


type Props = {
    comment:IComment
}

export const Comment:FC<Props> = ({comment}) => {
  const token = useAppSelector(state => state.user.user.token);
  const [active, setActive] = useState(false);
  const dispatch = useAppDispatch();

  const handleMenu = () => {
    setActive(!active);
  }

  const handleDelete = () => {
    dispatch(fetchRemoveComments({id:comment.id, token}))
    setActive(false);
  }

  return (
    <CommentWrapper>
    <CommentTop>
      <CommentTopContent>
        <CommentIcon src={comment.avatarUrl ? comment.avatarUrl : Avatar} />
        <CommentTopContentInfo>
          <CommentTopContentName>{comment.author}</CommentTopContentName>
          <CommentTopContentTime>{comment.date}</CommentTopContentTime>
        </CommentTopContentInfo>
      </CommentTopContent>
      <CommentTopEdit src={Edit} onClick={handleMenu}/>
      <PocoMenu active={active} onChange={setActive} id={comment.id} role='comment' top='9px' right='36px' handleDelete={handleDelete}/>
    </CommentTop>
    <CommentCenter>
      <CommentCenterText>{comment.text}</CommentCenterText>
    </CommentCenter>
    <CommentBottom>
      <CommentBottomTagsContainer>
        <CommentBottomTag>golang</CommentBottomTag>
        <CommentBottomTag>linux</CommentBottomTag>
        <CommentBottomTag>overflow</CommentBottomTag>
      </CommentBottomTagsContainer>
      <CommentBottomActivityWrapper>
        <CommentBottomActivityContainer>
          <CommentBottomActivityIcon src={Eye} />
          <CommentBottomActivityNumber>8</CommentBottomActivityNumber>
        </CommentBottomActivityContainer>
        <CommentBottomActivityContainer>
          <CommentBottomActivityIcon src={Message} />
          <CommentBottomActivityNumber>
</CommentBottomActivityNumber>
        </CommentBottomActivityContainer>
        <CommentBottomActivityContainer>
          <CommentBottomActivityIcon src={Arrow} />
          <CommentBottomActivityNumber>8</CommentBottomActivityNumber>
        </CommentBottomActivityContainer>
      </CommentBottomActivityWrapper>
    </CommentBottom>
  </CommentWrapper>
  )
}

const CommentWrapper = styled.div`
  display: block;
  text-decoration: none;
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  box-sizing: border-box;
  box-shadow: 2px 1px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  padding: 25px 30px;
  margin-bottom: 23px;
`;

const CommentTop = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const CommentTopContent = styled.div`
  display: flex;
  align-items: center;
`;

const CommentIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
`;

const CommentTopContentInfo = styled.div``;

const CommentTopContentName = styled.h3`
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.05em;
  color: #000000;
`;

const CommentTopContentTime = styled.p`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.gray};
`;

const CommentTopEdit = styled.img`
  cursor: pointer;
`;

const CommentCenter = styled.div`
  margin-top: 15px;
`;

const CommentCenterTitle = styled.h2`
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.05em;
  color: #000000;
  margin-bottom: 10px;
`;

const CommentCenterText = styled.p`
  font-weight: 300;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.05em;
  color: #000000;
`;

const CommentBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

const CommentBottomTagsContainer = styled.div<{
  tags?:boolean;
}>`
  display: ${({tags}) => tags ? 'block' : 'none'};
`;

const CommentBottomTag = styled.div`
  display: inline-block;
  background: ${({ theme }) => theme.colors.lightGrey};
  border-radius: 5px;
  padding: 5px 10px;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.gray};
  margin-right: 10px;
`;

const CommentBottomActivityWrapper = styled.div<{
  activity?:boolean;
}>`
  display: ${({activity}) => activity ? 'flex' : 'none'};
`;

const CommentBottomActivityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

const CommentBottomActivityIcon = styled.img`
    margin-right: 3px;
`;

const CommentBottomActivityNumber = styled.p`
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.03em;
  color: ${({theme}) => theme.colors.gray};
`;
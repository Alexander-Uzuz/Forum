import {BaseSyntheticEvent, FC, useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "core/redux/hooks";

import Avatar from "assets/icons/avatar.svg";
import Edit from "assets/icons/edit.svg";
import Eye from "assets/icons/eye.svg";
import Message from "assets/icons/messageActivity.svg";
import Arrow from "assets/icons/arrow-up.svg";
import {IPost} from 'modules/posts/interfaces/IPost';
import { PocoMenu } from "../PoCoMenu/PocoMenu";

type Props = {
  tags?:boolean;
  activity?:boolean;
  post?:IPost | null;
  as?:any;
  to?:string;
};

export const Post:FC<Props> = ({as,to,post,...props}) => {
  const comments = useAppSelector(state => state.comments.comments);
  const currentComments = comments.filter(c => c.postId === post?.id);
  const [activeMenu, setActiveMenu] = useState(false);
  const navigate = useNavigate();

  const handleMenu = () => setActiveMenu(!activeMenu);

  const handlePost = (e:BaseSyntheticEvent) => {
    console.log(e.target.closest('.edit'))
    console.log(e.target.closest('.pocoMenu'),'classModal')
    if(e.target.closest('.edit')){

    }else{
      if(to && !e.target.closest('.pocoMenu')){
        navigate(to)
      }
    }
  }

  return (
    <PostWrapper onClick={handlePost}>
      <PostTop>
        <PostTopContent>
          <PostIcon src={post?.avatarUrl ? post.avatarUrl : Avatar} />
          <PostTopContentInfo>
            <PostTopContentName>{post?.author}</PostTopContentName>
            <PostTopContentTime>{post?.date}</PostTopContentTime>
          </PostTopContentInfo>
        </PostTopContent>
        <PostTopEdit onClick={handleMenu} src={Edit} className='edit'/>
        <PocoMenu active={activeMenu} id={post?.id}/>
      </PostTop>
      <PostCenter>
        <PostCenterTitle>{post?.title}</PostCenterTitle>
        <PostCenterText>
          {post?.description}
        </PostCenterText>
      </PostCenter>
      <PostBottom>
        <PostBottomTagsContainer {...props}>
          <PostBottomTag>golang</PostBottomTag>
          <PostBottomTag>linux</PostBottomTag>
          <PostBottomTag>overflow</PostBottomTag>
        </PostBottomTagsContainer>
        <PostBottomActivityWrapper {...props}>
          <PostBottomActivityContainer>
            <PostBottomActivityIcon src={Eye} />
            <PostBottomActivityNumber>8</PostBottomActivityNumber>
          </PostBottomActivityContainer>
          <PostBottomActivityContainer>
            <PostBottomActivityIcon src={Message} />
            <PostBottomActivityNumber>{currentComments.length}</PostBottomActivityNumber>
          </PostBottomActivityContainer>
          <PostBottomActivityContainer>
            <PostBottomActivityIcon src={Arrow} />
            <PostBottomActivityNumber>8</PostBottomActivityNumber>
          </PostBottomActivityContainer>
        </PostBottomActivityWrapper>
      </PostBottom>
    </PostWrapper>
  );
};

const PostWrapper = styled.div`
  display: block;
  text-decoration: none;
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  box-sizing: border-box;
  box-shadow: 2px 1px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  padding: 25px 30px;
  margin-bottom: 23px;
  cursor: pointer;

  :hover{
    background-color: #D3D3D3;
  }
`;

const PostTop = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const PostTopContent = styled.div`
  display: flex;
  align-items: center;
`;

const PostIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
`;

const PostTopContentInfo = styled.div``;

const PostTopContentName = styled.h3`
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.05em;
  color: #000000;
`;

const PostTopContentTime = styled.p`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.gray};
`;

const PostTopEdit = styled.img`
  cursor: pointer;
  border-radius: 50%;
  padding: 5px;


  :hover{
    background:#F48023;
  }
`;

const PostCenter = styled.div`
  margin-top: 15px;
`;

const PostCenterTitle = styled.h2`
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.05em;
  color: #000000;
  margin-bottom: 10px;
`;

const PostCenterText = styled.p`
  font-weight: 300;
  font-size: 14px;
  line-height: 25px;
  letter-spacing: 0.05em;
  color: #000000;
`;

const PostBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

const PostBottomTagsContainer = styled.div<{
  tags?:boolean;
}>`
  display: ${({tags}) => tags ? 'block' : 'none'};
`;

const PostBottomTag = styled.div`
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

const PostBottomActivityWrapper = styled.div<{
  activity?:boolean;
}>`
  display: ${({activity}) => activity ? 'flex' : 'none'};
`;

const PostBottomActivityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

const PostBottomActivityIcon = styled.img`
    margin-right: 3px;
`;

const PostBottomActivityNumber = styled.p`
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.03em;
  color: ${({theme}) => theme.colors.gray};
`;

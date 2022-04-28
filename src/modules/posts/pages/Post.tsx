import React,{FC, useEffect} from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import {fetchGetPost} from '../PostThunk';
import { fetchAddComments,fetchGetComments } from "modules/comments/commentsThunk";
import {getCurrentComments} from 'modules/comments/commentsSlice'
import { useAppDispatch, useAppSelector } from "core/redux/hooks";
import { IComment} from "../../comments/interfaces/IComment";
import { Post } from "common/components/Post/Post";
import { Comment } from "../components/Comment/Comment";
import { Button } from "common/components";

import Message from "assets/icons/message.svg";

type Props = {};

export const PostView:FC<Props> = (props: Props) => {
  const {user} = useAppSelector(state => state.user);
  const {post} = useAppSelector(state => state.posts)
  const {comments, commentsPost} = useAppSelector(state => state.comments)
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const {register,handleSubmit, formState:{errors},reset} = useForm<{text:string}>()
  const currentComments = comments.find(c => c.postId == id);


  useEffect(() => {

    (async function () {
      if(!comments.length){
        await dispatch(fetchGetComments(user.token))
      }    
      if(user.token){
        await dispatch(fetchGetPost({token:user.token,id}))
        dispatch(getCurrentComments(id))
      }
  })();
  },[])


  const onSubmit = (data:{text:string}) =>{
    const commentData = {
      postId:Number(id),
      ...data,
      author:user.username,
      date:new Date().toUTCString(),
      avatarUrl:user.avatarUrl,
      token:user.token
    }

    dispatch(fetchAddComments(commentData))
    reset()
  }   


  return (
    <PostViewContainer>
      <Post post={post} tags />
      <CommentAddContainer>
        <CommentAddTitle>Add Comment</CommentAddTitle>
        <CommentAddFormContainer onSubmit={handleSubmit(onSubmit)}>
          <CommentInput placeholder="Type here your wise comment" {...register('text', {required:'Text is required'})}/>
          <ButtonContainer>
            <Button
              text="Cancel"
              background="#EAEAEA"
              color="#808080"
              margin="0 10px 0 0"
              padding="8px 20px"
            />
            <Button
              text="Suggest"
              images={Message}
              padding="8px 20px 8px 45px"
              top="7px"
              type="submit"
            />
          </ButtonContainer>
        </CommentAddFormContainer>
      </CommentAddContainer>
      <CommentsContainer>
        {
          commentsPost.map(comment => <Comment comment={comment} key={comment.id}/>)
        }
      </CommentsContainer>
    </PostViewContainer>
  );
};

export const PostViewContainer = styled.div`
  height: 100vh;
  max-width: 725px;
  margin: 54px auto 0;
`;

const CommentAddContainer = styled.div`
  margin-top: 20px;
`;

const CommentAddTitle = styled.h2`
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 20px;
`;

const CommentAddFormContainer = styled.form`
  display:block;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 2px 1px 5px rgba(0, 0, 0, 0.15);
  padding: 30px 40px;
  margin-bottom: 20px;
`;

const CommentInput = styled.input`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  border-radius: 5px;
  outline: none;
  width: 380px;
  height: 42px;
  width: 100%;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.black};
  padding-left: 10px;

  &::placeholder {
    font-weight: 300;
    font-size: 13px;
    line-height: 15px;
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const CommentsContainer = styled.div``;

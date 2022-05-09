import React, {
  FC,
  useState,
  useEffect,
  BaseSyntheticEvent,
  useRef,
  useCallback
} from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useUnsavedChangesWarning from "../hooks/useUnsavedChangesWarning";

import { fetchAddPost, fetchChangePost } from "../PostThunk";
import { IPost } from "../interfaces/IPost";
import { Input, Button } from "common/components";
import { InputFile } from "../components/cAddPost/InputFile";
import { ImageFieldPost } from "../components/cAddPost/ImageFieldPost";
import Icons from "assets/icons/inputFIleIcons.svg";
import PublishIcon from "assets/icons/publishIcon.svg";
import { useAppSelector, useAppDispatch } from "core/redux/hooks";
import { ReactComponent as Camera } from "assets/icons/camera.svg";
import {checkedForbiddenWords} from 'common/helpers/checkedForbiddenWords';
import {useTranslation} from 'react-i18next';

type Props = {};

export const AddPost: FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [Prompt, setDirty, setPristine]:any = useUnsavedChangesWarning();
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const { posts } = useAppSelector((state) => state.posts);
  const currentPost = posts.find((post) => post.id === Number(id));
  const [images, setImages] = useState([]);
  const [text, setText] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IPost>({
    defaultValues: currentPost,
  });




  const handleImage = (event: BaseSyntheticEvent) => {
    setImages(event.target.files[0]);
  };

  const onSubmit = (data: IPost) => {
    setPristine()
    if(!currentPost){
    dispatch(fetchAddPost({...data,avatarUrl:user.avatarUrl,token:user.token,author:user.username, userId:user.id}))
    }else{
      dispatch(fetchChangePost(data))
    }
    navigate('/posts')
  };

  const handleInput = (event:BaseSyntheticEvent) =>{
    setText(checkedForbiddenWords(event.target.value))
    setDirty()   
  }

  return (
    <>
      <AddPostContainer>
        <AddPostFormContainer onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Add Theme"
            width="100%"
            {...register("title", { required: "Title is required" })}
            error={errors.title?.message}
          />
          <AddPostFieldContainer>
            <AddPostFieldContentContainer>
              <AddPostFieldTextarea
                {...register("description", {
                  required: "Description required",
                  minLength: {
                    value: 3,
                    message: "Description must contain at least 3 characters",
                  },
                })}
                placeholder="Add your question"
                value={text}
                onChange={handleInput}
              />
              <AddPostFieldImages>
                {images.length
                  ? images.map((image, index) => (
                      <ImageFieldPost
                        file={image}
                        index={index}
                        key={index}
                        onRemove={(i: number) =>
                          setImages(images.filter((img, index) => index !== i))
                        }
                      />
                    ))
                  : null}
              </AddPostFieldImages>
            </AddPostFieldContentContainer>
            <AddPostButtonsContainer>
              <InputFile
                {...register("image")}
                imgHandler={handleImage}
                listFile={images}
              />
              <Button
                text="Publish"
                images={PublishIcon}
                padding="8px 20px 8px 45px"
                top="8.5px"
              />
            </AddPostButtonsContainer>
          </AddPostFieldContainer>
        </AddPostFormContainer>
      </AddPostContainer>
      {Prompt}
    </>
  );
};

const AddPostContainer = styled.div`
  max-width: 725px;
  margin: 32px auto 0;
`;

const AddPostFormContainer = styled.form`
  background: #ffffff;
  box-shadow: 2px 1px 5px rgba(0, 0, 0, 0.15);
  padding: 30px 40px;
`;

const AddPostFieldContainer = styled.div``;

const AddPostFieldContentContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  padding: 10px;
`;

const AddPostFieldTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  resize: none;
  outline: none;
  /* border:1px solid ${({ theme }) => theme.colors.lightGrey}; */
  border: none;
  border-radius: 5px;

  &::placeholder {
    font-weight: 300;
    font-size: 13px;
    line-height: 15px;
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const AddPostButtonsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddPostFieldImages = styled.div``;

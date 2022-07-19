import {FC,useState,BaseSyntheticEvent, useEffect} from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAddPost, fetchChangePost } from "../PostThunk";
import { IPost } from "../interfaces/IPost";
import { Input, Button } from "common/components";
import { InputFile } from "../components/cAddPost/InputFile";
import { ImageFieldPost } from "../components/cAddPost/ImageFieldPost";
import PublishIcon from "assets/icons/publishIcon.svg";
import { useAppSelector, useAppDispatch } from "core/redux/hooks";
import Camera from "assets/icons/camera.svg";
import Music from "assets/icons/music.svg";
import Video from "assets/icons/video.svg";
import { checkedForbiddenWords } from "common/helpers/checkedForbiddenWords";
import { useTranslation } from "react-i18next";
import { removeUser } from "modules/authorization/authSlice";

type Props = {};

export const AddPost: FC<Props> = (props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const { posts,error } = useAppSelector((state) => state.posts);
  const currentPost = posts.find((post) => post.id === Number(id));
  const [image, setImage] = useState<string[]>([]);
  const [audio, setAudio] = useState<string[]>([]);
  const [video, setVideo] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [_error, _setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPost>({
    defaultValues: currentPost,
  });

  useEffect(() => {
    if(error === "jwt expired"){
      dispatch(removeUser())
      localStorage.removeItem('token');
      navigate('/login')
    }
  },[error])



  const handleImage = (base64:string) => setImage([...image,base64])
  const handleAudio = (base64:string) => setAudio([...audio, base64])
  const handleVideo = (base64:string) => setVideo([...video,base64])
  const handleInput = (event: BaseSyntheticEvent) => setText(checkedForbiddenWords(event.target.value));

  const onSubmit = (data: IPost) => {
    if(!currentPost){
    dispatch(fetchAddPost(
      {
        ...data,
        avatarUrl:user?.avatarUrl,
        token:user?.token,
        author:user?.username, 
        userId:user?.id,
      }))
    }else{
      dispatch(fetchChangePost(data))
    }
    navigate('/posts')
  };

  

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
                value={text.replace(/\(%!XXX1!%|\^xxXxx\^|!@#TTT\(\*&\)/gi, () => '*****')}
                onChange={handleInput}
              />
              <AddPostFieldImages>
                {image.length ? (
                  image.map((item,index) => {
                    return (
                      <ImageFieldPost
                      key={index}
                      file={item}
                      index={index}
                      onRemove={(index:number) => setImage(image.filter((item,i) => index !== i))}
                      type="images"
                    />
                    )
                  })
                ) : null}
                {audio.length ? (
                  audio.map((item, index) =>{
                    return (
                      <ImageFieldPost
                      key={index}
                      file={item}
                      index={index}
                      onRemove={(index:number) => setAudio(audio.filter((item, i) => index !== i))}
                      type="audio"
                    />
                    )
                  })
                ) : null}
                {video.length ? (
                  video.map((item, index) =>{
                    return(
                      <ImageFieldPost
                      key={index}
                      index={index}
                      file={item}
                      onRemove={(index:number) => setVideo(video.filter((item, i) => index !== i))}
                      type="video"
                    />
                    )
                  })
                ) : null}
              </AddPostFieldImages>
              <ErrorMessage>{error && error}</ErrorMessage>
            </AddPostFieldContentContainer>
            <AddPostButtonsContainer>
              <InputFileContainer>
                <InputFile
                  type="image"
                  handleError={_setError}
                  imgHandler={handleImage}
                  icon={Camera}
                />
                <InputFile
                  type="audio"
                  handleError={_setError}
                  imgHandler={handleAudio}
                  icon={Music}
                />
                <InputFile
                  type="video"
                  handleError={_setError}
                  imgHandler={handleVideo}
                  icon={Video}
                />
              </InputFileContainer>
              <Button
                text={t("buttonPublist")}
                images={PublishIcon}
                padding="8px 20px 8px 45px"
                top="8.5px"
              />
            </AddPostButtonsContainer>
          </AddPostFieldContainer>
        </AddPostFormContainer>
      </AddPostContainer>
      {/* {Prompt} */}
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

const ErrorMessage = styled.p`
  font-weight: 500;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: 0.02em;
  text-indent: 15px;
  color: ${({ theme }) => theme.colors.red};
  margin-bottom: 10px;
`;

const AddPostFieldImages = styled.div``;

const InputFileContainer = styled.div`
  display: flex;
  align-items: center;
`;

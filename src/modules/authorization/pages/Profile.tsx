import { FC, useState, useRef,useEffect, BaseSyntheticEvent } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "core/redux/hooks";

import { IFormLoginFull } from "../interfaces/IFormLogin";
import { fetchLoginChange } from "../authThunk";
import { Input } from "common/components/Input/Input";
import { ButtonBtn, Button } from "common/components/Button/Button";
import {AddPhoto} from '../components/AddPhoto';

type Props = {};

export const Profile: FC<Props> = (props) => {
  const ref:any = useRef(null);
  const [avatarUrl,setAvatarUrl] = useState(null);
  const {error} = useAppSelector(state => state.user);

  const [showNewPassword,setShowNewPassword] = useState(false);
  const user = JSON.parse(`${localStorage.getItem("user")}`);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormLoginFull>({
    defaultValues: user,
  });
  const currentNewPassword = watch("newPassword","");

  useEffect(() => {setAvatarUrl(user.avatarUrl)},[])

  const onSubmit = (data:IFormLoginFull) => {
    const {againNewPassword,...rest} = data;
    dispatch(fetchLoginChange({...rest,avatarUrl}));
  };

  const handleShowPassword = () => setShowNewPassword(!showNewPassword);

  const handleInputFileClick = () => ref.current.click()

  const handleInputFile = (event:BaseSyntheticEvent) => {

    console.log('Изменения')

    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function(){
      var inputData:any = reader.result;
      setAvatarUrl(inputData)
    }
  }

  return (
    <ProfileWrapper>
      <ProfileTitle>Личный кабинет</ProfileTitle>
      <ProfileContainer>
        <ProfilePhotoContainer>
          <AddPhoto onClick={handleInputFileClick} ref={ref} onChange={handleInputFile} value={avatarUrl}/>
        </ProfilePhotoContainer>
        <ProfileForm onSubmit={handleSubmit(onSubmit)}>
          <ProfileInputContainer height={showNewPassword ? 'auto' : '210px'}>
            <Input placeholder="username" {...register("username",{required:"Name required"})} error={errors.username?.message} />
            <Input placeholder="email" {...register("email",{required:"Email is required"})} error={errors.email?.message} />
            <Input
              placeholder="password"
              {...register("password",{required:"Password required", minLength:{value:3, message:"Password must contain at least 3 characters"}})}
              error={errors.password?.message}
              type="password"
            />
            <ProfileInputPasswordsContainer display={showNewPassword ? 'block' : 'none'}>
            <Input type="password" placeholder="new password" {...register("newPassword",{minLength:{value:3,message:"New password must contain at least 3 characters"}})} error={errors.newPassword?.message}/>
            <Input type="password" placeholder="repeat new password" {...register("againNewPassword", { validate: value => value === currentNewPassword || "The passwords do not match"})} error={errors.againNewPassword?.message}/>
            </ProfileInputPasswordsContainer>
             {error ? <ErrorMessage>{error}</ErrorMessage> : ''}
          </ProfileInputContainer>
          <ProfileButtonContainer>
            <Button text="Сохранить" background="#1682FD" margin="0 30px 0 0" />
            <ProfileTitlePassword type="button" onClick={handleShowPassword}>Хотите сменить пароль?</ProfileTitlePassword>
          </ProfileButtonContainer>
        </ProfileForm>
      </ProfileContainer>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div`
  max-width: 725px;
  margin: 50px auto 0;
`;

const ProfileTitle = styled.h1`
  font-weight: 900;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0.05em;
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 30px;
`;

const ProfileContainer = styled.div`
  display: flex;
`;

const ProfilePhotoContainer = styled.div``;

const ProfilePhoto = styled.div`
  /* width: 160px;
  height: 160px;
  border-radius: 50%;
  background: grey;
  margin-right: 40px;
  cursor:pointer; */
`;

const ProfilePhotoButton = styled(ButtonBtn)`
  width: 160px;
  margin-top: 50px;
`;

const ProfileInputFile = styled.input`
  visibility: hidden;
`

const ProfileForm = styled.form``;

const ProfileInputContainer = styled.div<{
  height:'210px' | 'auto'
}>`
  height:${({height}) => height};
`;

const ProfileInputPasswordsContainer = styled.div<{
  display:'block' | 'none'
}>`
  display:${({display}) => display}
`

const ProfileButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content:space-between;
`;

const ProfileTitlePassword = styled.button`
  font-weight: 500;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: 0.02em;
  text-indent: 15px;
  color:#F48023;
  cursor:pointer;
  border:none;
  background:transparent;
`;

const ErrorMessage = styled.p`
  font-weight: 500;
  font-size: 10px;
  letter-spacing: 0.02em;
  color: ${({theme}) => theme.colors.red};
`;




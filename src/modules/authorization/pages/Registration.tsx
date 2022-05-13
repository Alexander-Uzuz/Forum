import { FC, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "core/redux/hooks";
import { useTranslation } from "react-i18next";

import { fetchRegistration } from "../authThunk";
import { Input, Button } from "../../../common/components";
import { Title } from "../components/Title";
import { IFormRegistrationFront } from "../interfaces/IFormRegistration";
import Background from "assets/images/backgroundRegister.png";

type Props = {};

export const Registration: FC<Props> = (props) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {error,user} = useAppSelector(state => state.user)
  const {register, handleSubmit,watch, formState:{errors}} = useForm<IFormRegistrationFront>();
  const passwordCurrent = watch("password", "");

  const onSubmit = (data:IFormRegistrationFront) =>{
    const {confirmPassword,...rest} = data;
    dispatch(fetchRegistration(rest));
  }

  useEffect(() => {
    if(user.token){
      navigate('/posts')
    }
  }, [user])

  return (
    <>
      <RegistrationContainer>
        <FormWrapper>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Title
              title={t("titleRegistration")}
              subtitle={t("subtitleRegistration")}
            />
            <Input placeholder="Username" {...register('username',{required:'Name required'})} error={errors.username?.message}/>
            <Input placeholder="Email" {...register('email',{required:'Email required'})} error={errors.email?.message}/>
            <Input placeholder="Password" type="password" {...register('password',{required:'Password required', minLength:{
              value:3,
              message:'Password must contain at least 3 characters'
            }})}/>
            <Input placeholder="Repeat password" type="password" {...register('confirmPassword', {
              required:'Confirm password',
              validate: value => value === passwordCurrent || 'The passwords do not match'
            })} error={errors.confirmPassword?.message}/>
            {error ? <ErrorMessage>{error}</ErrorMessage> : ''}
            <Button text={t("buttonRegister")} width="100%" type="submit"/>
          </FormContainer>
        </FormWrapper>
        <BackgroundPage src={Background} />
      </RegistrationContainer>
    </>
  );
};

const RegistrationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${({theme}) => theme.media.laptopL}{
    justify-content: center;
    height:100vh;
  }
`;

const FormWrapper = styled.div``;

const FormContainer = styled.form`
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${({theme}) => theme.media.laptopL}{
    margin-left: 0;
  }
`;

const BackgroundPage = styled.img`
  @media ${({theme}) => theme.media.laptopL}{
    display:none;
  }
`;

const ErrorMessage = styled.p`
  font-weight: 500;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: 0.02em;
  text-indent: 15px;
  color: ${({theme}) => theme.colors.red};
  margin-bottom: 10px;
`;

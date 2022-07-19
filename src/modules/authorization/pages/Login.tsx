import { FC, useEffect, Suspense } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Input, Button } from "../../../common/components";
import { IFormLogin } from "../interfaces/IFormLogin";
import { Title } from "../components/Title";
import Background from "assets/images/backgroundLogin.png";
import { fetchLogin } from "../authThunk";
import { useAppDispatch, useAppSelector } from "core/redux/hooks";
import {useTranslation} from 'react-i18next'

type Props = {};

export const Login: FC<Props> = (props) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, user } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>();

  const onSubmit = (data: IFormLogin) => {
    dispatch(fetchLogin(data));
  };


  useEffect(() => {
    if (user?.token) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/posts");
    }
  }, [user]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginWrapper>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Title
            title={t("titleLogin")}
            subtitle={t("subtitleLogin")}
          />
          <Input
            placeholder={t("email")}
            {...register("email", { required: "Email required" })}
            error={!error ? errors.email?.message : ""}
          />
          <Input
            placeholder={t("password")}
            type="password"
            {...register("password", {
              required: "Password required",
              minLength: {
                value: 3,
                message: "Password must contain at least 3 characters",
              },
            })}
            error={!error ? errors.password?.message : ""}
          />
          {error ? <ErrorMessage>{error}</ErrorMessage> : ""}
          <Button text={t("buttonLogin")} width="100%" type="submit" />
        </FormContainer>
        <LoginImages src={Background} />
      </LoginWrapper>
    </Suspense>
  );
};

const FormContainer = styled.form`
  margin-left: 120px;

  @media ${({theme}) => theme.media.laptopL}{
    margin-left: 0;
  }
`;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${({theme}) => theme.media.laptopL}{
    justify-content: center;
    height:100vh;
  }
`;

const LoginImages = styled.img`
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
  color: ${({ theme }) => theme.colors.red};
  margin-bottom: 10px;
`;

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

type Props = {};

export const Login: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, user } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLogin>();

  const onSubmit = (data: IFormLogin) => {
    console.log(data, "data");
    dispatch(fetchLogin(data));
  };

  useEffect(() => {
    if (user.token) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/posts");
    }
  }, [user]);

  return (
      <LoginWrapper>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Title
            title="Hello kitty"
            subtitle="More than 150 questions are waiting for your wise suggestions!"
          />
          <Input
            placeholder="email"
            {...register("email", { required: "Email required" })}
            error={!error ? errors.email?.message : ""}
          />
          <Input
            placeholder="password"
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
          <Button text="Login" width="100%" type="submit" />
        </FormContainer>
        <LoginImages src={Background} />
      </LoginWrapper>
  );
};

const FormContainer = styled.form`
  margin-left: 120px;
`;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LoginImages = styled.img``;

const ErrorMessage = styled.p`
  font-weight: 500;
  font-size: 10px;
  line-height: 20px;
  letter-spacing: 0.02em;
  text-indent: 15px;
  color: ${({ theme }) => theme.colors.red};
  margin-bottom: 10px;
`;

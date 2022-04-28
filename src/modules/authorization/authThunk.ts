import { IFormLogin, IFormLoginFull } from "./interfaces/IFormLogin";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, loginChange } from "api/auth/authService";
import { IFormRegistration } from "./interfaces/IFormRegistration";
import { registration } from "api/auth/authService";

export const fetchLoginChange: any = createAsyncThunk(
  "user/fetchLoginChange",
  async function (data: IFormLoginFull, { rejectWithValue }) {
    try {
      const { email, password, ...rest } = data;
      const response = await login({ email, password });

      if (response) {
        if (data.newPassword) {
          const {newPassword, ...obj} = data;

          const res = await loginChange({
            ...obj,
            password:newPassword,
          });
          const { password, ...rest } = res;

          return rest;
        } else {
          const res = await loginChange(data);
          const { password, ...rest } = res;

          return rest;
        }
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchLogin: any = createAsyncThunk(
  "user/fetchLogin",
  async function (data: IFormLogin, { rejectWithValue }) {
    try {
      const response = await login(data);
      localStorage.setItem("user", JSON.stringify(response));

      if (typeof response === "string") {
        throw new Error(response);
      }

      return response;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchRegistration: any = createAsyncThunk(
  "user/fetchRegistration",
  async function (data: IFormRegistration, { rejectWithValue }) {
    try {
      const response = await registration(data);

      if (typeof response === "string") {
        throw new Error(response);
      }

      return response;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

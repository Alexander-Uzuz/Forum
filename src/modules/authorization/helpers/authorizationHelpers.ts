import { IStateUser,IStateUserData,IResponse } from "../interfaces/authorizationInterface";
import { PayloadAction } from "@reduxjs/toolkit";

export const setPending = (state:IStateUser) =>{
    state.error = null;
}

export const setFulfilled = (state:IStateUser, action:PayloadAction<IResponse>) =>{
    if(action.payload){
        state.user.token = action.payload.accessToken;
        state.user.username = action.payload.user.username;
        state.user.email = action.payload.user.email;
        state.user.avatarUrl = action.payload.user.avatarUrl;
        state.user.id = action.payload.user.id;
    }
}

export const setFulfilledLoginChange = (state:IStateUser, action:PayloadAction<IStateUserData>) =>{
    localStorage.setItem('user',JSON.stringify(action.payload))
    state.user.token = action.payload.token;
    state.user.username = action.payload.username;
    state.user.email = action.payload.email;
    state.user.avatarUrl = action.payload.avatarUrl;
    state.user.id = action.payload.id;
}


export const setRejected = (state:IStateUser,action:PayloadAction<string | null>) =>{
    state.error = action.payload;
}
import { IStateUser,IStateUserData,IResponse } from "../interfaces/authorizationInterface";
import { PayloadAction } from "@reduxjs/toolkit";

export const setPending = (state:IStateUser) =>{
    state.error = null;
}

export const setFulfilled = (state:IStateUser, action:PayloadAction<IResponse>) =>{
    if(action.payload){
        state.user = {...action.payload.user, token:action.payload.accessToken};
    }
}

export const setFulfilledLoginChange = (state:IStateUser, action:PayloadAction<IStateUserData>) =>{
    localStorage.setItem('user',JSON.stringify(action.payload))
    state.user = action.payload;
}


export const setRejected = (state:IStateUser,action:PayloadAction<string | null>) =>{
    state.error = action.payload;
}
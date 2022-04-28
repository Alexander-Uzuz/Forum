import { createSlice } from "@reduxjs/toolkit";
import { IStateUser } from "./interfaces/authorizationInterface";
import {setPending, setFulfilled,setRejected,setFulfilledLoginChange} from './helpers/authorizationHelpers'
import { fetchLogin,fetchRegistration, fetchLoginChange } from "./authThunk";



const initialState:IStateUser = {
    user:{
        username:null,
        email:null,
        avatarUrl:null,
        token:null,
        id:null,
    },
    error:null
};


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        removeUser(state){
            state.user.username = null;
            state.user.email = null;
            state.user.avatarUrl = null;
            state.user.token = null;
            state.user.id = null;
        }
    },
    extraReducers:{
        [fetchLogin.pending]:setPending,
        [fetchLogin.fulfilled]:setFulfilled,
        [fetchLogin.rejected]:setRejected,
        [fetchRegistration.pending]:setPending,
        [fetchRegistration.fulfilled]:setFulfilled,
        [fetchRegistration.rejected]:setRejected,
        [fetchLoginChange.pending]:setPending,
        [fetchLoginChange.fulfilled]:setFulfilledLoginChange,
        [fetchLoginChange.rejected]:setRejected,
    }
})

export const {removeUser} = userSlice.actions;
export default userSlice.reducer
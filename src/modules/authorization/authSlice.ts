import { createSlice } from "@reduxjs/toolkit";
import { IStateUser } from "./interfaces/authorizationInterface";
import {setPending, setFulfilled,setRejected} from './helpers/authorizationHelpers'
import { fetchLogin,fetchRegistration } from "./authThunk";



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
            state.user = null;
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(fetchLogin .pending, setPending)
        builder.addCase(fetchLogin .fulfilled, setFulfilled)
        builder.addCase(fetchLogin .rejected, setRejected)

        builder.addCase(fetchRegistration .pending, setPending)
        builder.addCase(fetchRegistration .fulfilled, setFulfilled)
        builder.addCase(fetchRegistration .rejected, setRejected)
    }
})

export const {removeUser} = userSlice.actions;
export default userSlice.reducer
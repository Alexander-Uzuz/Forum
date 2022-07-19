import { createAsyncThunk } from "@reduxjs/toolkit";
import {getComments,addComments,removeComments} from 'api/comments/commentsService';


export const fetchGetComments:any = createAsyncThunk(
    'comments/fetchGetComments',
    async function(token:any,{rejectWithValue}){
        try{
            const response = await getComments(token);

            return response;
        }catch(err:any){return rejectWithValue(err.message)}
        
    }
)

export const fetchAddComments:any = createAsyncThunk(
    'comments/fetchAddComments',
    async function(data:any,{rejectWithValue}){
        try{
            const response = await addComments(data);

            return response;
        }catch(err:any){
            return rejectWithValue(err.message)
        }
    }
)

export const fetchRemoveComments:any = createAsyncThunk(
    'comments/fetchRemoveComments',
    async function(data:{id:number,token:any},{rejectWithValue}){
        try{
            const response = await removeComments(data);

            return data.id

        }catch(err:any)
        {
            return rejectWithValue(err.message)
        }
    }
)
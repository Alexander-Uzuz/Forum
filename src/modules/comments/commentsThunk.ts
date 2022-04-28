import { IComment } from './interfaces/IComment';
import { createAsyncThunk } from "@reduxjs/toolkit";
import {getComments,addComments} from 'api/comments/commentsService'

export const fetchGetComments:any = createAsyncThunk(
    'comments/fetchGetComments',
    async function(token:any,{rejectWithValue}){
        try{
            const response = await getComments(token);

            if(typeof response === 'string'){
                throw new Error(response)
            }

            return response;
        }catch(err:any){return rejectWithValue(err.message)}
        
    }
)

export const fetchAddComments:any = createAsyncThunk(
    'comments/fetchAddComments',
    async function(data:any,{rejectWithValue}){
        try{
            const response = await addComments(data);

            if(typeof response === 'string'){
                throw new Error(response)
            }

            return response;
        }catch(err:any){
            return rejectWithValue(err.message)
        }
    }
)
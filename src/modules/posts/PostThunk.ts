import {createAsyncThunk} from '@reduxjs/toolkit';
import {addPost, getPosts, getPost, changePost,removePost} from 'api/posts/postsService';
import { IPost } from './interfaces/IPost';
import { addPostReducer, removePostReducer } from './postsSlice';


export const fetchGetPosts:any = createAsyncThunk(
    'posts/fetchGetPosts',
    async function(token,{rejectWithValue}){
        try{
            const response = await getPosts(token);

            if(typeof response === 'string'){
                throw new Error(response)
            }

            return response;
        }catch(err:any){
            return rejectWithValue(err.message)
        }
    }
)

export const fetchGetPost:any = createAsyncThunk(
    'posts/fetchGetPost',
    async function(data:{token:any,id:string},{rejectWithValue}){
        try{
            const response = await getPost(data);

            if(typeof response === 'string'){
                throw new Error(response)
            }

            return response
        }catch(err:any){
            return rejectWithValue(err.message)
        }
    }
)

export const fetchAddPost:any = createAsyncThunk(
    'posts/fetchAddPost',
    async function(data:IPost,{rejectWithValue, dispatch}){
        try{
            const response = await addPost(data);

            if(typeof response === 'string'){
                throw new Error(response)
            }

            // dispatch(addPostReducer(response))

            return response;
        }catch(err:any){
            return rejectWithValue(err.message);
        }
    }
)

export const fetchChangePost:any = createAsyncThunk(
    'posts/fetchChangePost',
    async function(data:IPost,{rejectWithValue}){
        try{
            const response = await changePost(data);

            return response;
        }catch(err:any){
            return rejectWithValue(err.message);
        }
    }
)

export const fetchRemovePost:any = createAsyncThunk(
    'posts/fetchRemovePost',
    async function(data:{id:number,token:any},{rejectWithValue, dispatch}){
        try{
            const response = await removePost(data);

            // dispatch(removePostReducer(data.id))

            return response;

            console.log(response,'response')
        }catch(err:any){
            return rejectWithValue(err.message)
        }
    }
)
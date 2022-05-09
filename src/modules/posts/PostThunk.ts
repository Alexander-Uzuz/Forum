import {createAsyncThunk} from '@reduxjs/toolkit';
import {addPost, getPosts, getPost, changePost,removePost} from 'api/posts/postsService';
import { IPost } from './interfaces/IPost';
import { addPostReducer, removePostReducer,getPostsReducer,getPostReducer,changePostReducer } from './postsSlice';


export const fetchGetPosts:any = createAsyncThunk(
    'posts/fetchGetPosts',
    async function(token,{rejectWithValue, dispatch}){
        try{
            const response = await getPosts(token);

            // dispatch(getPostsReducer(response))
            return response;

        }catch(err:any){
            return rejectWithValue(err.message)
        }
    }
)

export const fetchGetPost:any = createAsyncThunk(
    'posts/fetchGetPost',
    async function(data:{token:any,id:string},{rejectWithValue, dispatch}){
        try{
            const response = await getPost(data);

            // dispatch(getPostReducer(response))
            return response;
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

            // dispatch(addPostReducer(response))
            return response;

        }catch(err:any){
            return rejectWithValue(err.message);
        }
    }
)

export const fetchChangePost:any = createAsyncThunk(
    'posts/fetchChangePost',
    async function(data:IPost,{rejectWithValue, dispatch}){
        try{
            const response = await changePost(data);

            // dispatch(changePostReducer(response))

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

            return data.id;
        }catch(err:any){
            return rejectWithValue(err.message)
        }
    }
)
import {IPostState,IPost} from '../interfaces/IPost'
import { PayloadAction } from "@reduxjs/toolkit";

export const setPending = (state:IPostState) =>{
}

export const setFulfilledAdd = (state:IPostState, action:PayloadAction<IPost>) =>{
    state.posts = [...state.posts,action.payload]
}

export const setFulfilledGetPosts = (state:IPostState, action:PayloadAction<IPost[]>) =>{
    state.posts = action.payload
}

export const setFulfilledChangePost = (state:IPostState, action:PayloadAction<IPost>) =>{
    state.posts = state.posts.map(post => post.id === Number(action.payload.id) ? action.payload : post)
}

export const setFulfilledGetPost = (state:IPostState, action:PayloadAction<IPost>) =>{
    state.post = action.payload;
}

export const setRejected = (state:IPostState,action:PayloadAction<string | null>) =>{
    state.error = action.payload;
}
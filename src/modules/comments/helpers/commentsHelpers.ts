import { PayloadAction } from "@reduxjs/toolkit";
import {ICommentState,IComment} from '../interfaces/IComment'

export const setPending = (state:ICommentState) =>{
}

export const setFulfilledGetComments = (state:ICommentState, action:PayloadAction<IComment[]>) =>{
    state.comments = action.payload
}

export const setFulfilledAddComments = (state:ICommentState,action:PayloadAction<IComment>) =>{
    state.commentsPost = [...state.commentsPost,action.payload]
}

export const setRejected = (state:ICommentState,action:PayloadAction<string | null>) =>{
    state.error = action.payload;
}
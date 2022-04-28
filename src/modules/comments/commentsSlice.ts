import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { ICommentState } from "./interfaces/IComment";
import {fetchGetComments, fetchAddComments} from './commentsThunk'
import {setPending,setFulfilledGetComments, setRejected,setFulfilledAddComments} from './helpers/commentsHelpers'


const initialState:ICommentState = {
    comments:[],
    commentsPost:[],
    error:null,
}

const commentsSlice = createSlice({
    name:'comments',
    initialState,
    reducers:{
        getCurrentComments(state,action:PayloadAction<string | undefined>){
            state.commentsPost = state.comments.filter(c => c.postId === Number(action.payload))
        }
    },
    extraReducers:{
        [fetchGetComments.pending]:setPending,
        [fetchGetComments.fulfilled]:setFulfilledGetComments,
        [fetchGetComments.rejected]:setRejected,
        [fetchAddComments.fulfilled]:setFulfilledAddComments,
    }
});

export const {getCurrentComments} = commentsSlice.actions;
export default commentsSlice.reducer;
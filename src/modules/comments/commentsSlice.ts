import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { ICommentState,IComment } from "./interfaces/IComment";
import {fetchGetComments, fetchAddComments, fetchRemoveComments} from './commentsThunk'
import {setPending,setFulfilledGetComments, setRejected,setFulfilledAddComments} from './helpers/commentsHelpers'


const initialState:ICommentState = {
    comments:[],
    commentsPost:[],
    error:null,
    loading:false,
}

const commentsSlice = createSlice({
    name:'comments',
    initialState,
    reducers:{
        getCurrentCommentsReducer(state,action:PayloadAction<string | undefined>){
            state.commentsPost = state.comments.filter(c => c.postId === Number(action.payload))
        },
        
    },
    extraReducers:(builder) =>{
        builder.addCase(fetchGetComments .pending, state =>{
            state.error = null;
            state.comments = [];
            state.commentsPost = [];
            state.loading = true;
        });
        builder.addCase(fetchGetComments .fulfilled, (state,action) =>{
            state.comments = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchGetComments .rejected, (state, action) =>{
            state.error = action.payload;
        });


        builder.addCase(fetchAddComments .pending,(state) =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchAddComments .fulfilled, (state,action) =>{
            state.comments.push(action.payload)
            state.commentsPost.push(action.payload);
            state.loading = false;           
        });
        builder.addCase(fetchAddComments .rejected, (state, action) =>{
            state.error = action.payload;
        });

        builder.addCase(fetchRemoveComments .pending, state =>{
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchRemoveComments .fulfilled, (state, action) =>{
            state.comments = state.comments.filter(comment => comment.id !== action.payload);
            state.commentsPost = state.comments.filter(comment => comment.id !== action.payload);
            state.loading = false;
        });
        builder.addCase(fetchRemoveComments .rejected, (state,action) =>{
            state.error = action.payload;
        })
    },
});

export const {getCurrentCommentsReducer} = commentsSlice.actions;
export default commentsSlice.reducer;
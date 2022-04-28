import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {IPostState,IPost} from './interfaces/IPost';
import {
  setPending,
  setFulfilledAdd,
  setFulfilledGetPosts,
  setFulfilledGetPost,
  setFulfilledChangePost,
  setRejected,
} from "./helpers/postHelpers";
import {
  fetchAddPost,
  fetchGetPosts,
  fetchGetPost,
  fetchChangePost,
} from "./PostThunk";

const initialState: IPostState = {
  posts: [],
  post: null,
  error: null,
  loading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
      addPostReducer(state:IPostState,action:PayloadAction<IPost>){
          state.posts.push(action.payload);
      },
      removePostReducer(state:IPostState,action:PayloadAction<number>){
        state.posts = state.posts.filter(post => post.id !== action.payload);
      }
  },
  extraReducers: {
    [fetchAddPost.pending]: setPending,
    [fetchAddPost.fulfilled]: setFulfilledAdd,
    [fetchAddPost.rejected]: setRejected,
    [fetchGetPosts.pending]: setPending,
    [fetchGetPosts.fulfilled]: setFulfilledGetPosts,
    [fetchGetPosts.rejected]: setRejected,
    [fetchGetPost.pending]: setPending,
    [fetchGetPost.fulfilled]: setFulfilledGetPost,
    [fetchChangePost.rejected]: setRejected,
    [fetchChangePost.pending]: setPending,
    [fetchChangePost.fulfilled]: setFulfilledChangePost,
    [fetchChangePost.rejected]: setRejected,
  },
});

export const {addPostReducer, removePostReducer} = postsSlice.actions;
export default postsSlice.reducer;

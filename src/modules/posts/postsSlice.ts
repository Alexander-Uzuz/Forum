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
  fetchRemovePost
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
      // getPostsReducer(state:IPostState,action:PayloadAction<IPost[]>){
      //   state.posts = action.payload;
      // },
      // getPostReducer(state:IPostState,action:PayloadAction<IPost>){
      //   state.post = action.payload
      // },
      // addPostReducer(state:IPostState,action:PayloadAction<IPost>){
      //   state.posts.push(action.payload);
      // },
      // removePostReducer(state:IPostState,action:PayloadAction<number>){
      //   state.posts = state.posts.filter(post => post.id !== action.payload);
      // },
      // changePostReducer(state:IPostState,action:PayloadAction<IPost>){
      //   let currentPost = state.posts.find(post => post.id === action.payload.id);
      //   currentPost = action.payload
      // }
  },
  extraReducers: (builder) =>{
    builder.addCase(fetchAddPost.pending, state =>{
      state.loading = true;
    });
    builder.addCase(fetchAddPost.fulfilled, (state,action:PayloadAction<IPost>) =>{
      state.loading = false;
      state.posts.push(action.payload)
    });
    builder.addCase(fetchAddPost.rejected, (state,action) =>{
      state.error = action.payload;
    });

    builder.addCase(fetchGetPosts.pending, state =>{
      state.loading = true;
    });
    builder.addCase(fetchGetPosts.fulfilled,(state,action:PayloadAction<IPost[]>) =>{
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchGetPosts.rejected,(state,action) =>{
      state.error = action.payload;
    });

    builder.addCase(fetchGetPost .pending, state =>{
      state.loading = true;
    });
    builder.addCase(fetchGetPost .fulfilled, (state,action:PayloadAction<IPost>) =>{
      state.loading = false;
      state.post = action.payload;
    });
    builder.addCase(fetchGetPost .rejected, (state, action) =>{
      state.error = action.payload;
    });

    builder.addCase(fetchChangePost .pending, state =>{
      state.loading = true;
    })
    builder.addCase(fetchChangePost .fulfilled, (state,action:PayloadAction<IPost>) =>{
      let currentPost = state.posts.find(post => post.id === action.payload.id);
      currentPost = action.payload;
      state.loading = false;
    })
    builder.addCase(fetchChangePost .rejected, (state, action) =>{
      state.error = action.payload;
    })

    builder.addCase(fetchRemovePost .pending, state =>{
      state.loading = true;
    });
    builder.addCase(fetchRemovePost .fulfilled, (state,action) =>{
      state.posts = state.posts.filter(post => post.id !== action.payload);
      state.loading = false;
    });
    builder.addCase(fetchRemovePost .rejected, (state,action) =>{
      state.error = action.payload;
    })
  },
});
// addPostReducer, removePostReducer,getPostsReducer, getPostReducer,changePostReducer


export const {} = postsSlice.actions;
export default postsSlice.reducer;

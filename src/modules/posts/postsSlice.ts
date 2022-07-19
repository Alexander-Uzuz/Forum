import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {IPostState,IPost} from './interfaces/IPost';
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
  reducers: {},
  extraReducers: (builder) =>{
    builder.addCase(fetchAddPost.pending, state =>{
      state.loading = true;
      state.error = null;
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
      state.error = null;
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
      state.posts = state.posts.map(item => item.id === action.payload.id ? action.payload : item);
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

export const {} = postsSlice.actions;
export default postsSlice.reducer;

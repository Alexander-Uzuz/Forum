import {combineReducers} from '@reduxjs/toolkit';
import userReducer from 'modules/authorization/authSlice';
import postsReducer from 'modules/posts/postsSlice';
import commentsReducer from 'modules/comments/commentsSlice';

export const rootReducer = combineReducers({
    user:userReducer,
    posts:postsReducer,
    comments:commentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
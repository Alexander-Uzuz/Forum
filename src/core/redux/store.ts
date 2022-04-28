import {configureStore} from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import {IPreloadedState} from 'modules/authorization/interfaces/authorizationInterface';

const preloadedUserState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : {username:null,avatarUrl:null,token:null,id:null};


const preloadedState:IPreloadedState = {
    user:{
        user:{
            username:preloadedUserState.username,
            email:preloadedUserState.email,
            avatarUrl:preloadedUserState.avatarUrl,
            token:preloadedUserState.token,
            id:preloadedUserState.id
        },
        error:null,
    },
}

// export const store = configureStore({
//     reducer:rootReducer,
    
// })

export const store = configureStore({
    reducer:rootReducer,
    preloadedState
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

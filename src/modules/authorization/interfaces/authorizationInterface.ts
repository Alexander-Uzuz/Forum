export interface IStateUser{
    user:IStateUserData,
    error:null | string;
}

export interface IStateUserData{
    username:string | null,
    email:string | null,
    token:string | null,
    avatarUrl:string | null;
    id:number | null;
    password?:string;
}

export interface IResponse{
    accessToken:string;
    user:{
        email:string;
        id:number;
        username:string;
        avatarUrl:string | null;
    }
}

export interface IPreloadedState{
        user:IStateUser
}
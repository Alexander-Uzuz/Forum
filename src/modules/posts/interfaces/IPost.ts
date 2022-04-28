export interface IPost{
    title:string;
    description:string;
    tags?:string;
    images?:string;
    userId:string;
    id:number;
    author?:string;
    date?:string;
    message:string;
    avatarUrl?:string;
    token?:string;
}

export interface IPostState{
    posts:IPost[],
    post:IPost | null,
    error:string | null;
    loading:boolean;
}
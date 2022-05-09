

export interface IComment{
    postId:number | undefined | string;
    author:string | null;
    date:string;
    text:string;
    avatarUrl:string | null;
    id:number;
}




export interface ICommentState{
    comments:IComment[],
    commentsPost:IComment[],
    error:string | null;
    loading:boolean;
}
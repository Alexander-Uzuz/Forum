import { post, get, put, remove } from "api/baseRequest";
import {IPost} from 'modules/posts/interfaces/IPost'

// const user = JSON.parse(`${localStorage.getItem("user")}`)


export const addPost = (data:IPost) => {
    const {token, ...rest} = data;
    return post('664/posts',JSON.stringify({...rest,date:new Date().toUTCString()}),token)
}

export const getPosts = (token:any) => {
    return get('posts', token)
}

export const getPost = (data:{token:any,id:string}) =>{
    return get(`posts/${data.id}`, data.token)
}

export const changePost = (data:IPost) =>{
    return put(`posts/${data.id}`,JSON.stringify(data))
}

export const removePost = (data:{id:number,token:any}) =>{
    return remove(`posts/${data.id}`, data.token)
}

import { IComment } from './../../modules/comments/interfaces/IComment';
import {get, put, post, remove} from '../baseRequest';


export const getComments = (token:any) =>{
    return get('comments', token)
}

export const addComments = (data:any) =>{
    const {token, ...rest} = data;

    return post(`664/comments`,JSON.stringify(rest), token)
}

export const removeComments = (data:{id:number,token:any}) =>{
    return remove(`comments/${data.id}`, data.token)
}


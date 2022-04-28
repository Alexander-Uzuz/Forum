import { IComment } from './../../modules/comments/interfaces/IComment';
import {get, put, post} from '../baseRequest';


export const getComments = (token:any) =>{
    return get('comments', token)
}

export const addComments = (data:any) =>{
    return post(`664/comments`,JSON.stringify(data), data.token)
}
import {post, put} from '../baseRequest';
import {IFormLogin, IFormLoginFull} from 'modules/authorization/interfaces/IFormLogin';
import { IFormRegistration } from 'modules/authorization/interfaces/IFormRegistration';



export const login = (data:IFormLogin) =>{
    return post('login', JSON.stringify(data))
}

export const loginChange = (data:IFormLoginFull) =>{
    return put(`users/${data.id}`, JSON.stringify(data))
}

export const registration = (data:IFormRegistration) =>{
    return post('register', JSON.stringify(data))
}

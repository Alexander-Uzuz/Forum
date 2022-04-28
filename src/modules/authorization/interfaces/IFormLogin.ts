export interface IFormLogin{
    email:string;
    password:string;
}

export interface IFormLoginFull{
    email:string;
    password:string;
    username:string | null;
    token:string | null;
    avatarUrl: string | null;
    id:number;
    newPassword?:string;
    againNewPassword?:string;
}

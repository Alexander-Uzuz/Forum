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
    id:number | null;
    newPassword?:string;
    againNewPassword?:string;
}

export interface IFormRegistration{
    username:string;
    email:string;
    password:string;
}

export interface IFormRegistrationFront extends IFormRegistration{
    confirmPassword:string;
}
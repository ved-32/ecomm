export interface ILogin{
    user:{
        firstName:string,
        lastName:string,
        email:string,
        phone:string,

    },
    token:string
}




export interface ILoginActionType{
    type:string,
    payload:ILogin
}
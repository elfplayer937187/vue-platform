// 登录接口响应类型
export interface LoginType{
    username:string,
    password:string
}

// 得到用户信息响应的类型  & 得到退出登录响应类型
export interface ReqUserLoginType{
    code:number,
    data:string,
    message:string,
    ok:boolean
}
type dataType={
    avatar:string,
    buttons:string[],
    name:string,
    roles:string[],
    routes:string[]
}
// 得到用户信息返回的接口
export interface ReqUserInfoType{
    code:number,
    data:dataType,
    message:string,
    ok:boolean
}


export interface LoginType{
    password:string,
    username:string
}
interface dataType{
    token?:string
    message?:string
}
// 定义接口返回的数据类型
export interface LoginResponseType{
    code:number,
    data:dataType
}
interface userInfo{
    userId:number,
    avatar:string,
    username:string,
    password:string,
    desc:string,
    roles:string[],
    buttons:string[],
    routes:string[],
    token:string

}
interface user{
    checkUser:userInfo
}
// 定义服务器返回用户信息的相关数据类型
export interface userResponseData{
    code:number,
    data:user,
}

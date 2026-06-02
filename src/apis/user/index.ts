// 管理用户相关的请求
import request from "@/utils/request";
import type { LoginResponseType, LoginType,userResponseData } from "./type";
// 管理接口
enum API{
    LOGIN_URL='/user/login',
    USERINFO_URL='/user/info',
    ADMIN_INFO_URL='/admin/acl/index/info'
}
// 登录接口
export const reqLogin=(data:LoginType)=>request.post<string,LoginResponseType>(API.LOGIN_URL,data)
// 得到用户信息接口
export const reqUserInfo=()=>request.get<userResponseData>(API.USERINFO_URL)

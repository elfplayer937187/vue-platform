// 管理用户相关的请求
import request from "@/utils/request";
import type { LoginResponseType, LoginType,userResponseData } from "./type";
// 管理接口
enum API{
    // 登录接口
    LOGIN_URL='/admin/acl/index/login',
    // 用户信息接口
    USERINFO_URL='/admin/acl/index/info',
    // 登出接口
    LOGOUT_URL='/admin/acl/index/logout'
}
// 登录接口
export const reqLogin=(data:any)=>request.post<any,any>(API.LOGIN_URL,data)
// 得到用户信息接口
export const reqUserInfo=()=>request.get<any,any>(API.USERINFO_URL)

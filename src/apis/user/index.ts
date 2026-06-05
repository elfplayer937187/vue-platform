// 管理用户相关的请求
import request from "@/utils/request";
import type { LoginType,ReqUserInfoType,ReqUserLoginType } from "./type";
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
// request.post<any,LoginType>第一个泛型是请求参数类型，第二个是响应类型
export const reqLogin=(data:LoginType)=>request.post<any,ReqUserLoginType>(API.LOGIN_URL,data)
// 得到用户信息接口
export const reqUserInfo=()=>request.get<any,ReqUserInfoType>(API.USERINFO_URL)
// 退出登录接口
export const reqUserLogout=(token:string)=>request.post<any,ReqUserLoginType>(token)
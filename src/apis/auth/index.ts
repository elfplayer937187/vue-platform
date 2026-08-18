// 认证相关接口（登录/登出/获取用户信息）
import request from '@/utils/request'
import type { LoginType, UserInfoRespType } from './type'
import type { baseResponseType } from '@/apis/others/baseType/base'

enum API {
  // 登录接口
  LOGIN_URL = '/admin/acl/index/login',
  // 用户信息接口
  USERINFO_URL = '/admin/acl/index/info',
  // 登出接口
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 登录接口
export const reqLogin = (data: LoginType) =>
  request.post<any, baseResponseType<string>>(API.LOGIN_URL, data)

// 获取用户信息
export const reqUserInfo = () => request.get<any, UserInfoRespType>(API.USERINFO_URL)

// 退出登录
export const reqUserLogout = () => request.post<any, baseResponseType<string>>(API.LOGOUT_URL)

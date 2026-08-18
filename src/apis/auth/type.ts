import type { baseResponseType } from '@/apis/others/baseType/base'

// 登录请求参数
export interface LoginType {
  username: string
  password: string
}

// 用户信息 - data 结构
export interface UserInfoDataType {
  avatar: string
  buttons: string[]
  name: string
  roles: string[]
  routes: string[]
}

// 用户信息 - 完整响应
export type UserInfoRespType = baseResponseType<UserInfoDataType>
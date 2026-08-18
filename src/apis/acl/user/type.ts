import type { baseResponseType } from '@/apis/others/baseType/base'

// ------ 请求 DTO ------

// 新增用户
export interface CreateUserDTO {
  username: string
  name: string
  password: string
}

// 更新用户
export interface UpdateUserDTO {
  userId?: number | string | undefined
  username: string
  name: string
}

// 批量删除
export interface BatchRemoveDTO {
  idList: number[]
}

// 分配角色
export interface AssignRoleDTO {
  userId: number
  roleIdList: string[]
}

// ------ 响应数据类型 ------

// 用户记录
export interface UserRecord {
  id: number
  userId: number
  name: string
  username: string
  password?: string
  phone?: string
  roleName?: string
  createTime?: string
  updateTime?: string
}

// 分页列表 - data 结构
export interface UserPaginationData {
  current: number
  pages: number
  records: UserRecord[]
  size: number
  total: number
}

// 分页列表 - 完整响应
export type UserPaginationResp = baseResponseType<UserPaginationData>

// 用户角色分配 - data 结构
export interface UserRolesData {
  assignRoles: { roleId: number; roleName: string }[]
  allRoles: { roleId: number; roleName: string }[]
}

// 用户角色 - 完整响应
export type UserRolesResp = baseResponseType<UserRolesData>

// 通用操作响应（data 为 string 的情况）
export type DefaultResp = baseResponseType<string>

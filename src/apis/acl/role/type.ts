import type { baseResponseType } from '@/apis/others/baseType/base'

// ------ 请求 DTO ------

// 新增角色
export interface CreateRoleDTO {
  roleName: string
  remark?: string
}

// 更新角色
export interface UpdateRoleDTO {
  roleId: number
  roleName: string
  remark?: string
}

// ------ 响应数据类型 ------

// 角色记录
export interface RoleRecord {
  id: number
  roleId: number
  roleName: string
  remark: string
  createTime: string
  updateTime: string
}

// 分页列表 - data 结构
export interface RolePaginationData {
  current: number
  pages: number
  records: RoleRecord[]
  searchCount: boolean
  size: number
  total: number
}

// 分页列表 - 完整响应
export type RolePaginationResp = baseResponseType<RolePaginationData>

// 角色-权限树 - data 结构（节点）
export interface RoleAssignType {
  id: number
  children: RoleAssignType[] | null
  code: string
  createTime?: any
  menuId: number
  level: number
  name: string
  pid: number
  select: boolean
  status: string
  toCode: string
  type: number
  updateTime?: any
}

// 角色-权限树 - 完整响应
export type RoleAssignResp = baseResponseType<RoleAssignType[]>

// 通用操作响应
export type DefaultResp = baseResponseType<string>
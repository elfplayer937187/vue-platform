import type { baseResponseType } from '@/apis/others/baseType/base'

// doAssignRole 请求参数类型
export interface DoAssignRoleType {
  roleIdList: number[]
  userId: number
}

export interface GetAllRolesResponseType extends baseResponseType<never> {
  data: {
    assignRoles: RoleType[]
    allRoles: RoleType[]
  }
}
export interface RoleType {
  createTime?: string
  updateTime?: string
  roleId: number
  roleName: string
  remark: string
}

// 角色分页列表 - 单条记录
export interface RoleRecordType {
  roleId: number
  createTime: string
  id: number
  remark: string
  roleName: string
  updateTime: string
}

// 角色分页列表 - 响应类型
export interface RolePageListType extends baseResponseType<never> {
  data: {
    current: number
    pages: number
    records: RoleRecordType[]
    searchCount: boolean
    size: number
    total: number
  }
}

// 角色菜单响应类型
export interface RoleAssignRespType extends baseResponseType<never> {
  data: RoleAssignType[]
}
// 权限类型
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

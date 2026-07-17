import type { BaseType } from '@/apis/acl/user/type'

// doAssignRole 请求参数类型
export interface DoAssignRoleType {
  roleIdList: number[]
  userId: number
}

export interface GetAllRolesResponseType extends BaseType {
  data: {
    assignRoles: RoleType[]
    allRolesList: RoleType[]
  }
}
export interface RoleType {
  createTime?: string,
  updateTime?: string,
  id: number,
  roleName: string,
  remark: string,
}

// 角色分页列表 - 单条记录
export interface RoleRecordType {
  ID: number
  createTime: string
  id: number
  remark: string
  roleName: string
  updateTime: string
}

// 角色分页列表 - 响应类型
export interface RolePageListType extends BaseType {
  data: {
    current: number
    pages: number
    records: RoleRecordType[]
    searchCount: boolean
    size: number
    total: number
  }
}

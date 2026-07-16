import type { BaseType, DefaultType } from '@/apis/acl/user/type'
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

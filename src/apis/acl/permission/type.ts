import type { BaseType, DefaultType } from '../user/type'
import type { RoleAssignType } from '../role/type'
export interface GetPermissionRespType extends BaseType {
  data: RoleAssignType[]
}
export interface AddPermissionType {
  menuId?: number
  code: string //权限数值
  level: number | string //几级菜单
  name: string //名称
  pid: number | string //Id
  // type?: number | string
}

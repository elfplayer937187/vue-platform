import request from '@/utils/request'
import type {
  GetAllRolesResponseType,
  DoAssignRoleType,
  RolePageListType,
  RoleAssignRespType,
} from '@/apis/acl/role/type'
import type { DefaultType } from '@/apis/acl/user/type'

enum API {
  GETALLUSERROLE_URL = '/admin/acl/user/toAssign',
  DOASSIGNROLE_URL = '/admin/acl/user/doAssignRole',
  GETROLEPAGINATION_URL = '/admin/acl/role',
  // 新增角色
  ADDROLE_URL = '/admin/acl/role/save',
  // 更新角色
  UPDATEROLE_URL = '/admin/acl/role/update',
  // 删除角色
  DELETE_URL = '/admin/acl/role/remove',
  // 根据角色获取菜单接口
  GETROLEASSIGN_URL = '/admin/acl/permission/toAssign',
  // 给角色分配权限
  ADDASSIGNFORROLE_URL = '/admin/acl/permission/doAssign',
}

// 获取该用户的角色信息
export const reqGetAllUserRole = (adminId: number) =>
  request.get<any, GetAllRolesResponseType>(API.GETALLUSERROLE_URL + `/${adminId}`)

// 为用户分配角色
export const reqDoAssignRole = (data: DoAssignRoleType) =>
  request.post<any, DefaultType>(API.DOASSIGNROLE_URL, data)

// 获取角色分页列表
export const reqGetRolePagination = (page: number, limit: number, roleName: string = '') =>
  request.get<any, RolePageListType>(API.GETROLEPAGINATION_URL + `/${page}/${limit}`, {
    params: { roleName },
  })
// 新增角色接口
export const reqAddRole = (data: { roleName: string; roleId?: number }) => {
  if (data.roleId) {
    // 有id更新,没有就新增
    console.log(data)
    return request.put<any, DefaultType>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, DefaultType>(API.ADDROLE_URL, data)
  }
}

//删除角色接口
export const reqDeleteRole = (id: number) =>
  request.delete<any, DefaultType>(API.DELETE_URL + `/${id}`)

// 获取角色菜单
export const reqGetRoleAssign = (roleId: number) =>
  request.get<any, RoleAssignRespType>(API.GETROLEASSIGN_URL + `/${roleId}`)

//给角色分配权限
export const reqDoAssignForRole = (roleId: number, permissionId: number[]) =>
  request.post<any, DefaultType>(API.ADDASSIGNFORROLE_URL, null, {
    params: { roleId, permissionId: permissionId.join(',') },
  })

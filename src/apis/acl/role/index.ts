// 角色管理相关接口（CRUD + 权限分配）
import request from '@/utils/request'
import type {
  RolePaginationResp,
  RoleAssignResp,
  DefaultResp,
} from './type'

enum API {
  // 角色分页
  ROLE_PAGINATION_URL = '/admin/acl/role',
  // 新增角色
  SAVE_ROLE_URL = '/admin/acl/role/save',
  // 更新角色
  UPDATE_ROLE_URL = '/admin/acl/role/update',
  // 删除角色
  REMOVE_ROLE_URL = '/admin/acl/role/remove',
  // 获取角色菜单
  GET_ROLE_ASSIGN_URL = '/admin/acl/permission/toAssign',
  // 给角色分配权限
  DO_ASSIGN_FOR_ROLE_URL = '/admin/acl/permission/doAssign',
}

// 角色分页列表
export const reqGetRolePagination = (page: number, limit: number, roleName: string = '') =>
  request.get<any, RolePaginationResp>(`${API.ROLE_PAGINATION_URL}/${page}/${limit}`, {
    params: { roleName },
  })

// 新增/更新角色（有 roleId 则更新，无则新增）
export const reqSaveRole = (data: { roleName: string; roleId?: number }) => {
  if (data.roleId) {
    return request.put<any, DefaultResp>(API.UPDATE_ROLE_URL, data)
  } else {
    return request.post<any, DefaultResp>(API.SAVE_ROLE_URL, data)
  }
}

// 删除角色
export const reqRemoveRole = (id: number) =>
  request.delete<any, DefaultResp>(`${API.REMOVE_ROLE_URL}/${id}`)

// 获取角色菜单（权限树）
export const reqGetRoleAssign = (roleId: number) =>
  request.get<any, RoleAssignResp>(`${API.GET_ROLE_ASSIGN_URL}/${roleId}`)

// 给角色分配权限
export const reqDoAssignForRole = (roleId: number, permissionId: number[]) =>
  request.post<any, DefaultResp>(API.DO_ASSIGN_FOR_ROLE_URL, null, {
    params: { roleId, permissionId: permissionId.join(',') },
  })
// 用户管理相关接口（CRUD/分页/角色分配）
import request from '@/utils/request'
import type {
  CreateUserDTO,
  UpdateUserDTO,
  AssignRoleDTO,
  UserPaginationResp,
  UserRolesResp,
  DefaultResp,
} from './type'

enum API {
  // 用户分页
  USER_PAGINATION_URL = '/admin/acl/user',
  // 新增用户
  SAVE_USER_URL = '/admin/acl/user/save',
  // 更新用户
  UPDATE_USER_URL = '/admin/acl/user/update',
  // 删除用户
  REMOVE_USER_URL = '/admin/acl/user/remove',
  // 批量删除
  BATCH_REMOVE_URL = '/admin/acl/user/batchRemove',
  // 查看用户角色
  TO_ASSIGN_URL = '/admin/acl/user/toAssign',
  // 为用户分配角色
  DO_ASSIGN_ROLE_URL = '/admin/acl/user/doAssignRole',
  // 更改头像
  UPDATE_AVATAR_URL = '/admin/acl/user/updateAvatar',
}

// 用户分页列表
export const reqGetUserPagination = (page: number, limit: number, username?: string) =>
  request.get<any, UserPaginationResp>(
    `${API.USER_PAGINATION_URL}/${page}/${limit}${username ? `?username=${username}` : ''}`
  )

// 新增用户
export const reqSaveUser = (data: CreateUserDTO) =>
  request.post<any, DefaultResp>(API.SAVE_USER_URL, data)

// 更新用户
export const reqUpdateUser = (data: UpdateUserDTO) =>
  request.put<any, DefaultResp>(API.UPDATE_USER_URL, data)

// 删除单个用户
export const reqRemoveUser = (id: number) =>
  request.delete<any, DefaultResp>(`${API.REMOVE_USER_URL}/${id}`)

// 批量删除用户
export const reqBatchRemoveUser = (idList: number[]) =>
  request.delete<any, DefaultResp>(API.BATCH_REMOVE_URL, { data: { idList } })

// 查看用户已分配的角色
export const reqGetUserRoles = (id: number) =>
  request.get<any, UserRolesResp>(`${API.TO_ASSIGN_URL}/${id}`)

// 为用户分配角色
export const reqAssignRole = (data: AssignRoleDTO) =>
  request.post<any, DefaultResp>(API.DO_ASSIGN_ROLE_URL, data)

// 更改用户头像
export const reqUpdateUserAvatar = (data: { avatar: string }) =>
  request.put<any, DefaultResp>(API.UPDATE_AVATAR_URL, data)
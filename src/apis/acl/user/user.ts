import request from '@/utils/request'
import type { PageListType, AddUserType, DefaultType } from '@/apis/acl/user/type'
enum API {
  // 获取用户分页列表
  GETUSER_PAGINATION_URL = '/admin/acl/user',
  // 新增用户接口
  ADDUSER_URL = '/admin/acl/user/save',
  // 删除用户接口
  DELETEUSER_URL = '/admin/acl/user/remove',
  // 更新用户接口
  UPDATEUSER_URL = '/admin/acl/user/update',
  // 批量删除接口
  BATCHREMOVE_URL = '/admin/acl/user/batchRemove',
  // 修改用户头像
  UPDATEAVARTAR_URL = '/admin/acl/user/updateAvatar',
}
// 获取分页列表
export const reqGetUserPagination = (page: number, limit: number, username?: string) =>
  request.get<any, PageListType>(
    API.GETUSER_PAGINATION_URL + `/${page}/${limit}?username=${username}`,
  )
// 新增用户接口
export const reqAddUser = (obj: AddUserType) => request.post<any, DefaultType>(API.ADDUSER_URL, obj)
// 删除用户接口
export const reqDeleteUser = (id: number) =>
  request.delete<any, DefaultType>(API.DELETEUSER_URL + `/${id}`)
// 更新用户接口
export const reqUpdateUser = (obj: AddUserType) =>
  request.put<any, DefaultType>(API.UPDATEUSER_URL, obj)
// 批量删除接口
export const reqBatchRemoveUser = (idList: number[]) =>
  request.delete<any, any>(API.BATCHREMOVE_URL, { data: { idList } })

export const reqUpdateAvatar = (data: { avatar: string }) =>
  request.put<any, DefaultType>(API.UPDATEAVARTAR_URL, data)

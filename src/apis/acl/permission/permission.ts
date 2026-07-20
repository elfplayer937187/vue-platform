import request from '@/utils/request'
import type { DefaultType } from '../user/type'
import type { GetPermissionRespType, AddPermissionType } from './type'
enum API {
  // 获取权限列表
  GETPERMISSION_URL = '/admin/acl/permission',
  // 新增权限
  ADDPERMISSION_URL = '/admin/acl/permission/save',
  // 更新菜单
  UPDATEPERMISSION_URL='/admin/acl/permission/update',
  // 删除
  DELETEPERMISSION_URL = '/admin/acl/permission/remove',
}
export const reqGetPermission = () => request.get<any, GetPermissionRespType>(API.GETPERMISSION_URL)
export const reqAddPermission = (obj: AddPermissionType) =>{
  if(!obj.id){
    return request.post<any, DefaultType>(API.ADDPERMISSION_URL, obj)
  }else{
    return request.put<any,DefaultType>(API.UPDATEPERMISSION_URL,obj)
  }
}
  
export const reqDeletePermission = (id: number) =>
  request.delete<any, DefaultType>(API.DELETEPERMISSION_URL + `/${id}`)

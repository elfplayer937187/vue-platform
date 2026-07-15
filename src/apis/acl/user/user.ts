import request from "@/utils/request";
import type {PageListType,AddUserType,DefaultType} from '@/apis/acl/user/type'
enum API{
  // 获取用户分页列表
  GETUSER_PAGINATION_URL='/admin/acl/user',
  // 新增用户接口
  ADDUSER_URL='/admin/acl/user/save'
}
// 获取分页列表
export const reqGetUserPagination=(page:number,limit:number)=>request.get<string,PageListType>(API.GETUSER_PAGINATION_URL+`/${page}/${limit}`)
// 新增用户接口
export const reqAddUser=(obj:AddUserType)=>request.post<string,DefaultType>(API.ADDUSER_URL,obj)
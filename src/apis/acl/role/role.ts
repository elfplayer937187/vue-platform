import request from "@/utils/request";
import type{GetAllRolesResponseType} from '@/apis/acl/role/type'
enum API{
  GETALLUSERROLE_URL='/admin/acl/user/toAssign'
}
// 获取该用户的角色信息
export const reqGetAllUserRole=(adminId:number)=>request.get<any,GetAllRolesResponseType>(API.GETALLUSERROLE_URL+`/${adminId}`)
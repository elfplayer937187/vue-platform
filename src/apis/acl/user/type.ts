interface BaseType {
  code: number
  message: string
  ok: boolean
  // data: PageListType,
}
export interface DefaultType extends BaseType {
  data: string
}
interface dataType {
  current: number
  pages: number
  records: UserType[]
  size: number
  total: number
}
// user分页列表类型返回值
export interface PageListType extends BaseType {
  data: dataType
}
// 用户类型
export interface UserType {
  ID: number
  id: number

  name: string
  password: string
  phone: string
  roleName: string
  username: string

  updateTime?: any
  createTime?: any
}

// AddUser接口参数类型
export interface AddUserType {
  name: string
  password?: string
  username: string
  id?:number|string
}
// // UpdateUser接口参数类型
// export interface UpdateUserType {
//   id: number,
//   name: string,
//   username:string,
// }

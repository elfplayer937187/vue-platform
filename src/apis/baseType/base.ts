// 通用响应类型，data 字段通过泛型 T 由外部指定
export interface ReqUserLoginType<T = string> {
  code: number
  data: T
  message: string
  ok: boolean
}

// 书写品牌管理模块接口
import request from '@/utils/request'
import type {
  AppendChangeType,
  DeleteTrademarkType,
  getTrademarkListResponseType,
  tradeMarkType,
} from './type'
enum API {
  // 获取trademark全部内容接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加内容接口
  TRADEMARKAPPEND_URL = '/admin/product/baseTrademark/save',
  // 修改内容接口
  TRADEMARKCHANGE_URL = '/admin/product/baseTrademark/update',
  // 删除内容接口
  TRADEMARKDELETE_URL = '/admin/product/baseTrademark/remove',
}
// get泛型：url，请求体数据类型
export const getTrademarkList = (page: number, limit: number) =>
  request.get<any, getTrademarkListResponseType>(API.TRADEMARK_URL + `${page}/${limit}`)
// any,返回类型
export const appendTrademarkList = (trademarkparams: tradeMarkType) => {
  // 根据有无id判断调用哪个api
  if (trademarkparams.id) {
    return request.put<any, AppendChangeType>(API.TRADEMARKCHANGE_URL, trademarkparams)
  } else {
    return request.post<any, AppendChangeType>(API.TRADEMARKAPPEND_URL, trademarkparams)
  }
}
// 删除内容接口
export const removeTradeMarkList = (id: number) =>
  request.delete<any, DeleteTrademarkType>(API.TRADEMARKDELETE_URL + `/${id}`)

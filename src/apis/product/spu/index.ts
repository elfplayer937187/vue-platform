import request from '@/utils/request'
import type {
  DeleteType,
  BaseResponseType,
  PaginationResponseType,
  TradeMarkType,
  ImageResponseType,
  AttrResponseType,
  HasResponseType,
  SPUType,
} from './type'
enum API {
  // 获取SPU全部的销售属性【颜色，尺寸，尺码】
  GETSPUHAS_URL = '/admin/product/baseSaleAttrList',
  // 删除SPU接口
  DELETESPU_URL = '/admin/product/deleteSpu',
  // 新增SPU接口
  APPENDSPU_URL = '/admin/product/saveSpuInfo', //post
  // 更新SPU接口
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  // 获取SPU分页列表
  GETSPUPAGINATION_URL = '/admin/product',
  // 获取所有品牌接口
  GETALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取商品图片列表接口
  GETALLTRADEMARKIMAGE_URL = '/admin/product/spuImageList',
  // 获取销售属性列表接口[已有的销售属性接口地址]
  GETALLTRADEMARKATTRLIST_URL = '/admin/product/spuSaleAttrList',
}
// 删除SPU品牌行
export const reqGetDeleteSPU = (spuId: number) =>
  request.delete<any, DeleteType>(API.DELETESPU_URL + `/${spuId}`)
// 获取分页列表
export const reqGetSPUpagination = (page: number, limit: number, category3Id: number | string) =>
  request.get<any, PaginationResponseType>(
    API.GETSPUPAGINATION_URL + `/${page}/${limit}?category3Id=${category3Id}`,
  )
// 获取所有品牌接口
export const reqGetAllTradeMark = () => request.get<any, TradeMarkType>(API.GETALLTRADEMARK_URL)
// 获取商品图片列表接口
export const reqGetAllTradeMarkImage = (SPUId: number | string) =>
  request.get<any, ImageResponseType>(API.GETALLTRADEMARKIMAGE_URL + `/${SPUId}`)
// 获取销售属性列表（表格里面的数据）
export const reqGetAllTradeMarkAttrList = (SPUId: number | string) =>
  request.get<any, AttrResponseType>(API.GETALLTRADEMARKATTRLIST_URL + `/${SPUId}`)
// 获取有多少种属性
export const reqGetSPUHas = () => request.get<any, HasResponseType>(API.GETSPUHAS_URL)

// 新增和更新接口
export const reqAddSPU = (obj: SPUType) => {
  // 有id则更新已有
  if (obj.id) {
    return request.post<any, BaseResponseType>(API.UPDATESPU_URL, obj)
  } else {
    return request.post<any, BaseResponseType>(API.APPENDSPU_URL, obj)
  }
}

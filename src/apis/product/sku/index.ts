import request from '@/utils/request'
import type { SKUType,DefaultResponseType,SKUResponseType, skuPaginationResponseType,SKUInfoResponseType } from './type'
enum API {
  // 新增SKU
  APPENDSKUINFO_URL = '/admin/product/saveSkuInfo',
  // 展示SKU
  SHOWSKUINFO_URL='/admin/product/findBySpuId',
  // 获取SKU分页列表
  GETSKUPAGINATION_URL='/admin/product/list',
  // 删除SKU接口
  DELETESKUINFO_URL='/admin/product/deleteSku',
  // 上架SKU接口
  ONSALE_URL='/admin/product/onSale',
  // 下架SKU接口
  CANCELSALE_URL='/admin/product/cancelSale',
  // 获取商品详情接口
  GETSKUINFO_URL='/admin/product/getSkuInfo'
}
// 添加sku接口
export const reqAppendSKUInfo = (obj: SKUType) => request.post<string, DefaultResponseType>(API.APPENDSKUINFO_URL, obj)
// 展示sku接口
export const reqShowSKUInfo=(spuId:number)=>request.get<string,SKUResponseType>(API.SHOWSKUINFO_URL+`/${spuId}`)
// 获取SKU分页列表
export const reqGetSKUPagination=(page:number,limit:number)=>request.get<string,skuPaginationResponseType>(API.GETSKUPAGINATION_URL+`/${page}/${limit}`)
// 删除sku接口
export const reqDeleteSKU=(skuId:number)=>request.delete<string,DefaultResponseType>(API.DELETESKUINFO_URL+`/${skuId}`)
// 上架sku接口
export const reqOnSale=(skuId:number)=>request.get<string,DefaultResponseType>(API.ONSALE_URL+`/${skuId}`)
// 下架sku接口
export const reqCancelSale=(skuId:number)=>request.get<string,DefaultResponseType>(API.CANCELSALE_URL+`/${skuId}`)
// 获取商品详情接口
export const reqGetSKUInfo=(skuId:number)=>request.get<string,SKUInfoResponseType>(API.GETSKUINFO_URL+`/${skuId}`)
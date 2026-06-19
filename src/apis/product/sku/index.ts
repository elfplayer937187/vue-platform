import request from '@/utils/request'
import type { SKUType,DefaultResponseType,SKUResponseType } from './type'
enum API {
  // 新增SKU
  APPENDSKUINFO_URL = '/admin/product/saveSkuInfo',
  // 展示SKU
  SHOWSKUINFO_URL='/admin/product/findBySpuId'
}
// 添加sku接口
export const reqAppendSKUInfo = (obj: SKUType) => request.post<string, DefaultResponseType>(API.APPENDSKUINFO_URL, obj)
// 展示sku接口
export const reqShowSKUInfo=(spuId:number)=>request.get<string,SKUResponseType>(API.SHOWSKUINFO_URL+`/${spuId}`)
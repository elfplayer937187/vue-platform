import request from '@/utils/request'
import type { SKUType,DefaultResponseType } from './type'
enum API {
  // 新增SKU
  APPENDSKUINFO_URL = '/admin/product/saveSkuInfo',
}
export const reqAppendSKUInfo = (obj: SKUType) => request.post<string, DefaultResponseType>(API.APPENDSKUINFO_URL, obj)

import request from '@/utils/request'
import type { CategoryListResp, AttrListResp, AttrItem, DefaultResp } from './type'

enum API {
  // 分类下拉
  CATEGORY1_URL = '/admin/product/category1',
  CATEGORY2_URL = '/admin/product/category2',
  CATEGORY3_URL = '/admin/product/category3',
  // 属性列表
  ATTR_INFO_LIST_URL = '/admin/product/attrInfoList',
  // 新增/更新属性
  SAVE_ATTR_URL = '/admin/product/saveAttrInfo',
  // 删除属性
  DELETE_ATTR_URL = '/admin/product/deleteAttr',
}

// 一级分类
export const reqGetFirstCategory = () => request.get<any, CategoryListResp>(API.CATEGORY1_URL)

// 二级分类
export const reqGetSecondCategory = (id: number | string) =>
  request.get<any, CategoryListResp>(`${API.CATEGORY2_URL}/${id}`)

// 三级分类
export const reqGetThirdCategory = (id: number | string) =>
  request.get<any, CategoryListResp>(`${API.CATEGORY3_URL}/${id}`)

// 获取属性列表（三级分类级联）
export const reqGetAttrList = (
  c1Id: number | string,
  c2Id: number | string,
  c3Id: number | string,
) => request.get<any, AttrListResp>(`${API.ATTR_INFO_LIST_URL}/${c1Id}/${c2Id}/${c3Id}`)

// 新增/更新属性（有 attrId 则更新，无则新增）
export const reqSaveAttr = (data: AttrItem) =>
  request.post<any, DefaultResp>(API.SAVE_ATTR_URL, data)

// 删除属性
export const reqRemoveAttr = (attrId: number) =>
  request.delete<any, DefaultResp>(`${API.DELETE_ATTR_URL}/${attrId}`)

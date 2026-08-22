import type { baseResponseType } from '@/apis/others/baseType/base'

// ------ 分类相关类型 ------

// 分类记录（一级/二级/三级）
export interface CategoryRecord {
  id: number
  name: string
  category1Id?: number
  category2Id?: number
  category3Id?: number
}

// 分类列表响应
export type CategoryListResp = baseResponseType<CategoryRecord[]>

// ------ 属性相关类型 ------

// 属性值项
export interface AttrValueItem {
  attrValueId?: number
  valueName: string
  attrId?: number
}

// 属性项
export interface AttrItem {
  id?: number
  attrId?: number | undefined
  attrName: string
  categoryId: number | string
  categoryLevel: number
  platformChose?: string
  attrValueList: AttrValueItem[]
}

// 属性列表响应
export type AttrListResp = baseResponseType<AttrItem[]>

// 通用操作响应
export type DefaultResp = baseResponseType<string>

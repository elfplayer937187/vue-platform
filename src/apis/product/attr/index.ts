import request from '@/utils/request'
import type {
  ListItemType,
  ResponseAttrType,
  getAttrInfoListResponseType,
  deleteThirdResponseType,
} from './type'
enum API {
  // 获取第n个下拉框的接口
  CATEGORYONE_URL = '/admin/product/getCategory1',
  CATEGORYTWO_URL = '/admin/product/getCategory2',
  CATEGORYTHREE_URL = '/admin/product/getCategory3',
  // 获取属性tag标签接口
  CATEGORYTAG_URL = '/admin/product/attrInfoList',
  // 新增修改三级属性标签接口
  APPENDTHIRDTAG_URL = '/admin/product/saveAttrInfo',
  DELETETHIRDATTR_URL = '/admin/product/deleteAttr',
}
// 一级分类地址
export const getFirstCategory = () => request.get<any, ResponseAttrType>(API.CATEGORYONE_URL)
export const getSecondCategory = (id: number | string) =>
  request.get<any, ResponseAttrType>(API.CATEGORYTWO_URL + `/${id}`)
export const getThirdCategory = (id: number | string) =>
  request.get<any, ResponseAttrType>(API.CATEGORYTHREE_URL + `/${id}`)
// 获取Attr列表每一项
export const getCategoryTag = (
  C1id: string | number,
  C2Id: string | number,
  C3Id: string | number,
) => request.get<any, getAttrInfoListResponseType>(API.CATEGORYTAG_URL + `/${C1id}/${C2Id}/${C3Id}`)
// 添加三级属性标签接口
export const appendThridTag = (obj: ListItemType) =>
  request.post<any, any>(API.APPENDTHIRDTAG_URL, obj)
// 删除属性接口
export const deleteThirdCategory = (attrId: number) =>
  request.delete<any, deleteThirdResponseType>(API.DELETETHIRDATTR_URL + `/${attrId}`)

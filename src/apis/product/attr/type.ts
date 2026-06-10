// 三种顶部下拉菜单API类型
interface BaseAttrType {
  code: number
  message: string
  ok: boolean
}
export interface dataType {
  id: number
  name: string
  category1Id?: number
  category2Id?: number
}
export interface ResponseAttrType extends BaseAttrType {
  data: dataType[]
}
// AttrINfo基本类型
interface attrValueListType{
    id: number,
    valueName: string,
    attrId: number
}

export interface ListItemType {
  id: number,
  attrName: string,
  categoryId: number,
  categoryLevel: number,
  attrValueList: attrValueListType[]
}
// 定义AttrINfo的响应式返回类型
export interface getAttrInfoListResponseType extends BaseAttrType {
  data: ListItemType[]
}

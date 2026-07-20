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
// 三级属性值对象基本类型
interface attrValueListType {
  id?: number
  valueName: string
  attrId?: number
}
// 属性对象
export interface ListItemType {
  id?: number //已有属性id
  attrName: string //新增添加属性名
  categoryId: number | string //给哪个三级分类新增的id
  categoryLevel: number
  platformChose?: string
  attrValueList: attrValueListType[] //新增添加属性值数组
}
// 定义AttrINfo的响应式返回类型
export interface getAttrInfoListResponseType extends BaseAttrType {
  data: ListItemType[]
}
// 定义删除第三接口标签响应返回值类型
export interface deleteThirdResponseType extends BaseAttrType {
  data: string
}

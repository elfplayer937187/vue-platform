// 默认响应属性
export interface DefaultResponseType extends BaseType {
  data: string
}
interface BaseType {
  code: number,
  message: string,
  ok: true,
}

// SKU商品
export interface SKUType {
  // 父级的
  category3Id: string|number, //,
  spuID: string|number, //spuId,
  tmId: string|number, //品牌id,

  //   基础属性
  weight: string|number,
  price: string|number,
  skuDesc: string,

  skuAttrValueList: skuAttrType[],
  skuDefaultImg: string,
  skuName: string,
  skuSaleAttrValueList: skuSaleType[],

  skuImageList?: skuImageType[]
}
// sku属性列表
// 平台属性
export interface skuAttrType {
  // 必要
  attrId: number,
  valueId: number,
  // 不必要
  attrName?: string,
  id?: number,
  skuId?: number,
  valueName?: string
}
// sku图片类型
export interface skuImageType {
  id: number
  imgName: string
  imgUrl: string
  isDefault: string
  skuId: number
  spuImgId: number
}
// sku销售属性
export interface skuSaleType {
  // 必要
  saleAttrId: number,
  saleAttrValueId: number,
  //
  id?: number,
  saleAttrName?: string,
  saleAttrValueName?: string,
  skuId?: number
}

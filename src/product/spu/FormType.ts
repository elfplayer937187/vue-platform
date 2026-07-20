import type { AttrType, HasType, ImageType } from '@/apis/product/spu/type'

export interface FormType {
  // 存储spuId
  spuId: number | string
  // 编辑初始化
  spuName: string
  description: string
  ImageList: ImageType[] | null
  Has: HasType[] | null
  AllAttrId: AttrType[] | null
}

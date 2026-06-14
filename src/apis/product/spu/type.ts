// 分页列表类型
export interface PaginationResponseType extends BaseType{
    data:DataType
}
// spuType
export interface SPUType{
    id?: number,
    spuName:string,
    description: string,
    category3Id: number|string,
    tmId: number,
    spuImageList: any,
    spuSaleAttrList: any
}
interface DataType{
    records:SPUType[],
    total:number,
    size:number,
    current:number,
    searchCount:boolean,
    pages:number

}
interface BaseType{
    code:number,
    message:string,
    ok:boolean
}

// 品牌类型定义
export interface TradeMarkType extends BaseType {
    data:TradeMarkDataType[]
}
// 品牌类型data
export interface TradeMarkDataType{
    id: number,
    tmName: string,
    logoUrl:string
}

// 图片类型
export interface ImageType{
    ID:number,
    id:number,
    createTime:any,
    imgName:string,
    imgUrl:string,
    spuId:number,
    updateTime:any
}
export interface ImageResponseType extends BaseType{
    data:ImageType[]
}
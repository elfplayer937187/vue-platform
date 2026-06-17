// Response基本类型
interface BaseType{
    code:number,
    message:string,
    ok:boolean
}

// 分页列表类型
export interface PaginationResponseType extends BaseType{
    data:DataType
}
// 分页列表内容属性值
interface DataType{
    records:SPUType[],
    total:number,
    size:number,
    current:number,
    searchCount:boolean,
    pages:number

}
// spuType
export interface SPUType{
    id?: number|string,    //已有spuId
    spuName:string,
    description: string,
    category3Id: number|string, 
    tmId: string|number,        //品牌id
    spuImageList: ImageType[],
    spuSaleAttrList: AttrType[],
    
}
// 普通返回类型
export interface BaseResponseType extends BaseType{
    data:string
}

// 品牌类型定义（13种品牌select）

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
    ID?:number,
    id?:number,
    createTime?:any,
    imgName?:string,
    imgUrl?:string,
    spuId?:number,
    updateTime?:any
    name?:string,
    url?:string
}
export interface ImageResponseType extends BaseType{
    data:ImageType[]
}



/* 
第二界面最后一个表格里面的属性
*/
export interface AttrResponseType extends BaseType {
    data:AttrType[]
}



// 销售属性列表行
export interface AttrType{
    baseSaleAttrId:number,
    saleAttrName:string,//*
    spuSaleAttrValueList:spuSaleType[]
    id?:number,
    spuId?:number,
    flag?:boolean,
    InputContent?:string
}
// 销售属性tag对象
export interface spuSaleType{
    ID?:number,
    baseSaleAttrId:number,
    saleAttrValueName:string,
    createTime?:any,
    id?:number,
    spuId?:number,
    updateTime?:any,
    // flag?:boolean,
    // InputContent?:any
}



// 销售类型列表[3种]
export interface HasResponseType extends BaseType{
    data:HasType[]
}
export interface HasType{
    id:number,
    name:string
}


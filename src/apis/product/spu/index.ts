import request from "@/utils/request";
import type { PaginationResponseType,TradeMarkType,ImageResponseType,AttrResponseType,HasResponseType } from "./type";
enum API{
    // 获取SPU拥有的销售列表
    GETSPUHAS_URL='/admin/product/baseSaleAttrList',
    // // 删除SPU接口
    // DELETESPU_URL='/admin/product/deleteSpu',
    // // 新增SPU接口
    // APPENDSPU_URL='/admin/product/saveSpuInfo',  //post
    // // 更新SPU接口
    // UPDATESPU_URL='/admin/product/updateSpuInfo',
    // 获取SPU分页列表
    GETSPUPAGINATION_URL='/admin/product',
    // 获取所有品牌接口
    GETALLTRADEMARK_URL='/admin/product/baseTrademark/getTrademarkList',
    // 获取商品图片列表接口
    GETALLTRADEMARKIMAGE_URL='/admin/product/spuImageList',
    // 获取销售属性列表接口
    GETALLTRADEMARKATTRLIST_URL='/admin/product/spuSaleAttrList'
}
// export const reqGetSPU=()=>request.get<any,any>(API.GETSPU_URL)
// export const reqGetDeleteSPU=(spuId:number)=>request.delete<any,any>(API.DELETESPU_URL+`/${spuId}`)
// export const reqAppendSPU=(obj:any)=>request.post<any,any>(API.APPENDSPU_URL,obj)
// export const reqUpdateSPU=(obj:any)=>request.post<any,any>(API.UPDATESPU_URL,obj)
// 获取分页列表
export const reqGetSPUpagination=(page:number,limit:number,category3Id:number|string)=>request.get<any,PaginationResponseType>(API.GETSPUPAGINATION_URL+`/${page}/${limit}?category3Id=${category3Id}`)
// 获取所有品牌接口
export const reqGetAllTradeMark=()=>request.get<any,TradeMarkType>(API.GETALLTRADEMARK_URL)
// 获取商品图片列表接口
export const reqGetAllTradeMarkImage=(SPUId:number|string)=>request.get<any,ImageResponseType>(API.GETALLTRADEMARKIMAGE_URL+`/${SPUId}`)
// 获取销售属性列表接口
export const reqGetAllTradeMarkAttrList=(SPUId:number|string)=>request.get<any,AttrResponseType>(API.GETALLTRADEMARKATTRLIST_URL+`/${SPUId}`)
export const reqGetSPUHas=()=>request.get<any,HasResponseType>(API.GETSPUHAS_URL)
import request from "@/utils/request";
import type {ResponseAttrType,getAttrInfoListResponseType} from "./type";
enum API{
    // 获取第n个下拉框的接口
    CATEGORYONE_URL="/admin/product/getCategory1",
    CATEGORYTWO_URL="/admin/product/getCategory2",
    CATEGORYTHREE_URL="/admin/product/getCategory3",
    // 获取属性tag标签接口
    CATEGORYTAG_URL='/admin/product/attrInfoList'
}
// 一级分类地址
export const getFirstCategory=()=>request.get<any,ResponseAttrType>(API.CATEGORYONE_URL)
export const getSecondCategory=(id:number|string)=>request.get<any,ResponseAttrType>(API.CATEGORYTWO_URL+`/${id}`)
export const getThirdCategory=(id:number|string)=>request.get<any,ResponseAttrType>(API.CATEGORYTHREE_URL+`/${id}`)
export const getCategoryTag=(C1id:string|number,C2Id:string|number,C3Id:string|number)=>request.get<any,getAttrInfoListResponseType>(API.CATEGORYTAG_URL+`/${C1id}/${C2Id}/${C3Id}`)
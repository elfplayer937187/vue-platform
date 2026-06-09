import request from "@/utils/request";
import type {ResponseAttrType} from "./type";
enum API{
    CATEGORYONE_URL="/admin/product/getCategory1",
    CATEGORYTWO_URL="/admin/product/getCategory2",
    CATEGORYTHREE_URL="/admin/product/getCategory3"
}
// 一级分类地址
export const getFirstCategory=()=>request.get<any,ResponseAttrType>(API.CATEGORYONE_URL)
export const getSecondCategory=(id:number|string)=>request.get<any,ResponseAttrType>(API.CATEGORYTWO_URL+`/${id}`)
export const getThirdCategory=(id:number|string)=>request.get<any,ResponseAttrType>(API.CATEGORYTHREE_URL+`/${id}`)
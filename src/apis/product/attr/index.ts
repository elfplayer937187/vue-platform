import request from "@/utils/request";
enum API{
    CATEGORYONE_URL="/admin/product/getCategory1",
    CATEGORYTWO_URL="/admin/product/getCategory2",
    CATEGORYTHREE_URL="/admin/product/getCategory3"
}
// 一级分类地址
export const getFirstCategory=()=>request.get<any,any>(API.CATEGORYONE_URL)
export const getSecondCategory=(id:number)=>request.get<any,any>(API.CATEGORYTWO_URL+`/${id}`)
export const getThirdCategory=(id:number)=>request.get<any,any>(API.CATEGORYTHREE_URL+`/${id}`)
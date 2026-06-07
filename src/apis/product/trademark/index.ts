// 书写品牌管理模块接口
import request from "@/utils/request";
import type { getTrademarkListResponseType } from "./type";
enum API{
    TRADEMARK_URL='/admin/product/baseTrademark/'
}

export const getTrademarkList=(page:number,limit:number)=>request.get<any,getTrademarkListResponseType>(API.TRADEMARK_URL+`${page}/${limit}`)

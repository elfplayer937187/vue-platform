
// 已有品牌数据类型
export type RecordsData = {
  createTime: number,
  updateTime: string,
  id?: number,
  tmName: string,
  logoUrl: string
}
export type RecordsType = RecordsData[]
export interface getTrademarkListResponseType {
  code: number,
  message: string,
  data: {
    records: RecordsType,
    total: number,
    size: number,
    current: number,
    searchCount: true,
    pages: number
  },
  ok: boolean
}
export interface tradeMarkType{
  id?:number,
  tmName: string,
  logoUrl: string
}
export interface AppendChangeType{
  code:number,
  message:string,
  data:null,
  ok:boolean
}
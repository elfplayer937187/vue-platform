
// 已有品牌数据类型
type RecordsData = {
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

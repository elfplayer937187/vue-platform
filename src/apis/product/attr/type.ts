interface BaseAttrType{
    code:number,
    message:string,
    ok:boolean
}
export interface dataType{
    id:number,
    name:string,
    category1Id?:number,
    category2Id?:number
}
export interface ResponseAttrType extends BaseAttrType{
    data:dataType[]
}

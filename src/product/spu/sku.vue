<template>
  <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="sku名称">
        <el-input placeholder="请输入SKU名称" v-model="SKUSaveForm.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="请输入价格" type="number" v-model="SKUSaveForm.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input placeholder="请输入重量" type="number" v-model="SKUSaveForm.weight"></el-input>
      </el-form-item>
      <el-form-item label="sku描述">
        <el-input type="textarea" placeholder="请输入描述" v-model="SKUSaveForm.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <!-- 平台属性下的select选择框 -->
         <!-- 平台属性 -->
        <el-form label-width="80px" :inline="true">
            <el-form-item v-for="Attr in AttrList" :key="Attr.id" :label="Attr.attrName">
                <el-select v-model="Attr.platformChose" placeholder="请选择属性" style="width: 200px;">
                    <el-option v-for="AttrTag in Attr.attrValueList" :key="AttrTag.id" :label="AttrTag.valueName" :value="`${Attr.id}:${AttrTag.id}`"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
            <el-form-item v-for="TradeMark in AllTradeMarkList" :key="TradeMark.id" style="width: 200px;" :label="TradeMark.saleAttrName">
                <el-select v-model="TradeMark.SaleChosed" placeholder="请选择销售属性">
                    <el-option v-for="Tag in TradeMark.spuSaleAttrValueList" :key="Tag.id" :value="`${TradeMark.id}:${Tag.id}`" :label="Tag.saleAttrValueName">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table :data="ImageList" style="width: 100%" border>
            <el-table-column type="selection" width="80px" align="center"  >
            </el-table-column>
            <el-table-column label="图片" width="width">
              <template #default="{row}">
                <el-image :src="row.imgUrl"></el-image>
              </template>
            </el-table-column>
            <el-table-column prop="prop" label="名称" width="width">
              <template #default="{row}">  
                <span>{{row.imgName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="prop" label="操作" width="width">
                <template #default="{row}">
                   <el-button type="danger" @click="SetDefaultImg(row.imgUrl)">设置默认</el-button>
                </template>
            </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('ChangeShowWhat')">取消</el-button>
      </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reqGetAllTradeMarkAttrList, reqGetAllTradeMarkImage } from '@/apis/product/spu';
import { getCategoryTag } from '@/apis/product/attr';
import {reactive, ref} from 'vue'
import type { SPUType,AttrType,ImageType } from '@/apis/product/spu/type';
import type { ListItemType } from '@/apis/product/attr/type';
import type { SKUType } from '@/apis/product/sku/type';
// // 提取文件名称
// function getFileNameWithoutExtension(filename:any) {
//   return filename.replace(/\.[^/.]+$/, '');
// }
// 存储保存的对象
const SKUSaveForm=reactive<SKUType>({
  category3Id: '', //
  spuID: '', //spuId
  tmId: '', //品牌id

  //   基础属性
  weight: '',
  price: '',
  skuDesc: '',

  skuName: '',
  skuDefaultImg: '',
  skuAttrValueList:[],
  skuSaleAttrValueList:[]
})
// 存储表单元素
const AttrList=ref<ListItemType[]>([])
// 存储销售属性
const AllTradeMarkList=ref<AttrType[]>([])
// 存储图片信息
const ImageList=ref<ImageType[]>([])
const $emit=defineEmits(['ChangeShowWhat'])
const initSKUData=async(C1Id:number|string,C2Id:number|string,row:SPUType,C3Id:number|string)=>{
    // 获取属性列表
    const res1=await getCategoryTag(C1Id,C2Id,row.category3Id)
    // 获取销售属性
    const res2=await reqGetAllTradeMarkAttrList((row.id as number))
    // 获取产品图片
    const res3=await reqGetAllTradeMarkImage((row.id as number))
    SKUSaveForm.category3Id=C3Id
    SKUSaveForm.spuID=(row.id as number)
    SKUSaveForm.tmId=row.tmId
    AttrList.value=res1.data
    AllTradeMarkList.value=res2.data
    ImageList.value=res3.data
    console.log(ImageList.value);
    
    
}
// 设置默认图片
const SetDefaultImg=(url:string)=>{
  SKUSaveForm.skuDefaultImg=url
}
defineExpose({initSKUData})
</script>

<style scoped lang="scss">

</style>
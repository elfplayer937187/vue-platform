<template>
  <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="sku名称">
        <el-input placeholder="请输入SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="请输入价格" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input placeholder="请输入重量" type="number"></el-input>
      </el-form-item>
      <el-form-item label="sku描述">
        <el-input type="textarea" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <!-- 平台属性下的select选择框 -->
        <el-form label-width="80px" :inline="true">
            <el-form-item :label="Attr.attrName" v-for="Attr in AttrList" :key="Attr.id">
                <el-select v-model="Attr.choseId" placeholder="请选择属性" style="width: 200px;">
                    <el-option :label="AttrTag.valueName" :value="AttrTag.id" v-for="AttrTag in Attr.attrValueList" :key="AttrTag.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
            <el-form-item style="width: 200px;" :label="TradeMark.saleAttrName" v-for="TradeMark in AllTradeMarkList" :key="TradeMark.id">
                <el-select placeholder="请选择销售属性" v-model="TradeMark.choseTagId">
                    <el-option :value="Tag.id" :label="Tag.saleAttrValueName" v-for="Tag in TradeMark.spuSaleAttrValueList" :key="Tag.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table :data="[1,2,3,5]" style="width: 100%" border>
            <el-table-column type="selection" width="80px" align="center"  >
            </el-table-column>
            <el-table-column prop="prop" label="图片" width="width">
            </el-table-column>
            <el-table-column prop="prop" label="名称" width="width">
            </el-table-column>
            <el-table-column prop="prop" label="操作" width="width">
                <el-button type="danger">设置默认</el-button>
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
import { reqGetAllTradeMarkAttrList } from '@/apis/product/spu';
import { getCategoryTag } from '@/apis/product/attr';
import {ref} from 'vue'
import type { SPUType,AttrType } from '@/apis/product/spu/type';
import type { ListItemType } from '@/apis/product/attr/type';
// 存储表单元素
const AttrList=ref<ListItemType[]>([])
// 存储销售属性
const AllTradeMarkList=ref<AttrType[]>([])
const $emit=defineEmits(['ChangeShowWhat'])
const initSKUData=async(C1Id:number|string,C2Id:number|string,row:SPUType)=>{
    // 获取属性列表
    const res1=await getCategoryTag(C1Id,C2Id,row.category3Id)
    // 获取销售属性
    const res2=await reqGetAllTradeMarkAttrList((row.id as number))
    console.log(res2);
    
    AttrList.value=res1.data
    AllTradeMarkList.value=res2.data
    
}
defineExpose({initSKUData})
</script>

<style scoped lang="scss">

</style>
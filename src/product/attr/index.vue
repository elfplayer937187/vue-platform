<template>
  <div>
    <Category></Category>

    <!-- 下方的card -->
    <!-- button -->

    <el-card style="margin-top: 10px">
      <el-button type="primary" icon="Plus" style="margin-bottom: 10px" @click="AppendValue" >添加元素</el-button>
      <el-table style="width: 100%" :border="true" :data="AttrList">
        <el-table-column prop="prop" label="序号" width="80px" align="center" type="index"> </el-table-column>
        <el-table-column prop="attrName" label="属性名称" width="120px" align="center">
        </el-table-column>
        <el-table-column prop="prop" label="属性值名称" width="width" align="center">
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="200px" align="center"> 
          <el-button type="primary" icon="Edit"></el-button>
          <el-button type="primary" icon="Delete"></el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import Category from '@/components/Category/index.vue'
import useCategoryStore from '@/stores/modules/Category';
import {watch,ref} from 'vue'
import { storeToRefs } from 'pinia';
import { getCategoryTag } from '@/apis/product/attr'
import type { ListItemType } from '@/apis/product/attr/type'
const CategoryStore=useCategoryStore()
const {C1Id,C2Id,C3Id}=storeToRefs(CategoryStore)

// 添加元素的点击事件
const AppendValue=()=>{
  console.log(C1Id.value,C2Id.value,C3Id.value);
  
}
const AttrList=ref<ListItemType[]>([])
// 监视第三项api,如果有一个变了说明列表改变
watch(C3Id,()=>{
  // 得到元素，存储到AttrList,然后加载界面
  getAttr()

})
// 获取属性值
const getAttr=async()=>{
  try{
      // console.log('##',C1Id.value,C2Id.value,C3Id.value);
      const res=await getCategoryTag(C1Id.value,C2Id.value,C3Id.value)
      if(res.code===200){
        console.log(res);
        
        AttrList.value=res.data
      }else{
        throw('响应失败')
      }
      // console.log(res);
  }catch{
    throw('网络异常')
  }
}
</script>

<style scoped lang="scss"></style>

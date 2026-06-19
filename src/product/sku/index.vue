<template>
  <el-table :data="SKUList" style="width: 100%" border>
    <el-table-column prop="prop" label="序号" width="100px" align="center" type="index"></el-table-column>
    <el-table-column prop="prop" label="名称" width="width">
      <template #default="{row}">
        <span>{{ row.skuName }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="prop" label="描述" width="width">
      <template #default="{row}">
        <span>{{ row.skuDesc }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="prop" label="默认图片" width="width">
      <template #default="{row}">
        <el-image style="width: 100px; height: 100px" :src="row.skuDefaultImg"></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="prop" label="重量(g)" width="width">
      <template #default="{row}">
        <span>{{ row.weight }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="prop" label="价格(元)" width="width"> 
      <template #default="{row}">
        <span>{{ row.price }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="prop" label="操作" width="400px">
      <template #default="{row}">
        <el-button type="success" icon="Top">上架</el-button>
        <el-button type="primary" icon="Edit">编辑</el-button>
        <el-button type="warning" icon="InfoFilled">查看</el-button>
        <el-button type="danger" icon="Delete" @click="deleteSKU(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      :page-sizes="pageSizeList"
      layout="total, jumper, prev, pager, next,->, sizes"
      :total="total"
      class="pagination"
      @change="getSKUPagination()"
      :size="size"
    />
</template>

<script lang="ts" setup>
import { reqDeleteSKU, reqGetSKUPagination } from '@/apis/product/sku'
import type { SKUType } from '@/apis/product/sku/type'
import {onMounted, ref} from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css' // 关键：引入所有组件样式


type paginationSize='small'|'large'
const total=ref<number>(100)
const pageSize=ref<number>(4)
const pageNum=ref<number>(1)
const pageSizeList=[4,6,8,10]
const size:paginationSize='large'
// 存储表格信息
const SKUList=ref<SKUType[]>([])
  // 获取列表信息
const getSKUPagination=async(Notify:boolean=true)=>{

    const res=await reqGetSKUPagination(pageNum.value,pageSize.value)
    if(res.code===200){
      SKUList.value=res.data.records
      total.value=res.data.total
      // 是否要展示ElMessage
      if(Notify){
        ElMessage({
        type:'success',
        message:'删除成功'
      })
      }
      return 'ok'
    }else{
      ElMessage({
        type:'error',
        message:'删除失败'
      })
      throw new Error(res.message||'获取列表失败')
    }
}
// 挂载时获取列表信息
onMounted(async()=>{
  // 获取分页信息
  await getSKUPagination(false)

})
// 删除sku信息
const deleteSKU=async(row:SKUType)=>{
  const res=await reqDeleteSKU((row.id as number))
  console.log(res);
  // 重新获取SKU
  await getSKUPagination()
}
</script>

<style scoped lang="scss">
.pagination {
  margin-top: 10px;
}

</style>

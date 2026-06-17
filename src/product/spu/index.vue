<template>
  <!-- Category表单 -->
  <div>
    <Category></Category>
    <!-- spu列表和spuForm的显示 -->
    <el-card class="append-spu">
      <div v-show="ShowWhat === 0" class="SPUList">
        <el-button type="primary" icon="Plus" class="Plus" @click="HandleAppendSPU"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" :data="SPUList">
          <el-table-column prop="prop" label="序号" width="100px" type="index" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="SPU名称" width="150px">
            <template #default="{ row }">
              {{ row.spuName }}
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="SPU描述" width="width">
            <template #default="{ row }">
              {{ row.description }}
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template #default="{ row }">
              <el-button type="primary" icon="Plus"></el-button>
              <el-button type="warning" icon="Edit" @click="HandleEdit(row,(C3Id as number))"></el-button>
              <el-button type="info" icon="InfoFilled" @click="HandleInfo"></el-button>
              <el-button type="danger" icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          class="pagination"
          :page-sizes="[3, 6, 9]"
          :background="true"
          layout="total, prev, pager, next, jumper,->,sizes"
          :total="total"
          @change="getSPUpagination"
        />
      </div>
      <div v-show="ShowWhat === 1" class="spuForm">
        <spuForm ref="spuVC" @canceled="UpdateSpu" @change-disabled="Handle2Save"></spuForm>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import spuForm from '@/product/spu/spuForm.vue'
import Category from '@/components/Category/index.vue'
import { ref, watch } from 'vue'
import { reqGetSPUpagination } from '@/apis/product/spu'
import useCategoryStore from '@/stores/modules/Category'
import { storeToRefs } from 'pinia'
import type { SPUType } from '@/apis/product/spu/type'
// 获取Category传递的信息
const CategoryStore = useCategoryStore()
const { C3Id, Isdisabled } = storeToRefs(CategoryStore)
// SPU分页列表
const SPUList = ref<SPUType[]>()
// 现在的页数
const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
const total = ref<number>(0)
// 初始化定义spuForm
const spuVC = ref()
// spuForm定义
/* 
0:主界面
1:编辑界面
2:info界面
*/
const ShowWhat = ref<number>(0)
// spu
// 获取第三分类数据和total
const getSPUpagination = async () => {
  try {
    const res = await reqGetSPUpagination(currentPage.value, pageSize.value, C3Id.value)
    // console.log(res);
    if (res.code === 200) {
      // 得到分页器数据和totalvalue
      SPUList.value = res.data.records
      total.value = res.data.total
      return 'ok'
    } else {
      throw '获取三级分类异常'
    }
  } catch {
    throw '网络异常'
  }
}
// 监听三级分类获取列表
watch(C3Id, getSPUpagination)
// 按钮 添加SPU
const HandleAppendSPU = () => {
  Isdisabled.value = true
  ShowWhat.value = 1
  // 让子组件全部赋空值
  spuVC.value.ClearFormParams()
}
// 接子组件传递的参数
const UpdateSpu = (num: number) => {
  ShowWhat.value = num
  Isdisabled.value = false
}
// 处理编辑事件
const HandleEdit = (row: SPUType,C3Id:number) => {
  spuVC.value.initHasSpuData(row,C3Id)
  ShowWhat.value=1
  Isdisabled.value=true
}
// 处理第二视图保存事件
const Handle2Save=async()=>{
  Isdisabled.value=false
  ShowWhat.value=0
  // 重新渲染列表
  await getSPUpagination()
}
// 处理第二视图查看Info事件
const HandleInfo=()=>{
  // ShowWhat.value==
}
</script>

<style scoped lang="scss">
.pagination {
  margin-top: 20px;
}
.Plus {
  margin-bottom: 20px;
}
.append-spu {
  margin-top: 20px;
}
</style>

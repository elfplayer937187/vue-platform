<template>
  <el-card class="box-card">
    <!-- 添加品牌按钮 -->
    <el-button type="primary" icon="Plus" class="Plus" @click="dialogVisible=true">添加品牌</el-button>
    <!-- 对话框组件 -->
    <el-dialog v-model="dialogVisible" title="添加品牌" width="500" :before-close="handleClose" draggable overflow>
      <el-form label-width="80px">
          <el-form-item label="文件名称" required>
            <el-input v-model="tradeName" placeholder="请填写品牌名称"></el-input>
          </el-form-item>
          <el-form-item label="文件地址" required>

          </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 表格组件 -->
    <!-- 
    table
    -- border:设置纵向边框
    -- lable:列表名称
    -- align:对齐方式
    
     -->
    <el-table style="width: 100%" border :data="tradeMarkList">
      <!-- colomn里的prop以div形式展示东西 ，一般不用，用slot-->
      <el-table-column label="序号" width="width" text="index" align="center">
        <!-- 可以用插槽传递两个参数，第一个是该行信息，一个是索引 -->
        <template v-slot="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="品牌名称" width="width">
        <template #default="{ row }">
          {{ row.tmName }}
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="品牌logo">
        <template #default="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="品牌操作" width="width">
        <el-button type="primary" icon="Edit"></el-button>
        <el-button type="primary" icon="Delete"></el-button>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="demo-pagination-block">
      <div class="demonstration"></div>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :background="background"
        layout="total,prev, pager, next,->,sizes, jumper"
        :page-sizes="[3, 4, 5, 6]"
        :total="total"
        prev-text="上一页"
        next-text="下一页"
        @size-change="ChangeSize"
        @current-change="ChangePage"
      />
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getTrademarkList } from '@/apis/product/trademark'
import type { RecordsType, getTrademarkListResponseType } from '@/apis/product/trademark/type'
// 对话框是否可见
const dialogVisible=ref<boolean>(false)
// 当前页面码
const currentPage = ref<number>(1)
// 一个页面显示多少条数据
const pageSize = ref<number>(3)
// 背景颜色设置
const background = ref(true)
// 数据总数
const total = ref<number>(0)
const tradeMarkList = ref<RecordsType>([])
const HasTradeMark = async () => {
  const res: getTrademarkListResponseType = await getTrademarkList(
    currentPage.value,
    pageSize.value,
  )
  if (res.code === 200) {
    console.log(res)

    total.value = res.data.total
    tradeMarkList.value = res.data.records
  }
}
// 初始化品牌名称和路径
const tradeName=ref<string>('')
onMounted(() => {
  HasTradeMark()
})
// 页面页数变化触发
const ChangePage = () => {
  HasTradeMark()
}
// 页面尺寸变化触发
const ChangeSize = () => {
  currentPage.value = 1
  HasTradeMark()
}
const handleClose=()=>{

}
</script>

<style scoped lang="scss">
.demo-pagination-block {
  margin-top: 10px;
}
.Plus {
  margin-bottom: 10px;
}
</style>

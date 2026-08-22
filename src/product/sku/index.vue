<template>
  <div>
    <!-- 导出按钮 -->
    <el-button
      type="primary"
      icon="Download"
      color="green"
      style="margin-bottom: 10px"
      @click="HandleExport"
      >导出为Excel</el-button
    >
    <el-table :data="SKUList" style="width: 100%" border>
      <el-table-column
        prop="prop"
        label="序号"
        width="100px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column prop="prop" label="名称" width="width">
        <template #default="{ row }">
          <span>{{ row.skuName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="描述" width="width">
        <template #default="{ row }">
          <span>{{ row.skuDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="默认图片" width="width">
        <template #default="{ row }">
          <el-image style="width: 100px; height: 100px" :src="row.skuDefaultImg"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="重量(g)" width="width">
        <template #default="{ row }">
          <span>{{ row.weight }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="价格(元)" width="width">
        <template #default="{ row }">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="400px">
        <template #default="{ row }">
          <el-button
            v-has="`btn.Sku.updown`"
            type="success"
            :icon="row.isSale === 0 ? 'Bottom' : 'Top'"
            @click="ChangeOnSale(row.isSale, row.skuId)"
            >上架</el-button
          >
          <el-button v-has="`btn.Sku.update`" type="primary" icon="Edit">编辑</el-button>
          <el-button
            v-has="`btn.Sku.detail`"
            type="warning"
            icon="InfoFilled"
            @click="ShowSKUDetail(row.skuId)"
            >查看</el-button
          >
          <el-button v-has="`btn.Sku.remove`" type="danger" icon="Delete" @click="deleteSKU(row)"
            >删除</el-button
          >
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
      :size="size"
      @change="getSKUPagination()"
    />
    <!-- 抽屉栏 -->
    <el-drawer v-model="ShowDrawer">
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <template #default>
        <el-row :gutter="15" type="flex">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ SKUInfo?.skuName }}</el-col>
        </el-row>
        <el-row :gutter="15" type="flex">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ SKUInfo?.skuDesc }}</el-col>
        </el-row>
        <el-row :gutter="15" type="flex">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ SKUInfo?.price }}</el-col>
        </el-row>
        <el-row :gutter="15" type="flex">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="SaleAttr in SKUInfo?.skuAttrValueList"
              :key="SaleAttr.id"
              type="success"
              >{{ SaleAttr.attrName }}</el-tag
            >
          </el-col>
        </el-row>
        <el-row :gutter="15" type="flex">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="AttrSale in SKUInfo?.skuSaleAttrValueList"
              :key="AttrSale.id"
              type="warning"
              >{{ AttrSale.saleAttrName }}</el-tag
            >
          </el-col>
        </el-row>
        <el-row :gutter="15" type="flex">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel
              indicator-position="outside"
              height="120px"
              :autoplay="true"
              :interval="3000"
            >
              <el-carousel-item>
                <el-image
                  style="width: 100px; height: 100px"
                  :src="SKUInfo?.skuDefaultImg"
                ></el-image>
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
      <template #footer>
        <el-button type="primary" icon="Download" color="green" @click="HandleExportSKUInfo"
          >导出为Excel</el-button
        >
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import {
  reqDeleteSKU,
  reqGetSKUPagination,
  reqOnSale,
  reqCancelSale,
  reqGetSKUInfo,
} from '@/apis/product/sku'
import type { SKUType } from '@/apis/product/sku/type'
import { ExportXlsx } from '@/utils/export-xlsx'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css' // 关键：引入所有组件样式

type paginationSize = 'small' | 'large'
const total = ref<number>(100)
const pageSize = ref<number>(4)
const pageNum = ref<number>(1)
const pageSizeList = [4, 6, 8, 10]
const size: paginationSize = 'large'
// 是否显示Drawer
const ShowDrawer = ref<boolean>(false)
// 存储表格信息
const SKUList = ref<SKUType[]>([])
// 存储SKU详细信息
const SKUInfo = ref<SKUType>()
// 获取列表信息
const getSKUPagination = async (Notify: boolean = true) => {
  const res = await reqGetSKUPagination(pageNum.value, pageSize.value)
  if (res.code === 200) {
    SKUList.value = res.data.records
    total.value = res.data.total

    // 是否要展示ElMessage
    if (Notify) {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    }
    return 'ok'
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
    throw new Error(res.message || '获取列表失败')
  }
}
// 挂载时获取列表信息
onMounted(async () => {
  // 获取分页信息
  await getSKUPagination(false)
})
// 删除sku信息
const deleteSKU = async (row: SKUType) => {
  try {
    const res = await reqDeleteSKU(row.skuId as number)

    if (res.code === 200) {
      ElMessage({ type: 'success', message: '删除成功' })
    } else {
      ElMessage({ type: 'error', message: '删除失败' })
    }
  } catch {
    ElMessage({ type: 'error', message: '网络异常' })
  }
  // 重新获取SKU
  await getSKUPagination(false)
}
// 控制是否上架
const ChangeOnSale = async (isSale: number, skuId: number) => {
  if (isSale) {
    await reqCancelSale(skuId)
    ElMessage({
      type: 'success',
      message: '成功下架',
    })
  } else {
    await reqOnSale(skuId)
    ElMessage({
      type: 'success',
      message: '成功上架',
    })
  }
  await getSKUPagination(false)
}
// 导出当前页 SKU 列表为 Excel
const HandleExport = () => {
  if (SKUList.value.length === 0) {
    ElMessage({
      type: 'warning',
      message: '当前没有可导出的 SKU',
    })
    return
  }
  ExportXlsx(SKUList.value, {
    fileName: 'SKU列表',
    mapper: (item) => ({
      SKU名称: item.skuName,
      描述: item.skuDesc,
      重量g: item.weight,
      价格元: item.price,
    }),
  })
}
// 导出抽屉中当前查看的 SKU 为 Excel
const HandleExportSKUInfo = () => {
  if (!SKUInfo.value) {
    ElMessage({
      type: 'warning',
      message: '当前没有可导出的 SKU',
    })
    return
  }
  ExportXlsx([SKUInfo.value], {
    fileName: `${SKUInfo.value.skuName}详情`,
    mapper: (item) => ({
      SKU名称: item.skuName,
      描述: item.skuDesc,
      重量g: item.weight,
      价格元: item.price,
      销售属性: item.skuSaleAttrValueList
        .map((v) => v.saleAttrName)
        .filter(Boolean)
        .join('、'),
      平台属性: item.skuAttrValueList
        .map((v) => v.attrName)
        .filter(Boolean)
        .join('、'),
    }),
  })
}
// 显示SKU详细信息
const ShowSKUDetail = async (skuId: number) => {
  ShowDrawer.value = true
  // 获取详细信息
  const res = await reqGetSKUInfo(skuId)

  if (res.code === 200) {
    SKUInfo.value = res.data
  }
}
</script>

<style scoped lang="scss">
.pagination {
  margin-top: 10px;
}
.el-drawer .el-row {
  margin: 20px 0;
}
.el-row .el-image {
  margin-left: 80px;
}
</style>

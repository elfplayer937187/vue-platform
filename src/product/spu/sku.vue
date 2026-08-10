<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="sku名称">
      <el-input v-model="SKUSaveForm.skuName" placeholder="请输入SKU名称"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input v-model="SKUSaveForm.price" placeholder="请输入价格" type="number"></el-input>
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input v-model="SKUSaveForm.weight" placeholder="请输入重量" type="number"></el-input>
    </el-form-item>
    <el-form-item label="sku描述">
      <el-input v-model="SKUSaveForm.skuDesc" type="textarea" placeholder="请输入描述"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <!-- 平台属性下的select选择框 -->
      <!-- 平台属性 -->
      <el-form label-width="80px" :inline="true">
        <el-form-item v-for="Attr in AttrList" :key="Attr.attrId" :label="Attr.attrName">
          <el-select v-model="Attr.platformChose" placeholder="请选择属性" style="width: 200px">
            <el-option
              v-for="AttrTag in Attr.attrValueList"
              :key="AttrTag.attrValueId"
              :label="AttrTag.valueName"
              :value="`${Attr.attrId}:${AttrTag.attrValueId}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item
          v-for="TradeMark in AllTradeMarkList"
          :key="TradeMark.spuSaleAttrId"
          style="width: 200px"
          :label="TradeMark.saleAttrName"
        >
          <el-select v-model="TradeMark.SaleChosed" placeholder="请选择销售属性">
            <el-option
              v-for="Tag in TradeMark.spuSaleAttrValueList"
              :key="Tag.saleAttrValueId"
              :value="`${TradeMark.spuSaleAttrId}:${Tag.saleAttrValueId}`"
              :label="Tag.saleAttrValueName"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table ref="table" :data="ImageList" style="width: 100%" border>
        <el-table-column type="selection" width="80px" align="center"> </el-table-column>
        <el-table-column label="图片" width="width">
          <template #default="{ row }">
            <el-image :src="row.imgUrl"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="名称" width="width">
          <template #default="{ row }">
            <span>{{ row.imgName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width">
          <template #default="{ row }">
            <el-button type="danger" @click="SetDefaultImg(row)">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <!-- 两个按钮 -->
    <el-form-item label="">
      <el-button v-has="`btn.Spu.addsku`" type="primary" @click="HandleSave">保存</el-button>
      <el-button @click="$emit('ChangeShowWhat')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reqGetAllTradeMarkAttrList, reqGetAllTradeMarkImage } from '@/apis/product/spu'
import { getCategoryTag } from '@/apis/product/attr'
import { reactive, ref } from 'vue'
import type { SPUType, AttrType, ImageType } from '@/apis/product/spu/type'
import type { ListItemType } from '@/apis/product/attr/type'
import type { SKUType } from '@/apis/product/sku/type'
import { reqAppendSKUInfo } from '@/apis/product/sku'
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css' // 关键：引入所有组件样式

// // 提取文件名称
// function getFileNameWithoutExtension(filename:any) {
//   return filename.replace(/\.[^/.]+$/, '');
// }
// 获取图片展示列表实例
const table = ref()
// 存储对象模板（用于重置）
const SKUSave = reactive<SKUType>({
  category3Id: '', //
  spuId: '', //spuId
  tmId: '', //品牌id

  //   基础属性
  weight: '',
  price: '',
  skuDesc: '',

  skuName: '',
  skuDefaultImg: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
})
// 存储保存的对象
const SKUSaveForm = reactive<SKUType>({
  category3Id: '', //
  spuId: '', //spuId
  tmId: '', //品牌id

  //   基础属性
  weight: '',
  price: '',
  skuDesc: '',

  skuName: '',
  skuDefaultImg: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
})
// 存储表单元素
const AttrList = ref<ListItemType[]>([])
// 存储销售属性
const AllTradeMarkList = ref<AttrType[]>([])
// 存储图片信息
const ImageList = ref<ImageType[]>([])
const $emit = defineEmits(['ChangeShowWhat'])
const initSKUData = async (
  C1Id: number | string,
  C2Id: number | string,
  row: SPUType,
  C3Id: number | string,
) => {
  // 重置对象
  Object.assign(SKUSaveForm, SKUSave)
  AttrList.value = []
  AllTradeMarkList.value = []
  ImageList.value = []
  // 获取属性列表
  const res1 = await getCategoryTag(C1Id, C2Id, row.category3Id)
  // 获取销售属性
  const res2 = await reqGetAllTradeMarkAttrList(row.spuId as number)
  // 后端返回的销售属性值字段是 spuSaleAttrList，映射为 spuSaleAttrValueList
  AllTradeMarkList.value = res2.data.map((attr: any) => ({
    ...attr,
    spuSaleAttrValueList: attr.spuSaleAttrList || [],
  }))
  // 获取产品图片
  const res3 = await reqGetAllTradeMarkImage(row.spuId as number)
  SKUSaveForm.category3Id = C3Id
  SKUSaveForm.spuId = row.spuId as number
  SKUSaveForm.tmId = row.tmId
  AttrList.value = res1.data
  ImageList.value = res3.data
  // console.log(ImageList.value);
}
// 设置默认图片
const SetDefaultImg = (row: ImageType) => {
  console.log(row.imgUrl)

  // 所有前面多选框全部不选中
  ImageList.value.forEach((item) => {
    table.value.toggleRowSelection(item, false)
  })
  table.value.toggleRowSelection(row, true)
  // 赋值
  SKUSaveForm.skuDefaultImg = row.imgUrl as string
}

// 处理保存事件
const HandleSave = async () => {
  // 整理AttrList表格数据
  SKUSaveForm.skuAttrValueList = AttrList.value.reduce((prev: any, next: any) => {
    if (next.platformChose) {
      // 取出两个属性
      const [attrId, valueId] = next.platformChose.split(':').map((item: string) => Number(item))
      prev.push({
        attrId,
        valueId,
      })
    }
    return prev
  }, [])

  // 整理AllTradeMarkList数据
  SKUSaveForm.skuSaleAttrValueList = AllTradeMarkList.value.reduce((prev: any, next: any) => {
    if (next.SaleChosed) {
      const [saleAttrId, saleAttrValueId] = next.SaleChosed.split(':').map((item: string) =>
        Number(item),
      )
      prev.push({
        saleAttrId,
        saleAttrValueId,
      })
    }
    return prev
  }, [])

  // 整理图片列表
  const skuImageList = ImageList.value
    .filter((item) => item.imgUrl)
    .map((item) => ({
      imageName: item.imgName || item.name || '',
      imageUrl: item.imgUrl || item.url || '',
      spuImageId: item.id || item.ID || 0,
      isDefault: SKUSaveForm.skuDefaultImg === (item.imgUrl || item.url) ? '1' : '0',
    }))

  // 构建完整的请求参数（确保字段类型正确）
  const params: any = {
    ...SKUSaveForm,
    spuId: Number(SKUSaveForm.spuId),
    category3Id: Number(SKUSaveForm.category3Id),
    tmId: Number(SKUSaveForm.tmId),
    weight: String(SKUSaveForm.weight),
    price: Number(SKUSaveForm.price),
    skuImageList,
  }

  try {
    // 发送请求
    const res = await reqAppendSKUInfo(params)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '保存成功',
      })
      // 切换界面
      $emit('ChangeShowWhat')
    } else {
      ElMessage({
        type: 'error',
        message: '保存失败',
      })
    }
  } catch {
    throw '网络异常'
  }
}
defineExpose({ initSKUData })
</script>

<style scoped lang="scss"></style>

<template>
  <div>
    <el-form ref="form" label-width="80px">
      <!-- 名称 -->
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入名称" v-model="FormParams.spuName"></el-input>
      </el-form-item>
      <!-- 所有品牌数据 -->
      <el-form-item label="SPU品牌">
        <el-select v-model="FormParams.spuId" placeholder="">
          <el-option
            :label="data.tmName"
            :value="data.id"
            v-for="data in TradeMarkList"
            :key="data.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 描述的textarea -->
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="请输入你的描述..."
          v-model="FormParams.description"
        ></el-input>
      </el-form-item>
      <!-- 照片 -->
      <el-form-item label="SPU照片">
        <el-upload
          :headers="headers"
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          v-for="Image in FormParams.ImageList"
          :key="Image.id"
        >
          <img v-if="Image.imgUrl" :src="Image.imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <!-- 销售属性选择 -->
      <el-form-item label="SPU销售属性" label-width="100px">
        <el-select placeholder="" style="width: 300px; margin-right: 40px">
            <el-option :label="PerHas.name" :value="PerHas.id" v-for="PerHas in FormParams.Has" :key="PerHas.id"></el-option>
        </el-select>
        <el-button type="primary" icon="Plus" class="SPU-appendbtn">添加属性值</el-button>
      </el-form-item>
      <!-- 销售表 -->
      <el-form-item label="" label-width="100px">
        <el-table style="width: 100%" border :data="FormParams.AllAttrId">
          <el-table-column prop="prop" label="序号" width="100px" type="index" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="销售属性名字" width="width">
            <template #default="{ row }">
              {{ row.saleAttrName }}
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="销售属性值" width="width">
            <template #default="{row}">
                <el-tag class="SaleAttrTag" type="success" v-for="List in row.spuSaleAttrValueList" :key="List.id">{{ List.saleAttrValueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width"> </el-table-column>
        </el-table>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item label="" label-width="100px">
        <el-button type="primary">保存</el-button>
        <el-button type="primary" @click="HandleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { SPUType, TradeMarkDataType } from '@/apis/product/spu/type'
import useUserStore from '@/stores/modules/user'
import {
  reqGetAllTradeMark,
  reqGetAllTradeMarkImage,
  reqGetAllTradeMarkAttrList,
  reqGetSPUHas,
} from '@/apis/product/spu'
import type { FormType } from './FormType'
// 获得token
const headers = { token: useUserStore().token }
// 表格数据
const FormParams = reactive<FormType>({
  // 存储spuId
  spuId: '',
  // 编辑初始化
  spuName: '',
  description: '',
  ImageList: null,
  Has: null,
  AllAttrId: null,
})

// cancel按钮传给父组件信息
const $emit = defineEmits(['Canceled'])
const HandleCancel = () => {
  $emit('Canceled', 0)
}
// 所有品牌数据
const TradeMarkList = ref<TradeMarkDataType[]>()

// 处理父组件中编辑事件
const initHasSpuData = async (row: SPUType) => {
  FormParams.spuName = row.spuName
  FormParams.description = row.description
  FormParams.spuId = row.id as number
  const AllTrademark = await reqGetAllTradeMark()
  TradeMarkList.value = AllTrademark.data
  // 获取图片
  const Images = await reqGetAllTradeMarkImage(FormParams.spuId)
  //   console.log(Images);

  FormParams.ImageList = Images.data
  //   获取商品属性名称
  //   const SaleAttrNames=await reqGetAllTradeMarkAttrList(spuId)
  //   console.log(SaleAttrNames);

  // 获取属性
  const PreHas = await reqGetSPUHas()
  FormParams.Has = PreHas.data
  //   FormParams.Has=Attrs.data

  //   获取属性列表
  const PreAttrId = await reqGetAllTradeMarkAttrList(FormParams.spuId)
  FormParams.AllAttrId = PreAttrId.data
//   console.log(PreAttrId)
}
defineExpose({ initHasSpuData })
</script>

<style lang="scss" scoped>
    .SaleAttrTag{
        margin-right: 10px;
    }
</style>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  margin-right: 20px;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

<template>
  <div>
    <el-form ref="form" label-width="80px">
      <!-- 名称 -->
      <el-form-item label="SPU名称">
        <el-input v-model="FormParams.spuName" placeholder="请输入名称"></el-input>
      </el-form-item>
      <!-- 所有品牌数据 -->
      <el-form-item label="SPU品牌">
        <el-select v-model="FormParams.tmId" placeholder="">
          <el-option
            v-for="data in TradeMarkList"
            :key="data.id"
            :label="data.tmName"
            :value="data.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 描述的textarea -->
      <el-form-item label="SPU描述">
        <el-input
          v-model="FormParams.description"
          type="textarea"
          placeholder="请输入你的描述..."
        ></el-input>
      </el-form-item>
      <!-- 照片 -->
      <el-form-item label="SPU照片">
        <el-upload
          v-model:file-list="FormParams.spuImageList"
          :headers="headers"
          list-type="picture-card"
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
          :before-upload="beforeUpload"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <!-- 图片预览弹窗 -->
        <el-dialog v-model="dialogVisible">
          <img :src="dialogImageUrl" style="width: 100%" alt="" />
        </el-dialog>
      </el-form-item>
      <!-- 销售属性选择 -->
      <el-form-item label="SPU销售属性" label-width="100px">
        <!-- 选择未选择的销售属性 -->
        <el-select
          v-model="UnchosedHasId"
          :placeholder="`还有${has?.length}项未选择`"
          style="width: 300px; margin-right: 40px"
        >
          <el-option
            v-for="PerHas in has"
            :key="PerHas.id"
            :label="PerHas.name"
            :value="PerHas.id"
          ></el-option>
        </el-select>

        <el-button type="primary" icon="Plus" class="SPU-appendbtn" @click="HandleAppendAttr" :disabled="UnchosedHasId===''">添加属性值</el-button>
      </el-form-item>
      <!-- 销售表 -->
      <el-form-item label="" label-width="100px">
        <el-table style="width: 100%" border :data="FormParams.spuSaleAttrList">
          <el-table-column prop="prop" label="序号" width="100px" type="index" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="销售属性名字" width="width">
            <template #default="{ row }">
              {{ row.saleAttrName }}
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="销售属性值" width="width">
            <template #default="{ row }">
              <el-tag
                v-for="List in row.spuSaleAttrValueList"
                :key="List.id"
                class="SaleAttrTag"
                type="success"
                closable
                >{{ List.saleAttrValueName }}</el-tag
              >
              <el-button type="primary" icon="Plus" style="height: 25px"></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template #default="{ row }">
              <el-button type="danger" icon="Delete" @click="HandleRowDelete(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item label="" label-width="100px">
        <el-button type="primary" @click="SaveLoad">保存</el-button>
        <el-button type="primary" @click="HandleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { AttrType, HasType, SPUType, TradeMarkDataType } from '@/apis/product/spu/type'
import useUserStore from '@/stores/modules/user'
import {
  reqGetAllTradeMark,
  reqGetAllTradeMarkImage,
  reqGetAllTradeMarkAttrList,
  reqGetSPUHas,
  reqAddSPU,
} from '@/apis/product/spu'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import 'element-plus/dist/index.css' // 关键：引入所有组件样式

// 存储一下Has
const has = ref<HasType[]>([])
const UnchosedHasId = ref<string | number>('')
// 获得token
const headers = { token: useUserStore().token }

// 图片预览
const dialogVisible = ref(false)
const dialogImageUrl = ref('')

// 上传前校验：只允许图片且不超过2MB
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const isImage = rawFile.type.startsWith('image/')
  const isLt2M = rawFile.size / 1024 / 1024 < 2
  if (!isImage) {
    ElMessage.error('只能上传图片文件！')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB！')
    return false
  }
  return true
}

// 上传成功回调
const handleUploadSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  if (response.code === 200) {
    // 服务器返回的图片地址赋给当前文件
    uploadFile.url = response.data
    uploadFile.name = response.data
    ElMessage.success('上传成功')
  } else {
    ElMessage.error('上传失败')
  }
}

// 删除图片回调
const handleRemove: UploadProps['onRemove'] = () => {
  // el-upload 的 v-model:file-list 会自动从列表中移除，无需手动操作
}

// 图片预览回调
const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

// 数据备份
const FormParamsSpace = reactive<SPUType>({
  // 存储id
  id: '', //spu的id
  // 编辑初始化
  spuName: '',
  description: '',
  spuImageList: [],
  spuSaleAttrList: null,
  category3Id: -1,
  tmId: '',
})
// 表格数据
const FormParams = reactive<SPUType>({
  // 存储id
  id: '', //spu的id
  // 编辑初始化
  spuName: '',
  description: '',
  spuImageList: [],
  spuSaleAttrList: [],
  category3Id: -1,
  tmId: 1,
})
// 清除表格数据
const ClearFormParams = () => {
  Object.assign(FormParams, FormParamsSpace)
}
// cancel按钮传给父组件信息
const $emit = defineEmits(['Canceled', 'changeDisabled'])
const HandleCancel = () => {
  $emit('Canceled', 0)
}
// 所有品牌数据
const TradeMarkList = ref<TradeMarkDataType[]>()
// 获取属性赋值给has
const FilterHas = async () => {
  // 获取属性[共三种]
  const PreHas = await reqGetSPUHas()
  // 过滤元素赋值给has
  if (FormParams.spuImageList !== null) {
    has.value = PreHas.data.filter((item) => {
      // item:{id,name} name在spuSaleAttrList[i].saleAttrName
      for (let i = 0; i < (FormParams.spuSaleAttrList?.length as number); i++) {
        if (item.name === (FormParams.spuSaleAttrList as any)[i].saleAttrName) {
          return false
        }
      }
      return true
    })
  }
}
// 处理父组件中编辑事件
const initHasSpuData = async (row: SPUType, C3Id: number) => {
  FormParams.category3Id = C3Id
  FormParams.spuName = row.spuName
  FormParams.description = row.description
  FormParams.id = row.id as number
  FormParams.tmId = row.tmId
  const AllTrademark = await reqGetAllTradeMark()
  TradeMarkList.value = AllTrademark.data
  // 获取图片
  const Images = await reqGetAllTradeMarkImage(FormParams.id)

  FormParams.spuImageList = Images.data.map((item) => {
    return {
      name: item.imgName || item.name,
      url: item.imgUrl || item.url,
    }
  })

  //   获取属性列表
  const PreAttrId = await reqGetAllTradeMarkAttrList(FormParams.id)
  FormParams.spuSaleAttrList = PreAttrId.data
  // 获取属性赋值给has
  await FilterHas()
}

// 保存第二界面数据
const SaveLoad = async () => {
  try {
    // 将图片列表从 el-upload 格式 { name, url } 转回服务端格式 { imgName, imgUrl }
    const params: SPUType = {
      ...FormParams,
      spuImageList: FormParams.spuImageList
        ? FormParams.spuImageList.map((item) => ({
            imgName: (item.name || item.imgName)!,
            imgUrl: (item.url || item.imgUrl)!,
          }))
        : null,
    }
    const res = await reqAddSPU(params)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '保存成功',
      })
      // 触发事件改变视图
      $emit('changeDisabled')
    } else {
      ElMessage({
        type: 'error',
        message: '保存失败',
      })
    }
  } catch {
    ElMessage({
      type: 'error',
      message: '网络异常',
    })
  }
}
// 处理SPU销售属性表单整行删除
const HandleRowDelete = async(row: AttrType) => {
  ;(FormParams.spuSaleAttrList as any) = FormParams.spuSaleAttrList?.filter((item) => {
    console.log(item.id, row.id)
    return item.id !== row.id
  })
  // 重新渲染has
  await FilterHas()
}
// 处理第二界面添加属性值按钮
const HandleAppendAttr=()=>{
  

}
defineExpose({ initHasSpuData, ClearFormParams })
</script>

<style lang="scss" scoped>
.SaleAttrTag {
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

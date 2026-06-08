<template>
  <el-card class="box-card">
    <!-- 添加品牌按钮 -->
    <el-button type="primary" icon="Plus" class="Plus" @click="showDialog">添加品牌</el-button>
    <!-- 对话框组件 -->
    <el-dialog
      v-model="dialogVisible"
      title="添加品牌"
      width="500"
      :before-close="handleClose"
      draggable
      overflow
    >
      <!--  表单 -->
      <el-form ref="formRef" label-width="80px" :rules="rules" :model="trademarkParams">
        <el-form-item label="文件名称" prop="tmName" required>
          <el-input v-model="trademarkParams.tmName" placeholder="请填写品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="文件地址" prop="logoUrl" required>
          <!-- 放置upload -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :headers="headers"
            :before-upload="beforeAvatarUpload"
            :on-success="handleSuccess"
            :multiple="false"
          >
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="uploading1"> 上传 </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 表格组件 -->
    <!-- 
    table
    -- border:设置纵向边框
    -- lable:列表名称
    -- align:对齐方式#defau
    
     -->
    <el-table style="width: 100%" border :data="tradeMarkList">
      <!-- colomn里的prop以div形式展示东西 ，一般不用，用slot-->
      <el-table-column label="序号" width="width" text="index" align="center">
        <!-- 可以用插槽传递两个参数，第一个是该行信息，一个是索引 -->
        <template #default="{ $index }">
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
        <template #default="{ row }">
          <el-button type="primary" icon="Edit" @click="changeValue(row)"></el-button>
          <el-button type="primary" icon="Delete" @click="showDeleteDialog(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 删除的dialog -->
    <el-dialog v-model="DeleteDialogVisible" class="delete-dialog" title="是否删除？" width="500" destroy-on-close center>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="DeleteDialogVisible = false">否</el-button>
          <el-button type="primary" @click="deleteValue">是</el-button>
        </div>
      </template>
    </el-dialog>
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
import { ref, onMounted, reactive } from 'vue'
import { getTrademarkList, appendTrademarkList, removeTradeMarkList } from '@/apis/product/trademark'
import type {
  RecordsType,
  getTrademarkListResponseType,
  tradeMarkType,
  RecordsData,
} from '@/apis/product/trademark/type'
import useUserStore from '@/stores/modules/user'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import type { UploadProps, FormRules } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
// 获取确认表单的元素
const formRef = ref()

// 上传文件地址
const trademarkParams = reactive<tradeMarkType>({
  tmName: '',
  logoUrl: '',
})
// 文件地址请求头
const headers = { token: useUserStore().token }
// 对话框是否可见
const dialogVisible = ref<boolean>(false)
// 当前页面码
const currentPage = ref<number>(1)
// 一个页面显示多少条数据
const pageSize = ref<number>(3)
// 背景颜色设置
const background = ref(true)
// 数据总数
const total = ref<number>(0)
// tradeMarklist列表
const tradeMarkList = ref<RecordsType>([])
  // 控制删除表单是否可见
const DeleteDialogVisible=ref<boolean>(false)
// delete获取的row
let deleteRow=-1
// 获取列表
const HasTradeMark = async () => {
  const res: getTrademarkListResponseType = await getTrademarkList(
    currentPage.value,
    pageSize.value,
  )
  if (res.code === 200) {
    total.value = res.data.total
    tradeMarkList.value = res.data.records
  }
}
// 初始化品牌名称和路径
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
const handleClose = () => {}

// 处理品牌logo上传函数，上传之前的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 不是jpg->1,是不是png
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('Avatar picture must be JPG/PNG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
// 图片上传成功之后的钩子
const handleSuccess: UploadProps['onSuccess'] = (response) => {
  trademarkParams.logoUrl = response.data
}
// 打开对话框
const showDialog = () => {
  dialogVisible.value = true
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''
}
// 添加品牌confirm的钩子
const uploading1 = async () => {
  try {
    await formRef.value.validate()
    const res = await appendTrademarkList(trademarkParams)

    if (res.code === 200) {
      // 添加成功关闭对话框，重新渲染页面，提示信息
      dialogVisible.value = false
      ElMessage({
        type: 'success',
        message: '添加信息成功',
      })

      HasTradeMark()
    } else {
      dialogVisible.value = false
      ElMessage({
        type: 'error',
        message: '添加信息失败',
      })
    }
  } catch (error) {
    if ((error as any).logoUrl || (error as any).tmName) {
      ElMessage({
        type: 'error',
        message: '图片或者姓名未添加或者出错',
      })
    } else {
      ElMessage({
        type: 'error',
        message: '网络异常',
      })
    }
  }
}

// 修改数据
const changeValue = (row: RecordsData) => {
  console.log(row)
  // 1.拿到id,url,name,   2.打开dialog    3.渲染到dialog
  dialogVisible.value = true
  trademarkParams.id = row.id
  trademarkParams.logoUrl = row.logoUrl
  trademarkParams.tmName = row.tmName
}
// 删除数据
const deleteValue = async () => {
  try{
    await removeTradeMarkList(deleteRow)
    ElMessage({
      type:'success',
      message:'删除成功！'
    })
  }catch{
    ElMessage({
      type:'error',
      message:'删除失败！'
    })
  }
  DeleteDialogVisible.value=false
  HasTradeMark()
}
// dialog名称校验
const validatetmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length <= 2) {
    return callback(new Error('logo名称必须大于2'))
  } else if (value.trim().length >= 10) {
    return callback(new Error('logo名称必须小于10'))
  }
  // ✅ 校验通过时必须调用 callback()
  callback()
}
// dialog图片信息校验
const validatePasslogoUrl = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请找到合适的图片'))
  }
  // ✅ 校验通过时必须调用 callback()
  callback()
}
// 定义表单验证规则（不要用 reactive 包裹 FormRules）
const rules: FormRules<typeof trademarkParams> = {
  tmName: [{ validator: validatetmName, trigger: 'blur' }],
  logoUrl: [{ validator: validatePasslogoUrl, trigger: 'blur' }],
}

// 显示删除dialog
const showDeleteDialog=(row:RecordsData)=>{
  deleteRow=(row.id as number)
  DeleteDialogVisible.value=true
}
</script>

<style lang="scss" scoped>
.Plus {
  margin-bottom: 10px;
}
.demo-pagination-block {
  margin-top: 10px;
}

</style>
<style>
.avatar-uploader .el-upload {
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

<template>
  <div>
    <Category></Category>
    <!-- 下方的card -->
    <el-card style="margin-top: 10px">
      <div v-show="!showChange">
        <!-- 添加元素按钮 -->
        <el-button
          v-has="`btn.Attr.add`"
          type="primary"
          icon="Plus"
          style="margin-bottom: 10px"
          @click="AppendValue"
          >添加元素</el-button
        >
        <!-- 导出按钮 -->
        <el-button
          type="primary"
          icon="Download"
          style="margin-bottom: 10px; margin-left: 10px"
          color="green"
          @click="HandleExport"
          >导出为Excel</el-button
        >
        <!-- 第一视图表格 -->
        <el-table style="width: 100%" :border="true" :data="AttrList">
          <el-table-column prop="prop" label="序号" width="80px" align="center" type="index">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="120px" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width" align="center">
            <!-- row:data[i] ,要获取data[i].attrValueList，然后展示valueName-->
            <template #default="{ row }">
              <el-tag
                v-for="value in row.attrValueList"
                :key="value.id"
                type="success"
                class="tagg"
                >{{ value.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="200px" align="center">
            <template #default="{ row }">
              <el-button
                v-has="`btn.Attr.update`"
                type="primary"
                icon="Edit"
                @click="HandleEdit(row)"
              ></el-button>
              <el-button
                v-has="`btn.Attr.remove`"
                type="primary"
                icon="Delete"
                @click="HandleDelete(row.attrId)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 点击添加属性之后的卡片界面 -->
      <div v-show="showChange">
        <!-- 添加元素静态组件 -->
        <el-form ref="form">
          <!-- 输入框 -->
          <el-form-item label="属性名称">
            <el-input
              v-model="AppendParams.attrName"
              placeholder="请输入文本"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <!--添加属性值 取消(不保留数据)两个按钮 -->
          <el-form-item label="">
            <el-button
              v-has="`btn.Attr.add`"
              type="primary"
              class="append-attr"
              icon="Plus"
              :disabled="AppendParams.attrName.trim().length === 0"
              @click="appendAttr"
              >添加属性值</el-button
            >
            <el-button type="primary" @click="HandleCancel">取消(不保留数据)</el-button>
          </el-form-item>
          <!-- 下方表格 -->
          <el-form-item label="">
            <el-table :data="AppendParams.attrValueList" style="width: 100%" border>
              <el-table-column prop="prop" label="序号" width="100px" align="center" type="index">
              </el-table-column>
              <el-table-column prop="prop" label="属性值" width="width">
                <template #default="{ row }">
                  <el-input
                    v-model="row.valueName"
                    placeholder="请输入属性"
                    class="attr-append"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="prop" label="操作" width="200px" align="center">
                <template #default="{ row }">
                  <el-button
                    v-has="`btn.Attr.remove`"
                    type="primary"
                    icon="Delete"
                    @click="handleDelete2(row.valueName)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-form-item label="" class="under-button">
              <!-- disabled:数组为空 -->
              <el-button
                v-has="`btn.Attr.add`"
                type="primary"
                :disabled="EachValueNameNotNull()"
                @click="saveAppendParams"
                >保存</el-button
              >
              <el-button @click="HandleSaveCancel">取消(保留数据)</el-button>
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import Category from '@/components/Category/index.vue'
import useCategoryStore from '@/stores/modules/Category'
import { watch, ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { reqSaveAttr, reqRemoveAttr, reqGetAttrList } from '@/apis/product/attr'
import type { AttrItem } from '@/apis/product/attr/type'
import { ExportXlsx } from '@/utils/export-xlsx'
import 'element-plus/dist/index.css'
import { ElMessage } from 'element-plus'
const CategoryStore = useCategoryStore()
const { C1Id, C2Id, C3Id, Isdisabled } = storeToRefs(CategoryStore)
// 修改页面是否展示
const showChange = ref<boolean>(false)

// 收集新增数据
/* 
1.没有属性名称要禁用添加符号
2.点击添加属性值
  1.新增一个对象到attrValueList,{属性值名称}
  2.v-for动态渲染table
*/
// 存储的收集第二界面表单的元素
const AppendParams = reactive<AttrItem>({
  attrName: '',
  categoryId: C3Id.value,
  categoryLevel: 3,
  // 初始设定为空数组
  attrValueList: [],
})

// 判断AppendParams里面的list的属性都不为空值
// 判断是否可以禁用保存按钮：数组为空或有空值 → 禁用
const EachValueNameNotNull = () => {
  if (AppendParams.attrValueList.length === 0) {
    return true // 数组为空 → 禁用
  }
  // 只要有一个 valueName 是空（含纯空格），就禁用
  return AppendParams.attrValueList.some((item) => item.valueName.trim() === '')
}
// 添加新元素
const appendAttr = () => {
  AppendParams.attrValueList.push({
    valueName: '',
  })
  // 改变categoryId
  AppendParams.categoryId = C3Id.value
}
// 添加元素显示另一个卡片的点击事件
const AppendValue = () => {
  // 点击切换菜单，并且禁用按钮
  showChange.value = true
  Isdisabled.value = true
  // 清空数据
  AppendParams.attrName = ''
  AppendParams.attrValueList = []
  AppendParams.attrId = undefined
}

const AttrList = ref<AttrItem[]>([])
// 监视第三项api,如果有一个变了说明列表改变
// immediate: true 确保切回页面时也能触发（C3Id 值没变时 watch 不会自动触发）
onMounted(() => {
  if (C3Id.value) {
    getAttr()
  }
})
watch(C3Id, () => {
  if (!C3Id.value) return // 空值跳过
  // 得到元素，存储到AttrList,然后加载界面
  getAttr()
})
// 获取第一界面属性值列表
const getAttr = async () => {
  try {
    const res = await reqGetAttrList(C1Id.value, C2Id.value, C3Id.value)

    if (res.code === 200) {
      AttrList.value = res.data
    } else {
      throw '响应失败'
    }
  } catch {
    throw '网络异常'
  }
}
// 处理第一界面编辑
const HandleEdit = (row: any) => {
  // 跳转第二界面,附上该赋值的值，并且把id传给appendParams
  showChange.value = true
  // 深拷贝实现,浅拷贝会有标签bug
  Object.assign(AppendParams, JSON.parse(JSON.stringify(row)))
  // 后端使用id作为attrId(时间戳)来更新，不是自增主键id
  AppendParams.id = row.attrId
}
// 处理第一界面删除
const HandleDelete = async (attrId: number) => {
  try {
    // 发请求删除当前attrid，并且重新渲染
    const res = await reqRemoveAttr(attrId)
    if (res.code === 200) {
      // 刷新界面并且提示删除成功
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      await getAttr()
      return 'ok'
    } else {
      ElMessage({
        type: 'error',
        message: '删除失败',
      })
      throw '删除失败'
    }
  } catch {
    ElMessage({
      type: 'error',
      message: '网络异常',
    })
    throw '网络异常'
  }
}
// 保存第二界面值
const saveAppendParams = async () => {
  // 收集参数发请求
  try {
    const res = await reqSaveAttr(AppendParams)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '保存成功',
      })
      showChange.value = false
      // 重新渲染第一界面列表,并且把数据解除禁用
      Isdisabled.value = false
      await getAttr()
      return 'ok'
    } else {
      ElMessage({
        type: 'error',
        message: '保存失败',
      })
      throw '参数异常'
    }
  } catch {
    ElMessage({
      type: 'error',
      message: '保存失败',
    })
    throw '网络异常'
  }
}
// 处理退出第二界面
const HandleSaveCancel = async () => {
  // 改变视图并且让初始卡片看得见
  showChange.value = false
  Isdisabled.value = false
  // 重新渲染第一界面列表
  await getAttr()
}
// 取消第二界面值
const HandleCancel = () => {
  // attrName,attrValueList->null
  AppendParams.attrName = ''
  AppendParams.attrValueList = []
  showChange.value = false
  Isdisabled.value = false
}
// 导出当前分类下的属性列表为 Excel
const HandleExport = () => {
  if (AttrList.value.length === 0) {
    ElMessage({
      type: 'warning',
      message: '当前分类下没有可导出的属性',
    })
    return
  }
  ExportXlsx(AttrList.value, {
    fileName: '属性列表',
    mapper: (item) => ({
      属性名称: item.attrName,
      属性值: item.attrValueList.map((v) => v.valueName).join('、'),
    }),
  })
}
// 第二界面删除tag函数
const handleDelete2 = (name: string) => {
  AppendParams.attrValueList = AppendParams.attrValueList.filter((item) => {
    return item.valueName !== name
  })
}
</script>

<style scoped lang="scss">
.tagg {
  margin-right: 10px;
}
.under-button {
  margin-top: 10px;
}
.attr-append {
  width: 500px;
}
</style>

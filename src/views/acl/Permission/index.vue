<template>
  <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border>
    <el-table-column header-align="center" align="center" prop="prop" label="名称">
      <template #default="{ row }">
        {{ row.name }}
      </template>
    </el-table-column>
    <el-table-column header-align="center" align="center" prop="prop" label="权限值">
      <template #default="{ row }">
        {{ row.code }}
      </template>
    </el-table-column>
    <el-table-column header-align="center" align="center" prop="prop" label="修改时间">
      <template #default="{ row }">
        {{ row.updateTime }}
      </template>
    </el-table-column>
    <el-table-column header-align="center" align="center" prop="prop" label="操作">
      <template #default="{ row }">
        <el-button
          v-has="`btn.Permission.add`"
          type="primary"
          @click="HandleAddPermissionBtn(row)"
          :disabled="CheckIsDisabled(row)"
          >{{ row.level !== 3 ? '添加菜单' : '添加功能' }}</el-button
        >
        <el-button
          v-has="`btn.Permission.update`"
          type="primary"
          @click="HandleUpdatePermissionBtn(row)"
          :disabled="row.id === 1"
          >编辑</el-button
        >
        <el-button
          v-has="`btn.Permission.remove`"
          type="primary"
          @click="HandleDeletePermission(row.menuId)"
          :disabled="row.id === 1"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <!-- dialog -->
  <el-dialog title="Tips" v-model="ShowDialog" width="600px">
    <template #default>
      <el-form
        ref="form"
        :model="{ name: AddPermissionObj.name, code: AddPermissionObj.code }"
        :rules="formRules"
        label-width="80px"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="AddPermissionObj.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="权限值" prop="code">
          <el-input v-model="AddPermissionObj.code" placeholder=""></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="ShowDialog = false">取消</el-button>
      <el-button v-has="`btn.Permission.add`" type="primary" @click="HandleSavePermission"
        >确定</el-button
      >
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { RoleAssignType } from '@/apis/acl/role/type'
import type { AddPermissionType } from '@/apis/acl/permission/type'
import {
  reqGetPermission,
  reqAddPermission,
  reqDeletePermission,
} from '../../../apis/acl/permission/permission'
import { ref, onMounted, reactive, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css' // 关键：引入所有组件样式
import type { FormInstance, FormRules } from 'element-plus'
// 获取表单实例
const form = ref<FormInstance>()
// 验证整个保存表单
const formRules = reactive<FormRules<{ name: string; code: string }>>({
  name: [
    { required: true, message: '请输入名称', trigger: 'change' },
    { min: 1, max: 20, message: '长度必须为1-20', trigger: 'change' },
  ],
  code: [
    { required: true, message: '请输入权限值', trigger: 'change' },
    { min: 1, max: 20, message: '长度必须为1-20', trigger: 'change' },
  ],
})
// dialog相关
const ShowDialog = ref<boolean>(false)
const AddPermissionObj = reactive<AddPermissionType>({
  code: '',
  name: '',
  level: '',
  pid: '',
})
// 存放整个表的值
const tableData = ref<RoleAssignType[]>([])

// 获取表格数据
const GetPermissionData = async () => {
  const res = await reqGetPermission()
  if (res.code === 200) {
    // console.log(res.data)

    tableData.value = res.data
  }
}
// 挂载时获取表格
onMounted(async () => {
  await GetPermissionData()
})
// 按钮禁用项
const CheckIsDisabled = (row: RoleAssignType) => {
  return row.level !== 4 ? false : true
}

// 处理permission添加按钮
const HandleAddPermissionBtn = (row: RoleAssignType) => {
  AddPermissionObj.name = ''
  AddPermissionObj.code = ''
  AddPermissionObj.level = row.level + 1
  AddPermissionObj.pid = row.menuId
  AddPermissionObj.menuId = undefined
  ShowDialog.value = true
}
// 处理保存信息
const HandleSavePermission = async () => {
  await form.value?.validate()
  await reqAddPermission(AddPermissionObj)
  ElMessage({
    type: 'success',
    message: '保存信息成功',
  })
  ShowDialog.value = false
  GetPermissionData()
}
// 删除列表行
const HandleDeletePermission = async (id: number) => {
  await ElMessageBox.confirm('你确定要删除这个权限?', '警告', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning',
  })
  const res = await reqDeletePermission(id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除信息成功',
    })
    GetPermissionData()
  }
}
// 处理permission更新按钮
const HandleUpdatePermissionBtn = (row: RoleAssignType) => {
  Object.assign(AddPermissionObj, row)
  ShowDialog.value = true
}
// 重置校验值
watch(ShowDialog, (val) => {
  if (!val) {
    form.value?.resetFields()
  }
})
</script>

<style scoped lang="scss"></style>

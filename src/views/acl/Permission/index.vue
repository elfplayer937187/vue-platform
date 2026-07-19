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
          type="primary"
          @click="HandleAddPermissionBtn(row)"
          :disabled="CheckIsDisabled(row)"
          >{{ row.level !== 3 ? '添加菜单' : '添加功能' }}</el-button
        >
        <el-button type="primary" :disabled="row.id === 1">编辑</el-button>
        <el-button type="primary" @click="HandleDeletePermission(row.id)" :disabled="row.id === 1"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <!-- dialog -->
  <el-dialog title="Tips" v-model="ShowDialog" width="600px">
    <template #default>
      <el-form ref="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="AddPermissionObj.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input v-model="AddPermissionObj.code" placeholder=""></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button @click="ShowDialog = false">取消</el-button>
      <el-button type="primary" @click="HandleSavePermission">确定</el-button>
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
import { ref, onMounted, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css' // 关键：引入所有组件样式

// dialog相关
const ShowDialog = ref<boolean>(false)
const AddPermissionObj = reactive<AddPermissionType>({
  code: '',
  name: '',
  level: '',
  pid: '',
  type: 1,
})
// 存放整个表的值
const tableData = ref<RoleAssignType[]>([])

// 获取表格数据
const GetPermissionData = async () => {
  const res = await reqGetPermission()
  if (res.code === 200) {
    console.log(res.data)

    tableData.value = res.data
  }
}
// 挂载时获取表格
onMounted(async () => {
  await GetPermissionData()
})
// 按钮禁用项
const CheckIsDisabled = (row: RoleAssignType) => {
  return row.level!==4 ? false : true
}

// 处理permission按钮
const HandleAddPermissionBtn = (row: RoleAssignType) => {
  AddPermissionObj.level = row.level + 1
  AddPermissionObj.pid = row.id
  ShowDialog.value = true
}
// 处理保存信息
const HandleSavePermission = async () => {
  console.log(AddPermissionObj.level)

  const res = await reqAddPermission(AddPermissionObj)
  console.log(res)
  ShowDialog.value = false
  GetPermissionData()
}
// 删除列表行
const HandleDeletePermission = async (id: number) => {
  await ElMessageBox.confirm('你确定要删除这个角色?', '警告', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning',
  })
  const res=await reqDeletePermission(id)
  if(res.code===200){
    console.log(res);
    GetPermissionData()
    
  }
}
</script>

<style scoped lang="scss"></style>

<template>
  <!-- 上方的card -->
  <el-card class="search-card">
    <template #default>
      <el-form ref="form" label-width="80px" class="search-card-form" @submit.prevent>
        <el-form-item label="角色名称">
          <el-input
            v-model="roleName"
            placeholder="角色名称"
            class="ip"
            @keyup.enter="HandleSearchRole"
          ></el-input>
        </el-form-item>
        <div class="button-group">
          <el-button type="primary" @click="HandleSearchRole">搜索</el-button>
          <el-button @click="ResetSearch">重置</el-button>
        </div>
      </el-form>
    </template>
  </el-card>
  <el-card>
    <div class="card-header">
      <el-button
        v-has="`btn.Role.add`"
        type="primary"
        icon="Plus"
        class="add-role-button"
        @click="HandleAUButton"
        >添加角色</el-button
      >
      <el-button type="primary" color="green" class="xlsx-export" @click="HandleExportByExcel"
        >导出为Excel</el-button
      >
    </div>
    <!-- 整个列表 -->
    <el-table :data="RoleList" style="width: 100%" border class="role-table">
      <el-table-column prop="prop" label="#" width="width" align="center" type="index">
      </el-table-column>
      <el-table-column prop="prop" label="id" width="width" align="center">
        <template #default="{ row }">
          {{ row.id }}
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="角色名称" width="width" align="center">
        <template #default="{ row }">
          {{ row.roleName }}
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="创建时间" width="width" align="center">
        <template #default="{ row }">
          {{ row.createTime }}
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="更新时间" width="width" align="center">
        <template #default="{ row }">
          {{ row.updateTime }}
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="350px" align="center">
        <template #default="{ row }">
          <el-button
            v-has="`btn.Role.assgin`"
            type="primary"
            icon="Key"
            @click="HandleAssignButton(row.roleId)"
            >分配权限</el-button
          >
          <el-button
            v-has="`btn.Role.update`"
            type="primary"
            icon="Edit"
            @click="HandleUpdateRole(row.roleId)"
            >编辑</el-button
          >
          <el-button
            v-has="`btn.Role.remove`"
            type="primary"
            icon="Delete"
            @click="HandleDeleteRole(row.roleId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      layout="total, jumper, prev, pager, next,->, sizes"
      :total="total"
      @change="HandlePaginationChange"
    >
    </el-pagination>
  </el-card>
  <!-- 添加角色的dialog -->
  <el-dialog v-model="AddRoleDialogFormVisible" :title="nowTitle" width="500">
    <el-form @submit.prevent>
      <el-form-item label="角色名称">
        <el-input v-model="newRolename" autocomplete="off" @keyup.enter="HandleSaveAddRole" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="AddRoleDialogFormVisible = false">取消</el-button>
        <el-button v-has="`btn.Role.add`" type="primary" @click="HandleSaveAddRole">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 分配权限的drawer -->
  <el-drawer v-model="ShowDrawer" title="分配角色权限" :destroy-on-close="true">
    <template #default>
      <el-tree
        ref="treeRef"
        style="max-width: 600px"
        :data="data"
        show-checkbox
        node-key="menuId"
        :default-expanded-keys="[1, 2, 3, 4]"
        :default-checked-keys="DefaultSelectIdList"
        :props="defaultProps"
      />
    </template>
    <template #footer>
      <el-button @click="ShowDrawer = false">取消</el-button>
      <el-button v-has="`btn.Role.assgin`" type="primary" @click="HandleSaveDoAssign"
        >确认</el-button
      >
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import {
  reqGetRolePagination,
  reqAddRole,
  reqDeleteRole,
  reqGetRoleAssign,
  reqDoAssignForRole,
} from '@/apis/acl/role/role'
import type { RoleRecordType, RoleAssignType } from '@/apis/acl/role/type'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css' // 关键：引入所有组件样式
import { ExportXlsx } from '@/utils/export-xlsx'
// 树形控件配置
const defaultProps = {
  children: 'children',
  label: 'name',
}
const nowTitle = ref<string>('新增角色')
const data = ref<RoleAssignType[]>([])
const DefaultSelectIdList = ref<number[]>([])
const treeRef = ref()
// drawer配置
const ShowDrawer = ref<boolean>(false)
const NowDrawerId = ref<number | null>()
// 处理搜索的name
const roleName = ref<string>('')
// 整个列表数据
const RoleList = ref<RoleRecordType[]>([])

// 分页器配置
const pageSizes = ref<number[]>([3, 5, 7, 9, 11])
const pageNum = ref<number>(1)
const pageSize = ref<number>(7)
const total = ref<number>(400)
// 控制表单是否可见
const AddRoleDialogFormVisible = ref<boolean>(false)
// 新增的roleName
const newRolename = ref<string>('')
const newUpdateId = ref<number | undefined>()
// 处理重置
const ResetSearch = () => {
  roleName.value = ''
  GetRoleListPagination()
}
// 获取列表信息
const GetRoleListPagination = async (roleName: string = '') => {
  const res = await reqGetRolePagination(pageNum.value, pageSize.value, roleName)
  if (res.code === 200) {
    RoleList.value = res.data.records
  }
}
onMounted(() => {
  GetRoleListPagination()
})
// 处理分页器变化
const HandlePaginationChange = () => {
  GetRoleListPagination()
}
// 处理搜索特定角色名称
const HandleSearchRole = async () => {
  await GetRoleListPagination(roleName.value)
  // console.log(111);
  roleName.value = ''
}
// 处理新增保存角色
const HandleSaveAddRole = async () => {
  if (!newRolename.value.trim()) {
    return ElMessage({
      type: 'error',
      message: '输入不能为空!',
    })
  }
  // 看看新增的角色是否在列表里
  const AddInList = RoleList.value.some((role) => {
    return role.roleName === newRolename.value
  })
  if (AddInList) {
    return ElMessage({
      type: 'error',
      message: '角色已添加!',
    })
  }
  const res = await reqAddRole({ roleName: newRolename.value, roleId: newUpdateId.value })
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '角色已更新!',
    })
    // console.log(res)
    AddRoleDialogFormVisible.value = false
    newRolename.value = ''
    GetRoleListPagination()
  }
}
// 处理删除角色
const HandleDeleteRole = async (id: number) => {
  await ElMessageBox.confirm('你确定要删除这个角色?', '警告', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning',
  })
  const res = await reqDeleteRole(id)
  if (res.code === 200) {
    // window.location.reload()
    await GetRoleListPagination()
  }
}
// 处理编辑角色按钮
const HandleUpdateRole = async (roleId: number) => {
  nowTitle.value = '更新角色'
  AddRoleDialogFormVisible.value = true
  // 传递id值
  newUpdateId.value = roleId
}
// 处理新增按钮
const HandleAUButton = (IsAdding: boolean = true) => {
  if (IsAdding) {
    nowTitle.value = '新增角色'
    newUpdateId.value = undefined
  }
  AddRoleDialogFormVisible.value = true
}
// 递归遍历是否被选中
const DeeplySearchSelectData = (Assigns: RoleAssignType[] | null) => {
  // 防止一上来就是空的
  if (!Assigns) {
    return
  }
  Assigns.forEach((Assign: RoleAssignType) => {
    // 只检查最后一层
    if (!Assign.children || Assign.children.length === 0) {
      if (Assign.select) {
        DefaultSelectIdList.value.push(Assign.menuId)
        return
      }
    }
    DeeplySearchSelectData(Assign.children)
  })
}
// 处理分配角色按钮
const HandleAssignButton = async (RoleId: number) => {
  data.value = []
  DefaultSelectIdList.value = []
  NowDrawerId.value = RoleId
  const res = await reqGetRoleAssign(RoleId)
  if (res.code === 200) {
    data.value = res.data
    // 递归遍历data把已有的id拿出来
    DeeplySearchSelectData(data.value)
    ShowDrawer.value = true
  }
}
// 处理用户保存权限
const HandleSaveDoAssign = async () => {
  if (!treeRef.value || NowDrawerId.value === null) return
  const checkedKeys = [
    ...treeRef.value.getCheckedKeys(),
    ...treeRef.value.getHalfCheckedKeys(),
  ] as number[]
  const res = await reqDoAssignForRole(NowDrawerId.value!, checkedKeys)

  if (res.code === 200) {
    ElMessage({ type: 'success', message: '权限分配成功!' })
    ShowDrawer.value = false
  } else {
    ElMessage({ type: 'error', message: res.message || '权限分配失败' })
  }
}
// 处理导出为Excel
const HandleExportByExcel = () => {
  ExportXlsx(RoleList.value, {
    fileName: '角色列表',
    mapper: (role: RoleRecordType) => ({
      角色id: role.roleId,
      角色名称: role.roleName,
      创建时间: role.createTime,
      更新时间: role.updateTime,
    }),
  })
}
</script>

<style scoped lang="scss">
.search-card {
  margin-bottom: 20px;
  &-form {
    display: flex;
    justify-content: space-between;
    .ip {
      width: 200px;
    }
  }
}
.add-role-button {
  margin-bottom: 20px;
}
.role-table {
  margin-bottom: 20px;
}
.card-header {
  position: relative;
  .xlsx-export {
    position: absolute;
    right: 0;
  }
}
</style>

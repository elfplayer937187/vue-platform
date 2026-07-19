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
          <el-button @click="GetRoleListPagination()">重置</el-button>
        </div>
      </el-form>
    </template>
  </el-card>
  <el-card>
    <el-button type="primary" icon="Plus" @click="HandleAUButton" class="add-role-button"
      >添加角色</el-button
    >
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
          <el-button type="primary" icon="Key">分配权限</el-button>
          <el-button type="primary" icon="Edit" @click="HandleUpdateRole(row.id)">编辑</el-button>
          <el-button type="primary" icon="Delete" @click="HandleDeleteRole(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNum"
      :page-sizes="pageSizes"
      v-model:page-size="pageSize"
      layout="total, jumper, prev, pager, next,->, sizes"
      :total="total"
      @change="HandlePaginationChange"
    >
    </el-pagination>
  </el-card>
  <!-- 添加角色的dialog -->
  <el-dialog v-model="AddRoleDialogFormVisible" title="更新" width="500">
    <el-form @submit.prevent>
      <el-form-item label="角色名称">
        <el-input v-model="newRolename" autocomplete="off" @keyup.enter="HandleSaveAddRole" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="AddRoleDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="HandleSaveAddRole"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { reqGetRolePagination, reqAddRole, reqDeleteRole } from '@/apis/acl/role/role'
import type { RoleRecordType } from '@/apis/acl/role/type'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css' // 关键：引入所有组件样式

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

// 获取列表信息
const GetRoleListPagination = async (roleName: string = '') => {
  const res = await reqGetRolePagination(pageNum.value, pageSize.value, roleName)
  if (res.code === 200) {
    // console.log(res)
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
  const res = await reqAddRole({ roleName: newRolename.value, id: newUpdateId.value })
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
    console.log(res)
    // window.location.reload()
    await GetRoleListPagination()
  }
}
// 处理编辑角色按钮
const HandleUpdateRole = async (id: number) => {
  AddRoleDialogFormVisible.value = true
  // 传递id值
  newUpdateId.value = id
}
// 处理新增按钮
const HandleAUButton = (IsAdding: boolean = true) => {
  if (IsAdding) {
    newUpdateId.value = undefined
  }
  AddRoleDialogFormVisible.value = true
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
</style>

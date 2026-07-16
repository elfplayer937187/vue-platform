<template>
  <div>
    <!-- 上边的card -->
    <el-card>
      <el-form ref="Searchform" :model="searchItem" label-width="80px">
        <el-form-item label="用户名:">
          <el-input v-model="UserName" placeholder="请输入用户名"></el-input>
          <div class="right">
            <el-button type="primary">搜索</el-button>
            <el-button>重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 下边的card -->
    <el-card>
      <div class="card-header">
        <el-button type="primary" @click="HandleAddUser">添加</el-button>
        <el-button type="danger" @click="HandlePreDelete">批量删除</el-button>
      </div>
      <!-- 表格 -->
      <el-table
        :data="UserList"
        style="width: 100%"
        :border="true"
        @selection-change="HandleRowSelect"
      >
        <el-table-column prop="prop" width="width" type="selection"> </el-table-column>
        <el-table-column
          prop="prop"
          label="#"
          width="width"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column prop="prop" label="id" width="150px" align="center">
          <template #default="{ row }">
            {{ row.id }}
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="用户名字" width="width" align="center">
          <template #default="{ row }">
            {{ row.name }}
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="用户名称" width="width">
          <template #default="{ row }">
            {{ row.username }}
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="用户角色" width="width">
          <template #default="{ row }">
            {{ row.roleName }}
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="创建时间" width="width">
          <template #default="{ row }">
            {{ row.createTime }}
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="更新时间" width="width">
          <template #default="{ row }">
            {{ row.updateTime }}
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="350px" align="center">
          <template #default="{ row }">
            <el-button type="primary" icon="Arrow-left" @click="HandleGivenRole(row.name,row.id)"
              >分配角色</el-button
            >
            <el-button
              type="primary"
              icon="Edit"
              @click="HandleEditUser(row.id, row.name, row.username)"
              >编辑</el-button
            >
            <el-button type="primary" icon="Delete" @click="HandleDeleteUser(row.id)"
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
        @change="HandlePagination"
      >
      </el-pagination>
      <!-- 抽屉 -->
      <el-drawer v-model="ShowDrawer" :show-close="false">
        <template #header="{ close, titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass">{{ DrawerTitle }}</h4>
          <el-button @click="close">
            <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
            关闭
          </el-button>
        </template>
        <template #default>
          <el-form
            ref="FormRef"
            :model="AddUserInfo"
            :rules="IsEdit ? userRulesForEdit : userRulesForAppend"
          >
            <el-form-item label="用户姓名" prop="name">
              <el-input v-model="AddUserInfo.name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="username">
              <el-input v-model="AddUserInfo.username" placeholder=""></el-input>
            </el-form-item>
            <el-form-item v-show="!IsEdit" label="用户密码" prop="password">
              <el-input v-model="AddUserInfo.password" placeholder=""></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <el-button type="primary" icon="Select" :disabled="SaveIsDisabled" @click="SaveAddUser"
            >保存</el-button
          >
        </template>
      </el-drawer>
      <!-- 复选框抽屉 -->
      <el-drawer v-model="ShowGivenRoleDrawer">
        <template #header="{ titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass">分配角色</h4>
        </template>
        <template #default>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户姓名">
              <el-input v-model="AddUserInfo.name" placeholder="" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用户职位">
              <!-- 多选框 -->
              <!-- 全选框 -->
              <el-checkbox
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
              >
                全选
              </el-checkbox>
              <el-checkbox-group v-model="RoleList" @change="HandleGroupItemChange">
                <el-checkbox
                  v-for="(role, index) in AllRoles"
                  :key="index"
                  :label="role"
                  :value="role"
                  >{{ role }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <el-button @click="ShowGivenRoleDrawer=false">取消</el-button>
          <el-button type="primary" @click="HanldeUpdateRoleSave">保存</el-button>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, reactive } from 'vue'
import type { Reactive } from 'vue'
import {
  reqGetUserPagination,
  reqAddUser,
  reqDeleteUser,
  reqUpdateUser,
  reqBatchRemoveUser,
} from '@/apis/acl/user/user'
import { reqGetAllUserRole } from '@/apis/acl/role/role'
import type { UserType, AddUserType } from '@/apis/acl/user/type'
import { ElMessage, ElMessageBox, type CheckboxValueType, type FormRules } from 'element-plus'
import 'element-plus/dist/index.css' // 关键：引入所有组件样式
// 控制isIndeterminate
const isIndeterminate = ref<boolean>(false)
// 全选
const checkAll = ref<boolean>(false)
// 多选框选中的职位
const RoleList = ref<string[]>([])
// 所有职位
const AllRoles = ref<string[]>([])
// 是否展示分配角色drawer
const ShowGivenRoleDrawer = ref<boolean>(false)
// 获取新增表单实例
const FormRef = ref()
// 是否展示Drawer
const ShowDrawer = ref<boolean>(false)
// drawer文字
const IsEdit = ref<boolean>(false)
const DrawerTitle = computed(() => {
  return IsEdit.value ? '编辑用户' : '新增用户'
})
// 搜索框搜索的名称
const UserName = ref<string>()
// 现在的页码
const pageNum = ref<number>(1)
const pageSizeList = [3, 5, 7, 9, 12]
// 界面大小
const pageSize = ref<number>(pageSizeList[Math.floor(pageSizeList.length / 2)] as number)

// 整个表
const UserList = ref<UserType[]>()
// 总数
const total = ref<number>(0)
// 保存 新增或者编辑 信息
const AddUserInfo = ref<AddUserType>({ name: '', password: '', username: '', id: '' })
// 实现drawer保存是否禁用
const SaveIsDisabled = ref<boolean>(false)
// 添加删除的id
let RemoveIdList: number[] = []
// 获取分页列表
const GetUserPagination = async () => {
  const res = await reqGetUserPagination(pageNum.value, pageSize.value)
  if (res.code === 200) {
    UserList.value = res.data.records
    total.value = res.data.total
  }
}
// 挂载时获取分页列表
onMounted(() => {
  GetUserPagination()
})
// 处理分页
const HandlePagination = () => {
  GetUserPagination()
}
// 保存新建用户信息
const SaveAddUser = async () => {
  await FormRef.value?.validate(async (valid: any) => {
    if (valid) {
      const res = IsEdit.value
        ? await reqUpdateUser(AddUserInfo.value)
        : await reqAddUser(AddUserInfo.value)
      console.log(res)

      if (res.code === 200) {
        GetUserPagination()
        ShowDrawer.value = false
        ElMessage({
          type: 'success',
          message: '保存成功',
        })
        // 清空添加数据
        AddUserInfo.value = { name: '', password: '', username: '', id: '' }
        window.location.reload()
      }
    }
  })
}
// 验证姓名
const validateName = (rule: any, value: any, callback: any) => {
  // console.log(111);

  if (value.trim().length > 2 && value.trim().length <= 12) {
    callback()
  } else {
    callback(new Error('长度必须在3-12之间'))
  }
}
// 验证密码
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.trim().length > 4 && value.trim().length <= 12) {
    callback()
  } else {
    callback(new Error('长度必须在5-12之间'))
  }
}
//验证username
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value.trim().length > 2 && value.trim().length <= 12) {
    callback()
  } else {
    callback(new Error('长度必须在3-12之间'))
  }
}
// drawer新增 验证的规则集
const userRulesForAppend = reactive<FormRules<typeof AddUserInfo>>({
  name: [{ validator: validateName, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  username: [{ validator: validateUsername, trigger: 'blur' }],
})
const userRulesForEdit = reactive<FormRules<typeof AddUserInfo>>({
  name: [{ validator: validateName, trigger: 'blur' }],
  username: [{ validator: validateUsername, trigger: 'blur' }],
})
// 删除User
const HandleDeleteUser = async (id: number) => {
  await ElMessageBox.confirm('您确定要删除吗？', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  const res = await reqDeleteUser(id)
  console.log(res)

  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    GetUserPagination()
  }
}
// 处理更新User
const HandleEditUser = async (id: number, name: string, rolename: string) => {
  // 传入id
  AddUserInfo.value.id = id
  IsEdit.value = true
  ShowDrawer.value = true
  AddUserInfo.value.name = name
  AddUserInfo.value.username = rolename
}
// 处理添加User
const HandleAddUser = () => {
  AddUserInfo.value = { name: '', password: '', username: '', id: '' }
  IsEdit.value = false
  ShowDrawer.value = true
}
// 处理每一行被选中的效果
const HandleRowSelect = (selection: any) => {
  RemoveIdList = selection.map((obj: Reactive<UserType>) => obj.id)
  // console.log(RemoveIdList);
}
// 删除之前
const HandlePreDelete = async () => {
  await ElMessageBox.confirm('您确定要删除吗？', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  await BatchRemove()
}
// 处理批量删除
const BatchRemove = async () => {
  const res = await reqBatchRemoveUser(RemoveIdList)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '批量删除成功',
    })
    // 清空remove
    RemoveIdList = []
    // 刷新
    GetUserPagination()
  }
}
// 处理分配角色
const HandleGivenRole = async(name: string ,id:number) => {

  ShowGivenRoleDrawer.value = true
  AddUserInfo.value.name = name
  const res=await reqGetAllUserRole(id)
  AllRoles.value=res.data.allRolesList.map(obj=>obj.roleName)
  // console.log(res);
    checkAll.value=false
}
// 处理checkbox全选改变
const handleCheckAllChange = (val: CheckboxValueType) => {
  RoleList.value = val ? AllRoles.value : []
  isIndeterminate.value = false
}
// 处理checkbox单个标签变化
const HandleGroupItemChange = (value: CheckboxValueType[]) => {
  const checkCnt = value.length
  if (checkCnt === 0) {
    isIndeterminate.value = false
    checkAll.value = false
  } else if (checkCnt > 0 && checkCnt < AllRoles.value.length) {
    checkAll.value=false
    isIndeterminate.value=true
  }else{
    isIndeterminate.value=false
    checkAll.value=true
  }
}
// 处理保存角色信息的按钮
const HanldeUpdateRoleSave=()=>{

}
</script>

<style scoped lang="scss">
.el-form {
  .el-input {
    width: 200px;
  }
  :deep(.el-form-item__content) {
    justify-content: space-between;
  }
}

.el-card {
  margin-bottom: 20px;
  .card-header {
    margin-bottom: 20px;
  }
}
.pagination {
  margin-top: 20px;
}
</style>

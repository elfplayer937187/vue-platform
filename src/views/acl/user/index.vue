<template>
  <div>
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
    <el-card>
      <div class="card-header">
        <el-button type="primary" @click="ShowDrawer = true">添加</el-button>
        <el-button type="danger">批量删除</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="UserList" style="width: 100%" :border="true">
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
        <el-table-column prop="prop" label="操作" width="300px" align="center">
          <el-button type="primary">分配角色</el-button>
          <el-button type="primary">编辑</el-button>
          <el-button type="primary">删除</el-button>
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
          <h4 :id="titleId" :class="titleClass">添加用户</h4>
          <el-button @click="close">
            <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
            关闭
          </el-button>
        </template>
        <template #default>
          <el-form ref="FormRef" :model="AddUserInfo" :rules="userRules">
            <el-form-item label="用户姓名" prop="name">
              <el-input v-model="AddUserInfo.name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="username">
              <el-input v-model="AddUserInfo.username" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
              <el-input v-model="AddUserInfo.password" placeholder=""></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <el-button type="primary" icon="Select" :disabled="SaveIsDisabled" @click="SaveAddUser">保存</el-button>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { reqGetUserPagination, reqAddUser } from '@/apis/acl/user/user'
import type { UserType, AddUserType } from '@/apis/acl/user/type'
import { ElMessage, type FormRules } from 'element-plus'
import 'element-plus/dist/index.css' // 关键：引入所有组件样式

// import type {ruleForm}
// 获取新增表单实例
const FormRef =ref()
// 是否展示Drawer
const ShowDrawer = ref<boolean>(false)
// 搜索框搜索的名称
const UserName = ref<string>()
// 现在的页码
const pageNum = ref<number>(1)
const pageSizeList = [3, 5, 7,9,12]
// 界面大小
const pageSize = ref<number>(pageSizeList[Math.floor(pageSizeList.length/2)] as number)
// 总数
const total = ref<number>(400)
// 整个表
const UserList = ref<UserType[]>()
// 保存编辑信息
const AddUserInfo = ref<AddUserType>({ name: '', password: '', username: '' })
  // 实现drawer保存是否禁用
  const SaveIsDisabled=ref<boolean>(false)
// 获取分页列表
const GetUserPagination = async () => {
  const res = await reqGetUserPagination(pageNum.value, pageSize.value)
  if (res.code === 200) {
    UserList.value = res.data.records
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
  await FormRef.value?.validate(async (valid:any) => {
    if (valid) {
      SaveIsDisabled.value = true  // 保存成功后禁用按钮，防止重复提交
      const res = await reqAddUser(AddUserInfo.value)
      if (res.code === 200) {
        GetUserPagination()
        ShowDrawer.value = false
        ElMessage({
          type:'success',
          message:'保存成功'
        })
      }
    }
  })
}
// 验证姓名
const validateName=(rule:any,value:any,callback:any)=>{
  // console.log(111);
  
  if(value.trim().length>2 &&value.trim().length<=12){
    callback()
  }else{
    callback(new Error('长度必须在3-12之间'))
  }
}
// 验证密码
const validatePassword=(rule:any,value:any,callback:any)=>{
  if(value.trim().length>4 &&value.trim().length<=12){
    callback()
  }else{
    callback(new Error('长度必须在5-12之间'))
  }
}
//验证username
const validateUsername=(rule:any,value:any,callback:any)=>{
  if(value.trim().length>2 &&value.trim().length<=12){
    callback()
  }else{
    callback(new Error('长度必须在3-12之间'))
  }
}
const userRules=reactive<FormRules<typeof AddUserInfo>>({
  name:[{validator:validateName,trigger:'blur'}],
  password:[{validator:validatePassword,trigger:'blur'}],
  username:[{validator:validateUsername,trigger:'blur'}],
})

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

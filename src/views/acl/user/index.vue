<template>
  <div>
    <el-card>
      <el-form ref="form" :model="form" label-width="80px">
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
        <el-button type="primary">添加</el-button>
        <el-button type="danger">批量删除</el-button>
      </div>
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
      <el-pagination
        v-model:current-page="pageNum"
        :page-sizes="pageSizeList"
        v-model:page-size="pageSize"
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
          <el-form ref="form" :model="form">
            <el-form-item label="用户姓名">
              <el-input placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="用户昵称">
              <el-input placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="用户密码">
              <el-input placeholder=""></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <el-button type="primary" icon="Select">保存</el-button>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { reqGetUserPagination, reqAddUser } from '@/apis/acl/user/user'
import type { UserType, AddUserType } from '@/apis/acl/user/type'
// 是否展示Drawer
const ShowDrawer = ref<boolean>(true)
// 搜索框搜索的名称
const UserName = ref<string>()
// 现在的页码
const pageNum = ref<number>(1)
const pageSizeList = [3, 5, 7]
// 界面大小
const pageSize = ref<number>(pageSizeList[0] as number)
// 总数
const total = ref<number>(400)
// 整个表
const UserList = ref<UserType[]>()
// 保存编辑信息
const AddUserInfo = ref<AddUserType>()
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

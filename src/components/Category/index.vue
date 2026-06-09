<template>
  <!-- 上方的card -->
  <el-card>
      <el-form label-width="80px" :inline="true">
          <el-form-item label="一级菜单">
            <el-select v-model="C1Id"  placeholder="请选择">
                <el-option v-for="(data) in selectFirst" :key="data.id" :label="data.name" :value="data.id">{{ data.name }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级菜单">
            <el-select  v-model="selectSecond" placeholder="请选择">
                <el-option label="1" value="1">
                </el-option>
                <el-option label="2" value="2">
                </el-option>
                <el-option label="3" value="3">
                </el-option>
                <el-option label="41" value="4">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="三级菜单">
            <el-select v-model="selectThird">
                <el-option label="1" value="1">
                </el-option>
                <el-option label="2" value="2">
                </el-option>
                <el-option label="3" value="3">
                </el-option>
                <el-option label="41" value="4">
                </el-option>
            </el-select>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import useCategoryStore from '@/stores/modules/Category';
const  CategoryStore=useCategoryStore()
const {selectFirst,selectSecond,selectThird,C1Id,getFirst}=CategoryStore
// 收集的c1Id的数据

onMounted(async()=>{
    await getFirst()
})
</script>

<style scoped lang="scss">
.el-form-item{
    width: 300px;
}
</style>
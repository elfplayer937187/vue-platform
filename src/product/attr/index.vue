<template>
  <div>
    <Category></Category>
  <!-- 下方的card -->
    <!-- button -->

  <el-card style="margin-top: 10px;">
      <el-button type="primary" icon="Plus" style="margin-bottom: 10px;">添加元素</el-button>
      <el-table style="width: 100%" :border="true">
          <el-table-column prop="prop" label="序号" width="80px" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="属性名称" width="120px" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="120px" align="center">
          </el-table-column>
      </el-table>

  </el-card>
  </div>
</template>

<script lang="ts" setup>
import Category from '@/components/Category/index.vue'

</script>

<style scoped lang="scss">

</style>
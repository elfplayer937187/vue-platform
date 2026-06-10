<template>
  <!-- 上方的card -->
  <el-card>
    <el-form label-width="80px" :inline="true">
      <el-form-item label="一级菜单">
        <el-select v-model="C1Id" placeholder="请选择" @change="getSecond">
          <el-option
            v-for="data in selectFirst"
            :key="data.id"
            :label="data.name"
            :value="data.id"
            >{{ data.name }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="二级菜单">
        <el-select v-model="C2Id" placeholder="请选择" @change="getThird">
          <el-option
            v-for="data in selectSecond"
            :key="data.id"
            :label="data.name"
            :value="data.id"
            >{{ data.name }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="三级菜单">
        <el-select v-model="C3Id" placeholder="请选择">
          <el-option
            v-for="data in selectThird"
            :key="data.id"
            :label="data.name"
            :value="data.id"
            >{{ data.name }}</el-option
          >
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted} from 'vue'
import useCategoryStore from '@/stores/modules/Category'
import { storeToRefs } from 'pinia'
const CategoryStore = useCategoryStore()
const { selectFirst, selectSecond, selectThird, C1Id, C2Id, C3Id } = storeToRefs(CategoryStore)
const { getFirst, getSecond, getThird } = CategoryStore
// 挂载的时候自动加载三个id默认为1的选项
onMounted(async () => {
  await getFirst()
  // console.log(C1Id.value);
  // console.log(C2Id.value);
  // console.log(C3Id.value);
  
})

</script>

<style scoped lang="scss">
.el-form-item {
  width: 300px;
}
.el-card {
  :deep(.el-card__body) {
    display: flex;
    justify-content: center;
    height: 100%;
  }
  :deep(.el-form-item) {
    margin-bottom: 0px;
  }
}
</style>

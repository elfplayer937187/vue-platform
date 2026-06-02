<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 一级路由 -->
    <!-- 动态设置是否隐藏 -->
    <template v-if="item.meta.IsShow">
      <el-menu-item v-if="!item.children" :index="item.path">
        <span>##</span>
        {{ item.meta.title }}
      </el-menu-item>
    </template>
    <!-- 二级但是只有一个子路由 -->
    <template v-if="item.meta.IsShow">
      <el-sub-menu v-if="item.children && item.children.length == 1" :index="item.path">
        <template #title>{{ item.meta.title }}</template>
        <el-menu-item :index="item.children[0].path">{{
          item.children[0].meta.title
        }}</el-menu-item>
      </el-sub-menu>
    </template>
    <!-- 二级多个路由 -->
    <template v-if="item.meta.IsShow">
      <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
        <template #title>{{ item.meta.title }}</template>
        <Menup :menuList="item.children"></Menup>
      </el-sub-menu>
    </template>
  </template>
</template>

<script lang="ts" setup>
const props = defineProps(['menuList'])
console.log(props.menuList)
</script>
<!-- 将组件传给自己 -->
<script lang="ts">
export default {
  name: 'Menup',
}
</script>
<style scoped lang="scss"></style>

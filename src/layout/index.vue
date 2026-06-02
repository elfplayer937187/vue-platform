<template>
  <div class="home-container">
    <!-- 顶部 -->
    <div class="top"></div>
    <!-- 侧方导航 -->
    <div class="navigator">
      <!-- logo -->
      <Logo></Logo>
      <!-- 展示菜单 -->
      <el-scrollbar class="scrollbar">
        <el-menu background-color="#001777" text-color="white" class="elmenu">
            <Menup :menu-list="routes"></Menup>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 内容 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from './logo/index.vue'
import useStore from '@/stores/modules/user.ts'
import Menup from '@/layout/menu/index.vue'
const {menuRouter:{options:{routes}}}=useStore()


</script>

<style scoped lang="scss">
.home-container {
  width: 100%;
  height: 100vh;
  background-color: skyblue;
  .navigator {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-bgc;
    // 菜单
    .scrollbar {
      width: $base-menu-width;
      height: calc(100% - $base-menu-logoheight);
      background-color: yellow;
      p {
        color: #303133;
        height: 30px;
      }
      .elmenu{
        border-right: none;
      }
    }
  }
  .top {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: $base-menu-topheight;
    display: fixed;
    right: 0;
    background-color: gray;
    padding: 20px;
  }
  .content {
    position: absolute;
    width: calc(100% - $base-menu-width);
    right: 0;
    height: calc(100% - $base-menu-topheight);
    background-color: green;
    top: $base-menu-topheight;
    padding: 20px;
    overflow: auto;
  }
}
</style>

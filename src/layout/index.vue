<template>
  <div class="home-container">
    <!-- 顶部 -->
    <div class="top" :class="{extending:isFold}">
      <Tabbar></Tabbar>
    </div>

    <!-- 侧方导航 -->
    <div class="navigator" :class="{fold:layoutSettings.isFold?true:false}">
      <!-- logo -->
      <Logo></Logo>
      <!-- 展示菜单 -->
      <el-scrollbar class="scrollbar">
        <el-menu :collapse="layoutSettings.isFold" background-color="#001529" text-color="white" class="elmenu">
          <Menup :menu-list="routes"></Menup>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 内容 -->
    <div class="content" :class="{extending:layoutSettings.isFold?true:false}">
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from './logo/index.vue'
import useStore from '@/stores/modules/user.ts'
import Menup from '@/layout/menu/index.vue'
import Main from '@/layout/main/index.vue'
import Tabbar from '@/layout/tabbar/index.vue'
import useLayoutSettings from '@/stores/modules/LayoutSettings.ts'
import { storeToRefs } from 'pinia'
const layoutSettings=useLayoutSettings()
const { isFold } = storeToRefs(useLayoutSettings())
const {
  menuRouter: {
    options: { routes },
  },
} = useStore()
</script>

<style scoped lang="scss">
.home-container {
  width: 100%;
  height: 100vh;
  background-color: $base-menu-bgc;
  

  .navigator {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-bgc;
    &.fold{
      width: $base-menu-minwidth;
    }

    .scrollbar {
      width: $base-menu-width;
      height: calc(100% - $base-menu-logoheight);
      background-color: $base-menu-bgc;

      p {
        color: #303133;
        height: 30px;
      }
      .elmenu {
        border-right: none;
      }

    }
  }
  // 顶部
  .top {
    position: absolute;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-menu-topheight;
    background-color: white;
    transition: all 0.3s ease;
    &.extending {
      left: $base-menu-minwidth;
      width: calc(100% - $base-menu-minwidth);
    }
  }
  .content {
    position: absolute;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100% - $base-menu-topheight);
    background-color: white;
    top: $base-menu-topheight;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s ease;
    &.extending {
      left: $base-menu-minwidth;
      width: calc(100% - $base-menu-minwidth);
    }
  }
}
</style>

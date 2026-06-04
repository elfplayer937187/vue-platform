<template>
  <div class="home-container">
    <!-- 顶部 -->
    <div class="top" :class="{extending:isFold}">
      <Tabbar></Tabbar>
    </div>

    <!-- 侧方导航 -->
    <div class="navigator">
      <!-- logo -->
      <Logo></Logo>
      <!-- 展示菜单 -->
      <el-scrollbar class="scrollbar" :class="{ fold: isFold ? true : false }">
        <el-menu background-color="#001529" text-color="white" class="elmenu">
          <Menup :menu-list="routes"></Menup>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 内容 -->
    <div class="content" >
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
  background-color: skyblue;
  // 加上了属性菜单也得加
  .navigator {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-bgc;
    transition: all 1s;

    .scrollbar {
      width: $base-menu-width;
      height: calc(100% - $base-menu-logoheight);
      background-color: $base-menu-bgc;
      transition: all 1s;

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
    width: calc(100% - $base-menu-width);
    height: $base-menu-topheight;
    display: fixed;
    right: 0;
    background-color: white;
    &.extending{
      left:$base-menu-minwidth;
      width: calc(100vw - $base-menu-minwidth);
    }
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

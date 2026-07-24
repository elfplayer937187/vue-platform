<template>
  <div class="home-container">
    <!-- 顶部 -->
    <div class="top" :class="{ extending: isFold }">
      <Tabbar></Tabbar>
    </div>

    <!-- 侧方导航 -->
    <div class="navigator" :class="{ fold: layoutSettings.isFold ? true : false }">
      <!-- logo -->
      <Logo :is-fold="layoutSettings.isFold"></Logo>
      <!-- 展示菜单 -->
      <el-scrollbar class="scrollbar">
        <el-menu
          :default-active="defaultActive"
          :default-openeds="defaultOpeneds"
          :collapse="layoutSettings.isFold"
          background-color="#0f172a"
          text-color="#e2e8f0"
          active-text-color="#fff"
          class="elmenu"
        >
          <Menup :menu-list="routes"></Menup>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 内容 -->
    <div class="content" :class="{ extending: layoutSettings.isFold ? true : false }">
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Logo from './logo/index.vue'
import useUserStore from '@/stores/modules/user.ts'
import Menup from '@/layout/menu/index.vue'
import Main from '@/layout/main/index.vue'
import Tabbar from '@/layout/tabbar/index.vue'
import useLayoutSettings from '@/stores/modules/LayoutSettings.ts'
import { storeToRefs } from 'pinia'
// import useUserStore from '@/stores/modules/user.ts'
// import type useUserStore from '@/stores/modules/user.ts'

const $route = useRoute()
const layoutSettings = useLayoutSettings()
const { isFold } = storeToRefs(useLayoutSettings())
const { menuRouter: routes } = useUserStore()
// 当前激活菜单项
const defaultActive = computed(() => $route.path)
// 需要展开的父级子菜单（截取路径中间部分）
const defaultOpeneds = computed(() =>
  $route.matched
    .slice(1, -1)
    .map((r) => r.path)
    .filter(Boolean),
)
</script>

<style scoped lang="scss">
.home-container {
  width: 100%;
  height: 100vh;
  .navigator {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-bgc;
    transition: all 0.3s ease;
    &.fold {
      width: $base-menu-minwidth;
    }

    .scrollbar {
      width: 100%;
      height: calc(100% - $base-menu-logoheight);
      background-color: $base-menu-bgc;

      p {
        color: #303133;
        height: 30px;
      }
      .elmenu {
        border-right: none;

        // 菜单项默认状态
        :deep(.el-menu-item) {
          color: $base-menu-text-color;
          &:hover {
            background-color: rgba(255, 255, 255, 0.06) !important;
            color: $base-menu-active-text-color;
          }
          &.is-active {
            background-color: $base-menu-hover-bgc !important;
            color: $base-menu-active-text-color;
            position: relative;
            &::before {
              content: '';
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 3px;
              height: 20px;
              background: #3b82f6;
              border-radius: 0 2px 2px 0;
            }
          }
        }
        // 子菜单标题
        :deep(.el-sub-menu__title) {
          color: $base-menu-text-color;
          &:hover {
            background-color: rgba(255, 255, 255, 0.06) !important;
            color: $base-menu-active-text-color;
          }
        }
      }
    }
  }
  // 顶部
  .top {
    position: absolute;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-menu-topheight;
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
    // 暗黑模式颜色修改
    // background-color: $base-content-bgc-dark;
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

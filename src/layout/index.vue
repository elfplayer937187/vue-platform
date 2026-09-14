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
        <!-- 配色走 styles/index.scss 的 --app-menu-*，
             不要再传 background-color / text-color / active-text-color：
             这三个 props 会写成内联 CSS 变量，把样式表里的值压掉 -->
        <el-menu
          :default-active="defaultActive"
          :default-openeds="defaultOpeneds"
          :collapse="layoutSettings.isFold"
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
    background-color: var(--app-menu-bg);
    // 侧边栏和内容区现在都是白的，靠这条线分开
    border-right: 1px solid var(--app-menu-border);
    transition: all 0.3s ease;
    &.fold {
      width: $base-menu-minwidth;
    }

    .scrollbar {
      width: 100%;
      height: calc(100% - $base-menu-logoheight);
      background-color: var(--app-menu-bg);

      p {
        color: #303133;
        height: 30px;
      }
      .elmenu {
        border-right: none;

        // 一级：常规项和父级标题，字重压一级
        // :not(.el-menu--inline) 用来排除子菜单里的 ul.el-menu
        :deep(.el-menu:not(.el-menu--inline) > .el-menu-item),
        :deep(.el-menu:not(.el-menu--inline) > .el-sub-menu > .el-sub-menu__title) {
          color: var(--app-menu-text-l1);
          font-weight: 500;
        }
        // 二级及以下：统一退一档
        :deep(.el-menu--inline .el-menu-item),
        :deep(.el-menu--inline .el-sub-menu__title) {
          color: var(--app-menu-text-l2);
          font-weight: 400;
        }

        // 悬停和激活要压过上面的基础色（上面选择器更具体），所以这里用 !important
        :deep(.el-menu-item:hover),
        :deep(.el-sub-menu__title:hover) {
          background-color: var(--app-menu-hover-bg) !important;
          color: var(--app-menu-text-hover) !important;
        }
        // 放在悬停之后：鼠标停在当前项上时保持高亮
        :deep(.el-menu-item.is-active) {
          background-color: var(--app-menu-active-bg) !important;
          color: var(--app-menu-active-text) !important;
          font-weight: 500;
          position: relative;
          // 左侧竖条，颜色跟着主题色走
          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 3px;
            height: 20px;
            background: var(--el-color-primary);
            border-radius: 0 2px 2px 0;
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

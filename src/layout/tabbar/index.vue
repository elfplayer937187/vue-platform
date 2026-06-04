<template>
  <div class="tabbar">
    <div class="tabbar-left">
      <!-- 图标静态 -->
      <el-icon @click="ChangeFold">
        <component :is="iconComponent"></component>
      </el-icon>
      <!-- 左侧面包屑 -->
      <el-breadcrumb separator-icon="ArrowRight" style="margin-left: 10px">
        <el-breadcrumb-item
          v-for="(item, index) in $route.matched"
          v-show="item.meta.title"
          :key="index"
        >
          <!-- 展示当前路由的信息 -->
          <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    e @click="refreshComponnt"
    <!-- 右侧 -->
    @click="fullScreen"
    <div class="tabbar-right">
      <!-- 刷新按钮 -->
      <el-button @click="refreshComponent" type="primary" icon="Refresh" circle></el-button>
      <el-button @click="fullScreen" type="primary" icon="FullScreen" circle></el-button>
      <el-button type="primary" icon="Setting" circle></el-button>
      <span class="el-dropdown-link">
        <img :src="avatar" style="width: 24px; height: 24px; margin: 0 10px" alt="" />
      </span>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useLayoutSettings from '@/stores/modules/LayoutSettings'
import { useRoute } from 'vue-router'
import useUserStore from '@/stores/modules/user'
import { onMounted } from 'vue'
// 使用layoutstore
const layoutSettings = useLayoutSettings()
const { iconComponent } = storeToRefs(layoutSettings)
const { ChangeFold } = layoutSettings
const { refresh } = storeToRefs(layoutSettings)
// 使用userStore挂载图片和姓名
const UserStore = useUserStore()
const { username, avatar } = storeToRefs(UserStore)
console.log(username, avatar)

const $route = useRoute()
function refreshComponent() {
  refresh.value = !refresh.value
}
function fullScreen() {
  const full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
onMounted(() => {
  UserStore.GetUserInfo()
})
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: $base-menu-topheight;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 1s;
  .tabbar-left {
    margin-left: 20px;
    display: flex;
    .fold-icon {
      cursor: pointer;
      margin-right: 20px;
    }
  }
  .tabbar-right {
    display: flex;
    align-items: center;
  }
}
</style>

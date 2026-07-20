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
    <!-- 右侧 -->
    <div class="tabbar-right">
      <!-- 刷新按钮 -->
      <el-button type="primary" icon="Refresh" circle @click="refreshComponent"></el-button>
      <el-button type="primary" icon="FullScreen" circle @click="fullScreen"></el-button>
      <el-button type="primary" icon="Setting" circle @click="HandleSettingBtn"></el-button>
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
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-drawer title="主题设置" v-model="ShowDrawer">
      <el-form ref="form" label-width="80px">
        <el-form-item label="主题颜色" class="right-align-item">
          <el-color-picker v-model="color" size="large" @change="HandleColorChange" />
        </el-form-item>
        <el-form-item label="暗黑模式" class="right-align-item">
          <el-switch
            v-model="settingIsDark"
            active-action-icon="Moon"
            inactive-action-icon="Sunny"
            @change="HandleDarkChange"
          />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useLayoutSettings from '@/stores/modules/LayoutSettings'
import { useRoute } from 'vue-router'
import useUserStore from '@/stores/modules/user'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
// 控制主题drawer
const ShowDrawer = ref<boolean>(false)
// 侧边栏主题颜色（从 localStorage 恢复）
const THEME_COLOR_KEY = 'app-theme-color'
const color = ref(localStorage.getItem(THEME_COLOR_KEY) || '#409EFF')
// 暗黑模式是否开启（从 localStorage 恢复）
const DARK_MODE_KEY = 'app-dark-mode'
const settingIsDark = ref(localStorage.getItem(DARK_MODE_KEY) === 'true')

// 初始化路由器
const $router = useRouter()
// 使用layoutstore
const layoutSettings = useLayoutSettings()
const { iconComponent } = storeToRefs(layoutSettings)
const { ChangeFold } = layoutSettings
const { refresh } = storeToRefs(layoutSettings)
// 使用userStore挂载图片和姓名,退出登录操作
const UserStore = useUserStore()
const { username, avatar } = storeToRefs(UserStore)
const { userLogout } = UserStore
// 刷新业务修改refresh值
const $route = useRoute()
function refreshComponent() {
  refresh.value = !refresh.value
}
// 全屏
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
  // 恢复持久化的暗黑模式和主题颜色
  if (settingIsDark.value) {
    document.querySelector('html')?.classList.add('dark')
  }
  if (color.value !== '#409EFF') {
    document.documentElement.style.setProperty('--el-color-primary', color.value)
  }
})
// 持久化暗黑模式
watch(settingIsDark, (val) => {
  localStorage.setItem(DARK_MODE_KEY, String(val))
})
// 持久化主题颜色
watch(color, (val) => {
  localStorage.setItem(THEME_COLOR_KEY, val)
})
// 退出登录点击的回调
function logout() {
  // 向服务器发请求[退出登录接口]
  // 清空数据[token|username|avatar]
  userLogout()
  // 跳转登录
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
// 处理主题设置按钮
const HandleSettingBtn = () => {
  ShowDrawer.value = true
}
// 处理暗黑模式
const HandleDarkChange = () => {
  // 获取html根节点
  const html = document.querySelector('html')
  settingIsDark.value
    ? (html as HTMLElement).classList.add('dark')
    : (html as HTMLHtmlElement).classList.remove('dark')
}
// 处理主题颜色
const HandleColorChange = () => {
  const el = document.documentElement
  // const el = document.getElementById('xxx')

  // 获取 css 变量
  getComputedStyle(el).getPropertyValue(`--el-color-primary`)

  // 设置 css 变量
  el.style.setProperty('--el-color-primary', color.value)
}
</script>

<style scoped lang="scss">

.tabbar {
  width: 100%;
  height: $base-menu-topheight;
  // background-color: white;
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
.right-align-item {
  :deep(.el-form-item__content) {
    display: flex;
    justify-content: flex-end; /* 内容右对齐 */
  }
}
</style>

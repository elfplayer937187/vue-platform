<template>
  <router-view v-if="isShow" v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染 -->
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import useLayoutSettings from '@/stores/modules/LayoutSettings'
import { nextTick, watch, ref } from 'vue'
const layoutSettings = useLayoutSettings()
const isShow = ref(true)
watch(
  () => layoutSettings.refresh,
  () => {
    isShow.value = false
    nextTick(() => {
      isShow.value = true
    })
  },
)
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active {
  transition: all 1s;
}
</style>

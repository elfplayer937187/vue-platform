<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染 -->
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s;
}
</style>

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
.fade-enter-from{
  opacity: 0;
}
.fade-enter-to{
  opacity: 1;
}
.fade-enter-active{
  transition: all 1s;
}
</style>

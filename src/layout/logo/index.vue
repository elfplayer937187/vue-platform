<template>
  <div class="logo" :class="{ fold: isFold }">
    <img src="../../../public/logo.png" alt="" />
    <p v-show="!isFold">硅谷甄选</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ isFold: boolean }>()
</script>

<style scoped lang="scss">
.logo {
  width: $base-menu-width;
  height: $base-menu-logoheight;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  overflow: hidden;

  &.fold {
    width: $base-menu-minwidth;
  }

  img {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }
  p {
    color: white;
    white-space: nowrap;
  }
}
</style>

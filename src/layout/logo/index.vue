<template>
  <div class="logo" :class="{ fold: isFold }">
    <p v-show="!isFold">电商运营平台</p>
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
  border-bottom: 1px solid var(--app-menu-border);

  &.fold {
    width: $base-menu-minwidth;
  }

  img {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }
  p {
    color: var(--app-menu-title);
    white-space: nowrap;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1px;
    margin-left: 10px;
  }
}
</style>

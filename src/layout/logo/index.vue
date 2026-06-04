<template>
  <div class="logo" :class="{Fold:isFold?true:false}">
    <img src="../../../public/logo.png" alt="">
    <p>硅谷甄选</p>
  </div>
</template>

<script lang="ts" setup>
import useLayoutSettings from '@/stores/modules/LayoutSettings';
import { storeToRefs } from 'pinia';
const {isFold}=storeToRefs(useLayoutSettings())
</script>

<style scoped lang="scss">
    .logo{
        width:$base-menu-width;
        height: $base-menu-logoheight;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        white-space: nowrap;
        &.Fold{
            opacity: 0;
        }
        img{
            width: 40px;
            height: 40px;
            margin-right: 5px;
        }
        p{
            color: white;
        }
    }
</style>
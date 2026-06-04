<template>
  <div class="logo">
    <img src="../../../public/logo.png" alt="">
    <p>硅谷甄选</p>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
    .logo{
        width:$base-menu-width;
        height: $base-menu-logoheight;
        display: flex;
        align-items: center;
        justify-content: center;


        
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
<template>
  <div class="container">
    <div ref="Screen" class="content">
      <Top></Top>
      <div class="bottom">
        <div class="left">left</div>
        <div class="middle">middle</div>
        <div class="right">right</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Top from './components/top.vue'
const Screen = ref()

onMounted(() => {
  Screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})

function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const hh = window.innerHeight / h
  return ww > hh ? hh : ww
}
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  width: 100vw;
  background-image: url(./images/bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  .content {
    width: 1920px;
    height: 1080px;
    // background-color: red;
    position: fixed;
    left: 50%;
    top: 50%;
    transform-origin: center center;
  }
}
</style>

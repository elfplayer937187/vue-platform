<template>
  <div class="container">
    <div ref="Screen" class="content">
      <Top></Top>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="middle">middle</div>
        <div class="right">right</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Top from './components/top.vue'
import Age from './components/age.vue'
import Sex from './components/sex.vue'
import Tourist from './components/tourist.vue'
const Screen = ref()

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
  if (Screen.value) {
    Screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
  }
}

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
  overflow: hidden;
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
    transform-origin: left top;
  }
  .bottom {
    display: flex;
    .left {
      margin-top: 20px;
      flex: 1;
      // background-color: pink;
      height: 1040px;
      display: flex;
      flex-direction: column;
      .tourist {
        flex: 1.5;
        // background-color: skyblue;
      }
      .sex {
        flex: 1;
        // background-color: white;
      }
      .age {
        flex: 1;
        // background-color: orange;
      }
    }
    .middle {
      flex: 2;
    }
    .right {
      flex: 1;
    }
  }
}
</style>

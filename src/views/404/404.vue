<template>
  <div class="container404">
    <el-image class="img404" :src="img404" fit="contain"></el-image>
    <span class="back">{{ second }}秒后回主页</span>
  </div>
</template>

<script lang="ts" setup>
import img404 from '@/assets/images/error_images/404.png'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const $router = useRouter()
const second = ref<number>(3)

onMounted(() => {
  const TimeInterval = setInterval(() => {
    second.value = second.value - 1
    if (second.value === 0) {
      $router.push('/home')
      clearInterval(TimeInterval)
    }
  }, 1000)
})
</script>

<style scoped lang="scss">
.container404 {
  width: 100%;
  height: 100vh;
  background-color: #e3f2fd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.img404 {
  width: 500px;
  max-width: 80%;
}

.back {
  position: fixed;
  top: 16px;
  left: 20px;
  font-size: 14px;
  color: #64748b;
}
</style>

<style scoped lang="scss">

</style>

<template>
  <div class="top">
    <div class="left">
      <span class="lbtn">首页</span>
    </div>
    <div class="center">智慧旅游可视化数据大平台</div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间: {{ now }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
const now = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
onMounted(() => {
  setInterval(()=>{
    now.value=dayjs().format('YYYY-MM-DD HH:mm:ss')
  },1000)
})
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  // background-color: pink;
  display: flex;

  .left {
    flex: 1;
    position: relative;
    background-image: url(../images/dataScreen-header-left-bg.png);
    background-repeat: no-repeat;

    .lbtn {
      position: absolute;
      right: 0;
      background-image: url(../images/dataScreen-header-btn-bg-l.png);
      background-repeat: no-repeat;
      width: 128px;
      height: 100%;
      line-height: 40px;
      text-align: center;
      color: skyblue;
    }
  }
  .center {
    width: 100%;
    height: 70px;
    flex: 2;
    background-image: url(../images/dataScreen-header-center-bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 70px;
    color: skyblue;
    font-size: 30px;
  }
  .right {
    flex: 1;
    background-image: url(../images/dataScreen-header-right-bg.png);
    background-size: cover;
    display: flex;
    justify-content: space-between;
    // position: relative;
    .rbtn {
      // position: absolute;
      // left: 0;
      line-height: 40px;
      height: 40px;
      // display: block;
      background-image: url(../images/dataScreen-header-btn-bg-r.png);
      background-repeat: no-repeat;
      width: 150px;
      text-align: center;
      color: skyblue;
      margin-left: -5px;
    }
    .time {
      text-align: center;
      line-height: 40px;
      color: skyblue;
      margin-right: 20px;
    }
  }
}
</style>

<template>
  <div class="tour-container">
    <div class="top">
      <p class="text">实时游客统计</p>
      <p class="bg"></p>
      <div class="total-tourist">
        可预约总量
        <span>99999</span>
        人
      </div>
    </div>
    <div class="bottom">
      <div class="total">
        <span v-for="(value, index) in strTotal" :key="index" class="value">{{ value }}</span>
      </div>
      <div ref="liquidCharts" class="liquid-ball"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
const total = ref<number>(123456)
const strTotal = computed(() => {
  return total.value.toString() + '人'
})
const liquidCharts = ref()
onMounted(() => {
  const mycharts = echarts.init(liquidCharts.value)
  mycharts.setOption({
    series: [
      {
        type: 'liquidFill',
        // ── 数据 ──
        data: [
          { value: 0.6, itemStyle: { color: 'rgba(0, 180, 255, 0.6)' } },
          { value: 0.5, itemStyle: { color: 'rgba(0, 180, 255, 0.4)' } },
          { value: 0.4, itemStyle: { color: 'rgba(0, 180, 255, 0.2)' } },
        ],

        // ── 形状 ──
        radius: '75%', // 水球大小
        shape: 'circle', // circle | diamond | triangle | path://...

        // ── 水波动画 ──
        waveAnimation: true,
        amplitude: 10, // 波幅（越大波浪越剧烈）
        waveLength: '40%', // 波长
        period: 1000, // 一个周期毫秒数（越小波动越快）

        // ── 颜色渐变 ──
        color: ['#00b4ff', '#0080ff'],
        backgroundStyle: {
          color: 'rgba(0, 50, 100, 0.3)', // 水球底部背景色
          borderWidth: 0,
        },

        // ── 边框 ──
        outline: {
          show: true,
          borderDistance: 10,
          itemStyle: {
            color: 'none',
            borderColor: '#00b4ff',
            borderWidth: 2,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 180, 255, 0.5)',
          },
        },

        // ── 中心文字 ──
        label: {
          position: ['50%', '50%'],
          formatter: () => '60%',
          fontSize: 36,
          color: '#fff',
          fontWeight: 700,
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.tour-container {
  width: 100%;
  height: 100%;
  // background-color: blue;
  background-image: url(../images/dataScreen-main-lb.png);
  background-repeat: no-repeat;
  background-size: cover;
  .top {
    width: 100%;
    height: 85px;
    // background-color: pink;
    position: relative;
    .text {
      font-size: 25px;
      color: white;
      margin-bottom: 5px;
      font-weight: 600;
    }
    .bg {
      width: 200px;
      background-repeat: no-repeat;
      background-size: contain;
      height: 13px;
      background-image: url(../images/dataScreen-title.png);
    }
    .total-tourist {
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: white;
      span {
        color: goldenrod;
      }
    }
  }
  .bottom {
    // background-color: red;
    height: calc(100% - 85px);
    .total {
      height: 70px;
      // background-color: pink;
      display: flex;
      padding: 0 30px;
      margin-top: 20px;
      .value {
        flex: 1;
        line-height: 70px;
        text-align: center;
        font-size: 40px;
        background-image: url(../images/total.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        color: skyblue;
      }
    }
    .liquid-ball {
      // background-color: gold;
      height: calc(100% - 70px - 20px);
    }
  }
}
</style>

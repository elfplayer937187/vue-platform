<template>
  <div class="age-container">
    <p class="title">年龄</p>
    <p class="bg"></p>
    <div ref="binChart" class="chart"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const binChart = ref()

onMounted(() => {
  const myChart = echarts.init(binChart.value)
  myChart.setOption({
    // ── 提示框 ──
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}% ({d}%)',
    },
    // ── 图例 ──
    legend: {
      orient: 'vertical',
      right: 50,
      top: 'center',
      textStyle: { color: '#b3d4ff', fontSize: 12 },
      itemWidth: 12,
      itemHeight: 12,
    },
    series: [
      {
        type: 'pie',
        // ── 尺寸 ──
        center: ['35%', '50%'],
        radius: ['40%', '65%'],
        // ── 标签 ──
        label: {
          show: true,
          formatter: '{d}%',
          color: '#fff',
          fontSize: 13,
          fontWeight: 700,
        },
        // ── 引导线 ──
        labelLine: {
          show: true,
          lineStyle: { color: 'rgba(180, 210, 255, 0.4)' },
        },
        // ── 数据（年龄分布） ──
        data: [
          { value: 15, name: '18岁以下' },
          { value: 35, name: '18-25岁' },
          { value: 30, name: '26-35岁' },
          { value: 15, name: '36-45岁' },
          { value: 5, name: '45岁以上' },
        ],
        // ── 颜色 ──
        color: [
          'rgba(0, 180, 255, 0.7)',
          'rgba(0, 220, 255, 0.8)',
          'rgba(64, 158, 255, 0.9)',
          'rgba(100, 200, 255, 0.6)',
          'rgba(150, 220, 255, 0.4)',
        ],
        // ── 选中效果 ──
        selectedMode: false,
        // ── 圆环样式 ──
        itemStyle: {
          borderRadius: 4,
          borderColor: 'rgba(20, 50, 100, 0.8)',
          borderWidth: 2,
        },
        // ── 动画 ──
        animationDuration: 1500,
        animationEasing: 'cubicOut',
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.age-container {
  width: 100%;
  height: 100%;
  background-image: url(../images/dataScreen-main-lc.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  // margin: 20px 0;
  .title {
    font-size: 25px;
    color: white;
    margin-bottom: 5px;
    font-weight: 600;
  }
  .bg {
    background-image: url(../images/dataScreen-title.png);
    width: 200px;
    background-repeat: no-repeat;
    background-size: contain;
    height: 13px;
  }
  .chart {
    height: calc(100% - 50px);
    width: 100%;
  }
}
</style>

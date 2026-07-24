<template>
  <div class="sex-container">
    <p class="title">男女比例</p>
    <p class="bg"></p>
    <div class="bottom">
      <div class="sex">
        <p>男士</p>
        <img src="../images/man.png" alt="" />
      </div>
      <div class="sex woman">
        <p>女士</p>
        <img src="../images/woman.png" alt="" />
      </div>
    </div>
    <div ref="Chart" class="sex-chart"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const Chart = ref()

onMounted(() => {
  const mychart = echarts.init(Chart.value)

  // ── Step 1: 初始状态 — 女生占满 100，男生为 0（不用动画，直接渲染） ──
  mychart.setOption({
    grid: {
      left: 10, // 左侧距容器边距
      right: 10, // 右侧距容器边距
      top: 5, // 上方留白
      bottom: 5, // 下方留白
    },
    xAxis: {
      type: 'value', // 数值轴（水平方向）
      show: false, // 隐藏坐标轴
      max: 100, // 最大值 100，代表百分比总和
    },
    yAxis: {
      type: 'category', // 分类轴（垂直方向，仅一个分类）
      show: false, // 隐藏坐标轴
      data: [''], // 空分类，只需一根柱子
    },
    series: [
      {
        name: '男士', // 系列名称
        type: 'bar', // 柱状图类型
        stack: 'total', // 与同名 stack 的系列堆叠
        barWidth: '40%', // 柱宽（占可用宽度的百分比）
        data: [0], // 初始值 0
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#3d7eff' }, // 渐变起点 — 深蓝
            { offset: 1, color: '#6ea8ff' }, // 渐变终点 — 浅蓝
          ]),
          borderRadius: [20, 0, 0, 20], // [左上, 右上, 右下, 左下] — 只有左侧圆角
        },
        label: {
          show: true, // 显示标签
          position: 'insideLeft', // 标签在柱体左侧内部
          color: '#fff', // 文字白色
          fontSize: 13, // 字号
          fontWeight: 700, // 粗体
          formatter: '男士 60%', // 标签文字
          padding: [0, 0, 0, 15], // 内边距 [上, 右, 下, 左]
        },
      },
      {
        name: '女士',
        type: 'bar',
        stack: 'total', // 与男士堆叠成一根完整横条
        barWidth: '60%',
        data: [100], // 初始值 100（占满整条）
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#ff6b9d' }, // 渐变起点 — 粉红
            { offset: 1, color: '#ff9ec5' }, // 渐变终点 — 浅粉
          ]),
          borderRadius: [0, 20, 20, 0], // 只有右侧圆角，与男士拼成两头圆滑
        },
        label: {
          show: true,
          position: 'insideRight', // 标签在柱体右侧内部
          color: '#fff',
          fontSize: 13,
          fontWeight: 700,
          formatter: '女士 40%',
          padding: [0, 15, 0, 0],
        },
      },
    ],
    animationDuration: 0, // 初始渲染不需要动画
  })

  // ── Step 2: 立即更新数据，触发 ECharts 自动过渡动画 ──
  mychart.setOption({
    series: [
      { name: '男士', data: [60] }, // 男生从 0 → 60（向右撑开）
      { name: '女士', data: [40] }, // 女生从 100 → 40（逐步缩小）
    ],
    animationDuration: 3000, // 动画时长 3 秒（缓慢过渡）
    animationEasing: 'cubicOut', // 缓动函数 — 先快后慢
  })
})
</script>

<style scoped lang="scss">
.sex-container {
  width: 100%;
  height: 100%;
  background-image: url(../images/dataScreen-main-lc.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;
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
  .bottom {
    width: 100%;
    height: calc(100% - 13px - 30px - 80px);
    display: flex;
    padding: 0 80px;
    justify-content: space-between;
    .sex {
      background-image: url(../images/man-bg.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      height: 80px;
      position: relative;
      top: 20px;
      width: 150px;
      height: 150px;
      display: flex;
      justify-content: center;
      color: rgba(255, 255, 255, 0.692);

      img {
        position: absolute;
        top: 50px;
        text-align: center;
      }
    }
    .woman {
      background-image: url(../images/woman-bg.png);
    }
  }
  .sex-chart {
    height: 80px;
    // background-color: pink;
  }
}
</style>

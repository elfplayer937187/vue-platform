<template>
  <!-- 左侧品牌区（登录/注册共用） -->
  <div class="brand-panel">
    <!-- 动态光圈装饰 -->
    <div class="halo-ring"></div>
    <div class="halo-glow halo-glow--1"></div>
    <div class="halo-glow halo-glow--2"></div>
    <div class="brand-content">
      <h1 class="brand-title">电商运营平台</h1>
      <p class="brand-slogan">高效 · 智能 · 值得信赖</p>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.brand-panel {
  flex: 5;
  // 色调调淡：降低饱和度与明度对比
  background: linear-gradient(135deg, #33587f 0%, #4f83c4 50%, #6d9fdd 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

// ========== 动态光圈 ==========
// 旋转光带，mask 裁成环状
.halo-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 560px;
  height: 560px;
  margin: -280px 0 0 -280px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    rgba(255, 255, 255, 0.14) 12%,
    rgba(191, 219, 254, 0.32) 22%,
    transparent 38%,
    transparent 55%,
    rgba(255, 255, 255, 0.1) 68%,
    transparent 82%
  );
  -webkit-mask: radial-gradient(circle, transparent 54%, #000 56%, #000 70%, transparent 72%);
  mask: radial-gradient(circle, transparent 54%, #000 56%, #000 70%, transparent 72%);
  animation: halo-spin 10s linear infinite;
  pointer-events: none;
}

// 呼吸光晕
.halo-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
}

.halo-glow--1 {
  width: 320px;
  height: 320px;
  top: -80px;
  right: -60px;
  background: radial-gradient(circle, rgba(147, 197, 253, 0.45), transparent 70%);
  animation:
    halo-float 12s ease-in-out infinite,
    halo-breath 6s ease-in-out infinite;
}

.halo-glow--2 {
  width: 260px;
  height: 260px;
  bottom: -70px;
  left: -50px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 70%);
  animation:
    halo-float 15s ease-in-out infinite reverse,
    halo-breath 8s ease-in-out 1s infinite;
}

@keyframes halo-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes halo-float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-24px, 28px) scale(1.12);
  }
}

@keyframes halo-breath {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.brand-content {
  text-align: center;
  color: #fff;
  position: relative;
  z-index: 1;
}

.brand-title {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 8px;
  margin: 0 0 16px;
}

.brand-slogan {
  font-size: 18px;
  letter-spacing: 6px;
  opacity: 0.75;
  margin: 0;
}

// 尊重系统的「减少动态效果」偏好
@media (prefers-reduced-motion: reduce) {
  .halo-ring,
  .halo-glow {
    animation: none;
  }
}

// ========== 移动端适配 ==========
@media (max-width: 768px) {
  .brand-panel {
    display: none;
  }
}
</style>

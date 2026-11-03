<!-- src/layouts/MainLayout.vue -->
<script setup lang="ts">
import AppHeader from '@/layouts/components/AppHeader.vue';
import AppFooter from '@/layouts/components/AppFooter.vue';
</script>

<template>
  <!-- 最外层大容器：撑满全屏，负责整体背景色 -->
  <div class="layout-container">

    <!-- 全局吸顶导航栏 -->
    <AppHeader />

    <!-- 页面主体内容区域 -->
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter />

  </div>
</template>

<style scoped lang="scss">
/* =========================================
   外层容器
========================================= */
.layout-container {
  // height: 6666px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* 使用画布背景色 */
  background-color: var(--bg-canvas);
}

/* =========================================
   内容版心
========================================= */
.main-content {
  /* 让内容区自动撑满剩余高度 */
  flex: 1;

  /* 限制最大宽度，并水平居中（经典的企业级版心） */
  width: 100%;
  max-width: var(--layout-max-width);
  margin: 0 auto;

  /* 上下留出间距，左右根据设计稿，可以给个安全边距 */
  padding: var(--header-height) 40px 40px;
  /*
    👆 这里用 padding-top 预留了 header-height 的高度。
    因为如果你的 AppHeader 用了 fixed 定位，必须给内容区留出空间；
    如果是 sticky，其实不需要这句，但留着也无妨，防止以后改定位方式出坑。
  */
  /* 👇 核心响应式 1：使用 clamp 让左右 padding 平滑缩放 (最小 16px，最大 40px) */
  padding: clamp(16px, 4vw, 40px);
  /* 顶部预留出 header 的高度 */
  padding-top: calc(var(--header-height) + clamp(16px, 4vw, 40px));

  /* 👇 核心响应式 2：手机端稍微调整上下间距 */
  @media (max-width: $breakpoint-sm) {
    padding: 16px;
    padding-top: calc(var(--header-height) + 16px);
  }
}
</style>

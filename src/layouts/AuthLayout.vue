<!-- src/layouts/AuthLayout.vue -->
<script setup lang="ts">
// 登录/注册页通常不需要什么复杂的逻辑，直接留空即可
</script>

<template>
  <div class="auth-layout">
    <!-- 这里的 RouterView 会自动渲染 LoginView.vue -->
    <RouterView />
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  width: 100%;
  background-color: #F7F8FA;
  /* 你的设计稿底色 */
  /* 因为 LoginView 内部已经有 flex 居中了，这里不需要额外排版，只要占满全屏即可 */
}
</style>

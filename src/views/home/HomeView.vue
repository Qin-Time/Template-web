<!-- src/views/home/HomeView.vue -->
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

// 模拟三个业务模块的数据
const featureCards = [
  { id: 1, title: '海量 CAD 图纸', desc: '覆盖建筑、结构、水电等全专业' },
  { id: 2, title: '专业团队审核', desc: '确保每一份图纸的质量与规范' },
  { id: 3, title: '极速云端下载', desc: '随时随地获取您需要的设计资源' },
];

// 模拟分类数据
const categories = [
  { id: 1, name: '建筑', icon: '🏠' },
  { id: 2, name: '结构', icon: '🏗️' },
  { id: 3, name: '装饰', icon: '🎨' },
  { id: 4, name: '水电', icon: '💡' },
  { id: 5, name: '园建', icon: '🌳' },
  { id: 6, name: '道路', icon: '🛣️' },
];

const goToExplore = (type?: string) => {
  router.push({ path: '/explore', query: { category: type } });
};
</script>

<template>
  <div class="home-page">
    <!-- 1. 三个业务模块 -->
    <section class="features-section">
      <div class="feature-card" v-for="card in featureCards" :key="card.id">
        <div class="feature-image-placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" class="placeholder-icon">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        </div>
        <div class="feature-text">
          <h3>{{ card.title }}</h3>
          <p>{{ card.desc }}</p>
        </div>
        <button class="action-btn" @click="goToExplore()">开始查找图纸</button>
      </div>
    </section>

    <!-- 2. 分类导航 -->
    <section class="category-section">
      <h2 class="category-title">查找您心仪的图纸并提供下载使用</h2>

      <div class="category-list">
        <div class="category-item" v-for="cat in categories" :key="cat.id" @click="goToExplore(cat.name)">
          <div class="circle-icon">
            <span class="emoji">{{ cat.icon }}</span>
          </div>
          <span class="category-name">{{ cat.name }}</span>
        </div>
      </div>
    </section>

    <!-- 3. 右下角 AI 悬浮助手 -->
    <div class="ai-floating-btn">
      <div class="ai-inner">
        <span>AI</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  padding: 40px 0;
  max-width: 1200px;
  margin: 0 auto;
}

/* 业务模块区 */
.features-section {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 100px;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
  }
}

.feature-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-image-placeholder {
  width: 100%;
  aspect-ratio: 4 / 3;
  background-color: var(--border-dark);
  border-radius: var(--radius-lg);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
}

.placeholder-icon {
  width: 80px;
  height: 80px;
  opacity: 0.8;
}

.feature-text {
  text-align: center;
  margin-bottom: 24px;

  h3 {
    font-size: var(--font-size-lg);
    color: var(--text-main);
    margin-bottom: 8px;
  }

  p {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
  }
}

.action-btn {
  background-color: var(--brand-primary);
  color: var(--text-inverse);
  border: none;
  padding: 12px 36px;
  border-radius: var(--radius-pill);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--brand-primary-hover);
    transform: translateY(-2px);
  }
}

/* 分类导航区 */
.category-section {
  text-align: center;
  padding: 40px 0;
}

.category-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--brand-primary);
  margin-bottom: 48px;
}

.category-list {
  display: flex;
  justify-content: center;
  gap: 48px;
  flex-wrap: wrap;

  @media (max-width: $breakpoint-sm) {
    gap: 24px;
  }
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform var(--transition-fast);

  &:hover {
    transform: translateY(-5px);
  }
}

.circle-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid var(--brand-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
  background-color: var(--bg-card);
  transition: all var(--transition-fast);

  .category-item:hover & {
    background-color: var(--brand-primary-light);
  }
}

.emoji {
  font-size: 32px;
}

.category-name {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-main);
}

/* AI 悬浮按钮 */
.ai-floating-btn {
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 60px;
  height: 60px;
  background-color: #FFD700;
  /* 预留特殊黄色 */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.4);
  transition: transform var(--transition-fast);
  z-index: var(--z-index-sticky);

  &:hover {
    transform: scale(1.05);
  }
}

.ai-inner {
  color: #000;
  font-weight: 700;
  font-size: var(--font-size-base);
}
</style>

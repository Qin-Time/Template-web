<!-- src/components/business/ResourceCard.vue -->
<script setup lang="ts">
import { View, Download, Star, Picture } from '@element-plus/icons-vue';
import type { BaseResource } from '@/types/entities';

// 接收基础资源数据
const props = defineProps<{
  data: BaseResource;
}>();

// 👇 核心架构调整：不在这里跳路由，只抛出事件给父组件
const emit = defineEmits<{
  (e: 'click', data: BaseResource): void;
}>();

const handleClick = () => {
  emit('click', props.data);
};

// 根据 accessType 判断标签颜色和文字
const getAccessTag = () => {
  switch (props.data.accessType) {
    case 'FREE': return { text: '免费', class: 'tag-free' };
    case 'POINTS': return { text: '积分', class: 'tag-points' };
    case 'PAID': return { text: '付费', class: 'tag-paid' };
    default: return { text: '私有', class: 'tag-private' };
  }
};
</script>

<template>
  <!-- 点击时触发自定义 click 事件 -->
  <div class="resource-card" @click="handleClick">
    <!-- 封面区域 -->
    <div class="cover-box">
      <img v-if="data.previewImageUrl" :src="data.previewImageUrl" alt="cover" class="cover-img" />
      <div v-else class="cover-placeholder">
        <el-icon :size="40" color="var(--text-placeholder)">
          <Picture />
        </el-icon>
      </div>

      <!-- 权限角标 -->
      <div class="tag-badge" :class="getAccessTag().class">
        {{ getAccessTag().text }}
      </div>
    </div>

    <!-- 信息区域 -->
    <div class="info-box">
      <div class="title" :title="data.title">{{ data.title }}</div>

      <div class="author">
        <el-avatar :size="20" :src="data.user.avatarUrl || undefined" />
        <span class="author-name">{{ data.user.nickname }}</span>
      </div>

      <div class="stats">
        <div class="stat-item">
          <el-icon>
            <View />
          </el-icon> <span>{{ data.viewCount }}</span>
        </div>
        <div class="stat-item">
          <el-icon>
            <Download />
          </el-icon> <span>{{ data.downloadCount }}</span>
        </div>
        <div class="stat-item">
          <el-icon>
            <Star />
          </el-icon> <span>{{ data.likeCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resource-card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-base);
  border: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
}

.resource-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: transparent;
}

.cover-box {
  aspect-ratio: 4 / 3;
  background-color: var(--bg-canvas);
  position: relative;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--border-base);
}

.tag-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
  backdrop-filter: blur(4px);
}

.tag-free {
  background: rgba(16, 185, 129, 0.9);
  color: #FFF;
}

.tag-points {
  background: rgba(245, 158, 11, 0.9);
  color: #FFF;
}

.tag-paid {
  background: rgba(0, 0, 0, 0.7);
  color: #FFF;
}

.tag-private {
  background: rgba(107, 114, 128, 0.9);
  color: #FFF;
}

.info-box {
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.author {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.author-name {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.stats {
  margin-top: auto;
  display: flex;
  gap: 16px;
  font-size: var(--font-size-sm);
  color: var(--text-placeholder);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>

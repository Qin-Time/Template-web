<!-- src/views/detail/DetailView.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { View, Download, Star, Picture, PriceTag } from '@element-plus/icons-vue';
import { getCadModelDetail, likeCadModel, unlikeCadModel, favoriteCadModel, unfavoriteCadModel } from '@/api/cadModel';
import { useUserStore } from '@/stores/user';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const id = route.params.id as string;
const loading = ref(false);
const detail = ref<any>(null); // 临时用 any，你可以根据后端返回值在 types 里补充 Detail 接口

// 交互状态
const isLiked = ref(false);
const isFavorited = ref(false);
const actionLoading = ref(false);

// 获取详情
const fetchDetail = async () => {
  loading.value = true;
  try {
    const data = await getCadModelDetail(id);
    detail.value = data;
    // 这里将来可以通过后端返回 "当前用户是否点过赞" 来初始化 isLiked
  } catch (error) {
    ElMessage.error('获取详情失败');
    router.push('/explore');
  } finally {
    loading.value = false;
  }
};

// 点赞/取消点赞
const toggleLike = async () => {
  if (!userStore.token) {
    ElMessage.warning('请先登录');
    return router.push('/login');
  }
  actionLoading.value = true;
  try {
    if (isLiked.value) {
      await unlikeCadModel(id);
      detail.value.likeCount--;
    } else {
      await likeCadModel(id);
      detail.value.likeCount++;
    }
    isLiked.value = !isLiked.value;
  } finally {
    actionLoading.value = false;
  }
};

// 收藏/取消收藏
const toggleFavorite = async () => {
  if (!userStore.token) {
    ElMessage.warning('请先登录');
    return router.push('/login');
  }
  actionLoading.value = true;
  try {
    if (isFavorited.value) {
      await unfavoriteCadModel(id);
      detail.value.favoriteCount--;
    } else {
      await favoriteCadModel(id);
      detail.value.favoriteCount++;
    }
    isFavorited.value = !isFavorited.value;
  } finally {
    actionLoading.value = false;
  }
};

// 下载逻辑
const handleDownload = () => {
  if (!userStore.token) {
    ElMessage.warning('请先登录');
    return router.push('/login');
  }
  // 触发下载（这里我们先直接通过浏览器打开下载链接，后续可以封装 Axios Blob 下载）
  window.open(`/api/cad-models/${id}/download`, '_blank');
};

onMounted(() => {
  fetchDetail();
});
</script>

<template>
  <div v-loading="loading" class="detail-container">
    <template v-if="detail">
      <!-- 左侧：预览图区域 -->
      <div class="preview-section">
        <div class="main-image">
          <img v-if="detail.previewImageUrl" :src="detail.previewImageUrl" alt="preview" />
          <el-icon v-else :size="80" color="var(--text-placeholder)">
            <Picture />
          </el-icon>
        </div>
      </div>

      <!-- 右侧：信息与操作区域 -->
      <div class="info-section">
        <!-- 标题与标签 -->
        <h1 class="title">{{ detail.title }}</h1>

        <div class="meta-tags">
          <el-tag v-for="t in detail.tags" :key="t.tag.id" effect="plain" round>
            {{ t.tag.name }}
          </el-tag>
        </div>

        <!-- 作者信息 -->
        <div class="author-card">
          <el-avatar :size="40" :src="detail.user.avatarUrl || undefined" />
          <div class="author-info">
            <span class="name">{{ detail.user.nickname }}</span>
            <span class="time">发布于 {{ new Date(detail.createdAt).toLocaleDateString() }}</span>
          </div>
        </div>

        <!-- 统计信息 -->
        <div class="stats-bar">
          <span><el-icon>
              <View />
            </el-icon> {{ detail.viewCount }} 浏览</span>
          <span><el-icon>
              <Download />
            </el-icon> {{ detail.downloadCount }} 下载</span>
          <span><el-icon>
              <Star />
            </el-icon> {{ detail.likeCount }} 点赞</span>
        </div>

        <!-- 价格与操作区 -->
        <div class="action-box">
          <div class="price">
            <template v-if="detail.accessType === 'FREE'">免费</template>
          </div>

          <div class="buttons">
            <el-button class="btn-favorite" circle :type="isFavorited ? 'primary' : 'default'" @click="toggleFavorite">
              <el-icon>
                <Star />
              </el-icon>
            </el-button>

            <el-button type="primary" class="btn-download" @click="handleDownload">
              立即下载
            </el-button>
          </div>
        </div>

        <!-- 描述区域 -->
        <div class="description">
          <h3>图纸介绍</h3>
          <p>{{ detail.description || '暂无详细描述' }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.detail-container {
  display: flex;
  gap: 40px;
  padding-top: 24px;

  // 响应式：小屏幕上下排列
  @media (max-width: $breakpoint-md) {
    flex-direction: column;
  }
}

/* 左侧预览 */
.preview-section {
  flex: 6;
}

.main-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  background-color: var(--bg-canvas);
  border-radius: var(--radius-lg);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain; // 详情页用 contain 保证图纸完整显示
  }
}

/* 右侧信息 */
.info-section {
  flex: 4;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 16px;
}

.meta-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.author-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
  margin-bottom: 24px;

  .author-info {
    display: flex;
    flex-direction: column;

    .name {
      font-weight: 600;
      color: var(--text-main);
    }

    .time {
      font-size: var(--font-size-xs);
      color: var(--text-secondary);
    }
  }
}

.stats-bar {
  display: flex;
  gap: 24px;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: 32px;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
}

/* 操作区 */
.action-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  background-color: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: 32px;
  border: 1px solid var(--border-light);

  .price {
    font-size: var(--font-size-xxl);
    font-weight: 700;
    color: var(--color-danger);
  }

  .buttons {
    display: flex;
    gap: 16px;

    .btn-favorite {
      width: 48px;
      height: 48px;
    }

    .btn-download {
      height: 48px;
      padding: 0 32px;
      border-radius: var(--radius-pill);
      font-size: var(--font-size-base);
    }
  }
}

.description {
  h3 {
    font-size: var(--font-size-lg);
    margin-bottom: 12px;
    color: var(--text-main);
  }

  p {
    color: var(--text-regular);
    line-height: 1.6;
  }
}
</style>

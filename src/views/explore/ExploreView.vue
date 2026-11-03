<!-- src/views/explore/ExploreView.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getCadModelList, type GetCadModelsParams } from '@/api/cadModel';
import type { CadModel, BaseResource } from '@/types/entities';
import { Search, Filter } from '@element-plus/icons-vue';
import ResourceCard from '@/components/business/ResourceCard.vue';

const router = useRouter();

const query = ref<GetCadModelsParams>({
  page: 1,
  pageSize: 12,
  keyword: '',
  sortBy: 'latest',
});

const loading = ref(false);
const cadModels = ref<CadModel[]>([]);
const total = ref(0);

const fetchList = async () => {
  loading.value = true;
  try {
    const data = await getCadModelList(query.value);
    cadModels.value = data.list;
    total.value = data.pagination.total;
  } catch (error) {
    console.error('获取列表失败', error);
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  query.value.page = 1;
  fetchList();
};

const handlePageChange = (page: number) => {
  query.value.page = page;
  fetchList();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleCardClick = (item: BaseResource) => {
  router.push(`/detail/${item.id}`);
};

onMounted(() => {
  fetchList();
});
</script>

<template>
  <div class="explore-container">
    <!-- 顶部搜索与筛选栏 -->
    <div class="search-bar">
      <div class="selectors">
        <el-select v-model="query.categoryId" placeholder="专业/建筑/水电/绿化" clearable class="custom-select">
          <el-option label="建筑" value="1" />
          <el-option label="结构" value="2" />
        </el-select>
        <el-select v-model="query.tagId" placeholder="图纸类别" clearable class="custom-select">
          <el-option label="室内" value="1" />
          <el-option label="室外" value="2" />
        </el-select>
      </div>

      <div class="search-input-box">
        <el-input v-model="query.keyword" placeholder="搜索你想要的图纸" :prefix-icon="Search" @keyup.enter="handleSearch"
          class="custom-search" />
      </div>

      <el-button type="primary" class="filter-btn" @click="handleSearch">
        <el-icon>
          <Filter />
        </el-icon>
      </el-button>
    </div>

    <!-- 卡片列表 -->
    <div v-loading="loading" class="grid-container">
      <el-empty v-if="cadModels.length === 0 && !loading" description="没有找到相关图纸" />

      <!-- 只有干净的 ResourceCard -->
      <ResourceCard v-for="item in cadModels" :key="item.id" :data="item" @click="handleCardClick" />
    </div>

    <!-- 分页器 -->
    <div class="pagination-box" v-if="total > 0">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="query.pageSize"
        :current-page="query.page" @current-change="handlePageChange" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.explore-container {
  padding-top: 24px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 40px;

  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    align-items: stretch;
  }
}

.selectors {
  display: flex;
  gap: 16px;
}

.custom-select {
  width: 200px;

  @media (max-width: $breakpoint-sm) {
    width: 100%;
  }
}

:deep(.custom-select .el-select__wrapper) {
  background-color: var(--bg-canvas);
  box-shadow: none !important;
  border-radius: var(--radius-md);
  padding: 8px 16px;
}

:deep(.custom-select.is-focused .el-select__wrapper) {
  box-shadow: 0 0 0 1px var(--brand-primary) !important;
}

.search-input-box {
  flex: 1;
}

:deep(.custom-search .el-input__wrapper) {
  background-color: var(--bg-canvas);
  box-shadow: none !important;
  border-radius: var(--radius-pill);
  padding: 6px 20px;
}

:deep(.custom-search .el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--brand-primary) !important;
}

.filter-btn {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background-color: var(--brand-primary);
  border: none;
  flex-shrink: 0;
}

.filter-btn:hover {
  background-color: var(--brand-primary-hover);
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
  min-height: 400px;
}

.pagination-box {
  display: flex;
  justify-content: center;
  margin-top: 48px;
  margin-bottom: 24px;
}

:deep(.el-pagination.is-background .el-pager li.is-active) {
  background-color: var(--brand-primary);
  color: var(--text-inverse);
}
</style>

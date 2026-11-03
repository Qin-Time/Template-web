<!-- src/layouts/components/AppHeader.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
import { ShoppingCart, User, Star, Lock, Location, Ticket, Folder, Document, Sunny, SwitchButton, Menu } from '@element-plus/icons-vue';

const router = useRouter();
const userStore = useUserStore();

// =========================================
// 1. 滚动监听逻辑 (实现收缩动画)
// =========================================
const isScrolled = ref(false);

const handleScroll = () => {
  // 滚动超过 20px 触发收缩
  isScrolled.value = window.scrollY > 20;
};

// =========================================
// 2. 下拉菜单逻辑
// =========================================
const showDropdown = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showDropdown.value = false;
  }
};

// =========================================
// 3. 生命周期
// =========================================
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
});

const handleLogout = () => {
  userStore.logout();
  ElMessage.success('已退出登录');
  showDropdown.value = false;
  router.push('/login');
};

const navItems = [
  { name: '首页', path: '/' },
  { name: '发现', path: '/explore' },
  { name: '博客', path: '/blog' },
  { name: '关于我们', path: '/about' },
  { name: '联系我们', path: '/contact' },
];
</script>

<template>
  <header class="header">
    <!-- 核心容器：根据 isScrolled 动态绑定 class -->
    <div class="header-inner" :class="{ 'is-scrolled': isScrolled }">

      <!-- 左侧 LOGO -->
      <div class="logo-box" @click="router.push('/')">
        <el-icon :size="18" color="var(--text-main)">
          <Star />
        </el-icon>
        <span class="logo-text">LOGO</span>
      </div>

      <!-- 中间导航 (PC端展示) -->
      <nav class="nav-menu">
        <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="nav-item">
          {{ item.name }}
        </router-link>
      </nav>

      <!-- 右侧操作区 -->
      <div class="actions">
        <!-- 购物车 -->
        <el-badge :value="2" :max="9" class="cart-badge">
          <el-icon :size="22" class="action-icon">
            <ShoppingCart />
          </el-icon>
        </el-badge>

        <!-- 个人中心下拉 -->
        <div class="user-center" ref="dropdownRef">
          <div class="avatar-btn" @click.stop="showDropdown = !showDropdown">
            <el-avatar :size="36" :icon="User" class="avatar" />
          </div>

          <!-- 下拉菜单 -->
          <transition name="fade">
            <div v-show="showDropdown" class="custom-dropdown">
              <div class="dropdown-arrow"></div>
              <div class="dropdown-content">
                <div class="user-header">
                  <div class="user-name">{{ userStore.userInfo?.nickname || '未登录用户' }}</div>
                </div>
                <div class="menu-list">
                  <div class="menu-item"><el-icon>
                      <User />
                    </el-icon> 个人信息</div>
                  <div class="menu-item"><el-icon>
                      <Lock />
                    </el-icon> 登录与安全</div>
                  <div class="menu-item"><el-icon>
                      <Location />
                    </el-icon> 我的状态</div>
                  <div class="menu-item"><el-icon>
                      <Ticket />
                    </el-icon> 我的优惠</div>
                  <div class="menu-item"><el-icon>
                      <Folder />
                    </el-icon> 我的资源</div>
                  <div class="menu-item"><el-icon>
                      <Document />
                    </el-icon> 我的订单</div>
                  <div class="menu-divider"></div>
                  <div class="menu-item theme-item">
                    <span><el-icon>
                        <Sunny />
                      </el-icon> 暗色模式</span>
                    <el-switch size="small" style="--el-switch-on-color: #1F2937" />
                  </div>
                  <div class="menu-divider"></div>
                  <div class="menu-item logout-item" @click="handleLogout">
                    <el-icon>
                      <SwitchButton />
                    </el-icon> 退出登录
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- 移动端汉堡菜单 (占位，后续开发) -->
        <div class="mobile-menu-btn">
          <el-icon :size="24">
            <Menu />
          </el-icon>
        </div>
      </div>

    </div>
  </header>
</template>

<style scoped lang="scss">
/* =========================================
   1. 最外层吸顶容器
========================================= */
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);
  width: 100%;
  height: var(--header-height);
  display: flex;
  justify-content: center;
  background-color: transparent;
  /* 背景色交给内层 */
  /* 给内层收缩留出一点浮动空间 */
  padding: 12px 0;
}

/* =========================================
   2. 内层版心 (动画执行者)
========================================= */
.header-inner {
  width: 100%;
  max-width: var(--layout-max-width);
  height: 100%;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 40px);
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* 默认状态 */
  background-color: var(--bg-header);
  border-radius: 0;

  /* 平滑过渡 */
  transition: all var(--transition-base);
}

/* 👇 核心：滚动后触发的胶囊态 */
.header-inner.is-scrolled {
  max-width: 1040px;
  /* 收缩后的宽度，你可以根据喜好调 */
  border-radius: var(--radius-pill);
  background-color: rgba(226, 235, 248, 0.85);
  /* 配合毛玻璃 */
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-md);
}

/* =========================================
   3. 内部元素 (纯变量拼装)
========================================= */
.logo-box {
  background-color: rgba(255, 255, 255, 0.4);
  padding: 8px 20px;
  border-radius: var(--radius-pill);
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.logo-box:hover {
  background-color: rgba(255, 255, 255, 0.7);
}

.logo-text {
  font-weight: 700;
  font-size: var(--font-size-base);
  color: var(--text-main);
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-item {
  text-decoration: none;
  color: var(--text-regular);
  font-weight: 500;
  font-size: var(--font-size-sm);
  padding: 8px 20px;
  border-radius: var(--radius-pill);
  transition: all var(--transition-fast);
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.5);
  color: var(--text-main);
}

.nav-item.router-link-exact-active {
  background-color: var(--brand-primary);
  color: var(--text-inverse);
  font-weight: 600;
  box-shadow: var(--shadow-sm);
}

.actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.action-icon {
  color: var(--text-main);
  cursor: pointer;
  transition: transform var(--transition-fast);
}

.action-icon:hover {
  transform: scale(1.1);
}

.user-center {
  position: relative;
}

.avatar-btn {
  cursor: pointer;
  display: flex;
  align-items: center;
}

/* =========================================
   4. 下拉菜单
========================================= */
.custom-dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  width: 220px;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-light);
  z-index: var(--z-index-dropdown);
}

.dropdown-arrow {
  position: absolute;
  top: -6px;
  right: 12px;
  width: 12px;
  height: 12px;
  background: var(--bg-card);
  transform: rotate(45deg);
  border-top: 1px solid var(--border-light);
  border-left: 1px solid var(--border-light);
}

.dropdown-content {
  padding: 16px 8px;
  position: relative;
  z-index: 2;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
}

.user-header {
  padding: 0 12px 12px;
}

.user-name {
  font-size: var(--font-size-base);
  font-weight: 700;
  color: var(--text-main);
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  font-size: var(--font-size-sm);
  color: var(--text-regular);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.menu-item:hover {
  background-color: var(--brand-primary-light);
  color: var(--text-main);
}

.menu-divider {
  height: 1px;
  background-color: var(--border-light);
  margin: 8px 0;
}

.theme-item {
  justify-content: space-between;
}

.theme-item span {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logout-item {
  color: var(--color-danger);
}

.logout-item:hover {
  background-color: var(--color-danger-bg);
}

/* =========================================
   5. 动画与响应式
========================================= */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 移动端适配：隐藏中间导航，显示汉堡菜单 */
.mobile-menu-btn {
  display: none;
  cursor: pointer;
}

@media (max-width: $breakpoint-md) {
  .nav-menu {
    display: none;
    /* 平板/手机端隐藏中间菜单 */
  }

  .mobile-menu-btn {
    display: block;
    /* 显示汉堡菜单 */
  }
}
</style>

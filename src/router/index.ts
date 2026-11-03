// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // ==========================================
    // 1. 认证模块（使用 AuthLayout：全屏居中、无导航栏）
    // ==========================================
    {
      path: '/login',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        {
          path: '',
          name: 'Login',
          component: () => import('@/views/auth/LoginView.vue')
        }
      ]
    },

    // ==========================================
    // 2. 业务主模块（使用 MainLayout：带顶部导航栏）
    // ==========================================
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/home/HomeView.vue')
        },
        {
          path: 'explore', // 👈 核心修正：把它移进来了！
          name: 'Explore',
          component: () => import('@/views/explore/ExploreView.vue')
        },
        {
          path: 'publish',
          name: 'Publish',
          component: () => import('@/views/publish/PublishView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'admin',
          name: 'Admin',
          component: () => import('@/views/admin/AdminView.vue'),
          meta: { requiresAuth: true, role: 'ADMIN' }
        },
        {
          path: 'detail/:id', // 动态路由，接收图纸 ID
          name: 'Detail',
          component: () => import('@/views/detail/DetailView.vue')
        }
      ]
    },

    // ==========================================
    // 3. 404 兜底页面
    // ==========================================
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue')
    }
  ],
  // 每次路由切换时，控制页面的滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 1. 如果浏览器的前进/后退按钮被触发，恢复原来的滚动位置（这是最佳体验）
    if (savedPosition) {
      return savedPosition;
    }
    // 2. 正常的点击跳转，每次新页面都回到顶部
    else {
      return { top: 0, behavior: 'smooth' }; // 'smooth' 带来丝滑的滚动动画，不想要动画可以删掉
    }
  }
});

// ==========================================
// 全局前置守卫
// ==========================================
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.path === '/login' && userStore.token) {
    next('/');
    return;
  }

  if (to.meta.requiresAuth && !userStore.token) {
    next('/login');
    return;
  }

  if (to.meta.role && userStore.userInfo?.role !== to.meta.role) {
    next('/');
    return;
  }

  next();
});

export default router;

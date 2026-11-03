import axios from 'axios';
import { useUserStore } from '@/stores/user';
import router from '@/router';
import { ElMessage } from 'element-plus';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // 配合 Vite 的代理
  timeout: 10000,
});

// 请求拦截器：自动携带 Token
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器：统一解包和错误处理
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 后端成功返回 code 200/201，直接把核心 data 交出去
    if (res.code && res.code !== 200 && res.code !== 201) {
      ElMessage.error(res.message || '请求失败');
      return Promise.reject(new Error(res.message));
    }
    return res.data; // 前端页面直接拿 data，不用再写 res.data.data
  },
  (error) => {
    const { response } = error;
    if (response) {
      const message = response.data?.message || '服务器异常';
      ElMessage.error(message);

      // 401 未授权：Token 过期或未登录，强制登出
      if (response.status === 401) {
        const userStore = useUserStore();
        userStore.logout();
        router.push('/login');
      }
    } else {
      ElMessage.error('网络连接异常，请检查网络');
    }
    return Promise.reject(error);
  }
);

export default request;

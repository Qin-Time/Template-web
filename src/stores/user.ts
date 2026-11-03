// src/stores/user.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  // 从 localStorage 初始化，防止刷新页面丢失
  const token = ref<string>(localStorage.getItem('token') || '');
  const userInfo = ref<any>(JSON.parse(localStorage.getItem('userInfo') || 'null'));

  // 登录成功后调用
  const setLoginData = (newToken: string, info: any) => {
    token.value = newToken;
    userInfo.value = info;
    localStorage.setItem('token', newToken);
    localStorage.setItem('userInfo', JSON.stringify(info));
  };

  // 登出
  const logout = () => {
    token.value = '';
    userInfo.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  };

  return { token, userInfo, setLoginData, logout };
});

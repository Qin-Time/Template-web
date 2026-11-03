<!-- src/views/auth/LoginView.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import request from '@/utils/request';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();
const loading = ref(false);

const form = ref({
  account: '',
  password: ''
});

const handleLogin = async () => {
  if (!form.value.account || !form.value.password) {
    ElMessage.warning('请输入账号和密码');
    return;
  }

  loading.value = true;
  try {
    // 完美对接后端的 login 接口
    const data: any = await request.post('/auth/login', form.value);

    // 存入 Pinia 和 LocalStorage
    userStore.setLoginData(data.token, data.user);

    ElMessage.success('登录成功');
    router.push('/'); // 跳转主页
  } catch (error) {
    // 全局请求拦截器已经处理了错误提示，无需额外写
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <!-- 左上角 Logo -->
    <div class="logo-box">
      <el-icon :size="20">
        <StarFilled />
      </el-icon>
      <span class="logo-text">LOGO</span>
    </div>

    <div class="login-box">
      <h1 class="title">欢迎回来</h1>
      <p class="subtitle">新的一天同样美好</p>

      <el-form @keyup.enter="handleLogin">
        <el-form-item>
          <el-input v-model="form.account" placeholder="请输入您的账户名或电话号码" size="large" class="custom-input" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="请输入您的密码" size="large" show-password
            class="custom-input" />
        </el-form-item>

        <el-button type="primary" class="login-btn" :loading="loading" @click="handleLogin">
          登 录
        </el-button>
      </el-form>

      <div class="divider">
        <span>or 其他方式登录</span>
      </div>

      <div class="social-login">
        <div class="social-icon">G</div>
        <div class="social-icon">A</div>
        <div class="social-icon">F</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F7F8FA;
  /* 你的设计稿浅灰背景 */
  position: relative;
}

/* 左上角 Logo */
.logo-box {
  position: absolute;
  top: 40px;
  left: 40px;
  background-color: #EBEBEB;
  padding: 10px 24px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-text {
  font-weight: 700;
  font-size: 16px;
  color: #1F2937;
}

/* 居中表单盒 */
.login-box {
  width: 100%;
  max-width: 420px;
  padding: 40px;
}

.title {
  font-size: 32px;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 8px;
}

.subtitle {
  color: #6B7280;
  font-size: 15px;
  margin-bottom: 40px;
}

/* 极致覆盖 Element Plus 输入框 */
:deep(.custom-input .el-input__wrapper) {
  background-color: #F2F4F7 !important;
  box-shadow: none !important;
  /* 去掉边框 */
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 8px;
}

:deep(.custom-input .el-input__inner) {
  color: #1F2937;
}

:deep(.custom-input .el-input__inner::placeholder) {
  color: #9CA3AF;
}

/* 纯黑胶囊按钮 */
.login-btn {
  width: 100%;
  height: 52px;
  border-radius: 999px;
  background-color: #000000;
  border: none;
  font-size: 16px;
  font-weight: 600;
  margin-top: 16px;
  transition: all 0.3s;
}

.login-btn:hover {
  background-color: #333333;
  transform: translateY(-1px);
}

/* 分割线 */
.divider {
  text-align: center;
  margin: 32px 0;
  color: #9CA3AF;
  font-size: 13px;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background-color: #E5E7EB;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

/* 第三方登录 */
.social-login {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.social-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #E5E7EB;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  color: #4B5563;
  transition: all 0.2s;
}

.social-icon:hover {
  background-color: #F2F4F7;
  border-color: #D1D5DB;
  color: #000000;
}
</style>

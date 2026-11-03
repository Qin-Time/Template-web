import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import '@/styles/index.scss'; // 引入全局样式
import 'element-plus/es/components/message/style/css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

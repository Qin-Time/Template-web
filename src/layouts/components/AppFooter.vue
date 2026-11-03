<!-- src/components/AppFooter.vue -->
<script setup lang="ts">
// 这里的链接后续可以换成真实的 router-link
const contactInfo = [
  { label: '公司邮箱', value: 'contact@qin-cad.com' },
  { label: '公司电话', value: '400-123-4567' },
  { label: '公司地址', value: '某某市某某区某某科技园' },
];

const productLinks = ['Autocad volutpat', 'Fermentum turpis', 'Mi consequat', 'Amet venenatis', 'Convallis porttitor'];
const aboutLinks = ['Egestas vitae', 'Viverra lorem ac', 'Eget ac tellus', 'Erat nulla', 'Vulputate proin'];
</script>

<template>
  <footer class="app-footer">
    <div class="footer-inner">

      <!-- 第一大块：公司信息与链接列 -->
      <div class="footer-top">
        <!-- 公司信息 -->
        <div class="footer-col brand-col">
          <h3 class="footer-title">公司信息</h3>
          <div class="contact-list">
            <div v-for="(item, index) in contactInfo" :key="index" class="contact-item">
              <span class="label">{{ item.label }}：</span>
              <span class="value">{{ item.value }}</span>
            </div>
          </div>
          <!-- 社交图标预留位 -->
          <div class="social-links">
            <div class="social-icon">fb</div>
            <div class="social-icon">in</div>
            <div class="social-icon">tw</div>
            <div class="social-icon">yt</div>
          </div>
        </div>

        <!-- 产品链接 -->
        <div class="footer-col">
          <h3 class="footer-title">产品</h3>
          <ul class="link-list">
            <li v-for="link in productLinks" :key="link"><a href="#">{{ link }}</a></li>
          </ul>
        </div>

        <!-- 关于链接 -->
        <div class="footer-col">
          <h3 class="footer-title">关于</h3>
          <ul class="link-list">
            <li v-for="link in aboutLinks" :key="link"><a href="#">{{ link }}</a></li>
          </ul>
        </div>

        <!-- 下载 App -->
        <div class="footer-col app-col">
          <h3 class="footer-title">下载我们的APP</h3>
          <div class="app-buttons">
            <div class="app-btn black-btn">
              <span>Download on the</span>
              <strong>App Store</strong>
            </div>
            <div class="app-btn black-btn">
              <span>GET IT ON</span>
              <strong>Google Play</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- 第二大块：底部版权与语言 -->
      <div class="footer-bottom">
        <div class="lang-select">
          <span>🌐 English</span>
        </div>
        <div class="copyright">
          Copyright © 2026. All rights reserved.
        </div>
        <div class="scroll-top">
          <!-- 回到顶部按钮预留 -->
        </div>
      </div>

    </div>
  </footer>
</template>

<style scoped lang="scss">
.app-footer {
  background-color: var(--bg-canvas);
  /* 用浅灰底色和主内容区区分 */
  border-top: 1px solid var(--border-light);
  padding: 60px 0 30px;
  margin-top: 60px;
  /* 与上方内容拉开距离 */
}

.footer-inner {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 40px);
}

/* 上半部分：多列网格布局 */
.footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 40px;
  margin-bottom: 60px;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

.footer-col {
  display: flex;
  flex-direction: column;
}

.footer-title {
  font-size: var(--font-size-base);
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 24px;
}

/* 联系方式列表 */
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.contact-item {
  font-size: var(--font-size-sm);
  color: var(--text-regular);

  .label {
    color: var(--text-secondary);
  }
}

/* 社交图标 */
.social-links {
  display: flex;
  gap: 12px;
}

.social-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--border-base);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: var(--text-main);
  cursor: pointer;
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--border-dark);
  }
}

/* 链接列表 */
.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  a {
    text-decoration: none;
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    transition: color var(--transition-fast);

    &:hover {
      color: var(--brand-primary);
    }
  }
}

/* App 下载按钮 */
.app-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.app-btn {
  background-color: var(--brand-primary);
  color: var(--text-inverse);
  padding: 10px 20px;
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: fit-content;
  min-width: 160px;

  span {
    font-size: 10px;
    text-transform: uppercase;
  }

  strong {
    font-size: 16px;
    font-weight: 600;
  }
}

/* 下半部分：版权 */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid var(--border-base);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);

  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}
</style>

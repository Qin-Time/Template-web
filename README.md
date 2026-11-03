my-cad-frontend/
├── public/                 # 静态资源 (favicon等)
├── src/
│   ├── api/                # 🚨 核心：按业务模块划分的 API 请求层 (与后端路由对应)
│   │   ├── auth.ts         # 登录、注册、找回密码
│   │   ├── cadModel.ts     # 图纸发布、列表、详情、下载
│   │   ├── user.ts         # 用户信息、收藏
│   │   ├── order.ts        # 订单、支付
│   │   └── admin.ts        # 后台管理接口
│   ├── assets/             # 静态资源 (图片、全局 SVG 图标)
│   ├── components/         # 全局可复用组件
│   │   ├── common/         # 极其基础的 UI (如自定义的按钮、自定义弹窗)
│   │   └── business/       # 业务组件 (如：CadCard 图纸卡片、CommentList 评论列表)
│   ├── composables/        # 🚨 核心：Vue 3 组合式函数 (提取复用的逻辑)
│   │   ├── useAuth.ts      # 封装鉴权、获取当前用户等
│   │   ├── usePagination.ts# 封装分页逻辑
│   │   └── useUpload.ts    # 封装大文件上传逻辑
│   ├── layouts/            # 布局组件 (极其重要)
│   │   ├── MainLayout.vue  # 包含顶部导航、底部 Footer 的主布局
│   │   └── AuthLayout.vue  # 登录/注册页的极简布局 (你的设计稿图1)
│   ├── router/             # 路由配置
│   │   └── index.ts        # 路由表与全局前置守卫
│   ├── stores/             # 全局状态管理 (Pinia)
│   │   ├── user.ts         # 用户登录态、Token、权限
│   │   └── app.ts          # 全局 UI 状态 (如主题色、全局 Loading)
│   ├── styles/             # 全局样式
│   │   ├── variables.scss  # 定义你的 Figma 设计稿规范 (主色、圆角、间距)
│   │   └── global.scss     # 全局重置与通用类
│   ├── types/              # TypeScript 类型定义 (接口文档)
│   │   ├── api.d.ts        # 后端返回的 Response 类型
│   │   └── entities.d.ts   # 实体类型 (User, CadModel)
│   ├── utils/              # 工具函数
│   │   ├── request.ts      # Axios 封装 (上一轮给你的)
│   │   └── format.ts       # 时间格式化、文件大小格式化 (如把 BigInt 字节转成 MB/GB)
│   ├── views/              # 具体的页面 (与 router 对应)
│   │   ├── home/           # 首页 (对应设计稿图2、图5)
│   │   ├── login/          # 登录页
│   │   ├── detail/         # 详情页
│   │   └── publish/        # 发布页
│   ├── App.vue             # 根组件
│   └── main.ts             # 入口文件
├── .env                    # 环境变量 (VITE_API_BASE_URL 等)
├── index.html
├── package.json
└── vite.config.ts          # Vite 配置 (代理后端接口)
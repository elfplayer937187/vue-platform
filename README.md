# 电商运营平台 · 前端

面向电商运营的后台管理系统前端，基于 **Vue 3 + TypeScript + Vite** 构建，涵盖认证、RBAC 权限管理与商品管理三大业务域。

> 后端为独立服务，通过 Vite 开发代理对接，本仓库仅包含前端实现。

## 功能模块

| 模块 | 说明 |
| --- | --- |
| 认证 | 登录、token 持久化、全局路由守卫 |
| 权限管理 | 用户管理、角色管理、菜单与按钮权限分配 |
| 商品管理 | 品牌管理、平台属性、SPU、SKU |
| 数据大屏 | 基于 ECharts 的统计图表 |
| 首页 / 404 | 工作台与兜底页 |

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | Vue 3（Composition API + `<script setup>`） |
| 语言 | TypeScript 6 |
| 构建 | Vite 8 |
| 状态管理 | Pinia 3 |
| 路由 | Vue Router 5 |
| UI 组件 | Element Plus 2 |
| 图表 | ECharts 5 + echarts-liquidfill |
| HTTP | Axios |
| 样式 | Sass / SCSS |
| 表格导出 | xlsx |
| 工具库 | dayjs、lodash、nprogress |

## 快速开始

### 环境要求

- Node.js `^20.19.0` 或 `>=22.12.0`
- 一个可用的后端服务（默认地址 `http://127.0.0.1:10086`，见 `vite.config.ts` 的 `server.proxy`）

### 安装与启动

```sh
npm install
npm run dev
```

### 构建

```sh
npm run build:pro     # 生产环境构建（production 模式）
npm run build:test    # 测试环境构建（test 模式）
npm run build         # 类型检查 + 构建
npm run preview       # 本地预览构建产物
```

### 代码检查

```sh
npm run lint          # oxlint + eslint
npm run format        # prettier 格式化 src/
npm run type-check    # vue-tsc 类型检查
```

## 环境变量

三套环境文件按 Vite 的 `--mode` 隔离，变量需以 `VITE_` 开头才会暴露给客户端：

| 文件 | `VITE_APP_BASE_API` | 用途 |
| --- | --- | --- |
| `.env.development` | `/api` | 本地开发 |
| `.env.testing` | `/test-api` | 测试环境构建 |
| `.env.production` | `/prod-api` | 生产环境构建 |

公共变量：

- `VITE_APP_TITLE` —— 应用标题，用于浏览器标签页标题

开发环境下 `/api` 与 `/api/uploads` 两条代理规则转发至本地后端，其中 `/api/uploads` 保留前缀（对应后端静态资源路径），其余接口按后端路由规则处理。具体见 `vite.config.ts`。

## 目录结构

```
.
├── src/
│   ├── apis/                 # 接口层（按业务域拆分，含类型定义）
│   │   ├── acl/              #   权限：user / role / permission
│   │   ├── auth/             #   认证
│   │   ├── product/          #   商品：trademark / attr / spu / sku
│   │   └── others/           #   通用响应类型、接口文档
│   ├── assets/               # 静态资源（icons / images）
│   ├── components/           # 全局组件（含 SvgIcon）
│   ├── directives/           # 自定义指令（v-has 按钮级权限）
│   ├── layout/               # 布局：logo / menu / tabbar / main
│   ├── product/              # 商品管理页面
│   ├── router/               # 路由定义与全局守卫
│   ├── stores/modules/       # Pinia 模块：user / Category / LayoutSettings
│   ├── styles/               # 全局样式与 SCSS 变量
│   ├── utils/                # 工具：request / token / export-xlsx 等
│   └── views/                # 页面：login / home / screen / acl / 404
├── public/                   # 不经构建的静态资源
├── env.d.ts                  # 环境变量与模块类型声明
└── vite.config.ts            # 构建与开发服务器配置
```

## 工程化

- **提交前检查** —— husky `pre-commit` 钩子串联 ESLint 与 Prettier（oxlint 通过 `npm run lint` 单独执行）
- **提交信息规范** —— commitlint + Conventional Commits（配置见 `commitlint.config.cjs`）
- **类型检查** —— `vue-tsc` 接入构建流程，与 Vite 构建并行执行
- **自动导入** —— Element Plus 组件免 import 自动注册，SVG 图标以雪碧图方式按需加载
- **路径别名** —— `@` 指向 `src/`，SCSS 变量文件全局注入

## 编码约定

- API 函数以 `req` 开头，如 `reqGetUserPagination`
- 事件处理函数以 `Handle` 开头，如 `HandleAddUser`
- 按钮级权限使用 `v-has` 指令，值格式如 `btn.User.add`
- 类型定义放在对应 API 目录的 `type.ts` 中

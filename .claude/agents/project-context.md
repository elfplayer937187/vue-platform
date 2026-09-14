---
name: project-context
description: 项目全局信息：技术栈、架构、目录结构、编码规范，供其他 agent 和开发者快速了解项目
model: sonnet
---

# 项目全局上下文 — `电商运营平台`

## 📦 项目概述

**项目名称**: 电商运营平台  
**项目类型**: 企业级后台管理系统 (Admin Management System)  
**技术栈**: Vue 3 + TypeScript + Element Plus + Pinia + Vue Router + Vite  

**典型用户**: 内部管理员，管理商品、用户、权限  
**数据流**: 组件 → API 层 (Axios) → 后端服务 (RESTful) → 响应拦截器统一处理

---

## 🧱 技术栈

| 层 | 技术 |
|---|---|
| 框架 | Vue 3 (Composition API, `<script setup>`) |
| 语言 | TypeScript 6 |
| 构建 | Vite 8 |
| 状态管理 | Pinia 3 (option store + setup store 两种写法) |
| 路由 | Vue Router 5 (Hash 模式) |
| UI | Element Plus 2.14 |
| 图表 | ECharts 5.6 + echarts-liquidfill 3.1 |
| HTTP | Axios 1.16 |
| CSS 预处理器 | Sass/SCSS |
| Mock | Mockjs (vite-plugin-mock) |
| 工具库 | dayjs, lodash, nprogress |
| Excel | xlsx (已在依赖中) |

---

## 📁 项目目录结构

```
电商运营平台/
├── src/
│   ├── main.ts                       # 入口，注册 router/pinia/组件/指令
│   ├── App.vue                       # 根组件 (<RouterView>)
│   ├── router/
│   │   ├── index.ts                  # 路由定义（常量路由 + 异步路由 + 任意路由）
│   │   └── permission.ts             # 路由守卫（token 校验 / 动态注入 / 重定向）
│   ├── stores/
│   │   ├── counter.ts                # 示例 store（Count API）
│   │   └── modules/
│   │       ├── user.ts               # 用户 store（token / 路由 / 权限按钮）
│   │       ├── LayoutSettings.ts      # 布局 store（侧栏折叠 / 刷新 / 主题）
│   │       ├── Category.ts           # 分类级联 store（三级联动）
│   │       └── types/RouterType.ts   # Store 类型定义
│   ├── layout/
│   │   ├── index.vue                 # 主布局（侧栏 + 顶栏 + 内容区）
│   │   ├── logo/index.vue            # 侧栏 Logo
│   │   ├── menu/index.vue            # 递归菜单（动态路由渲染）
│   │   ├── main/index.vue            # 内容区（router-view + 过渡动画）
│   │   └── tabbar/index.vue          # 顶栏（面包屑 / 主题切换 / 头像 / 退出）
│   ├── views/                        # 页面组件（ACL 类）
│   │   ├── login/index.vue           # 登录页
│   │   ├── home/home.vue             # 首页看板
│   │   ├── screen/index.vue          # 数据大屏（全屏 ECharts 可视化）
│   │   ├── 404/404.vue               # 404 页
│   │   └── acl/
│   │       ├── user/index.vue        # 用户管理
│   │       ├── role/index.vue        # 角色管理
│   │       └── Permission/index.vue  # 菜单/权限管理
│   ├── product/                      # 商品管理页面（注意：在 src/product 下，非 views）
│   │   ├── attr/index.vue            # 属性管理
│   │   ├── trademark/index.vue       # 品牌管理
│   │   ├── spu/index.vue             # SPU 列表
│   │   ├── spu/spuForm.vue           # SPU 新增/编辑表单
│   │   ├── spu/sku.vue               # SKU 创建表单（供 SPU 内调用）
│   │   └── sku/index.vue             # SKU 列表
│   ├── components/
│   │   ├── index.ts                  # 全局组件注册
│   │   ├── SvgIcon.vue               # SVG 图标组件
│   │   └── Category/index.vue        # 三级分类级联选择器
│   ├── apis/
│   │   ├── user/index.ts             # 登录/登出/用户信息 API
│   │   ├── acl/
│   │   │   ├── user/user.ts          # 用户 CRUD API
│   │   │   ├── role/role.ts          # 角色 CRUD + 分配 API
│   │   │   └── permission/permission.ts  # 权限/菜单 CRUD API
│   │   └── product/
│   │       ├── attr/index.ts         # 分类 + 属性 API
│   │       ├── trademark/index.ts    # 品牌 CRUD API
│   │       ├── spu/index.ts          # SPU CRUD API
│   │       └── sku/index.ts          # SKU CRUD API
│   ├── directives/
│   │   └── hasButton.ts              # v-has 按钮级权限指令
│   ├── utils/
│   │   ├── request.ts                # Axios 实例（拦截器 / token / 错误处理）
│   │   ├── token.ts                  # localStorage token 读写删
│   │   ├── time.ts                   # 时间问候语工具
│   │   └── picture.ts                # 图片上传校验
│   ├── styles/
│   │   ├── index.scss                # 全局样式 + 滚动条
│   │   ├── reset.scss                # CSS reset
│   │   └── variable.scss             # SCSS 变量
│   └── assets/
│       ├── icons/                    # SVG 图标
│       └── images/                   # 图片资源
```

---

## 🛣️ 路由系统（三层架构）

所有路由定义在 `src/router/index.ts`：

### 1. 常量路由 (ConstedRoutes) — 始终可用
| 路径 | 说明 | 布局 |
|---|---|---|
| `/login` | 登录页 | 无 layout |
| `/` → `/home` | 首页 | layout |
| `/screen` | 数据大屏 | 无 layout |
| `/404` | 404 | 无 layout |

### 2. 异步路由 (AsyncRoutes) — 登录后根据权限动态注入

**权限管理** (`/acl/*`):
| 路径 | 组件路径 |
|---|---|
| `/acl/user` | `@/views/acl/user/index.vue` |
| `/acl/role` | `@/views/acl/role/index.vue` |
| `/acl/Permission` | `@/views/acl/Permission/index.vue` |

**商品管理** (`/Product/*`):
| 路径 | 组件路径 | 注意 |
|---|---|---|
| `/Product/attr` | `@/product/attr/index.vue` | 不在 views 下 |
| `/Product/sku` | `@/product/sku/index.vue` | 不在 views 下 |
| `/Product/spu` | `@/product/spu/index.vue` | 不在 views 下 |
| `/Product/trademark` | `@/product/trademark/index.vue` | 不在 views 下 |

### 3. 任意路由 (AnyRoutes) — 404 兜底
| 路径 | 说明 |
|---|---|
| `/:pathMatch(.*)*` | 重定向到 404 |

### 路由守卫 (`permission.ts`)
- 无 token → 跳转 `/login`
- 有 token 但无用户信息 → 获取用户信息 → 根据权限过滤异步路由 → `router.addRoute()` 动态注入

---

## 🎨 命名约定

### 文件命名
- **Vue 组件**: `index.vue`（目录命名，目录名即模块名）
- **API 文件**: `user.ts`, `sku/index.ts` 等
- **Store 文件**: 驼峰命名，如 `user.ts`, `LayoutSettings.ts`
- **类型文件**: `type.ts`（放在对应 API 目录下）

### 变量命名
- **API 函数**: `req` 前缀，如 `reqGetUserPagination`, `reqAddUser`
- **API 枚举**: `API` 枚举大写蛇形，如 `GETUSER_PAGINATION_URL`
- **事件处理函数**: `Handle` 前缀，如 `HandleAddUser`, `HandleDeleteUser`
- **组件暴露方法/fn**: `Get`/`Handle` 前缀
- **ref/reactive**: 描述性名称，如 `UserList`, `ShowDrawer`, `dialogVisible`

### 页面结构约定
每个列表页的模板结构：
```
<template>
  <el-card> 搜索区（可选）</el-card>
  <el-card>
    <div class="card-header"> 操作按钮 </div>
    <el-table> ... </el-table>
    <el-pagination> ... </el-pagination>
    <el-dialog> / <el-drawer> 新增/编辑表单 </el-dialog>
  </el-card>
</template>
```

---

## 🔐 权限系统

### 路由级权限
- 异步路由根据后端返回的 `res.data.routes`（权限名数组）过滤
- 过滤逻辑在 `user.ts` 的 `getUserAllRoutes()` 方法中递归匹配 `Route.name`
- 匹配到的路由通过 `router.addRoute()` 动态注入

### 按钮级权限
- 通过自定义指令 `v-has` 实现
- 用法: `v-has="`btn.User.add`"`（值来自后端返回的 `avaliableButtons` 数组）
- 实现文件: `src/directives/hasButton.ts`
- 无权限时直接从 DOM 移除该元素

---

## 📡 API 层模式

### 响应格式
```typescript
interface ApiResponse {
  code: number      // 200 = 成功
  data: any         // 数据
  message: string   // 消息
  ok: boolean       // 后端自定义状态
}
```

### API 文件结构
```typescript
// src/apis/acl/user/user.ts
import request from '@/utils/request'
enum API {
  LIST_URL = '/admin/acl/user',
  SAVE_URL = '/admin/acl/user/save',
  // ...
}
export const reqGetList = (page, size) =>
  request.get<any, ResponseType>(API.LIST_URL + `/${page}/${size}`)
```

### 请求配置
- 基础 URL: `import.meta.env.VITE_APP_BASE_API`
- 拦截器自动注入 `headers.token`
- 响应拦截器统一处理错误（400/401/403/404/500）
- 所有 API 文件放在 `src/apis/` 下，按业务模块建目录

---

## 🏪 状态管理 (Pinia)

| Store | 文件 | 类型 |
|---|---|---|
| `useUserStore` | `stores/modules/user.ts` | option store (state/actions) |
| `useLayoutSettings` | `stores/modules/LayoutSettings.ts` | 布局状态（折叠/刷新/主题色/暗黑模式） |
| `useCategoryStore` | `stores/modules/Category.ts` | setup store (ref + 三级级联) |

---

## 🧩 通用组件

### Category 三级分类选择器
- **路径**: `src/components/Category/index.vue`
- **功能**: 三级级联下拉选择（一级 → 二级 → 三级）
- **props**: `Isdisabled`（编辑时禁用）
- **依赖 Store**: `useCategoryStore`（自动 cascade）

### SvgIcon
- **路径**: `src/components/SvgIcon.vue`
- **用法**: `<SvgIcon name="xxx" />`，搭配 `assets/icons/` 下的 SVG 文件

---

## 💅 UI 主题与样式

### 布局变量（`variable.scss`）
- `$base-menu-width`: 280px（侧栏展开宽度）
- `$base-menu-minwidth`: 60px（侧栏折叠宽度）
- `$base-menu-topheight`: 50px（顶栏高度）

### 主题定制
- 支持主题色切换（`el-color-picker`）
- 支持暗黑模式（Element Plus 暗黑 CSS 变量）
- 设置持久化到 `localStorage`

---

## ✅ 已实现的核心功能

1. **登录/登出** — JWT token，`localStorage` 持久化
2. **用户管理** — CRUD + 批量删除 + 搜索 + 分配角色
3. **角色管理** — CRUD + 树形权限分配 (`el-tree`)
4. **权限/菜单管理** — 树形 CRUD（4 级菜单/按钮）
5. **品牌管理** — CRUD + Logo 图片上传
6. **属性管理** — 分类属性 + 动态属性值
7. **SPU 管理** — CRUD + 图片/销售属性 + SKU 查看
8. **SKU 管理** — CRUD + 上下架 + 详情抽屉
9. **数据大屏** — 全屏 ECharts 可视化（液位图/柱状图/饼图）
10. **布局** — 可折叠侧栏 + 面包屑 + 全屏 + 暗黑模式 + 主题色
11. **路由过渡动画** — fade 效果 + NProgress 进度条
12. **按钮级权限** — 自定义 `v-has` 指令

---

## 💡 常见开发模式

### 添加一个新功能模块
```
1. 在 src/apis/ 下建新目录，写 API 文件 + 类型文件
2. 在 src/views/ 或 src/ 下建页面目录
3. 在 router/index.ts 的 AsyncRoutes 中注册路由
4. 在菜单/权限管理页面添加对应菜单记录
```

### 编写一个列表页
```vue
<template>
  <el-card> 搜索/操作栏 </el-card>
  <el-card>
    <el-table :data="list" border />
    <el-pagination @change="fetchList" />
    <el-dialog v-model="dialogVisible"> 表单 </el-dialog>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { reqGetList } from '@/apis/...'
const list = ref()
const fetchList = async () => { ... }
onMounted(() => fetchList())
</script>
```

### 添加一个新的 Store
```typescript
export const useXxxStore = defineStore('Xxx', () => {
  const state = ref()
  const action = async () => { ... }
  return { state, action }
})
```
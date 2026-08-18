# vue-guigu

## 项目信息

开始工作前，先读取 `.claude/agents/project-context.md` 了解项目全貌。

## 编码规范

### 通用
- 页面模板结构统一：`<el-card>` 搜索区 → `<el-card>` 表格 + 分页 + 抽屉/对话框
- API 函数以 `req` 开头，如 `reqGetUserPagination`
- 事件处理函数以 `Handle` 开头，如 `HandleAddUser`
- Vue 组件使用 Composition API + `<script setup>`
- 类型定义放在对应 API 目录的 `type.ts` 中

### 权限
- 按钮级权限使用 `v-has` 指令，值格式如 `btn.User.add`
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index.ts'
import './router/permission'
import globalComponents from './components/index.ts'
import '@/styles/index.scss'

// 注册 SVG 精灵图（vite-plugin-svg-icons 需要）
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(globalComponents)

app.mount('#app')

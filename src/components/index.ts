import { type App } from 'vue'
import SvgIcon from './SvgIcon.vue'
// 引入所有element-plus组件图标
const AllSvgComponents = { SvgIcon }
// 获取所有的键
const AllSvgComponentsArray = Object.keys(AllSvgComponents)
// 自定义插件用于注册所有组件
export default {
  install(app: App) {
    AllSvgComponentsArray.forEach((key) => {
      app.component(key, AllSvgComponents[key as keyof typeof AllSvgComponents])
    })
  },
}

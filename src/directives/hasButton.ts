import type { App } from 'vue'
import useUserStore from '@/stores/modules/user'

export const IsHasButton = (app: App) => {
  app.directive('has', {
    mounted(el: HTMLElement, options) {
      // 在指令回调内取 store，此时 pinia 已就绪，且每次都能拿到最新数据
      const userStore = useUserStore()
      if (!userStore.avaliableButtons.includes(options.value)) {
        el.parentNode?.removeChild(el)
      }
    },
  })
}

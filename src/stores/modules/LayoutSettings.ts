import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
const useLayoutSettings = defineStore('LayoutSettings', () => {
  const isFold = ref(false)
  const iconComponent = computed(() => (isFold.value ? 'Fold' : 'Expand'))
  const refresh = ref(true)
  function ChangeFold() {
    isFold.value = !isFold.value
    
  }
  return {
    isFold,
    iconComponent,
    ChangeFold,
    refresh
  }
})
export default useLayoutSettings

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
const useLayoutSettings = defineStore('LayoutSettings', () => {
  const isFold = ref(false)
  const iconComponent = computed(() => (isFold.value ? 'Fold' : 'Expand'))
  function ChangeFold() {
    isFold.value = !isFold.value
    console.log(isFold.value);
    
  }
  return {
    isFold,
    iconComponent,
    ChangeFold
  }
})
export default useLayoutSettings

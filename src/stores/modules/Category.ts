import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getFirstCategory, getSecondCategory, getThirdCategory } from '@/apis/product/attr'
const useCategoryStore = defineStore('Category', () => {
  const selectFirst = ref<any>()
  const selectSecond = ref<any>()
  const selectThird = ref<any>()
  const C1Id = ref<number | string>('')
  const getFirst = async () => {
    try {
      // 获取分类一数据
      const res = await getFirstCategory()
      console.log(res)

      if (res.code === 200) {
        selectFirst.value = res.data
      } else {
        console.log('error')
      }
    } catch {
      console.log('error1')
    }
  }
  //   返回数据
  return {
    selectFirst,
    selectSecond,
    selectThird,
    C1Id,
    getFirst,
  }
})
export default useCategoryStore

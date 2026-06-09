import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getFirstCategory, getSecondCategory, getThirdCategory } from '@/apis/product/attr'
import type { dataType,ResponseAttrType } from '@/apis/product/attr/type' 
const useCategoryStore = defineStore('Category', () => {
  const selectFirst = ref<dataType[]>()
  const selectSecond = ref<dataType[]>()
  const selectThird = ref<dataType[]>()
  const C1Id = ref<number|string>(1)
  const C2Id = ref<number|string>('')
  const C3Id = ref<number|string>('')
  const getFirst = async () => {
    try {
      // 获取分类一数据
      /* 1.一级菜单变我默认后面都获取第一个 */
      const res = await getFirstCategory()
      // 判断是否正常
      if (res.code === 200) {
        selectFirst.value = res.data
        // console.log(selectFirst.value);
        
        
      } else {
        console.log('error')
      }
    } catch {
      console.log('网络异常')
    }
  }
  const getSecond=async()=>{
    // 二级菜单变化默认三号获取第一个
    try{
      const res=await getSecondCategory(C1Id.value)
      selectSecond.value=res.data
      
    }catch{
      console.log('网络异常');
    }
  }
  const getThird=async()=>{
    try{
      const res=await getThirdCategory(C2Id.value)
      selectThird.value=res.data
      
    }catch{
      console.log('没有id');
      
    }
  }
  //   返回数据
  return {
    selectFirst,
    selectSecond,
    selectThird,
    C1Id,
    C2Id,
    C3Id,
    getFirst,
    getSecond,
    getThird
  }
})
export default useCategoryStore

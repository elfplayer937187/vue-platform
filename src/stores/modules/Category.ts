import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getFirstCategory, getSecondCategory, getThirdCategory } from '@/apis/product/attr'
import type { dataType } from '@/apis/product/attr/type'
const useCategoryStore = defineStore('Category', () => {
  const selectFirst = ref<dataType[]>()
  const selectSecond = ref<dataType[]>()
  const selectThird = ref<dataType[]>()
  const C1Id = ref<number | string>('')
  const C2Id = ref<number | string>('')
  const C3Id = ref<number | string>('')
  // 控制表单是否开启
  const Isdisabled = ref<boolean>(false)
  const getFirst = async () => {
    try {
      // 获取分类一数据
      /* 1.一级菜单变我默认后面都获取第一个 */
      const res = await getFirstCategory()
      console.log('一级菜单',res);
      
      // 判断是否正常
      if (res.code === 200) {
        selectFirst.value = res.data
        // 将第一选项框的值默认为返回数据的第一个(使用category1Id时间戳)
        C1Id.value = (res.data[0] as dataType).category1Id!
        // 打印selectFirst
        // console.log(selectFirst.value);

        await getSecond()
        return 'ok'
      } else {
        throw '获取第一选项框失败'
      }
    } catch {
      throw '网络异常'
    }
  }
  const getSecond = async () => {
    // 二级菜单变化默认三号获取第一个
    try {
      const res = await getSecondCategory(C1Id.value)
      console.log('2级菜单',res);

      selectSecond.value = res.data
      C2Id.value = (res.data[0] as dataType).category2Id!

      await getThird()

      return 'ok'
    } catch {
      throw '网络异常'
    }
  }
  const getThird = async () => {
    try {
      const res = await getThirdCategory(C2Id.value)
      console.log('三级菜单',res);
      
      selectThird.value = res.data
      C3Id.value = (res.data[0] as dataType).category3Id!
      return 'ok'
    } catch {
      throw '没有id'
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
    getThird,
    Isdisabled,
  }
})
export default useCategoryStore

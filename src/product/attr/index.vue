<template>
  <div>
    <Category></Category>
    <!-- 下方的card -->
    <el-card style="margin-top: 10px">
      <div v-show="!showChange">
        <!-- 添加元素按钮 -->
        <el-button type="primary" icon="Plus" style="margin-bottom: 10px" @click="AppendValue"
          >添加元素</el-button
        >
        <el-table style="width: 100%" :border="true" :data="AttrList">
          <el-table-column prop="prop" label="序号" width="80px" align="center" type="index">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="120px" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width" align="center">
            <!-- row:data[i] ,要获取data[i].attrValueList，然后展示valueName-->
            <template #default="{ row }">
              <el-tag
                v-for="value in row.attrValueList"
                :key="value.id"
                type="success"
                class="tagg"
                >{{ value.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="200px" align="center">
            <el-button type="primary" icon="Edit"></el-button>
            <el-button type="primary" icon="Delete"></el-button>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="showChange">
        <!-- 添加元素静态组件 -->
         <el-form ref="form">
             <el-form-item label="属性名称">
              <el-input placeholder="请输入文本" style="width: 300px;" v-model="AppendParams.attrName"></el-input>
             </el-form-item>
             <el-form-item label="">
              <el-button @click="appendAttr" type="primary" class="append-attr" icon="Plus" :disabled="!AppendParams.attrName.trim()">添加属性值</el-button>
              <el-button type="primary" @click="HandleCancel">取消</el-button>
             </el-form-item>
             <el-form-item label="">
                <el-table :data="AppendParams.attrValueList" style="width: 100%" border>
                    <el-table-column prop="prop" label="序号" width="100px" align="center" type="index">
                    </el-table-column>
                    <el-table-column prop="prop" label="属性值" width="width">
                      <template #default="{row}">
                        <el-input v-model="row.valueName" placeholder="请输入属性" class="attr-append"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="prop" label="操作" width="200px" align="center">
                      <el-button type="primary" icon="Edit"></el-button>
                      <el-button type="primary" icon="Delete"></el-button>
                    </el-table-column>
                </el-table>
              <el-form-item label="" class="under-button">
                <el-button type="primary">保存</el-button>
                <el-button >取消</el-button>
              </el-form-item>
             </el-form-item>
         </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import Category from '@/components/Category/index.vue'
import useCategoryStore from '@/stores/modules/Category'
import { watch, ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { getCategoryTag } from '@/apis/product/attr'
import type { ListItemType } from '@/apis/product/attr/type'
const CategoryStore = useCategoryStore()
const { C1Id, C2Id, C3Id,Isdisabled } = storeToRefs(CategoryStore)
// 修改页面是否展示
const showChange = ref<boolean>(false)


// 收集新增数据
/* 
1.没有属性名称要禁用添加符号
2.点击添加属性值
  1.新增一个对象到attrValueList,{属性值名称}
  2.v-for动态渲染table
*/

const AppendParams=reactive<ListItemType>({
  attrName:'',
  categoryId:C3Id.value,
  categoryLevel:3,
  // 初始设定为空数组
  attrValueList:[]
})
// 添加新元素
const appendAttr=()=>{
  AppendParams.attrValueList.push({
    valueName:''
  })
}
// 添加元素显示另一个卡片的点击事件
const AppendValue = () => {
  // 点击切换菜单，并且禁用按钮
  showChange.value = true
  Isdisabled.value=true
}
// 处理取消
const HandleCancel=()=>{
  // 改变视图并且让初始卡片看得见
  showChange.value=false
  Isdisabled.value=false
}
const AttrList = ref<ListItemType[]>([])
// 监视第三项api,如果有一个变了说明列表改变
watch(C3Id, () => {
  // 得到元素，存储到AttrList,然后加载界面
  getAttr()
  // 改变categoryId
  AppendParams.categoryId=C3Id.value
})
// 获取属性值
const getAttr = async () => {
  try {
    // console.log('##',C1Id.value,C2Id.value,C3Id.value);
    const res = await getCategoryTag(C1Id.value, C2Id.value, C3Id.value)
    if (res.code === 200) {
      console.log(res)

      AttrList.value = res.data
    } else {
      throw '响应失败'
    }
    // console.log(res);
  } catch {
    throw '网络异常'
  }
}
</script>

<style scoped lang="scss">
.tagg {
  margin-right: 10px;
}
.under-button{
  margin-top: 10px;
}
.attr-append{
  width: 500px;
}
</style>

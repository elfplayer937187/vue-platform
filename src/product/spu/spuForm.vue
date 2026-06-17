<template>
  <div>
    <el-form ref="form" label-width="80px">
      <!-- 鍚嶇О -->
      <el-form-item label="SPU鍚嶇О">
        <el-input v-model="FormParams.spuName" placeholder="璇疯緭鍏ュ悕锟?></el-input>
      </el-form-item>
      <!-- 鎵€鏈夊搧鐗屾暟锟?-->
      <el-form-item label="SPU鍝佺墝">
        <el-select v-model="FormParams.tmId" placeholder="">
          <el-option
            v-for="data in TradeMarkList"
            :key="data.id"
            :label="data.tmName"
            :value="data.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 鎻忚堪鐨則extarea -->
      <el-form-item label="SPU鎻忚堪">
        <el-input
          v-model="FormParams.description"
          type="textarea"
          placeholder="璇疯緭鍏ヤ綘鐨勬弿锟?.."
        ></el-input>
      </el-form-item>
      <!-- 鐓х墖 -->
      <el-form-item label="SPU鐓х墖">
        <el-upload
          v-model:file-list="FormParams.spuImageList"
          :headers="headers"
          list-type="picture-card"
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
          :before-upload="beforeUpload"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <!-- 鍥剧墖棰勮寮圭獥 -->
        <el-dialog v-model="dialogVisible">
          <img :src="dialogImageUrl" style="width: 100%" alt="" />
        </el-dialog>
      </el-form-item>
      <!-- 閿€鍞睘鎬ч€夋嫨 -->
      <el-form-item label="SPU閿€鍞睘锟? label-width="100px">
        <!-- 閫夋嫨鏈€夋嫨鐨勯攢鍞睘锟?-->
        <el-select
          v-model="UnchosedHasId"
          :placeholder="`杩樻湁${has?.length}椤规湭閫夋嫨`"
          style="width: 300px; margin-right: 40px"
        >
          <el-option
            v-for="PerHas in has"
            :key="PerHas.id"
            :label="PerHas.name"
            :value="PerHas.id"
          ></el-option>
        </el-select>

        <el-button type="primary" icon="Plus" class="SPU-appendbtn" :disabled="!UnchosedHasId" @click="HandleAppendAttr">娣诲姞灞炴€э拷?/el-button>
      </el-form-item>
      <!-- 閿€鍞〃 -->
      <el-form-item label="" label-width="100px">
        <el-table style="width: 100%" border :data="FormParams.spuSaleAttrList">
          <el-table-column prop="prop" label="搴忓彿" width="100px" type="index" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="閿€鍞睘鎬у悕锟? width="width">
            <template #default="{ row }">
              {{ row.saleAttrName }}
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="閿€鍞睘鎬э拷? width="width">
            <template #default="{ row }">
              <el-tag
                v-for="List in row.spuSaleAttrValueList"
                :key="List.id"
                class="SaleAttrTag"
                type="success"
                closable
                >{{ List.saleAttrValueName }}</el-tag
              >
              <el-input :ref="(el: any) => inputEls[row.id] = el" @blur="toEditBlur(row)" v-model="row.inputContent" v-show="row.flag" size="small" placeholder="" style="width: 60px;margin-right: 10px;"></el-input>
              <el-button @click="toEdit(row)" type="primary" icon="Plus" style="height: 25px"></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="鎿嶄綔" width="width">
            <template #default="{ row }">
              <el-button type="danger" icon="Delete" @click="HandleRowDelete(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!-- 鎸夐挳 -->
      <el-form-item label="" label-width="100px">
        <el-button type="primary" @click="SaveLoad">淇濆瓨</el-button>
        <el-button type="primary" @click="HandleCancel">鍙栨秷</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, nextTick } from 'vue'
import type { AttrType, HasType, SPUType, TradeMarkDataType,spuSaleType } from '@/apis/product/spu/type'
import useUserStore from '@/stores/modules/user'
import {
  reqGetAllTradeMark,
  reqGetAllTradeMarkImage,
  reqGetAllTradeMarkAttrList,
  reqGetSPUHas,
  reqAddSPU,
} from '@/apis/product/spu'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import 'element-plus/dist/index.css' // 鍏抽敭锛氬紩鍏ユ墍鏈夌粍浠舵牱锟?

// 瀛樺偍涓€涓婬as
const has = ref<HasType[]>([])
const UnchosedHasId = ref<string | number>('')
// 鑾峰緱token
const headers = { token: useUserStore().token }

// 鍥剧墖棰勮
const dialogVisible = ref(false)
const dialogImageUrl = ref('')
// 瀛樺偍姣忚 el-input 瀹炰緥锛岀敤浜庣偣鍑绘坊鍔犳椂鑷姩鑱氱劍
const inputEls: Record<number, any> = {}

// 涓婁紶鍓嶆牎楠岋細鍙厑璁稿浘鐗囦笖涓嶈秴锟?MB
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const isImage = rawFile.type.startsWith('image/')
  const isLt2M = rawFile.size / 1024 / 1024 < 2
  if (!isImage) {
    ElMessage.error('鍙兘涓婁紶鍥剧墖鏂囦欢锟?)
    return false
  }
  if (!isLt2M) {
    ElMessage.error('鍥剧墖澶у皬涓嶈兘瓒呰繃 2MB锟?)
    return false
  }
  return true
}

// 涓婁紶鎴愬姛鍥炶皟
const handleUploadSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  if (response.code === 200) {
    // 鏈嶅姟鍣ㄨ繑鍥炵殑鍥剧墖鍦板潃璧嬬粰褰撳墠鏂囦欢
    uploadFile.url = response.data
    uploadFile.name = response.data
    ElMessage.success('涓婁紶鎴愬姛')
  } else {
    ElMessage.error('涓婁紶澶辫触')
  }
}

// 鍒犻櫎鍥剧墖鍥炶皟
const handleRemove: UploadProps['onRemove'] = () => {
  // el-upload 锟?v-model:file-list 浼氳嚜鍔ㄤ粠鍒楄〃涓Щ闄わ紝鏃犻渶鎵嬪姩鎿嶄綔
}

// 鍥剧墖棰勮鍥炶皟
const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

// 鏁版嵁澶囦唤
const FormParamsSpace = reactive<SPUType>({
  // 瀛樺偍id
  id: '', //spu鐨刬d
  // 缂栬緫鍒濆锟?
  spuName: '',
  description: '',
  spuImageList: [],
  spuSaleAttrList: null,
  category3Id: -1,
  tmId: '',
})
// 琛ㄦ牸鏁版嵁
const FormParams = reactive<SPUType>({
  // 瀛樺偍id
  id: '', //spu鐨刬d
  // 缂栬緫鍒濆锟?
  spuName: '',
  description: '',
  spuImageList: [],
  spuSaleAttrList: [],
  category3Id: -1,
  tmId: 1,
})
// 娓呴櫎琛ㄦ牸鏁版嵁
const ClearFormParams = () => {
  Object.assign(FormParams, FormParamsSpace)
}
// cancel鎸夐挳浼犵粰鐖剁粍浠朵俊锟?
const $emit = defineEmits(['Canceled', 'changeDisabled'])
const HandleCancel = () => {
  $emit('Canceled', 0)
}
// 鎵€鏈夊搧鐗屾暟锟?
const TradeMarkList = ref<TradeMarkDataType[]>()
// 鑾峰彇灞炴€ц祴鍊肩粰has
const FilterHas = async () => {
  // 鑾峰彇灞炴€鍏变笁绉峕
  const PreHas = await reqGetSPUHas()
  // 杩囨护鍏冪礌璧嬪€肩粰has
  if (FormParams.spuImageList !== null) {
    has.value = PreHas.data.filter((item) => {
      // item:{id,name} name鍦╯puSaleAttrList[i].saleAttrName
      for (let i = 0; i < (FormParams.spuSaleAttrList?.length as number); i++) {
        if (item.name === (FormParams.spuSaleAttrList as any)[i].saleAttrName) {
          return false
        }
      }
      return true
    })
  }
}
// 澶勭悊鐖剁粍浠朵腑缂栬緫浜嬩欢
const initHasSpuData = async (row: SPUType, C3Id: number) => {
  FormParams.category3Id = C3Id
  FormParams.spuName = row.spuName
  FormParams.description = row.description
  FormParams.id = row.id as number
  FormParams.tmId = row.tmId
  const AllTrademark = await reqGetAllTradeMark()
  TradeMarkList.value = AllTrademark.data
  // 鑾峰彇鍥剧墖
  const Images = await reqGetAllTradeMarkImage(FormParams.id)

  FormParams.spuImageList = Images.data.map((item) => {
    return {
      name: item.imgName || item.name,
      url: item.imgUrl || item.url,
    }
  })

  //   鑾峰彇灞炴€у垪锟?
  const PreAttrId = await reqGetAllTradeMarkAttrList(FormParams.id)
  FormParams.spuSaleAttrList = PreAttrId.data
  // 鑾峰彇灞炴€ц祴鍊肩粰has
  await FilterHas()
}

// 淇濆瓨绗簩鐣岄潰鏁版嵁
const SaveLoad = async () => {
  try {
    // 灏嗗浘鐗囧垪琛ㄤ粠 el-upload 鏍煎紡 { name, url } 杞洖鏈嶅姟绔牸锟?{ imgName, imgUrl }
    const params: SPUType = {
      ...FormParams,
      spuImageList: FormParams.spuImageList
        ? FormParams.spuImageList.map((item) => ({
            imgName: (item.name || item.imgName)!,
            imgUrl: (item.url || item.imgUrl)!,
          }))
        : null,
    }
    const res = await reqAddSPU(params)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '淇濆瓨鎴愬姛',
      })
      // 瑙﹀彂浜嬩欢鏀瑰彉瑙嗗浘
      $emit('changeDisabled')
    } else {
      ElMessage({
        type: 'error',
        message: '淇濆瓨澶辫触',
      })
    }
  } catch {
    ElMessage({
      type: 'error',
      message: '缃戠粶寮傚父',
    })
  }
}
// 澶勭悊SPU閿€鍞睘鎬ц〃鍗曟暣琛屽垹锟?
const HandleRowDelete = async(row: AttrType) => {
  ;(FormParams.spuSaleAttrList as any) = FormParams.spuSaleAttrList?.filter((item) => {
    console.log(item.id, row.id)
    return item.id !== row.id
  })
  // 閲嶆柊娓叉煋has
  await FilterHas()
}
// 澶勭悊绗簩鐣岄潰娣诲姞灞炴€у€兼寜锟?
const HandleAppendAttr=async()=>{
  // 鑾峰彇灞炴€d锛屽睘鎬ame,灞炴€ist:鏍规嵁UnchosedHasId鑾峰彇瀵瑰簲has鎷垮埌id,name
  if(UnchosedHasId.value!==''){
    for (let i=0;i<has.value.length;i++){
      if (UnchosedHasId.value===has.value[i]?.id){
        // 璧嬶拷?
        FormParams.spuSaleAttrList.push({
          baseSaleAttrId:UnchosedHasId.value,
          saleAttrName:(has.value[i]?.name as string),
          spuSaleAttrValueList:[]
        })
        break
      }
    }
    // 閲嶆柊璁＄畻灞烇拷?
    await FilterHas()
    // 閲嶆柊璧嬪€奸粯璁d
    if(has.value.length!==0){
      UnchosedHasId.value=(has.value[0]?.id as number)
    }else{
      UnchosedHasId.value=''
    }
  }else{
    alert('璇烽€夋嫨鏂囨湰?鈥?
  }

}
// 澶勭悊缂栬緫椤甸潰tag娣诲姞
const toEdit=async (row:AttrType)=>{
  row.flag=true
  row.inputContent=''
  await nextTick()`n  inputEls[row.id as number]?.focus()`n}
// tag-input澶卞幓鐒︾偣
const toEditBlur=(row:AttrType)=>{
  if(row.inputContent?.trim()){

    // push鍒皊putaglist锟?
    row.spuSaleAttrValueList.push({baseSaleAttrId:row.baseSaleAttrId,saleAttrValueName:(row.inputContent as string)})
  }
  row.flag=false
}
defineExpose({ initHasSpuData, ClearFormParams })
</script>

<style lang="scss" scoped>
.SaleAttrTag {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  margin-right: 20px;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

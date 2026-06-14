<template>
  <div>
    <el-form ref="form" label-width="80px">
        <!-- 名称 -->
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入名称"></el-input>
      </el-form-item>
      <!-- 所有品牌数据 -->
      <el-form-item label="SPU品牌">
        <el-select placeholder="">
          <el-option>222</el-option>
          <el-option>222</el-option>
          <el-option>222</el-option>
          <el-option>222</el-option>
        </el-select>
      </el-form-item>
      <!-- 描述的textarea -->
      <el-form-item label="SPU描述">
        <el-input type="textarea" placeholder="请输入你的描述..."></el-input>
      </el-form-item>
      <!-- 照片 -->
      <el-form-item label="SPU照片">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <!-- 销售属性选择 -->
      <el-form-item label="SPU销售属性" label-width="100px">
        <el-select placeholder="" style="width: 300px;margin-right: 40px;">
            <el-option>hwhw</el-option>
            <el-option>hwhw</el-option>
            <el-option>hwhw</el-option>
        </el-select>
        <el-button type="primary" icon="Plus" class="SPU-appendbtn">添加属性值</el-button>
      </el-form-item>
      <!-- 销售表 -->
      <el-form-item label="" label-width="100px">
        <el-table style="width: 100%" border>
            <el-table-column prop="prop" label="序号" width="width">
            </el-table-column>
            <el-table-column prop="prop" label="销售属性名字" width="width">
            </el-table-column>
            <el-table-column prop="prop" label="销售属性值" width="width">
            </el-table-column>
            <el-table-column prop="prop" label="操作" width="width">
            </el-table-column>
        </el-table>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item label="" label-width="100px">
        <el-button type="primary">保存</el-button>
        <el-button type="primary" @click="HandleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
// cancel按钮传给父组件信息
const $emit=defineEmits(['Canceled'])
const HandleCancel=()=>{
    $emit("Canceled",0)
}


</script>

<style lang="scss" scoped>

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

<template>
  <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="sku名称">
        <el-input placeholder="请输入SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="请输入价格" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input placeholder="请输入重量" type="number"></el-input>
      </el-form-item>
      <el-form-item label="sku描述">
        <el-input type="textarea" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <!-- 平台属性下的select选择框 -->
        <el-form label-width="80px" inline="true">
            <el-form-item label="手机一级">
                <el-select placeholder="">
                    <el-option >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机一级">
                <el-select placeholder="">
                    <el-option >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机一级">
                <el-select placeholder="">
                    <el-option >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机一级">
                <el-select placeholder="">
                    <el-option >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机一级">
                <el-select placeholder="">
                    <el-option >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机一级">
                <el-select placeholder="">
                    <el-option >
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form>
            <el-form-item label="颜色">
                <el-select>
                    <el-option>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
      </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">

</style>
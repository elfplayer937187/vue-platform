<template>
  <div class="tabbar" >
    <div class="tabbar-left">
      <!-- 图标静态 -->
        <el-icon @click="ChangeFold">
            <component :is="iconComponent"></component>
        </el-icon>
      <!-- 左侧面包屑 -->
      <el-breadcrumb separator-icon="ArrowRight" class="bread-crumb">
        <el-breadcrumb-item style="margin-left: 10px">权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>444</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar-right">
      <el-button type="primary" icon="Refresh" circle></el-button>
      <el-button type="primary" icon="FullScreen" circle></el-button>
      <el-button type="primary" icon="Setting" circle></el-button>
      <span class="el-dropdown-link">
        <img src="../../../public/logo.png" style="width: 24px; height: 24px;margin:0 10px" alt="" />
      </span>    
      <el-dropdown>
        <span class="el-dropdown-link">
          Dropdown List
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import useLayoutSettings from '@/stores/modules/LayoutSettings'

const layoutSettings = useLayoutSettings()
const { isFold,iconComponent } = storeToRefs(layoutSettings)
const {ChangeFold}=layoutSettings
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: $base-menu-topheight;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 1s;
  .tabbar-left {
    margin-left: 20px;
    display: flex;
    .fold-icon {
      cursor: pointer;
      margin-right: 20px;
    }
  }
  .tabbar-right{
    display: flex;
    align-items: center;
  }
}
</style>

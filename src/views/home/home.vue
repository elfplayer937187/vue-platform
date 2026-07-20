<!-- layout下默认二级组件 -->
<template>
  <el-card class="card">
    <el-image style="width: 100px; height: 100px" :src="avatar" class="card-avartar"></el-image>
    <div class="right-text">
      <h3>{{ getTime() }},{{ username }}</h3>
      <p>硅谷甄选运营平台</p>
    </div>
  </el-card>
  <div class="welcome">
    <svg-icon name="welcome" width="500px" height="500px" class="welcome"></svg-icon>
  </div>
</template>

<script lang="ts" setup>
//  挂载时获取用户信息
import useUserStore from '@/stores/modules/user';
import { storeToRefs } from 'pinia';
import { getTime } from '@/utils/time';
const UserStore=useUserStore()
const {avatar,username}=storeToRefs(UserStore)
</script>

<style scoped lang="scss">
.el-card{
  :deep(.el-card__body){
    display: flex;
  }
  :deep(.el-image__inner){
    border-radius: 50%;
  }
  .right-text{
    margin-left: 20px;
    position: relative;
    p{
      position: absolute;
      bottom: 10%;
      width: 200px;
      font-style: italic;
      font-size: 12px;
      color: gray;
      
    }
    h3{
      position: absolute;
      bottom: 50%;
      width: 200px;
      font-weight: 800;
      font-size: 20px;
    }
  }
}
.welcome{
  display: flex;
  justify-content: center;
}


</style>

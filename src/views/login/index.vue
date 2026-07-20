<template>
  <div class="login_container">
    <el-row>
      <!-- 占一半 -->
      <!-- :xs小于768的占位栅格数 -->
      <el-col :span="12" :xs="0">1</el-col>

      <el-col :span="12" :xs="24">
        <!-- 右侧表单 -->
        <el-form ref="LoginRule" class="login_form" :rules="rules" :model="LoginForm">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选！</h2>
          <el-form-item prop="username">
            <!-- 输入框 -->
            <el-input
              v-model="LoginForm.username"
              type="text"
              :prefix-icon="User"
              placeholder="admin"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <!-- 密码框 -->
            <el-input
              v-model="LoginForm.password"
              type="password"
              :prefix-icon="Lock"
              placeholder="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" :loading="isloading" @click="login">submit</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import useUserStore from '@/stores/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
import { useRoute } from 'vue-router'
// 手动导入 ElNotification 的样式（函数式调用不会被 unplugin 自动加载）
import 'element-plus/es/components/notification/style/css'
// 引入用户仓库
const useUser = useUserStore()
const router = useRouter()
// 处理登录加载
const isloading = ref(false)
// 初始化用户数据
const LoginForm = reactive({
  username: '',
  password: '',
})
// 登录时段
const hour = getTime()
// 获取ref
const LoginRule = ref()
// 获取route的query参数并且跳转
const $router = useRoute()
const path: any = $router.query.redirect
// 处理登录
const login = async () => {
  // 当所有表单校验成功再发请求
  // 保证表单校验完成再发请求
  await LoginRule.value.validate()
  // 点击登录请求
  // 给仓库发送登路请求
  isloading.value = true
  try {
    // 获取用户token和姓名
    await useUser.loginUser(LoginForm)
    await useUser.GetUserInfo()

    router.push({ path: path || '/' })
    ElNotification({
      title: `Hi,${hour}`,
      type: 'success',
      message: '欢迎回来！',
    })
  } catch (error) {
    // console.dir(error)
    ElNotification({
      title: '登录失败',
      type: 'error',
      message: error as string,
    })
  }
  isloading.value = false
}
function CheckUsername(rule: any, value: string, callback: (error?: string | Error) => void) {
  if (!(value.length > 4 && value.length < 12)) {
    callback(new Error('长度必须大于4小于12'))
  } else {
    callback()
  }
}
// 校验文本规则
const rules = {
  username: [{ required: true, validator: CheckUsername }],
  password: [
    { required: true, min: 6, max: 12, message: '密码长度必须大于5或者小于13!', trigger: 'change' },
  ],
}
</script>

<style scoped lang="scss" scope>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    padding: 2vh 4vh 2vh;
    position: relative;
    top: 30vh;
    background-image: url('@/assets/images/login_form.png');
    h1 {
      font-size: 7vh;
      margin: 1vh 1vh 1vh;
      color: white;
    }
    h2 {
      font-size: 4vh;
      color: white;
      margin-bottom: 1vh;
    }
    el-form-item {
      margin: 0 2vh;
    }
  }
}
</style>

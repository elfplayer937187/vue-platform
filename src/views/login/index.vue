<template>
  <div class="login_container">
    <!-- 左侧品牌区 -->
    <div class="login-left">
      <div class="brand-content">
        <h1 class="brand-title">硅谷甄选</h1>
        <p class="brand-slogan">高效 · 智能 · 值得信赖</p>
      </div>
    </div>

    <!-- 右侧表单区 -->
    <div class="login-right">
      <div class="form-card">
        <h2 class="form-title">欢迎回来</h2>
        <p class="form-subtitle">请登录您的账号</p>
        <el-form ref="LoginRule" :rules="rules" :model="LoginForm">
          <el-form-item prop="username">
            <el-input
              v-model="LoginForm.username"
              :prefix-icon="User"
              placeholder="请输入用户名"
              size="large"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="LoginForm.password"
              type="password"
              :prefix-icon="Lock"
              placeholder="请输入密码"
              show-password
              size="large"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="isloading"
              size="large"
              class="login-btn"
              @click="login"
            >
              登 录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
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
const pathName: any = $router.query.redirect
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
    const rawRouteNames = useUser.RawRoutesName
    const IsPathExist = rawRouteNames.some((name) => {
      return name === pathName
    })
    // 查看这个角色这个路径是否拥有这个路径
    if (!IsPathExist) {
      router.push({ name: 'home' })
    } else {
      router.push({ name: pathName || 'home' })
    }
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

<style scoped lang="scss">
.login_container {
  display: flex;
  width: 100%;
  height: 100vh;
}

// ========== 左侧品牌区 ==========
.login-left {
  flex: 5;
  background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #3b82f6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  // 装饰圆形
  &::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    top: -100px;
    right: -100px;
  }
  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.04);
    bottom: -80px;
    left: -60px;
  }
}

.brand-content {
  text-align: center;
  color: #fff;
  position: relative;
  z-index: 1;
}

.brand-title {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 8px;
  margin: 0 0 16px;
}

.brand-slogan {
  font-size: 18px;
  letter-spacing: 6px;
  opacity: 0.75;
  margin: 0;
}

// ========== 右侧表单区 ==========
.login-right {
  flex: 4;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-card {
  width: 420px;
  max-width: 90%;
  padding: 48px 40px 36px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
}

.form-title {
  font-size: 28px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px;
}

.form-subtitle {
  font-size: 14px;
  color: #94a3b8;
  margin: 0 0 32px;
}

.login-btn {
  width: 100%;
}

// ========== 移动端适配 ==========
@media (max-width: 768px) {
  .login-left {
    display: none;
  }

  .login-right {
    flex: 1;
  }

  .form-card {
    padding: 32px 24px 24px;
  }
}
</style>

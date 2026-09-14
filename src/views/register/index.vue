<template>
  <div class="register_container">
    <!-- 左侧品牌区 -->
    <BrandPanel />

    <!-- 右侧表单区 -->
    <div class="register-right">
      <div class="form-card">
        <h2 class="form-title">创建账号</h2>
        <p class="form-subtitle">填写以下信息完成注册</p>
        <el-form ref="RegisterRule" :rules="rules" :model="RegisterForm" label-width="0">
          <el-form-item prop="username">
            <el-input
              v-model="RegisterForm.username"
              :prefix-icon="User"
              placeholder="请输入用户名"
              size="large"
            ></el-input>
          </el-form-item>
          <el-form-item prop="name">
            <el-input
              v-model="RegisterForm.name"
              :prefix-icon="Avatar"
              placeholder="请输入姓名"
              size="large"
            ></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input
              v-model="RegisterForm.phone"
              :prefix-icon="Iphone"
              placeholder="请输入手机号"
              maxlength="11"
              size="large"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="RegisterForm.password"
              type="password"
              :prefix-icon="Lock"
              placeholder="请输入密码"
              show-password
              size="large"
            ></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input
              v-model="RegisterForm.confirmPassword"
              type="password"
              :prefix-icon="Lock"
              placeholder="请再次输入密码"
              show-password
              size="large"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="isloading"
              size="large"
              class="register-btn"
              @click="HandleRegister"
            >
              注 册
            </el-button>
          </el-form-item>
        </el-form>
        <div class="form-footer">
          <span class="footer-text">已有账号？</span>
          <router-link class="footer-link" to="/login">返回登录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User, Avatar, Lock, Iphone } from '@element-plus/icons-vue'
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { reqRegister } from '@/apis/auth'
import BrandPanel from '@/components/BrandPanel/index.vue'
// 手动导入 ElNotification 的样式（函数式调用不会被 unplugin 自动加载）
import 'element-plus/es/components/notification/style/css'

const router = useRouter()
// 处理注册加载
const isloading = ref(false)
// 获取ref
const RegisterRule = ref()
// 初始化注册数据
const RegisterForm = reactive({
  username: '',
  name: '',
  phone: '',
  password: '',
  confirmPassword: '',
})

// 校验用户名：长度必须大于2小于20
function CheckUsername(rule: any, value: string, callback: (error?: string | Error) => void) {
  if (!(value.length > 2 && value.length < 20)) {
    callback(new Error('长度必须大于2小于20'))
  } else {
    callback()
  }
}

// 校验确认密码是否与密码一致
function CheckConfirmPassword(
  rule: any,
  value: string,
  callback: (error?: string | Error) => void,
) {
  if (value !== RegisterForm.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

// 校验手机号
function CheckPhone(rule: any, value: string, callback: (error?: string | Error) => void) {
  if (!/^1[3-9]\d{9}$/.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

// 校验文本规则
const rules = {
  username: [{ required: true, validator: CheckUsername, trigger: 'blur' }],
  name: [
    {
      required: true,
      min: 2,
      max: 20,
      message: '姓名长度必须大于2或者小于20!',
      trigger: 'blur',
    },
  ],
  phone: [{ required: true, validator: CheckPhone, trigger: 'blur' }],
  password: [
    { required: true, min: 2, max: 20, message: '密码长度必须大于2或者小于20!', trigger: 'change' },
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'change' },
    { validator: CheckConfirmPassword, trigger: ['blur', 'change'] },
  ],
}

// 密码变化时同步校验确认密码，避免先填确认密码再改密码导致校验结果过期
watch(
  () => RegisterForm.password,
  () => {
    if (RegisterForm.confirmPassword) {
      RegisterRule.value?.validateField('confirmPassword')
    }
  },
)

// 处理注册
const HandleRegister = async () => {
  // 保证表单校验完成再发请求
  await RegisterRule.value.validate()
  isloading.value = true
  try {
    await reqRegister({
      username: RegisterForm.username,
      name: RegisterForm.name,
      password: RegisterForm.password,
      confirmPassword: RegisterForm.confirmPassword,
      phone: RegisterForm.phone,
    })
    ElNotification({
      title: '注册成功',
      type: 'success',
      message: '请使用新账号登录',
    })
    router.push({ path: '/login' })
  } catch (error) {
    ElNotification({
      title: '注册失败',
      type: 'error',
      message: error as string,
    })
  }
  isloading.value = false
}
</script>

<style scoped lang="scss">
.register_container {
  display: flex;
  width: 100%;
  height: 100vh;
}

// ========== 右侧表单区 ==========
.register-right {
  flex: 4;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  // 字段较多，小屏时允许滚动
  overflow-y: auto;
  padding: 40px 0;
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

.register-btn {
  width: 100%;
}

.form-footer {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}

.footer-text {
  color: #94a3b8;
}

.footer-link {
  color: #4f83c4;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
}

// ========== 移动端适配 ==========
@media (max-width: 768px) {
  .register-right {
    flex: 1;
  }

  .form-card {
    padding: 32px 24px 24px;
  }
}
</style>

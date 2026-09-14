// 配置全局路由守卫
// 使用静态插件实现进度条
import { router } from '@/router/index'
import nprogress from 'nprogress'
import useUserStore from '@/stores/modules/user'
import 'nprogress/nprogress.css'
// 前置守卫
/* 
    to:目标路由
    from:起始路由
    next:放行函数
*/
nprogress.configure({ showSpinner: false })
// 无需登录即可访问的白名单
const WhiteList = ['/login', '/register']
router.beforeEach(async (to: any, from: any, next: any) => {
  // 设置标题
  document.title = `${import.meta.env.VITE_APP_TITLE}-${to.meta.title}`
  // 初始化获取token来判断是否能登录
  nprogress.start()
  const UserStore = useUserStore()
  const token = UserStore.token
  const username = UserStore.username

  if (token) {
    if (WhiteList.includes(to.path)) {
      next({ path: '/' })
    } else {
      // 成功放行否则获取用户信息
      if (username) {
        next()
      } else {
        try {
          await UserStore.GetUserInfo()
          // 只传 path + query，不传 name/params（to 携带的是 catch-all 的 name，
          // 会导致 next() 按 name 解析又命中 catch-all，动态路由白加了）
          next({ path: to.path, query: to.query })
        } catch (error) {
          // token过期和用户手动修改token->退出登录并且清除信息，跳转到登录页
          UserStore.userLogout()
          next({ path: '/login', query: { redirect: to.name } })
        }
      }
    }
  } else {
    if (WhiteList.includes(to.path)) {
      next()
    } else {
      // 没有token重定向到login,并且把没去成的路径传给login
      next({ path: '/login', query: { redirect: to.name } })
    }
  }
})
// 后置钩子
router.afterEach((to: any, after: any) => {
  nprogress.done()
})

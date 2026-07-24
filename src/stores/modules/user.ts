import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/apis/user'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { ConstedRoutes, AsyncRoutes, router } from '@/router/index'
import type { RouterType } from './types/RouterType'
import type { LoginType } from '@/apis/user/type'
// 引入深拷贝
import { cloneDeep } from 'lodash'
// import {} from
const useUserStore = defineStore('User', {
  // 数据
  state(): RouterType {
    return {
      // 持久化存储
      token: GET_TOKEN(),
      menuRouter: ConstedRoutes,
      username: '',
      avatar: '',
      avaliableButtons: [],
    }
  },
  actions: {
    getUserAllRoutes(AsyncRoutes: any, HasedRoutes: string[]) {
      if (!AsyncRoutes || AsyncRoutes.length === 0) {
        return null
      }
      return AsyncRoutes.filter((Route: any) => {
        if (HasedRoutes.includes(Route.name)) {
          Route.children = this.getUserAllRoutes(Route.children, HasedRoutes)
          return true
        }
      })
    },
    // 用户登录
    async loginUser(LoginForm: LoginType) {
      const resp = await reqLogin(LoginForm)
      // 成功就记录token
      // console.log(resp);

      if (resp.code === 200) {
        this.token = resp.data
        SET_TOKEN(this.token)
        // console.log(this.token);

        return '成功'
      } else {
        throw '登录失败'
        // 等价于 Promise.reject('resp.data.message')
      }
    },
    // 获取用户信息并存储在仓库
    async GetUserInfo() {
      const res = await reqUserInfo()
      if (res.code === 200) {
        this.username = res.data.name
        this.avatar = res.data.avatar
        this.avaliableButtons = res.data.buttons
        console.log(this.avaliableButtons)

        const MyAsyncRoutes = this.getUserAllRoutes(cloneDeep(AsyncRoutes), res.data.routes) || []
        // console.log(MyAsyncRoutes);
        MyAsyncRoutes.forEach((Route: any) => {
          router.addRoute(Route)
        })
        // 合并常量路由和动态路由，赋给 menuRouter 用于菜单渲染
        this.menuRouter = [...ConstedRoutes.filter((r) => r.name !== 'unknown'), ...MyAsyncRoutes]

        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败')
      }
    },
    // 退出登录
    userLogout() {
      this.token = ''
      this.avatar = ''
      this.username = ''
      // 删除TOKEN
      REMOVE_TOKEN()
      //
    },
  },
  getters: {},
})
export default useUserStore

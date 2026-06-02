import { defineStore } from 'pinia'
import { reqLogin } from '@/apis/user'
import type { LoginType } from '@/apis/user/type'
import type { UserState } from './types/user'
import {SET_TOKEN,GET_TOKEN}from '@/utils/token'
import router from '@/router/index'
import type { RouterType } from './types/RouterType'
const useUserStore = defineStore('User', {
  // 数据
  state():RouterType {
    return {
        // 持久化存储
        token:GET_TOKEN()||'',
        menuRouter:router
    }
  },
  actions: {
    // 用户登录
    async loginUser(LoginForm: LoginType) {
      
        const resp = await reqLogin(LoginForm)
        // 成功就记录token
        
        
        if(resp.code===200){
            this.token=(resp.data.token as string)
            SET_TOKEN(this.token)
            return '成功'
        }else{
          throw resp.data.message
          // 等价于 Promise.reject('resp.data.message')
        }
      
    },
  },
  getters: {},
})
export default useUserStore

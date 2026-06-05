import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/apis/user'
import type { LoginType } from '@/apis/user/type'
import {SET_TOKEN,GET_TOKEN,REMOVE_TOKEN}from '@/utils/token'
import router from '@/router/index'
import type { RouterType } from './types/RouterType'
import {ref} from 'vue'
const useUserStore = defineStore('User', {
  // 数据
  state():RouterType {
    return {
        // 持久化存储
        token:GET_TOKEN(),
        menuRouter:router,
        username:'',
        avatar:'',
    }
  },
  actions: {
    // 用户登录
    async loginUser(LoginForm: any) {
      
        const resp = await reqLogin(LoginForm)
        // 成功就记录token
        
        // console.log(resp);
        
        if(resp.code===200){
            this.token=(resp.data as string)
            SET_TOKEN(this.token)
            // console.log(this.token);
            
            return '成功'
        }else{
          throw resp.data.message
          // 等价于 Promise.reject('resp.data.message')
        }
      
    },
    // 获取用户信息并存储在仓库
    async GetUserInfo(){
        console.trace('GetUserInfo 调用来源')
        const res=await reqUserInfo()
        
        if(res.code===200){
          this.username=res.data.name
          this.avatar=res.data.avatar
          return 'ok'
        }else{
          return Promise.reject('获取用户信息失败')
        }
      
      },
    // 退出登录
    userLogout(){
      this.token=''
      this.avatar=''
      this.username=''
      // 删除TOKEN
      REMOVE_TOKEN()
      // 
      
    }
  },
  getters: {},
})
export default useUserStore

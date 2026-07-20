import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 登录一级路由
    {
      path: '/login',
      // 懒加载
      component: () => import('@/views/login/index.vue'),
      name: 'login',
      meta: {
        title: '登录',
        IsShow: true,
        Icon: 'User',
      },
    },
    // 首页一级路由
    {
      path: '',
      component: () => import('@/layout/index.vue'),
      name: 'layout',
      meta: {
        title: '首页',
        IsShow: true,
        Icon: 'HomeFilled',
      },
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/home.vue'),
          meta: {
            title: '首页',
            IsShow: false,
            Icon: 'HomeFilled',
          },
        },
      ],
    },
    // 大屏幕展示一级路由
    {
      path: '/screen',
      component: () => import('@/views/screen/index.vue'),
      name: 'screen',
      meta: {
        title: '数据展示',
        IsShow: true,
        Icon: 'Monitor',
      },
    },
    // 404
    {
      path: '/404',
      component: () => import('@/views/404/404.vue'),
      name: 'unknown',
      meta: {
        title: '404页',
        IsShow: false,
        Icon: 'WarningFilled',
      },
    },
    // 任意路由
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      meta: {
        title: 'any',
        hiddren: false,
      },
    },
    // Acl一级路由，权限管理
    {
      path: '/acl',
      component: () => import('@/layout/index.vue'),
      name: 'Acl',
      meta: {
        title: '权限管理',
        IsShow: true,
        Icon: 'Lock',
      },
      redirect: '/acl/user',
      children: [
        {
          path: '/acl/user',
          component: () => import('@/views/acl/user/index.vue'),
          name: 'user',
          meta: {
            title: '用户管理',
            IsShow: true,
            Icon: 'User',
          },
        },
        {
          path: '/acl/role',
          component: () => import('@/views/acl/role/index.vue'),
          name: 'role',
          meta: {
            title: '角色管理',
            IsShow: true,
            Icon: 'Avatar',
          },
        },
        {
          path: '/acl/Permisson',
          component: () => import('@/views/acl/Permission/index.vue'),
          name: 'Permisson',
          meta: {
            title: '菜单管理',
            IsShow: true,
            Icon: 'Menu',
          },
        },
      ],
    },
    // product一级路由
    {
      path: '/Product',
      component: () => import('@/layout/index.vue'),
      name: 'Product',
      meta: {
        title: '商品管理',
        IsShow: true,
        Icon: 'Goods',
      },
      redirect: '/Product/attr',
      children: [
        {
          path: '/Product/attr',
          component: () => import('@/product/attr/index.vue'),
          name: 'attr',
          meta: {
            title: '属性管理',
            IsShow: true,
            Icon: 'Setting',
          },
        },
        {
          path: '/Product/sku',
          component: () => import('@/product/sku/index.vue'),
          name: 'sku',
          meta: {
            title: 'sku管理',
            IsShow: true,
            Icon: 'Box',
          },
        },
        {
          path: '/Product/spu',
          component: () => import('@/product/spu/index.vue'),
          name: 'spu',
          meta: {
            title: 'spu管理',
            IsShow: true,
            Icon: 'Document',
          },
        },
        {
          path: '/Product/trademark',
          component: () => import('@/product/trademark/index.vue'),
          name: 'trademark',
          meta: {
            title: '品牌管理',
            IsShow: true,
            Icon: 'Stamp',
          },
        },
      ],
    },
  ],
})

export default router

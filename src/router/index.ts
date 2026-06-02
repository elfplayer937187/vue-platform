import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 一级路由
    {
      path: '/login',
      // 懒加载
      component: () => import('@/views/login/index.vue'),
      name: 'login',
      meta: {
        title: '登录',
        IsShow: true,
      },
    },
    {
      path: '',
      component: () => import('@/layout/index.vue'),
      name: 'home',
      meta: {
        title: '首页',
        IsShow: true,
      },
      children: [
        {
          path: 'Coda',
          name: 'Coda',
          component: () => import('@/layout/secRouter/Coda.vue'),
          meta: {
            title: '二级叩打',
            IsShow: true,
          },
        },
        {
          path: 'News',
          name: 'News',
          component: () => import('@/layout/secRouter/News.vue'),
          meta: {
            title: '二级新闻',
            IsShow: true,
          },
          children: [
            {
              path: 'thr1',
              name: 'thr1',
              component: () => import('@/layout/secRouter/thrRouter/thr1.vue'),
              meta: {
                title: '三级thr1',
                IsShow: true,
              },
            },
            {
              path: 'thr2',
              name: 'thr2',
              component: () => import('@/layout/secRouter/thrRouter/thr2.vue'),
              meta: {
                title: '三级thr2',
                IsShow: true,
              },
            },
          ],
        },
      ],
    },
    {
      path: '/404',
      component: () => import('@/views/404/404.vue'),
      name: 'unknown',
      meta: {
        title: '404页',
        IsShow: false,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      meta: {
        title: 'any',
        hiddren: false,
      },
    },
  ],
})

export default router

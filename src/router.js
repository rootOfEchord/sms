import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/login' //根路径重定向到登录页面
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
      children: [{
          path: '/',
          component: () => import('@/views/page/goods_echarts.vue'),
          meta: [],
        },
        {
          path: 'addAccount',
          component: () => import('@/views/page/add_account.vue'),
          meta: ['账号管理', '添加账号'],
        },
        {
          path: 'listAccount',
          component: () => import('@/views/page/list_account.vue'),
          meta: ['账号管理', '管理账号'],
        },
        {
          path: 'editAccount',
          component: () => import('@/views/page/edit_account.vue'),
          meta: ['账号管理', '修改密码'],
        }
      ]

    }
  ]
})
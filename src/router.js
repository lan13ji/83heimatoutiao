import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Login from './views/login'
import Main from './views/home/main'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [{
      path: '/',
      component: Main
    }, {
      // 内容列表路由
      path: 'articles',
      component: () => import('./views/articles')
    }, {
      // 评论列表路由
      path: 'comment',
      component: () => import('./views/comment')
    }, {
      // 素材管理路由
      path: 'material',
      component: () => import('./views/material')
    }]
  },
  {
    path: '/login',
    component: Login
  }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

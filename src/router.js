import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Login from './views/login'
import Main from './views/home/main'

// 在使用Element UI 时点击同一个路由，控制台报错，但不影响使用
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '*',
    component: () => import('./views/404')
    // 匹配任何地址，但是如果其他的可以匹配 优先匹配其他 否则匹配该组件
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
    }, {
      // 发布文章路由
      path: 'publish',
      component: () => import('./views/publish')
    }, {
      //  修改文章路由
      path: 'publish/:articleId',
      component: () => import('./views/publish')
    }, {
      //  用户信息路由
      path: 'account',
      component: () => import('./views/account')
    }, {
      //  用户信息路由
      path: 'grapData',
      component: () => import('./views/grapData')
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

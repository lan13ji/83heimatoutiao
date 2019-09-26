import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 全局前置守卫
router.beforeEach(function (to, from, next) {
  // 开启进度条
  nprogress.start()
  // 判断拦截的范围
  if (to.path.startsWith('/home')) {
    // 进入拦截范围
    // 判断是否登录 有 token 就登录， 没 token就去登录
    let token = window.localStorage.getItem('user-token') // 获取token
    token ? next() : next('/login')
  } else {
    next()
  }
})
router.afterEach(function () {
  nprogress.done()
})
export default router

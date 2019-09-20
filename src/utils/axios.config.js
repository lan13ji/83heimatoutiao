// 负责对axios进行处理
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token') // 获取token
  // 统一注入token 到 headers 属性 因为所有的token 格式一样
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})
export default axios
/* export default {
  install (Vue) {
    Vue.prototype.$axios = axios
  }
} */

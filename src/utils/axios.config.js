// 负责对axios进行处理
import axios from 'axios'
// 为什么不能用this.$router？
/* 原来的this指向vue实例 */

//
import {
  Message
} from 'element-ui'

import router from '../permission'
import jsonBig from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [function (data) {
  // jsonBig 转换方法 使得 计算更精确
  return data ? jsonBig.parse(data) : data
}]
// 请求拦截
axios.interceptors.request.use(function (config) {
  // 在发起请求是做一些业务处理
  // config 是要发送请求的配置信息
  let token = window.localStorage.getItem('user-token') // 获取token
  // 统一注入token 到 headers 属性 因为所有的token 格式一样
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})

// 响应拦截 响应数据回来，到达then方法之前
axios.interceptors.response.use(function (response) {
  // 对响应数据做处理 执行成功是进入
  return response.data ? response.data : {}
}, function (error) {
  let status = error.response.status
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token 未携带或已过期'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未出'
      router.push('/login')
      break
    default:
      break
  }
  // 希望在异常处理函数中将所有的错误都处理完毕，不再进入catch 终止错误
  Message({
    message
  })
  return new Promise(function () {}) // 终止进入catch
})
export default axios
// 第二种方法
/* export default {
  install (Vue) {
    Vue.prototype.$axios = axios
  }
} */

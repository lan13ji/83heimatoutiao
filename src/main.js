import Vue from 'vue'
import App from './App.vue'
import router from './permission'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式

// 引入插件对象
import Component from './components/index'
import './styles/index.less'

// 第一种方法，第二种不需要此行
import axios from './utils/axios.config'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Component)
// 第二种方法
// Vue.use(axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

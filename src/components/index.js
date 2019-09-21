import layoutAside from './home/layout-aside'
import layoutHeade from './home/layout-header'
import breadCrumb from './common/bread-crumb'
export default {
  // 调用install的时候传入了Vue
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-heade', layoutHeade)
    Vue.component('bread-crumb', breadCrumb)
  }
}

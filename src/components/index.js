import layoutAside from './home/layout-aside'
import layoutHeade from './home/layout-header'
import breadCrumb from './common/bread-crumb'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

import coverImage from './publish/cover-image'

export default {
  // 调用install的时候传入了Vue
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-heade', layoutHeade)
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-image', coverImage)
  }
}

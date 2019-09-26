import axios from '../utils/axios.config'
import API from '../constant/api'
// 存放文章的所有接口的模块
export function getArticles (params) {
  return axios({
    url: API.API_ARTICLES,
    params
  })
}
export function getChannels () {
  return axios({
    url: API.API_CHANNELS
  })
}
export function delArticles (id) {
  return axios({
    url: `/${API.API_ARTICLES}/${id.toString()}`,
    method: 'DELETE'
  })
}
// 可以共存
// export default {}
// 共存时调用方法,在哪里调用就在哪里写
// obj 代表 default 的{}
// import obj, {getArticles} from '../api/articles'

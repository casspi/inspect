import axios from 'axios'
import { Toast } from 'vant'
import router from '../router'
console.log(process.env)
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://121.37.185.29:12021' : 'http://96166.xiaomy.net'
axios.defaults.withCredentials = true
axios.defaults.timeout = 5000;
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers['Authorization'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.response.use((res) => {
  console.log(res)
  console.log(typeof res.data)
  if (res.config.responseType == "blob") {//图片流
    return res
  }
  if (typeof res !== 'object') {
    Toast.fail('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.code != 200) {
    if (res.data.code == 401) {
      Toast.fail('该功能需要您先登录！')
      router.replace({ path: '/login' })
      return Promise.reject(res.data)
    }
    if (res.data.msg) Toast.fail(res.data.msg)
    return Promise.reject(res.data)
  }

  return res.data
},res => {
  console.log(res)
})

export default axios

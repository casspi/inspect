import axios from 'axios'
import { Toast } from 'vant'
import router from '../router'
console.log(process.env)
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'https://96166.xiaomy.net' : 'https://gzh.huichangyx.com/prod-api/'
axios.defaults.withCredentials = true
axios.defaults.timeout = 5000;
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use((config)=>{
    config.headers['Authorization'] = localStorage.getItem('token') || ''
    return config
}, (error) => {
  return Promise.reject(error)
})
axios.interceptors.response.use((res) => {
  if (res.config.responseType == "blob") {//图片流
    return res
  }
  if (typeof res !== 'object') {
    Toast.fail('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.code != 200) {
    if (res.data.code == 401) {
      localStorage.removeItem("token");
      Toast.fail('需要您先登录！')
      router.replace({ path: '/login' })
      return Promise.reject(res.data)
    }
    // if (res.data.msg) Toast.fail(res.data.msg)
    return Promise.reject(res.data)
  }
  return res.data
},error => {
  return Promise.reject(error)

})

export default axios

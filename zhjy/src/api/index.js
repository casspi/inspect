import axios from '../utils/axios'

//微信授权登录
export function wxLogin() {
  return axios.get('/wx/login');
}
// 微信授权回调
export function wxCallback(params) {
  return axios.get('/wx/callBack', {params});
}
// 检验项目列表
export function getCheckList() {
  return axios.get('/inspect/list');
}
//医生推荐
export function getRecommend(params) {
  return axios.get('/recommend/listPage', {params})
}
// 预支付接口 id 为 订单主键，orderNumber 为订单编号
export function prePay(params) {
  return axios.get('/pay/toPay/'+params.id+'/'+params.orderNumber)
}
// 提示
export function getPrompt() {
  return axios.get('/notice/getPrompt')
}
import axios from '../utils/axios'

// 创建订单
export function createOrder(params) {
  return axios.post('/order/create', params);
}
// /order/myPage
// 我的订单
export function getOrderList(params) {
  console.log(params)
  return axios.get('/order/myPage', { params })
}
//订单详情
export function getOrderDetail(params) {
  console.log(params)
  return axios.get('/order/getInfo', { params })
}

//取消订单
export function cancelOrder(params) {
  console.log(params)
  return axios.post('/order/cancelOrder', params)
}

//退款
export function refund(params) {
  console.log(params)
  return axios.post('/pay/refund', params)
}

//退款申请
export function cancelApply(params) {
  console.log(params)
  return axios.post('/order/cancelApply', params)
}

//检验结果
export function getResult(id) {
  return axios.get('/order/getResult?itemId='+id)
}

export function saveBarcode(params) {
  return axios.post('/order/saveBarcode', params)
}
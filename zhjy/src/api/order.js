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
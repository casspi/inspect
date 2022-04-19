import request from '@/utils/request'

// 查询订单条目列表
export function listOrderItem(query) {
  return request({
    url: '/order/orderItem/list',
    method: 'get',
    params: query
  })
}

// 查询订单条目详细
export function getOrderItem(id) {
  return request({
    url: '/order/orderItem/getInfo/' + id,
    method: 'get'
  })
}

// 新增订单条目
export function addOrderItem(data) {
  return request({
    url: '/order/orderItem/add',
    method: 'post',
    data: data
  })
}

// 修改订单条目
export function updateOrderItem(data) {
  return request({
    url: '/order/orderItem/edit',
    method: 'put',
    data: data
  })
}

// 删除订单条目
export function delOrderItem(id) {
  return request({
    url: '/order/orderItem/del/' + id,
    method: 'delete'
  })
}

// 导出订单条目
export function exportOrderItem(query) {
  return request({
    url: '/order/orderItem/export',
    method: 'get',
    params: query
  })
}

// 保存检验结果
export function saveResult(data) {
  return request({
    url: '/order/order/saveResult',
    method: 'post',
    data: data
  })
}
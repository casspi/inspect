import request from '@/utils/request'

// 查询订单检验结果列表
export function listOrderInspectionResult(query) {
  return request({
    url: '/order/orderInspectionResult/list',
    method: 'get',
    params: query
  })
}

// 查询订单检验结果详细
export function getOrderInspectionResult(id) {
  return request({
    url: '/order/orderInspectionResult/getInfo/' + id,
    method: 'get'
  })
}

// 新增订单检验结果
export function addOrderInspectionResult(data) {
  return request({
    url: '/order/orderInspectionResult/add',
    method: 'post',
    data: data
  })
}

// 修改订单检验结果
export function updateOrderInspectionResult(data) {
  return request({
    url: '/order/orderInspectionResult/edit',
    method: 'put',
    data: data
  })
}

// 删除订单检验结果
export function delOrderInspectionResult(id) {
  return request({
    url: '/order/orderInspectionResult/del/' + id,
    method: 'delete'
  })
}

// 导出订单检验结果
export function exportOrderInspectionResult(query) {
  return request({
    url: '/order/orderInspectionResult/export',
    method: 'get',
    params: query
  })
}
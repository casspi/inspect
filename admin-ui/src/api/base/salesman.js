import request from '@/utils/request'

// 查询业务员列表
export function listSalesman(query) {
  return request({
    url: '/base/salesman/list',
    method: 'get',
    params: query
  })
}

// 查询业务员列表
export function getSalesmanList(query) {
  return request({
    url: '/base/salesman/getList',
    method: 'get',
    params: query
  })
}
// 查询业务员详细
export function getSalesman(id) {
  return request({
    url: '/base/salesman/getInfo/' + id,
    method: 'get'
  })
}

// 新增业务员
export function addSalesman(data) {
  return request({
    url: '/base/salesman/add',
    method: 'post',
    data: data
  })
}

// 修改业务员
export function updateSalesman(data) {
  return request({
    url: '/base/salesman/edit',
    method: 'put',
    data: data
  })
}

// 删除业务员
export function delSalesman(id) {
  return request({
    url: '/base/salesman/del/' + id,
    method: 'delete'
  })
}

// 导出业务员
export function exportSalesman(query) {
  return request({
    url: '/base/salesman/export',
    method: 'get',
    params: query
  })
}
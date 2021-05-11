import request from '@/utils/request'

// 查询医院列表
export function listHospital(query) {
  return request({
    url: '/base/hospital/list',
    method: 'get',
    params: query
  })
}

// 查询医院详细
export function getHospital(id) {
  return request({
    url: '/base/hospital/getInfo/' + id,
    method: 'get'
  })
}

// 新增医院
export function addHospital(data) {
  return request({
    url: '/base/hospital/add',
    method: 'post',
    data: data
  })
}

// 修改医院
export function updateHospital(data) {
  return request({
    url: '/base/hospital/edit',
    method: 'put',
    data: data
  })
}

// 删除医院
export function delHospital(id) {
  return request({
    url: '/base/hospital/del/' + id,
    method: 'delete'
  })
}

// 导出医院
export function exportHospital(query) {
  return request({
    url: '/base/hospital/export',
    method: 'get',
    params: query
  })
}
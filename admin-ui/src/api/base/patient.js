import request from '@/utils/request'

// 查询患者列表
export function listPatient(query) {
  return request({
    url: '/base/patient/list',
    method: 'get',
    params: query
  })
}

// 查询患者用户列表
export function listUser(query) {
  return request({
    url: '/base/patient/userList',
    method: 'get',
    params: query
  })
}

// 查询患者详细
export function getPatient(id) {
  return request({
    url: '/base/patient/getInfo/' + id,
    method: 'get'
  })
}

// 患者列表信息
export function listByUserId(id) {
  return request({
    url: '/base/patient/listByUserId?id=' + id,
    method: 'get'
  })
}

// 新增患者
export function addPatient(data) {
  return request({
    url: '/base/patient/add',
    method: 'post',
    data: data
  })
}

// 修改患者
export function updatePatient(data) {
  return request({
    url: '/base/patient/edit',
    method: 'put',
    data: data
  })
}

// 删除患者
export function delPatient(id) {
  return request({
    url: '/base/patient/del/' + id,
    method: 'delete'
  })
}

// 导出患者
export function exportPatient(query) {
  return request({
    url: '/base/patient/export',
    method: 'get',
    params: query
  })
}
import request from '@/utils/request'

// 查询医生列表
export function listDoctor(query) {
  return request({
    url: '/base/doctor/list',
    method: 'get',
    params: query
  })
}

// 查询医生详细
export function getDoctor(id) {
  return request({
    url: '/base/doctor/getInfo/' + id,
    method: 'get'
  })
}

// 新增医生
export function addDoctor(data) {
  return request({
    url: '/base/doctor/add',
    method: 'post',
    data: data
  })
}

// 修改医生
export function updateDoctor(data) {
  return request({
    url: '/base/doctor/edit',
    method: 'put',
    data: data
  })
}

// 删除医生
export function delDoctor(id) {
  return request({
    url: '/base/doctor/del/' + id,
    method: 'delete'
  })
}

// 导出医生
export function exportDoctor(query) {
  return request({
    url: '/base/doctor/export',
    method: 'get',
    params: query
  })
}

// 医生状态修改
export function changeDoctorStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/base/doctor/changeStatus',
    method: 'put',
    data: data
  })
}

// 医生生成二维码
export function createQrCode(id) {
  return request({
    url: '/base/doctor/createQrCode/' + id,
    method: 'get',
  })
}

//我的推荐
export function myRecommendList(query) {
  console.log(query)
  return request({
    url:'base/doctor/myRecommendList',
    method: 'get',
    params: query
  })
}

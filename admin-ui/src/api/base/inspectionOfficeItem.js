import request from '@/utils/request'

// 查询检验所项目信息列表
export function listInspectionOfficeItem(query) {
  return request({
    url: '/base/inspectionOfficeItem/list',
    method: 'get',
    params: query
  })
}

// 查询检验所项目信息列表
export function getListByInspectionOfficeId(id) {
  return request({
    url: '/base/inspectionOfficeItem/getListByInspectionOfficeId/'+id,
    method: 'get',
  })
}

// 查询检验所项目信息详细
export function getInspectionOfficeItem(id) {
  return request({
    url: '/base/inspectionOfficeItem/getInfo/' + id,
    method: 'get'
  })
}

// 新增检验所项目信息
export function addInspectionOfficeItem(data) {
  return request({
    url: '/base/inspectionOfficeItem/add',
    method: 'post',
    data: data
  })
}

// 修改检验所项目信息
export function updateInspectionOfficeItem(data) {
  return request({
    url: '/base/inspectionOfficeItem/edit',
    method: 'put',
    data: data
  })
}

// 删除检验所项目信息
export function delInspectionOfficeItem(id) {
  return request({
    url: '/base/inspectionOfficeItem/del/' + id,
    method: 'delete'
  })
}

// 导出检验所项目信息
export function exportInspectionOfficeItem(query) {
  return request({
    url: '/base/inspectionOfficeItem/export',
    method: 'get',
    params: query
  })
}

//状态修改
export function changeStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/base/inspectionOfficeItem/changeStatus',
    method: 'put',
    data: data
  })
}
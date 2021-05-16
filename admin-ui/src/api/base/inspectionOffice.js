import request from '@/utils/request'

// 查询检验所列表
export function listInspectionOffice(query) {
  return request({
    url: '/base/inspectionOffice/list',
    method: 'get',
    params: query
  })
}

// 查询检验所列表
export function getInspectionOfficeList(query) {
  return request({
    url: '/base/inspectionOffice/getList',
    method: 'get',
    params: query
  })
}

// 查询检验所详细
export function getInspectionOffice(id) {
  return request({
    url: '/base/inspectionOffice/getInfo/' + id,
    method: 'get'
  })
}

// 新增检验所
export function addInspectionOffice(data) {
  return request({
    url: '/base/inspectionOffice/add',
    method: 'post',
    data: data
  })
}

// 修改检验所
export function updateInspectionOffice(data) {
  return request({
    url: '/base/inspectionOffice/edit',
    method: 'put',
    data: data
  })
}

// 删除检验所
export function delInspectionOffice(id) {
  return request({
    url: '/base/inspectionOffice/del/' + id,
    method: 'delete'
  })
}

// 导出检验所
export function exportInspectionOffice(query) {
  return request({
    url: '/base/inspectionOffice/export',
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
    url: '/base/inspectionOffice/changeStatus',
    method: 'put',
    data: data
  })
}
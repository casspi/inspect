import request from '@/utils/request'

// 查询检验项目信息列表
export function listInspectionItem(query) {
  return request({
    url: '/base/inspection/list',
    method: 'get',
    params: query
  })
}

// 查询检验项目信息详细
export function getInspectionItem(id) {
  return request({
    url: '/base/inspection/getInfo/' + id,
    method: 'get'
  })
}

// 新增检验项目信息
export function addInspectionItem(data) {
  return request({
    url: '/base/inspection/add',
    method: 'post',
    data: data
  })
}

// 修改检验项目信息
export function updateInspectionItem(data) {
  return request({
    url: '/base/inspection/edit',
    method: 'put',
    data: data
  })
}

// 删除检验项目信息
export function delInspectionItem(id) {
  return request({
    url: '/base/inspection/del/' + id,
    method: 'delete'
  })
}

// 导出检验项目信息
export function exportInspectionItem(query) {
  return request({
    url: '/base/inspection/export',
    method: 'get',
    params: query
  })
}
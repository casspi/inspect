import request from '@/utils/request'

// 查询检验项目信息列表
export function listInspectionItemClassify(query) {
  return request({
    url: '/base/inspectionItemClassify/list',
    method: 'get',
    params: query
  })
}

// 查询检验项目信息详细
export function getInspectionItemClassify(id) {
  return request({
    url: '/base/inspectionItemClassify/getInfo/' + id,
    method: 'get'
  })
}

// 新增检验项目信息
export function addInspectionItemClassify(data) {
  return request({
    url: '/base/inspectionItemClassify/add',
    method: 'post',
    data: data
  })
}

// 修改检验项目信息
export function updateInspectionItemClassify(data) {
  return request({
    url: '/base/inspectionItemClassify/edit',
    method: 'put',
    data: data
  })
}

// 删除检验项目信息
export function delInspectionItemClassify(id) {
  return request({
    url: '/base/inspectionItemClassify/del/' + id,
    method: 'delete'
  })
}

// 导出检验项目信息
export function exportInspectionItemClassify(query) {
  return request({
    url: '/base/inspectionItemClassify/export',
    method: 'get',
    params: query
  })
}

// 修改是否推荐
export function changeRecommend(id,recommend) {
  const data = {
    id,
    recommend
  }
  return request({
    url: '/base/inspectionItemClassify/changeRecommend',
    method: 'put',
    data: data
  })
}

// 修改状态
export function changeStatus(id,status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/base/inspectionItemClassify/changeStatus',
    method: 'put',
    data: data
  })
}
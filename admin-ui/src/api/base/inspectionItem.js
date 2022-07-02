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

//状态修改
export function changeStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/base/inspection/changeStatus',
    method: 'put',
    data: data
  })
}

// 修改是否推荐
export function changeRecommend(id,recommend) {
  const data = {
    id,
    recommend
  }
  return request({
    url: '/base/inspection/changeRecommend',
    method: 'put',
    data: data
  })
}

// 修改是否发布
export function changePublish(id,publish) {
  const data = {
    id,
    publish
  }
  return request({
    url: '/base/inspection/changePublish',
    method: 'put',
    data: data
  })
}

// 上传图片
export function uploadImage(data) {
  return request({
    url: '/common/uploadList',
    method: 'post',
    data: data
  })
}
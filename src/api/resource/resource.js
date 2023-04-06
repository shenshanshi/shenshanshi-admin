import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listResource(query) {
  return request({
    url: '/resource/resource/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getResource(resourceId) {
  return request({
    url: '/resource/resource/' + resourceId,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addResource(data) {
  return request({
    url: '/resource/resource',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateResource(data) {
  return request({
    url: '/resource/resource',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delResource(resourceId) {
  return request({
    url: '/resource/resource/' + resourceId,
    method: 'delete'
  })
}

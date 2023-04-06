import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listPermission(query) {
  return request({
    url: '/account/permission/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getPermission(permId) {
  return request({
    url: '/account/permission/' + permId,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addPermission(data) {
  return request({
    url: '/account/permission',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updatePermission(data) {
  return request({
    url: '/account/permission',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delPermission(permId) {
  return request({
    url: '/account/permission/' + permId,
    method: 'delete'
  })
}

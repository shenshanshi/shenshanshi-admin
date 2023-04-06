import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listRole(query) {
  return request({
    url: '/account/role/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getRole(roleId) {
  return request({
    url: '/account/role/' + roleId,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addRole(data) {
  return request({
    url: '/account/role',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateRole(data) {
  return request({
    url: '/account/role',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delRole(roleId) {
  return request({
    url: '/account/role/' + roleId,
    method: 'delete'
  })
}

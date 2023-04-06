import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listDisplay(query) {
  return request({
    url: '/periphery/display/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getDisplay(displayId) {
  return request({
    url: '/periphery/display/' + displayId,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addDisplay(data) {
  return request({
    url: '/periphery/display',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateDisplay(data) {
  return request({
    url: '/periphery/display',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delDisplay(displayId) {
  return request({
    url: '/periphery/display/' + displayId,
    method: 'delete'
  })
}

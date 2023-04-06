import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listReview(query) {
  return request({
    url: '/forum/review/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getReview(reviewId) {
  return request({
    url: '/forum/review/' + reviewId,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addReview(data) {
  return request({
    url: '/forum/review',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateReview(data) {
  return request({
    url: '/forum/review',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delReview(reviewId) {
  return request({
    url: '/forum/review/' + reviewId,
    method: 'delete'
  })
}

import request from "@/utils/request";

// 查询【请填写功能名称】列表
export function listAccount(query) {
    return request({
        url: '/account/account/list',
        method: 'get',
        params: query
    })
}

// 查询【请填写功能名称】详细
export function getAccount(accountId) {
    return request({
        url: '/account/account/' + accountId,
        method: 'get'
    })
}

export function getAccountByToken() {
    return request({
        url: '/account/account/',
        method: 'get'
    })
}

// 新增【请填写功能名称】
export function addAccount(data) {
    return request({
        url: '/account/account',
        method: 'post',
        data: data
    })
}

// 修改【请填写功能名称】
export function updateAccount(data) {
    return request({
        url: '/account/account',
        method: 'put',
        data: data
    })
}

// 删除【请填写功能名称】
export function delAccount(accountId) {
    return request({
        url: '/account/account/' + accountId,
        method: 'delete'
    })
}

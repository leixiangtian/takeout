import request from '@/utils/request.js'

//分类
export function getCategory(data) {
  return request({
    url: '/get_type',
    data
  })
}

//附近商户列表
export function getList(data) {
  return request({
    url: '/get_store',
    data
  })
}



import request from '@/utils/request.js'

//商家详情信息
export function getStoreId(data) {
  return request({
    url: '/get_store_id',
    data
  })
}

//点餐页数据
export function getOrderData(data) {
  return request({
    url: '/get_nav',
    data
  })
}

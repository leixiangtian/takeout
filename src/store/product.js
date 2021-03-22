import { getOrderData } from '@/api/detail'
import Vue from 'vue';
const product = {
  namespaced: true,
  state: {
    productList: []
  },
  mutations: {
    saveProductList(state, arr) {
      state.productList = [...arr];
    },
    addCart(state, { type, index }) {
      //分类 索引
      let prod = state.productList[type].content[index]
      if (prod.count) {
        Vue.set(prod, 'count', prod.count + 1)
      } else {
        Vue.set(prod, 'count', 1)
      }
    },
    reduceCart(state, { type, index }) {
      //分类 索引
      let prod = state.productList[type].content[index]
      if (prod.count) {
        Vue.set(prod, 'count', prod.count - 1)
      }
    },
    clearList(state){
      state.productList.forEach(item=>{
        item.content.forEach(prod=>{
          if(prod.count){
            prod.count=0
          }
        })
      })
    }
  },
  getters: {
    selectList(state) {
      let result = [];
      state.productList.forEach(obj => {
        obj.content.forEach(prod => {
          if (prod.count) {
            result.push(prod);
          }
        })
      })
      // console.log(result)
      return result;
    },
    //    计算总价
    totalPrice(state, getter) {
      return getter.selectList.reduce((price, prod) => {
        return price + prod.count * prod.price;
      }, 0)
    },
    total(state, getter) {
      return getter.selectList.reduce((total, prod) => {
        return total + prod.count;
      }, 0)
    },
  },
  actions: {
    getOrder({ commit }, id) {
      return new Promise(resolve => {
        getOrderData(id).then(res => {
          let list =res.data.goods
          // console.log(list)
          list.forEach((item,type)=>{
            item.content.forEach((prod,index)=>{
              prod.type=type
              prod.index=index
            })
          })
          commit('saveProductList', list)
          resolve()
        })
      })

    }
  }
}
export default product;
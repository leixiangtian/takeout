import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import product from './product'
import ball from './ball'

export default new Vuex.Store({
  modules: {
    product,
    ball
  }
})

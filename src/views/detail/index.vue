<template>
  <div class="scrollBox">
    <div>
      <!-- 商家详情头部 -->
      <seller-header :seller="seller"></seller-header>
      <!-- 列表 -->
      <van-tabs v-model="active" sticky animated color="#ffda41">
        <!-- 点餐页 -->
        <van-tab title="点餐">
          <order :order="order"></order>
        </van-tab>
        <van-tab title="评价">
          <comment></comment>
        </van-tab>
        <van-tab title="商家信息">
          <seller :seller="seller"></seller>
        </van-tab>
      </van-tabs>
    </div>
    <cart v-if="active == 0" :seller="seller"></cart>
  </div>
</template>

<script>
import { getStoreId, getOrderData } from '../../api/detail.js'
import sellerHeader from './seller-header'
import order from './order.vue'
import cart from './cart.vue'
import comment from '../comment'
import seller from '../seller'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      seller: [],
      order: [],
      active: 0,
      scrollBox: null,
    }
  },
  components: {
    sellerHeader,
    order,
    cart,
    comment,
    seller
  },
  methods: {
    //获取商家详情
    getStoreMsg() {
      var id = this.$route.query.id
      var that = this
      getStoreId({ id }).then(function(res) {
        // console.log(res.data)
        that.seller = res.data
      })
    },
  },
  mounted() {
    this.$nextTick(()=>{
      this.scrollBox = new BScroll('.scrollBox',{
      bounce:false,
      click:true,
      startX:100,
    });
    })
    
    
  },
  created() {
    this.getStoreMsg()
    // this.getOrder()
  },
}
</script>

<style lang="scss" scoped>
.scrollBox {
  height:100vh;
  overflow: hidden;
}

</style>

<template>
  <div class="add-cart">
    <span class="iconfont icon-jianhao" v-if="product.count" @click="reduce"></span>
    <span class="num" v-if="product.count">{{product.count}}</span>
    <span class="iconfont icon-jiahao-" @click="addCart($event)"></span>
  </div>
</template>

<script>

//import 《组件名称》 from '《组件路径》';
export default {
  //import引入的组件需要注入到对象中
  components: {},
  data() {
    return {}
  },
  computed:{
    product(){
      return this.$store.state.product.productList[this.type].content[this.index]
    }
  },
  props:["type","index"],
  //方法集合
  methods: {
    addCart(e){
      this.$store.commit("product/addCart",{type:this.type,index:this.index})
      this.$store.commit('ball/show',e.target)
    },
    reduce(){
      this.$store.commit("product/reduceCart",{type:this.type,index:this.index})
    }
  },
}
</script>
<style lang="scss" scoped>
.add-cart{
  .iconfont {
    font-size: 0.48rem;
    padding: 0.18rem;
    vertical-align: middle;
  }
  .icon-jianhao{
    color: #ddd;
  }
  .icon-jiahao-{
    color: #ffc134;
    margin-right: -0.18rem;
  }
  .num{
    vertical-align: middle; 
  }
}

</style>

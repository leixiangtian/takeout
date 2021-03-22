<template>
  <div class="seller-box">
    <ul class="list-box">
      <li class="list" style="text-indent:24px;">
        {{seller.notice}}
      </li>
    </ul>
    <ul class="list-box">
      <li class="list">
        <span class="iconfont icon-location"></span>
        {{seller.address}}
      </li>
    </ul>
    <ul class="list-box">
      <li class="list"><span class="iconfont icon-peisong1"></span>配送服务：{{seller.server}}</li>
      <li class="list"><span class="iconfont icon-shijian"></span>配送时间：{{seller.delivery_time}}</li>
    </ul>
    <ul class="list-box">
      <li class="list">
        <span class="iconfont icon-manjianyouhui"></span>{{seller.full}}
      </li>
    </ul>
  </div>
</template>

<script>
//导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//import 《组件名称》 from '《组件路径》';
export default {
  props:["seller"],
  //import引入的组件需要注入到对象中
  components: {},
  data() {
    return {}
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(this.seller)
  },
}
</script>
<style lang="scss" scoped>
.seller-box{
  padding: 0.3rem .3rem 0;
  .list-box{
    padding-top: .36rem;
    box-sizing: border-box;
    border-bottom: 1px solid #ebedf0;
    .list{
      padding-bottom:.35rem;
      color: #333;
    }
  }
  .iconfont{
    padding: 0 .3rem .3rem 0;
    color: #c0c0c0;
    &.icon-manjianyouhui{
      color: #e4393c;
    }
  }
}
</style>

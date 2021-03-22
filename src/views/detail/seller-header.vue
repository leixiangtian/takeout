<template>
  <div class="container">
    <div class="header" @click="$router.push('/')">
      <span class="iconfont icon-fanhui"></span>
    </div>
    <div class="seller-box">
      <div class="img-box">
        <img :src="seller.img" alt="" />
      </div>
      <div class="info-box">
        <div class="time">{{ seller.minute }}分钟 {{ seller.distance }}</div>
        <div class="notice" v-text="seller.notice">简介</div>
        <div class="sale" v-text="seller.full">满减</div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  props: ['seller'],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
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
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="scss" scoped>
.container {
  background: #2e2f3b;

  .header {
    height: 0.8rem;
    line-height: 0.8rem;
    color: #fff;
    padding-left: 0.2rem;
  }

  .seller-box {
    display: flex;
    padding: 0.1rem 0.2rem 0.2rem;

    .img-box {
      width: 1.7rem;
      flex: 0 0 auto;
      margin-right: 0.2rem;

      img {
        width: 100%;
      }
    }

    .info-box {
      color: #fff;
      flex: 1;
      width: 0;
      font-size: 12px;

      .time,
      .notice,
      .sale {
        height: 0.32rem;
        line-height: 0.32rem;
        margin-bottom: 0.1rem;
      }

      .notice {
        height: 0.32rem;
        line-height: 0.32rem;
        /* 超出隐藏 */
        overflow: hidden;
        /* 文字超出省略使用三个点... */
        text-overflow: ellipsis;
        /* 文本不换行 */
        white-space: nowrap;
      }
    }
  }
}
</style>

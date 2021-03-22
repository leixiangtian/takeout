<template>
  <div class="score-box">
    <div class="seller-score">
      <div class="num">{{score}}</div>
      <div class="desc">商家评分</div>
    </div>
    <div class="pack-score">
      <div class="item">
        <span>口味 </span>
        <star :score="flavor"></star>
        <span>{{flavor}}</span>
      </div>
      <div class="item">
        <span>包装 </span>
        <star :score="packing"></star>
        <span>{{packing}}</span>
      </div>
    </div>
    <div class="deliver-score">
      <div class="num">{{delivery}}</div>
      <div class="desc">配送评分</div>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import star from '@/components/star'
export default {
  props:["delivery","flavor","packing","score"],
  //import引入的组件需要注入到对象中
  components: {
    star,
  },
  data() {
    return {}
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
}
</script>
<style lang="scss" scoped>
.score-box {
  display: flex;
  background: #fff;
  padding: 0.3rem;
  .seller-score,
  .deliver-score {
    width: 1.86rem;
    flex: 0 0 1.86rem;
    text-align: center;
    .num {
      font-size: 0.54rem;
      height: 0.6rem;
      line-height: 0.6rem;
      font-weight: 600;
      color: #ffb000;
      margin-bottom: 0.1rem;
    }
  }
  .deliver-score {
    .num {
      color: #999;
      font-size: 0.54rem;
      height: 0.6rem;
      line-height: 0.6rem;
      margin-bottom: 0.1rem;
    }
  }
  .pack-score {
    flex: 1;
    font-size: 0.26rem;
    color: #666;
    border-right: 2px solid #ddd;
    .item {
      margin: 0.06rem 0 0.2rem;
    }
  }
}
</style>

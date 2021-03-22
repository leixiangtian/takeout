<template>
  <div class="tag-box">
    <!-- <span class="tag-item" v-for="item in tag" :key="item.id" :class="{'active':currentType==item.id}" @click="changeTab(item.id)">{{item.name}}({{item.count}})</span> -->
    <span v-for="obj in tag" :key="obj.id" @click="changeTab(obj.id)" class="tag-item" :class="{'active':currentType == obj.id}">{{obj.name}}({{obj.count}})</span>
  </div>
</template>

<script>
//导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//import 《组件名称》 from '《组件路径》';

export default {
  props:["tag","currentType"],
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
  methods: {
    changeTab(id){
          // this.$emit('change',id)
          this.$emit('update:currentType',id)
      }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.tag-box{
  padding: 0.3rem 0.28rem 0.1rem;
  border-top: .2rem solid #f4f4f4;
  .tag-item{
    padding: 0 0.24rem;
    display: inline-block;
    line-height: 0.52rem;
    height: 0.52rem;
    text-align: center;
    font-size: 0.26rem;
    color: #666;
    margin: 0 0.2rem 0.2rem 0;
    @include border-fix(#bbb,0.52rem);
    &.active{
      // border-color:#ffb000;
      @include border-fix(#ffb000,0.52rem);
      background: #fefbf1;
    }
  }
  
}
</style>

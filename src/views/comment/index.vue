<template>
  <div class="commentBox" ref="commentBox">
    <div>
      <score
        :delivery="comment.delivery"
        :flavor="comment.flavor"
        :packing="comment.packing"
        :score="comment.score"
      ></score>
      <!-- <tag :tag="comment.label" :currentType="type" @change="change"></tag> -->
      <tag :tag="comment.label" :currentType.sync="type"></tag>
      <list :list="comment.rate"></list>
    </div>
  </div>
</template>

<script>
import score from './score'
import tag from './tag'
import list from './list'
import { getComment } from '@/api/comment.js'
import BScroll from 'better-scroll'
export default {
  components: {
    score,
    tag,
    list,
  },
  data() {
    return {
      type: 1, //全部
      comment: {},
      commentScroll: null,
    }
  },
  //方法集合
  methods: {
    getData() {
      return new Promise((resolve) => {
        getComment({
          id: this.$route.query.id,
          type: this.type,
        }).then((res) => {
          this.comment = res.data
          resolve()
        })
      })
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
  },
  mounted(){
    this.getData().then(() => {
      this.$nextTick(()=>{
        this.commentScroll = new BScroll(this.$refs.commentBox, {
          bounce: false,
          click:false
        })
      })
    })
  },
  watch:{
    type(){
      this.getData().then(()=>{
        this.commentScroll.refresh()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.commentBox {
  height: calc(100vh - 44px);
  // overflow: auto;
}
</style>

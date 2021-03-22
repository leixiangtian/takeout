<template>
  <div>
    <ul class="cate-box">
      <li class="cate-list" v-for="(list, i) in cateList" :key="list.id">
        <img class="cate-img" :src="list.img" :alt="list.name" />
        <p class="cate-title">{{ list.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getCategory } from '@/api/home.js' //导入home页通用数据接口文件的getCategory
export default {
  data() {
    return {
      cateList: [],
    }
  },
  created() {
    var that = this
    getCategory().then(function(res) {
      // console.log(res)
      that.cateList = res.data
    })
  },
}
</script>

<style lang="scss" scoped>
.cate-box {
  margin-top: 0.3rem;
  display: flex;
  flex-wrap: wrap;

  .cate-list {
    width: 20%;
    text-align: center;
    font-size: 11px;

    .cate-img {
      width: 0.88rem;
      height: 0.88rem;
    }

    .cate-title {
      margin-bottom: 0.3rem;
      margin-top: 0.1rem;
    }
  }
}
</style>

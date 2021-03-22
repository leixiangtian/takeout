<template>
  <div>
    <!-- 头部吸顶搜索栏 -->
    <van-sticky :offset-top="0">
      <div class="header">
        <input type="text" class="search" placeholder="请输入商家或商品名称" />
      </div>
    </van-sticky>
    <!-- 分类 -->
    <category></category>
    <div class="title">附近商家</div>
    <!-- 附近商家列表 -->
    <list></list>
  </div>
</template>

<script>
import category from './category' //导入分类组件
import list from './list' //导入附近商户列表组件
export default {
  components: {
    category,
    list,
  },
}
</script>

<style lang="scss" scoped>
.header {
  background: #000;
  padding: 0.2rem;
  .search {
    width: 100%;
    border: none;
    height: 0.6rem;
    line-height: 0.6rem;
    border-radius: 0.5rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    outline: 0;
  }
}

.title {
  font-size: 0.34rem;
  text-align: center;
  font-weight: bold;
}

.title::after,
.title::before {
  content: '';
  height: 1px;
  transform: scaleY(0.5);
  width: 30px;
  display: inline-block;
  background: #666;
  vertical-align: middle;
}
</style>

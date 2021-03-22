<template>
  <div class="list-box">
    <ul class="content">
      <li class="list" v-for="item in list" :key="item.id">
        <div class="img-box">
          <img :src="item.portrait" alt="">
        </div>
        <div class="info-box">
          <div class="basic">
            <span class="name">{{item.name}}</span>
            <span class="date">{{item.time}}</span>
          </div>
          <div class="time">{{item.duration}}分钟</div>
          <div class="desc">{{item.content}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
//导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//import 《组件名称》 from '《组件路径》';
export default {
  props: ['list'],
  //import引入的组件需要注入到对象中
  components: {},
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.list-box{
  border-top: 1px solid #f1f1f1;
}
.content{
  padding: .3rem .3rem 0;
  .list{
    display: flex;
    margin-bottom: 0.3rem;
    .img-box{
      width: 0.8rem;
      flex: 0 0 .8rem;
      margin-right: 0.2rem;
      & img{
         width: 100%;
         border-radius: 50%;
      }
    }
    .info-box{
      flex: 1;
      .basic{
        .date{
          float: right;
          color: #898989;
          font-size: 0.24rem;
        }
      }
      .desc{
        line-height: 0.4rem;
        padding: 0.3rem 0;
        color: #2f2f2f;
      }
    }
  }
}
</style>

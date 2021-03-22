<template>
  <div>
    <div class="order-box">
      <!-- 左侧分类表 -->
      <div class="menu-box" ref="menuBox">
        <ul>
          <li
            class="menu-list"
            v-for="(item, index) in productList"
            :key="index"
            @click="changeMenu(index)"
            :class="{ active: currentIndex == index }"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <!-- 右侧菜品表 -->
      <div class="prod-box" ref="proBox">
        <ul>
          <li
            class="cate-list"
            v-for="(item, typeIndex) in productList"
            :key="typeIndex"
          >
            <div class="cate-title">{{ item.name }}</div>
            <ul>
              <li class="prod-list" v-for="(prod,index) in item.content" :key="prod.id">
                <div class="prod-img-box">
                  <img :src="prod.img" alt="" />
                </div>
                <div class="prod-info">
                  <div class="name">{{ prod.name }}</div>
                  <div class="sale">月销{{ prod.num }} 赞{{ prod.up }}</div>
                  <div class="price">￥{{ prod.price }}</div>
                </div>
                <div class="add-cart-container">
                  <addCart :type="typeIndex" :index="index"></addCart>
                </div>
                <!-- <div class="iconfont icon-jiahao-"></div> -->
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BScroll from 'better-scroll'
import addCart from '../../components/add-cart'
export default {
  // props: ['order'],

  components: {
    addCart
  },
  data() {
    return {
      menuScroll: null,
      prodScroll: null,
      menuList: [], //左侧li列表元素
      currentIndex: 0, //当前的分类
      posY: [], //保存各菜品的高度
      scrollY: 0, //初始滚动条高度
    }
  },
  computed: {
    ...mapState('product', ['productList']),
  },
  methods: {
    ...mapActions({
      getOrder: 'product/getOrder',
    }),
    initScroll() {
      this.menuScroll = new BScroll('.menu-box', {
        bounce: false,
        // click: true,
        // scrollY: true
      })
      this.prodScroll = new BScroll('.prod-box', {
        bounce: false,
        // click:true,
        probeType: 3,
        // scrollY: true
      })
      this.getPosY() //获取右侧每个菜品的位置
      this.menuList = this.$refs.menuBox.getElementsByClassName('menu-list') //获取左侧li列表元素
      //监听滚动位置并赋值
      this.prodScroll.on('scroll', (e) => {
        this.scrollY = Math.abs(Math.round(e.y)) //滚动条高度
      })
    },
    // 左侧分类点击后右侧菜品跳转位置
    changeMenu(index) {
      let prodList = this.$refs.proBox.getElementsByClassName('cate-list')
      let el = prodList[index]
      this.prodScroll.scrollToElement(el, 300)
      this.currentIndex = index
    },
    //获取右侧每个菜品的位置
    getPosY() {
      let prodList = this.$refs.proBox.getElementsByClassName('cate-list')
      let y = 0
      for (let i = 0; i < prodList.length; i++) {
        if (i == 0) {
          this.posY.push(y)
        } else {
          let prevEle = prodList[i - 1]
          y += prevEle.offsetHeight
          this.posY.push(y)
        }
      }
      // console.log(this.posY)
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
  },
  watch: {
    scrollY(val) {
      // console.log(val)
      for (let i = 0; i < this.posY.length; i++) {
        let el = this.posY[i]
        let nextEl = this.posY[i + 1]
        if (el <= val && nextEl > val) {
          let el = this.menuList[i];
          this.currentIndex=i
          this.menuScroll.scrollToElement(el, 300);
          break;
        }
      }
    },
  },
  mounted(){
    this.getOrder({ id: this.$route.query.id }).then(() => {
      //初始化betterscroll
      this.$nextTick(() => {
        this.initScroll()
        this.menuScroll.refresh()
        this.prodScroll.refresh()
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.order-box {
  height: calc(100vh - 44px);
  display: flex;
  .menu-box {
    width: 1.6rem;
    flex: 0 0 1.6rem;
    background: #f5f5f5;
    text-align: center;
    height: calc(100vh - 94px);
    overflow: hidden;
    li {
      padding: 0.32rem 0.24rem;
      font-size: 0.26rem;
      text-align: left;
      &.active {
        color: #f00;
        background: #ffffff;
      }
    }
  }

  .prod-box {
    flex: 1;
    min-width: 0;
    background: #ffffff;
    height: calc(100vh - 94px);
    overflow: hidden;
    .cate-list {
      padding: 0 0.2rem;

      .cate-title {
        padding: 0.2rem 0;
      }

      .prod-list {
        display: flex;
        position: relative;
        padding-bottom: 0.4rem;

        .prod-img-box {
          flex: 0 0 1.5rem;
          width: 1.5rem;
          margin-right: 0.15rem;

          img {
            width: 100%;
          }
        }
        .prod-info {
          min-width: 0;
          .name {
            font-size: 0.32rem;
            color: #333;
            font-weight: bold;
            line-height: 0.45rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 0.04rem;
          }

          .sale {
            color: #666;
            font-size: 11px;
            margin-bottom: 0.06rem;
          }

          .price {
            color: #fb4e44;
            font-size: 0.36rem;
          }
        }
        .add-cart-container{
          position:absolute;
          right: 0;
          bottom: 10px;
        }
        .icon-jiahao- {
          font-size: 0.55rem;
          color: #ffc134;
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }

      
    }
  }
}
</style>

<template>
<div>
  <div class="cart-container">
    <div class="cart-box" @click="isShow = !isShow">
      <div class="cart-icon" :class="{ active: total > 0 }">
        <span class="iconfont icon-gouwuche"></span>
        <span class="num" v-show="total">{{ total }}</span>
      </div>
      <div class="cart-price" :class="{ active: total > 0 }">
        <div class="price">{{ totalPrice }}&nbsp;<span>元</span></div>
        <div class="deliver">另需配送费￥{{ seller.fee }}</div>
      </div>
      <div class="cart-buy" v-if="total == 0">￥{{seller.price}}元起送</div>
      <div
        class="cart-buy"
        :class="{ active: totalPrice >= seller.price }"
        v-if="total > 0"
      >
        {{ buyDesc }}
      </div>
    </div>
    <div class="ball-box">
      <div v-for="(ball, index) in ballList" :key="index">
        <transition
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
        >
          <div class="ball" v-show="ball.show">
            <div class="inner"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fade">
      <div class="cartList-box" v-if="isShow && total">
        <div class="title">
          <span @click="clearCart()">清空购物车</span>
        </div>
        <ul class="list-box">
          <li class="list" v-for="prod in selectList" :key="prod.id">
            <span class="name">{{ prod.name }}</span>
            <span class="price">￥{{ prod.price * prod.count }}</span>
            <addCart :type="prod.type" :index="prod.index"></addCart>
          </li>
        </ul>
      </div>
    </transition>
  </div>
  <div class="mask" v-show="isShow && total" @click="isShow=false"></div>
</div>
  
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import addCart from '../../components/add-cart'
export default {
  props: ['seller'],
  //import引入的组件需要注入到对象中
  components: {
    addCart,
  },
  data() {
    return {
      isShow: false,
    }
  },
  //监听属性 类似于data概念
  computed: {
    ...mapGetters('product', ['totalPrice', 'total', 'selectList']),
    ...mapState('ball', ['ballList']),
    // 判断起送价
    buyDesc() {
      if (this.totalPrice == 0) {
        return `￥${this.seller.price}元起送`
      } else if (this.totalPrice < this.seller.price) {
        return `还差${this.seller.price - this.totalPrice}元起送`
      } else {
        return `结　算`
      }
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 执行动画前
    beforeEnter(el) {
      for (let i = 0; i < this.ballList.length; i++) {
        let ball = this.ballList[i]
        if (ball.show) {
          let pos = ball.el.getBoundingClientRect() //获取当前元素的位置
          let y = window.innerHeight - pos.top - 40
          let x = pos.left - 30
          el.display = ''
          el.style.transform = `translate3d(0,${-y}px,0)` //垂直方向
          let inner = el.getElementsByClassName('inner')[0]
          inner.style.transform = `translate3d(${x}px,0,0)` //水平方向
        }
      }
    },
    // 执行动画时
    enter(el, done) {
      el.offsetWidth //用于过渡生效
      this.$nextTick(() => {
        el.style.transform = `translate3d(0,0,0)` //垂直方向
        let inner = el.getElementsByClassName('inner')[0]
        inner.style.transform = `translate3d(0,0,0)` //水平方向
        el.addEventListener('transitionend', done)
      })
    },
    // 执行动画后
    afterEnter(el) {
      el.style.display = 'none'
      //释放小球
      this.$store.commit('ball/removeBall')
    },
    // 清空购物车
    clearCart() {
      this.$store.commit('product/clearList')
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(this.total)
  },
}
</script>
<style lang="scss" scoped>
.cart-container {
  z-index: 101;
  position: fixed;
  bottom: 0;
  background: #3b3b3c;
  height: 50px;
  width: 100%;
  .cart-box {
    display: flex;
    background: #3b3b3c;
    .cart-icon {
      background: #656565;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      position: absolute;
      left: 10px;
      top: -10px;
      .num {
        color: #fff;
        background: #e4393c;
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 50%;
        position: absolute;
        right: 0;
        top: 0;
        text-align: center;
        transform: scale(0.5) translate(50%, -50%);
        // display: none;
      }
      .icon-gouwuche {
        font-size: 28px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -14px 0 0 -14px;
        color: #c4c4c4;
      }
      &.active {
        background: #f8c74e;
        .icon-gouwuche {
          color: #333;
        }
      }
    }

    .cart-price {
      margin-left: 70px;
      flex: 1;
      color: #999;
      .price {
        display: none;
        span {
          font-size: 16px;
        }
      }
      .deliver {
        line-height: 50px;
        font-size: 14px;
        color: #e4393c;
      }
      &.active {
        .price {
          display: block;
          font-size: 24px;
          color: #fff;
          line-height: 33px;
        }
        .deliver {
          line-height: 10px;
          font-size: 11px;
        }
      }
    }
    .cart-buy {
      line-height: 50px;
      font-size: 14px;
      color: #999;
      padding: 0 20px;
      &.active {
        background: #f8c74e;
        color: #333;
        font-size: 18px;
        font-weight: 400;
      }
    }
  }
  .ball {
    position: fixed;
    left: 30px;
    bottom: 23px;
    transition: all 0.45s cubic-bezier(0.48, 0.28, 0.73, 0.42);
    .inner {
      width: 16px;
      height: 16px;
      background: #00a0dc;
      border-radius: 50%;
      transition: all 0.45s linear;
    }
  }
  .cartList-box {
    max-height: 400px;
    position: absolute;
    left: 0;
    bottom: 50px;
    background: #fff;
    border-top: 1px solid #e4e4e4;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    z-index: -1;
    .title {
      height: 30px;
      line-height: 30px;
      text-align: right;
      font-size: 12px;
      background: #f4f4f4;
    }
    .list-box {
      .list {
        padding: 14px 0;
        border-bottom: 1px solid #e4e4e4;
        display: flex;
        line-height: 24px;
        .name {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          white-space: nowrap;
        }
        .price {
          color: #e4393c;
          padding: 0 20px;
        }
      }
    }
  }
  // 动画开始前
  .fade-enter{
    transform: translateY(100%);
  }
  // 动画过程
  .fade-enter-active{
    transition: transform .2s;
  }
  // 动画结束后
  .fade-enter-to{
    transform: translateY(0);
  }
}

.mask{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background:rgba(0,0,0,.5);
  backdrop-filter: blur(10px);
  z-index: 100;
}
</style>

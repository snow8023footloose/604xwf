<template>
  <div class="shopcart">
    <el-dialog
      lock-scroll
      fullscreen
      close-on-press-escape
      append-to-body
      title="订单确认" :visible.sync="showFormConfirmOrder">
      <div class="shopcart-list animated" v-show="listShow">
        <div class="list-content" ref="list-content">
          <ul style="padding: 0px">
            <li style="display: flex;align-items:baseline" class="food" v-for="(food,key) in selectFoods" :key="key">
              <h3 class="name" style="font-weight: lighter;flex-grow: 1; width: 200px">{{food.dishesName}}</h3>
              <div class="price" style="flex-grow: 1;">
                <span>￥{{food.totalPrice}}</span>
              </div>
              <div class="cartcontrol-wrapper" >
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
        <div style="display: flex;justify-content: space-between">
          <span class="price" style="font-size: 20px;font-weight: bolder" v-show="totalCount>0" :class="{'highlight':totalPrice>0}">总计 ￥{{needPay}}</span>
          <el-button-group>
            <el-button type="success" round @click="prePay">下单</el-button>
          </el-button-group>
        </div>
      </div>
    </el-dialog>
    <div class="cart-content">
      <div class="content-left">
        <div class="logo-wrapper" @click.stop="toggleList">
          <div class="logo">
            <i class="el-icon-loading" style="color:white;font-size:42px;z-index:104;"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div @click="showSelected" class="desc" v-if="totalPrice === 0">亲，购物车为空</div>
      </div>
    </div>
    <div class="ball-container">
      <transition
        name="drop"
        v-for="(ball,key) in balls"
        @before-enter="beforeDrop"
        @enter="dropping"
        :key="key"
        @after-enter="afterDrop">
        <div v-show="ball.show" class="ball" v-bind:css="false">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
    <transition name="fold" enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <div class="shopcart-list animated" v-show="listShow">
        <div class="list-header" @click.stop="toggleList">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="list-content">
          <ul>
            <li class="food" v-for="(food,key) in selectFoods" :key="key">
              <span class="name">{{food.dishesName}}</span>
              <div class="price">
                <span>￥{{food.totalPrice}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food" :type="'cart'" @updateShopcart="updateShopcart"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
  import BScroll from 'better-scroll';
  import cartcontrol from '@/components/tables/cartcontrol';
const ERR_OK = 0
  export default {
    props: {
      selectFoods: {
        type: Array,
      },
      goods1:{
        type:Array
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      needPay: {
        type: Number,
        default: 0
      },
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        showFormConfirmOrder:false,
        dropBalls: [],
        fold: true,
      };

    },
    watch:{
      dropBalls(){
        this.fold = false
      }
    },
    mounted(){
      this.fold = !this.fold;
    },
    methods: {
      updateShopcart(){
        this.$emit('updateShopcart', true);
      },
      showSelected(){
        console.log(this.selectFoods);
        console.log(this.totalPrice);
        console.log(this.totalCount);
      },
      drop(el) {
        for(let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if(!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return ;
          }
        }
      },
      beforeDrop(el) {
        // console.log(this.needPay);
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if(ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 210;
            let y = -(window.innerHeight - rect.top - 110);
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el) {
        /* eslint-disable no-unused-vars */
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterDrop(el){
        let ball = this.dropBalls.shift();
        if(ball) {
          ball.show = false ;
          el.style.display = 'none';
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
        console.log(this.listGoods);
      },
      prePay(){
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`支付${this.totalPrice}元`);
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        if(this.selectFoods){
          this.selectFoods.forEach((food) => {
            total += food.totalPrice
          });
        }

        return total;
      },
      totalCount() {
        let count = 0;
        if(this.selectFoods){
          this.selectFoods.forEach((food) => {
            count += food.num;
          });
        }

        return count;
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs['list-content'], {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      },
      listGoods(){
        let tempArr = [];
        if(this.goods1){
          this.goods1.forEach((item)=>{
            tempArr = tempArr.concat(item.foods);
          })
        }
        return tempArr;
      }
    },
    components: {
      cartcontrol
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "shopcart.styl"
</style>

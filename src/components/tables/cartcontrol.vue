<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-add_circle" v-show="food && food.num>0" @click.stop="decreaseCart">
        <i class="el-icon-remove-outline inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="cart-count" v-show="food && food.num > 0 ">{{food ? food.num : ''}}</div>
    <i class="el-icon-circle-plus cart-add icon-add_circle" @click="addCart" ref="add"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable */
  import Vue from 'vue';
  const ERR_OK = 0
  export default {
    props: {
      food: {
        type: Object,
      },
      type: {
        type: String,
        default: 'dishes'
      }
    },
    data() {
      return {
        show:0,
      }
    },
    methods: {
      closeSku(){
        this.show = 0
      },
      delaySku(){
        this.show = 0
      },

      addCart(event) {
        this.show = 1
        console.log(this.food);
        if (!event._constructed) {
          return false;
        }
        if(this.type == 'dishes'){
          if(this.food.specs){
            this.$emit('increment', {event:event.target,food:this.food,specs:true});
          }else{
            if (!this.food.count) {
              Vue.set(this.food, 'count', 1);
            } else {
              this.food.count++;
            }
            this.$emit('increment', {event:event.target,food:this.food,specs:false});
          }
        }else{
          this.$request(this.url.cartSubmit,'form',{
            id:this.food.id,
            delta: 1
          }).then((res)=>{
            // console.log(res);
            this.$emit('updateShopcart', true);
          })
        }


      },
      decreaseCart(event) {
        if (!event._constructed) {
          return false;
        }
        if(this.type == 'dishes'){
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1);
          } else {
            this.food.count--;
          }
          this.$emit('incrementmi', {event:event.target,food:this.food});
        }else{
          this.$request(this.url.cartSubmit,'form',{
            id:this.food.id,
            delta:-1
          }).then((res)=>{
            // console.log(res);
            this.$emit('updateShopcart', true);
          })
        }

      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  @import "animate.css";
  .skuselect
    position fixed
    top 20%
    left 35%
    background rgba(255, 255, 255, 0.9)
    z-index 9999
    border-radius 10px
    padding 20px
    box-shadow 6px 15px 5px rgba(0, 0, 0, 0.3)


  .cartcontrol
    font-size: 0
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

  .inner
    display: inline-block
    line-height: 24px
    font-size: 24px
    color: rgb(0, 160, 220)
    transition: all 0.2s linear
    transform: rotate(0deg)


  .cart-decrease
    display: inline-block
    padding: 6px
    transition: all 0.2s linear
    &.move-enter-active
      opacity: 1
      transform: translate3d(0, 0, 0)

    &.move-enter, &.move-leave-active
      opacity: 0
      transform: translate3d(24px, 0, 0)
      .inner
        transform: rotate(180deg)




</style>

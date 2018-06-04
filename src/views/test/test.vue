<template>
  <div>
    <a href="javascript:;" @click="$store.state.show = true">true</a>
    <a href="javascript:;" @click="$store.state.show = false">false</a>
    <a href="javascript:;" @click="toStoreState">123</a>
    <a href="javascript:;" @click="showStoreState">点击show的值</a>
    <a href="javascript:;" @click="showGetters">showGetters</a>
    <a href="javascript:;" @click="showGettersLength">showGettersLength</a>
    <a href="javascript:;" @click="showGettersFindId">showGettersFindId</a>
    <a href="javascript:;" @click="showMutations">showMutations</a>
    <a href="javascript:;" @click="showActions">showActions</a>
    <a href="javascript:;" @click="showModules">showModules</a>
    <!--<t-dialog></t-dialog>-->
  </div>
</template>
<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  // import dialog from 'components/dialog/dialog.vue'
    export default {
      data(){
        return{
          dataStore:[
            {
              name:'124',
              age:123
            }
          ]
        }
      },
      components:{
        // 't-dialog':dialog
      },
      computed:{
        ...mapGetters({
          doneCount:'doneTodosCount'
        })
      },
      methods:{
        showStoreState(){
          console.log(this.$store.state.show);
        },
        toStoreState(){
          this.$store.state.show = this.dataStore
        },
        showGetters(){
          console.log(this.$store.getters.doneTodos);
        },
        showGettersLength(){
          console.log(this.$store.getters.doneTodosCount);
        },
        showGettersFindId(){
          console.log(this.$store.getters.getTodoById());
        },
        showMutations(){
          this.$store.commit('increment')
          console.log(this.$store.state.count);
          // Mutations 同步的
        },
        showActions(){
          this.$store.dispatch('increment').then(_=>{
            console.log('123');
          })
          console.log(this.$store.state.count);
          // Actions 异步的
        },
        showModules(){
          console.log(this.$store.state.moduleA.name);
        }
        //store并不是双向绑定，data里面数据变化之后，store里面的值并没有改变，需要再次赋值
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>

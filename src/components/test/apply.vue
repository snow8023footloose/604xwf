<template>
  <!--代码测试-->
  <div id="demo1">
    <schart :canvasId="canvasId"
            :type="type"
            :width="width"
            :height="height"
            :data="data"
            :options="options"
    ></schart>
    <div>
      <h3>1、单个插槽</h3>
      <single>

      </single>
    </div>
    <br/>
    <h3>2、具名插槽</h3>
    <muliSlots>
      <!--在html中不支持驼峰式的标签名，需改为横线式-->
      <h3 slot="header"></h3>
      <p>主要内容的一个段落。</p>
      <p>另一个主要段落。</p>
      <p slot="footer"></p>
    </muliSlots>
    <br/>

    <!--作用域插槽-->
    <!--在父级中，具有特殊特性 slot-scope 的 <template> 元素必须存在，表示它是作用域插槽的模板。
                slot-scope 的值将被用作一个临时变量名，此变量接收从子组件传递过来的 prop 对象：-->
    <div class="parent">
      <h3>3、作用域插槽</h3>
      <scoped-slot>
        <template slot-scope="props">
          <!--这里的props指的是子组件的props-->
          <span>this is from parent</span>
          <span>{{props.msg}}</span>
        </template>
      </scoped-slot>
    </div>
    <br/>
    <div>
      <h3>4、使用render代替子组件中的template</h3>
      <render-slot></render-slot>
    </div>
    <br/>
    <div>
      <h3>5、子组件中同时存在template和render函数</h3>
      <render-template></render-template>
    </div>
    <br/>
    <div>
      <h3>6、在render函数中使用作用域插槽，父组传值</h3>
      <render-scope>
        <template slot-scope="props">
          <p>{{props.msg}}</p>
        </template>
      </render-scope>
    </div>
    <br/>
    <!--父组件通过props向子组件传值-->
    <div class="parent">
      <h3>7、父组件通过props向子组件传值，值在template的slot标签中接收</h3>
      <!--传递的值需要写在子组件的标签中-->
      <child dataMsg="传递的值" msg2="第二个值"></child>
    </div>
    <br/>
    <div>
      <h3>8、父组件通过props向子组件传值，值在render函数返回的createElement函数中接收</h3>
      <child-render msg="render send data">
        <template slot-scope="props">
          <em>{{props.text}}</em>
        </template>
      </child-render>
    </div>
    <br/>
    <div>
      <h3>9、与8等价的template</h3>
      <child-render-template :msg="parent">
        <template slot-scope="props">
          <em>{{props.text}}</em>
        </template>
      </child-render-template>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue'
  import schart from 'vue-schart'
  import single from '@/components/test/single'
  import child from '@/components/test/child'
  import muliSlots from '@/components/test/muliSlots'
  import scopedSlot from '@/components/test/scopedSlot'

  // import renderScope from '@/components/test/renderScope'
  // import renderslot from '@/components/test/renderSlot'
  // import renderTemplate from '@/components/test/renderTemplate'
  // import childRender from '@/components/test/childRender'
  import childRenderTemplate from '@/components/test/childRenderTemplate'
  export default {
    components: {
      single,
      muliSlots,
      scopedSlot,
      child,
      schart,
      // childRender,
      childRenderTemplate,
      // renderScope,
      // renderslot,
      // renderTemplate
    },
    data () {
      return{
        parent:'132456789',
        visible2: false,
        canvasId: 'myCanvas',
        type: 'bar',
        width: 500,
        height: 400,
        data: [
          {name: '2014', value: 1342},
          {name: '2015', value: 2123},
          {name: '2016', value: 1654},
          {name: '2017', value: 1795},
        ],
        options: {
          title: 'Total sales of stores in recent years'
        }
      }
    }
  }


  //使用render代替template
  Vue.component('renderSlot', {
    render(createEle) {
      return createEle('em', '如果出现了，说明用render函数代替template成功')
    }
  })

  //render 使用作用域插槽 无论顺序，优先显示render
  Vue.component('render-template', {
    render(createEle) {
      return createEle('div', 'this is from render 无论顺序，优先显示render')
    },
    template: '<div>this is from template</div>',

  })


  //6父组件传值  在render函数中使用作用域插槽
  Vue.component('render-scope', {
    render(createEle) {
      return createEle('p', this.$scopedSlots.default({
        msg: 'this is from render-scopeded slot'
      }))
    }
  })

  //8父组件使用render 传值
  Vue.component('child-render', {
    props: ['msg'], //this is from parent
    //<div><slot text="this is from render-scopeded slot"><slot><p>{{msg}}</p></div>
    render(createEle) {
      var p = createEle('p', {
        domProps: {
          innerHTML: this.msg //这里的this不能省略
        }
      })
      return createEle('div', [this.$scopedSlots.default({
        text: 'this is from render-scopeded slot' //子组件自己的props属性
      }), p])
    }
  })

  //与上面等价的template
  // Vue.component('child-render-template', {
  //   props: ['msg'], //this is from parent
  //   template: `<div>
  //               <slot text="this is from render-scopeded slot"></slot>
  //               <p>{{msg}}</p>
  //           </div>`
  // })


</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const moduleA = {
  state:{
    name:'A'
  }
}
const moduleB = {
  state:{
    name:[1,2,3],
    screenWidth:0,
  }
}
const common = {
  startData:{},
  settingForm:{},
  dishesDataTable:[],
}
const cashierTable = {

}
const orderData = {

}
const dishesData = {

}
const financeData = {

}
const couponData = {

}
const memberData = {

}
const settingData = {

}
const store = new Vuex.Store({
  modules:{
    common,
    cashierTable,
    orderData,
    dishesData,
    financeData,
    couponData,
    memberData,
    settingData,
    moduleA,
    b: moduleB,
  },
  state: {
    cartList: [],
    show:false,
    todos: [
      { id: 1, text: '这是1', done: true },
      { id: 1, text: '这是1', done: true },
      { id: 0, text: '这是0', done: true },
      { id: 2, text: '这是2', done: false },
    ],
    count: 1,
    tableStatus:{},
    orderStatus:{},
    serviceStatus:{},
    tableHeight:550
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state,getters) => {
      return getters.doneTodos.length
    },
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.text === '这是0')
    }
  },
  mutations: {
    increment (state){
      state.count ++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  },

})
export default store;

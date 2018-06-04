// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store/store'
import axios from 'axios'
import {request} from 'api/api'
import {urlColletion} from 'api/api'
import {getUID} from 'api/api'
import {goodsArr} from 'api/api'
import {cashier60,cashier80,kitchen60,kitchen80} from 'api/printermodels'


Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$request = request
Vue.prototype.url = urlColletion()
Vue.prototype.getUID = getUID
Vue.prototype.goodsArr = goodsArr
Vue.prototype.cashier60 = cashier60
Vue.prototype.cashier80 = cashier80
Vue.prototype.kitchen60 = kitchen60
Vue.prototype.kitchen80 = kitchen80


let goEasy = new GoEasy({
  appkey: 'BS-f7859ab35ae6453d8cca76020ece4d7c'
});
goEasy.subscribe({
  channel: 'WEB:PUSH:' + localStorage.getItem('rid'),
  onMessage: function (message) {
    let msg = JSON.parse(message.content)
    let type = msg.msgType
    switch (type) {
      case 'service': // 服务消息
        handService(msg.data)
        // console.log(type);
        break;
      case 'table-status': // 餐桌类型
        handTable(msg.data)
        // console.log(type);
        break;
      case 'order-status': // 订单消息
        handOrder(msg.data)
        break;
    }
  }
});









/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
console.log(app);

function handService(data) {
  app.$store.state.serviceStatus = data
}
function handTable(data) {
  app.$store.state.tableStatus = data
}
function handOrder(data) {
  app.$store.state.orderStatus = data
}


export default app;

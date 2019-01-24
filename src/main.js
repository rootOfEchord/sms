import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)
//自定义弹出框
Vue.prototype.$myMessage = function(data) {
  this.$message({
    message: data.msg,
    type: data.isOk ? 'success' : 'error',
    center: true
  });
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
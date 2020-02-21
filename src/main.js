import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './plugins/vant'
import './api/index'
import './tools/'
import plugin from './plugin/index'
import './assets/css/reset.css'
import './assets/font/iconfont.css'


Vue.config.productionTip = false
Vue.use(plugin)


const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vue

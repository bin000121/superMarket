import Vue from 'vue'
import App from './App'
import api from './api/api.js'
import uView from 'uview-ui'
Vue.config.productionTip = false
Vue.prototype.$api = api
App.mpType = 'app'
Vue.use(uView)
const app = new Vue({
    ...App
})
app.$mount()

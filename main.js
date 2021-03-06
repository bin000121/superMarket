import Vue from 'vue'
import App from './App'
import api from './api'

import * as tool from './utils/tool.js'
import uView from 'uview-ui'
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$tool = tool
App.mpType = 'app'
Vue.use(uView)
const app = new Vue({
    ...App
})
app.$mount()

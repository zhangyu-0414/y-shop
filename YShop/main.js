import App from './App'
import Vue from 'vue'
import {myRequest} from './util/api.js'
Vue.config.productionTip = false
Vue.prototype.$myRequest = myRequest;
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()


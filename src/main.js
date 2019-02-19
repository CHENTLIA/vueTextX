// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import YDUI from 'vue-ydui'
import store from './store'
import VueLazyload from 'vue-lazyload'
import 'vue-ydui/dist/ydui.rem.css'
import 'vue-ydui/dist/ydui.base.css'
import {Icons} from 'vue-ydui/dist/lib.rem/icons'
Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.use(YDUI)
Vue.use(VueLazyload, {
  error: '../static/image/error.jpg',
  loading: '../static/image/loading.gif'
  // attempt: 1
})
Vue.component(Icons.name, Icons)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

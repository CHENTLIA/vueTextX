import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    header: {
      show: true,
      title: '',
      icon: false
    },
    navbar: {
      show: false,
      info: '今日一刻',
      showInfo: '今日一刻'
    },
    navbarItem: ''
  },
  actions,
  mutations,
  getters
})

export default store

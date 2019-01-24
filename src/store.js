import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    realName: ''
  },
  mutations: {
    //设置token
    setToken(state, newData) {
      state.token = newData
    },
    setRealName(state, newData) {
      state.realName = newData
    }
  },
  actions: {

  }
})
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userMsg:sessionStorage["userMsg"]?JSON.parse(sessionStorage["userMsg"]): []
  },
  mutations: {

  },
  actions: {

  }
})

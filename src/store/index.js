import Vue from 'vue'
import Vuex from 'vuex'
import admin from './modules/admin'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    admin,
  },

  strict: process.env.NODE_ENV !== 'production'
})

export default store

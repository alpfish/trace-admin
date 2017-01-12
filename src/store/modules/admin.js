import Vue from 'vue'
import Api from 'src/libs/api'
import Cache from 'src/libs/cache'
import {
  TOKEN_KEY,
} from 'src/config'

const admin = {
  state: {
    auth: false, // Boolean or Obeject
  },

  mutations: {
    // 会员登录认证
    SET_AUTH(state, admin) {
      state.auth = admin === Object(admin) ? admin : false
    },
    CANCEL_AUTH(state) {
      state.auth = false
    },

  },
  // END mutations

  actions: {
    get_admin_by_token({commit, dispatch}, payload = {}) {
      if (!Cache.get(TOKEN_KEY))  {
        payload.error && payload.error()
        return
      }
      Api.request (
        {url: 'get_admin_by_token'},
        (res) => {
          console.log('TOKEN LOGIN');
          commit('SET_AUTH', res.data.admin)
          payload.success && payload.success()
        },
        (res) => {
          commit('CANCEL_AUTH')
          Cache.delete(TOKEN_KEY)
          payload.error && payload.error()
        }
      )
    },

    logout({commit}) {
      commit('CANCEL_AUTH')
      Cache.delete(TOKEN_KEY)
    },

  }
}

export default admin

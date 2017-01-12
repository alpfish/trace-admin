// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import store from './store'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from './views/Home'
import View from './views/View'
import My from './views/My'
import Login from './views/Login'

const routes = [{
  path: '/',
  component: Home,
  meta: { auth: true },
},{
  path: '/view',
  component: View,
  meta: { auth: true },
},{
  path: '/my',
  component: My,
  meta: { auth: true },
},{
  path: '/login',
  component: Login
},{
  path: '*',
  component: Home,
  meta: { auth: true },
}]

const router = new VueRouter({
  routes
})

// 路由前认证
router.beforeEach((to, from, next) => {
  if (!store.state.admin.auth && to.matched.some(record => record.meta.auth)) {
    store.dispatch('get_admin_by_token', {
      success: () => next(),
      error: () => next({
        path: '/login',
        query: { redirect: to.fullPath}
      })
    })
  } else {
    next()
  }
})

const FastClick = require('fastclick')
FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

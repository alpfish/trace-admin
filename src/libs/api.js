import Vue from 'vue'
import VueResource from 'vue-resource'
import Cache from './cache'
import {
  API_ROOT,
  TOKEN_KEY,
} from 'src/config'

Vue.use(VueResource)

// 响应拦截
Vue.http.interceptors.push((request, next) => {
  next((response) => {
    // 从 Authorization 头获取及缓存认证 token
    // 服务器端必须返回 'Access-Control-Expose-Headers:Authorization' 响应头，浏览器才能获取 Authorization 头。
    // https://github.com/vuejs/vue-resource/issues/215
    let token = response.headers.get('Authorization')
    if (token) {
      Cache.set(TOKEN_KEY, token, 7)
    }
  })
})

class Api {

  /**
   * [Api公共请求方法]
   * 通过回调函数返回搜索数据及错误回调
   *
   * @param Object params 请求参数
   * @param function success 成功回调
   * @param function error   失败回调
   *
   * @return function success 成功回调
   * @return function error   失败回调
   */
  request(options = {}, success, error) {

    let params = options.params === Object(options.params) ? options.params : {}

    // 返回认证 token
    // 使用 Authorization 头传送 token 会产生两次请求，故采用参数传送
    let token = Cache.get(TOKEN_KEY)
    if (token) Object.assign(params, { 'token': token })

    Vue.http({
        // 服务器地址
        root: API_ROOT,
        // api地址
        url: options.url || '',
        // 请求方法
        method: options.method || 'GET',
        // 参数
        params: params,
        // 限时
        timeout: 5000,
      })
      // 成功回调, 数据: response.data
      .then((response) => {
        success(response)
      }, (response) => { // 错误回调
        console.log(response);
        error && error(response)
        if (response.status >= 500) {
          console.log('服务器异常');
        }
      })
  }

}

export default new Api()

<template>
  <div>
    <x-header>修改密码</x-header>
    <div style="margin: 60px 15px 15px;">
      <p><icon type="warn" style="color:red;" v-show="error"></icon>&nbsp;{{error}}</p>
    </div>
    <form class="mui-input-group">
      <!-- 第一步 -->
      <div class="mui-input-row mui-password" v-show="!validated">
        <label for="old-password">验证密码</label>
        <input class="mui-input-password" id="old-password" v-model="password" type="password" placeholder="输入原来的密码">
      </div>
      <!-- 第二步 -->
      <div class="mui-input-row mui-password" v-show="validated">
        <label for="password">新密码</label>
        <input class="mui-input-password" id="password" v-model="password" type="password" placeholder="输入新的密码">
      </div>
    </form>

    <div class="mui-content-padded" style="margin-top: 15px;">
      <button type="button" class="mui-btn mui-btn-primary mui-btn-block"
       @click="onClickButton"
       :disabled="!password">{{ loading ? '处理中' : validated ? '确认修改' : '验证密码' }}</button></div>
  </div>
</template>
<script>
import { Icon } from 'vux'
import { XHeader } from 'components/ui/x-header'

import Api from 'src/libs/api'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Icon,
    XHeader,
  },
  data () {
    return {
      password: '',
      error: '',
      validated: false,
      loading: false,
    }
  },
  computed: {
    ...mapState({
      mobile: ({admin}) => admin.auth.mobile,
    }),
  },
  methods: {
    ...mapActions([
      'logout'
    ]),

    onClickButton() {
      if (this.validated) {
        this.resetPassword()
      } else {
        this.validatePassword()
      }
    },

    validatePassword() {
      this.loading = true
      Api.request(
        {
          url: 'get_token',
          method: 'POST',
          params: {
            mobile: this.mobile,
            password: this.password
          }
        },
        (res) => {
          this.loading = false
          this.validated = true
          this.password = ''
          this.error = ''
        },
        (res) => {
          this.loading = false
          this.validated = false
          this.error = '密码验证失败'
        }
      ) // END API
    },

    resetPassword() {
      this.loading = true
      Api.request(
        {
          url: 'reset_password',
          method: 'POST',
          params: {
            password: this.password
          }
        },
        (res) => {
          this.loading = false
          this.validated = true
          this.password = ''
          this.error = ''
          this.$router.push({
            path: '/handle-result',
            query: {
              type: 'safe_success',
              message: '修改成功',
              description: '请使用新密码登录',
              primary_button: '登录',
              primary_button_link: '/login',
              second_button: '首页',
              second_button_link: '/'
            }
          })
          // this.logout()
        },
        (res) => {
          this.loading = false
          this.validated = false
          this.error = '原密码错误'
        }
      ) // END API
    }
  },
}
</script>

<style>

</style>

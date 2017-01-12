<template>
  <div>
    <div style="text-align: center;">
      <i class="iconfont icon-ludan logo"></i>
    </div>
    <box gap='15px' v-show="error">
      <p style="color:red;"><icon type="warn"></icon>&nbsp;{{error}}</p>
    </box>
    <group>
      <x-input required type="number" title="手机" v-model="mobile" placeholder="输入手机号"></x-input>
      <x-input required type="password" title="密码" v-model="password" placeholder="输入密码"></x-input>
    </group>
    <box gap='15px'>
      <x-button type='primary' @click.native="login" :disabled="!mobile || !password"> {{ button_text }} </x-button>
    </box>
  </div>
</template>

<script>
import Api from 'src/libs/api'
import { Box, Group, Icon, XButton, XInput} from 'vux'

export default {
  components: {
    Box,
    Group,
    Icon,
    XButton,
    XInput,
  },
  data () {
    return {
      mobile: '',
      password: '',
      error: '',
      button_text: '登录',
      redirect: decodeURIComponent(this.$route.query.redirect || '/'),
    }
  },
  methods: {
    login() {
      this.button_text = '登录中'

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
          this.button_text = '登录成功'
          this.$router.replace(this.redirect)
        },
        (res) => {
          console.log(res);
          if (res.data && res.data.errors) {
            let errors = res.data.errors
            if (errors.password) this.error = errors.password[0]
            if (errors.mobile) this.error = errors.mobile[0]
          } else {
            this.error = '登录失败'
          }
          this.button_text = '登录'
        }
      ) // END API
    },
  }
}
</script>

<style>
.logo {
  font-size: 100px;
  color: #ddd;
}
</style>

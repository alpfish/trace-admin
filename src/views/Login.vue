<template>
  <div>
    <div style="text-align: center;">
      <i class="iconfont icon-my02 logo"></i>
    </div>

    <form class="mui-input-group">
      <div class="mui-input-row">
        <label for="mobile">手机</label>
        <input class="mui-input-clear" id="mobile" v-model="mobile" type="tel" placeholder="输入手机号" autofocus="autofocus">
      </div>
      <div class="mui-input-row mui-password">
        <label for="password">密码</label>
        <input class="mui-input-password" id="password" v-model="password" type="password" placeholder="输入密码">
      </div>
    </form>

    <box gap='15px' v-show="error">
      <icon type="warn" style="color:red;"></icon>&nbsp;{{error}}
    </box>

    <div class="mui-content-padded">
      <button type="button" class="mui-btn mui-btn-primary mui-btn-block"
       @click="login"
       :disabled="!mobile || !password">
       {{ button_text }}</button></div>
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
      console.log('ok');
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
  },
  mounted() {
    // 输入框聚集并弹出软键盘
    var nativeWebview, imm, InputMethodManager;
    var initNativeObjects = function() {
        if (mui.os.android) {
            var main = plus.android.runtimeMainActivity();
            var Context = plus.android.importClass("android.content.Context");
            InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
            imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
        } else {
            nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
        }
    };
    var showSoftInput = function() {
        if (mui.os.android) {
            imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
        } else {
            nativeWebview.plusCallMethod({
                "setKeyboardDisplayRequiresUserAction": false
            });
        }
        setTimeout(function() {
           //此处可写具体逻辑设置获取焦点的input
           var inputElem = document.getElementById('mobile');
                  inputElem.focus();
        }, 500);
    };
    mui.plusReady(function() {
        initNativeObjects();
        showSoftInput();
    });
  },
}
</script>

<style>
.logo {
  font-size: 80px;
  color: #ddd;
}
</style>

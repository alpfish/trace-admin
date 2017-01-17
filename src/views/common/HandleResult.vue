<template>
  <div>
    <div class="mui-content-padded">
      <div class="msg-icon-box">
        <icon :type="type" class="icon_big msg-icon"></icon>
      </div>
      <h2 style="text-align:center;">{{ message }}</h2>
      <p  style="text-align:center;">{{ description }}</p>
      <br/>
      <button type="button" @click="onPrimaryButton" class="mui-btn mui-btn-primary mui-btn-block" v-if="primary_button && primary_button_link">{{ primary_button }}</button>
      <button type="button" @click="onSecondButton" class="mui-btn mui-btn-block mui-btn-outlined">{{ second_button }}</button>
    </div>
  </div>
</template>
<script>
import { Icon } from 'vux'

export default {
  components: {
    Icon,
  },
  data () {
    return {
      // success, info, safe_success, safe_warn
      type: this.$route.query.type || 'safe_success',
      message: this.$route.query.message || '操作成功',
      description: this.$route.query.description || '',
      primary_button: this.$route.query.primary_button || '',
      primary_button_link: this.$route.query.primary_button_link || '',
      second_button: this.$route.query.second_button || '',
      second_button_link: this.$route.query.second_button_link || '',
    }
  },
  methods: {
    // 推荐操作
    onPrimaryButton() {
      if (this.primary_button === '返回') {
        this.$router.back()
      } else {
        this.$router.push(this.primary_button_link)
      }
    },

    // 辅助操作
    onSecondButton() {
      if (this.second_button === '返回') {
        this.$router.back()
      } else {
        this.$router.push(this.second_button_link)
      }
    }
  }
}
</script>

<style scoped lang="less">
@import '../../styles/theme.less';

.msg-icon-box {
  width: 100%;
  .msg-icon {
    display: block;
    text-align: center;
    line-height: 160px;
  }
}

.weui_icon_success:before {
    color: @theme-color;
}
.weui_icon_safe_success:before {
    color: @theme-color;
}
</style>

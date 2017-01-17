<template>
  <view-box>
    <div class="avatar-bg">
      <div class="x-img-wrap">
        <img src="../assets/avatar.gif">
      </div>
      <p>{{name}}</p>
    </div>

    <ul class="mui-table-view">
      <li class="mui-table-view-cell">
        </i><router-link to='/my/reset_password' class="mui-navigate-right">修改密码</router-link>
      </li>
    </ul>

    <div class="mui-content-padded" style="margin-top: 15px;">
      <button type="button" class="mui-btn mui-btn-primary mui-btn-block"
       @click="exit">退出登录</button></div>
  </view-box>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { ViewBox } from 'components/ui/view-box'

export default {
  components: {
    ViewBox,
  },
  computed: {
    ...mapState({
      name: ({admin}) => admin.auth.name,
    }),
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    exit() {
      this.logout()
      this.$router.push('/')
    },
  },
}
</script>

<style scoped lang="less">
@import "../styles/theme.less";

.avatar-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 180px;
  text-align: center;
  // background: lighten(@theme-color, 30%);
}

.x-img-wrap {
  width: 100px;
  height: 100px;
  border-radius: 100px;
  overflow: hidden;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
  img {
    width: 100%;
    height: auto;
  }
}
</style>

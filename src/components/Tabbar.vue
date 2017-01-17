<template>
  <div>
    <tabbar v-show="show">
      <tabbar-item :link="{path:'/'}">
        <i slot='icon' class="iconfont icon-operation" :class="{'active': isHome}"></i>
        <span slot="label" :class="{'active': isHome}">操作</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/view'}">
        <i slot='icon' class="iconfont icon-view" :class="{'active': isView}"></i>
        <span slot="label" :class="{'active': isView}">查看</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/my'}">
        <i slot='icon' class="iconfont icon-my" :class="{'active': isMy}"></i>
        <span slot="label" :class="{'active': isMy}">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem,
  },
  data () {
    return {
    }
  },
  computed: {
    show() {
      let path = this.$route.path
      return !this.inputing && (path == '/' || path == '/view' || path == '/my')
    },
    isHome () {
      return this.$route.path == '/'
    },
    isView () {
      return this.$route.path == '/view'
    },
    isMy () {
      return this.$route.path == '/my'
    },
  }
}
</script>

<style scoped lang="less">
@import "../styles/theme.less";

.iconfont {
  font-size: 24px;
  color: #666;
}
* {
  color: #666;
}
.active {
  color: @primary-color;
}
</style>

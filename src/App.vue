<template>
  <div>
    <view-box>
      <router-view></router-view>
      <tabbar slot="bottom"></tabbar>
    </view-box>
  </div>
</template>

<script>
import Tabbar from 'components/Tabbar'
import { ViewBox } from 'components/ui/view-box/index.js'

export default {
  components: {
    Tabbar,
    ViewBox,
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  max-width: 750px!important;
  background-color: #fbf9fe;
}
</style>

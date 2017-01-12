<template>
  <div>
    <router-view></router-view>
    <tabbar></tabbar>
  </div>
</template>

<script>
import Tabbar from 'components/Tabbar'
export default {
  components: {
    Tabbar,
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
  background-color: #fbf9fe;
}
</style>

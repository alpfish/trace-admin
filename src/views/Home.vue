<template>
  <div>
    <!-- header AD -->
    <div style="margin: 10px;overflow: hidden;">
      <masker style="border-radius: 2px;" color="#04BE02" :opacity="0.1">
        <img class="m-img" src="../assets/home_ad.jpg">
        <div slot="content" class="m-title">
          山鸡婆婆
          <br/>
          <span class="m-time">健康看得见</span>
        </div>
      </masker>
    </div>
    <!-- actions -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
          v-for="action of actions"
          @click="doAction({ path:action.path, action:actions.action })">
          <i class="iconfont" :class="'icon-'+action.icon"></i>
          <div class="mui-media-body">{{action.name}}</div></li>
      </ul>
		</div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>

  </div>
</template>

<script>
import { Masker, Flexbox, FlexboxItem, Divider } from 'vux'

export default {
  components: {
    Masker,
    Flexbox,
    FlexboxItem,
    Divider,
  },
  data () {
    return {
      actions: [
        {
          action: 'feed',
          icon: 'chook',
          name: '喂鸡',
          path: '/my'
        },{
          action: 'pick_egg',
          icon: 'egg',
          name: '捡蛋',
          path: '/my'
        },{
          action: 'clean',
          icon: 'clean',
          name: '清洁',
          path: '/my'
        },{
          action: 'number',
          icon: 'number',
          name: '编号',
          path: '/my'
        },{
          action: 'change_number',
          icon: 'change_number',
          name: '换号',
          path: '/my'
        },{
          action: 'change_locale',
          icon: 'change_locale',
          name: '转点',
          path: '/my'
        },{
          action: 'immunity',
          icon: 'immunity',
          name: '免疫',
          path: '/my'
        },{
          action: 'use_drug',
          icon: 'use_drug',
          name: '用药',
          path: '/my'
        },{
          action: 'lose',
          icon: 'lose',
          name: '报损',
          path: '/my'
        },{
          action: 'sold',
          icon: 'sold',
          name: '卖出',
          path: '/my'
        },{
          action: 'account',
          icon: 'account',
          name: '记账',
          path: '/my'
        }
      ], // END actions

    }
  },
  methods: {
    doAction(payload) {
      this.$router.push({path: payload.path})
    }
  }
}
</script>

<style scoped lang="less">
@import "../styles/theme.less";

.m-img {
  padding-bottom: 0%;
  display: block;
  position: relative;
  max-width: 100%;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  border-radius: 2px;
}

.m-title {
  color: #fff;
  text-align: center;
  // text-shadow: 0 0 2px rgba(0, 0, 0, .5);
  font-weight: 500;
  font-size: 28px;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}

.m-time {
  font-size: 12px;
  padding-top: 4px;
  border-top: 1px solid #f0f0f0;
  display: inline-block;
  margin-top: 5px;
}

.iconfont {
  font-size: 30px;
}
</style>

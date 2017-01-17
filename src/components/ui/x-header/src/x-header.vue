<!-- XHeader -->
<template>
  <header id="header" class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <h1 class="mui-title mui-pull-left"><slot>{{title}}</slot></h1>
  </header>
</template>

<script>

export default {
  props: {
    title: String,
  },
};
</script>

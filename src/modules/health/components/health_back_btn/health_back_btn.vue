<template>
  <div class="button-wrapper">
    <router-link tag="button" class="btn btn-xl btn-shadow-color" :to="{ name: 'healthIndex'}">回到健康</router-link>
  </div>
</template>

<script >
export default {
  name: "healthBackBtn",
  data(){
    return {};
  },
  props:{}
};
</script>
<style scoped lang="less" rel="stylesheet/less">
  .button-wrapper{
    position: fixed !important;
    bottom: 100px;
    left:0;
    right:0;
    z-index: 999 !important;
    text-align: center;
  }
</style>

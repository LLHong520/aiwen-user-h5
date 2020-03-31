<template>
  <!-- 返回顶部和资讯跳转医生列表 -->
  <div id="go_top" class="go_top">
    <a class="icon_to_top" href="javascript:;"></a>
  </div>
  <!-- / -->
</template>

<script type="text/ecmascript-6">
export default {
  name:"toTop",
  data(){
    return {};
  }
};
</script>

<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
//返回顶部
#go_top {
  .opacity(1);
  width: 88/@r;
  height: 88/@r;
  color: #fff;
  position: fixed;
  right: 14px;
  bottom: 288/@r;
  z-index: 10;
  font-size: 40px;
  display: none;
  z-index: 99;
  .border-radius(50%);
  .icon_to_top{
    width: 88/@r;
    height: 88/@r;
    background:url('./images/icon_top@3x.png') center no-repeat;
    .background-size(100% auto);
    display: block;
  }
  a {
    display: block;
    color: #fff;
  }
}

</style>

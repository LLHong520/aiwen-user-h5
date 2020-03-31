<template>
  <div class="no-result" v-cloak>
    <slot name="iconImg">
      <div class="no-result-icon"></div>
    </slot>
    <slot name="text">
      <p class="no-result-text">{{title}}</p>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ""
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
@r:75rem;
  .no-result{
    text-align: center;
    margin-top: 30px;
    .no-result-icon{
      width: 390/@r;
      height: 400/@r;
      margin: 0 auto;
      background: url('./bg_null_normal@2x.png') no-repeat center;
      background-size: 390/@r 400/@r;
    }
    .no-result-text{
      font-size: 14px;
      color: #999;
    }
  }
</style>

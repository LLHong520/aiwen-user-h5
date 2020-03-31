<template>
  <div class="no-result" :class="{'isSearch':isSearch}" v-cloak>
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
      },
      isSearch:{
        type: Boolean,
        default:false
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
    padding-bottom: 20px;
    .no-result-icon{
      width: 215/@r;
      height: 251/@r;
      margin: 30px auto;
      background: url('./no-result@2x.png') no-repeat center;
      background-size: 215/@r 251/@r;
    }
    .no-art-icon{
      width: 186/@r;
      height: 180/@r;
      margin: 30px auto;
      background: url('@{assets}/images/icons/graph@2x.png') no-repeat center;
      background-size: 186/@r 180/@r;
    }
    .no-result-text{
      margin-top: 30px;
      font-size: 18px;
      color: #999;
    }
    &.isSearch{
      .no-result-text{
        font-size: 13px;
        color: #AEB1B6;
        padding-top: 30/@r;
        margin-top: 0;
      }
      .no-result-icon{
        width: 270/@r;
        height: 260/@r;
        background: url(./bg_null_search@2x.png) no-repeat;
        background-size: 260/@r 260/@r;
        margin: 260/@r auto 0;
      }
    }
  }
</style>

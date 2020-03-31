<template>
  <h5 class="operationTopic-title">
    <span class="title">{{dataSource.title}}</span>
  </h5>
</template>

<script>
export default {
  name: "topicTitle",
  props: {
    dataSource: {
      type: Object,
      default: () => ({
        title: ""
      })
    }
  }
};
</script>

<style lang="less" scoped>
  .operationTopic-title {
    text-align: center;
    color: #fff;
    font-family:PingFangSC-Semibold,PingFang SC;
    line-height:25px;
    padding: 8px 60px;
    .title{
      white-space: pre-wrap;
      word-break: break-all;
      font-size: 18px;
      font-weight:600;
      position: relative;
      letter-spacing:1px;
      display: inline-block;
      box-sizing: border-box;
      text-align: left;
      &::before,&::after{
        position: absolute;
        content: '';
        width:32px;
        height:2px;
        border-radius:1px;
        left: -40px;
        top: 50%;
        transform: translateY(-50%);
        background:linear-gradient(90deg,rgba(255,255,255,0.09) 0%,rgba(255,255,255,0.5) 100%);
      }
      &::after{
        background:linear-gradient(270deg,rgba(255,255,255,0.09) 0%,rgba(255,255,255,0.5) 100%);
        left: auto;
        right: -40px;
      }
    }
  }
</style>
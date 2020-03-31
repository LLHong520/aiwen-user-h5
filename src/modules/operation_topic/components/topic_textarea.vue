<template>
  <div class="operationTopic-textWrapper">
    <div class="textarea-content">
      <h5 class="textarea-title" :style="{background: color || '#1e82f8'}">{{dataSource.title}}</h5>
      <p class="textarea-description" v-html="formatContent"></p>
      <div class="textarea--gradient"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "topicTextarea",
  props: {
    dataSource: {
      type: Object,
      default: () => ({
        title: "",
        content: "",
      })
    },
    color: {
      type: String,
      default: ""
    }
  },
  computed: {
    formatContent() {
      if(!this.dataSource.content) {
        return "";
      }
      return this.dataSource.content.replace(/\n|\r\n/g, "<br/>");
    }
  }
};
</script>

<style lang="less" scoped>
  .operationTopic-textWrapper{
    font-family:PingFangSC-Regular,PingFang SC;
    letter-spacing: 1px;
    padding: 8px 23px;
    box-sizing: border-box;
    .textarea-content{
      box-sizing: border-box;
      position: relative;
      min-height:126px;
      background:rgba(255,255,255,0.15);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.6),0 0 0 7px rgba(255,255,255,0.15);
      border-radius:4px;
      color: #fff;
      display: flex;
      flex-direction: column;
      .textarea-title{
        max-width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: relative;
        &::before,&::after{
          content: "";
          width:4px;
          height:4px;
          background:rgba(255,255,255,1);
          opacity:0.3;
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-50%) rotateZ(45deg);
        }
        &::after{
          left: auto;
          right: 8px;
        }
        flex-shrink: 0;
        box-sizing: border-box;
        padding: 5px 22px;
        font-size: 16px;
        font-weight: 600;
        line-height:22px;
        margin: 0 auto 12px;
        height:32px;
        background:#1E82F8;
        border-radius:0px 0px 12px 12px;
      }
      .textarea-description{
        flex-shrink: 0;
        margin: 0 14px 15px;
        font-size: 12px;
        line-height:18px;
      }
      .textarea--gradient{
        position: absolute;
        right: 0;
        top: 0;
        background:linear-gradient(146deg,transparent 0%,transparent 40%, rgba(238,238,238,0.08) 72%, transparent 72%,transparent 100%,) no-repeat;
        opacity:0.5;
        width: 100%;
        height: 80%;
      }
    }
  }
</style>
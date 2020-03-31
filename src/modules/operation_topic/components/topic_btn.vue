<template>
  <div :class="[{'isFixed': dataSource.bottom == 'true'},'operationTopic-btn-wrapper']">
    <button @click="hadnleClick" :style="btnStyle" class="operationTopic-btn-view">{{dataSource.title}}
    </button>
  </div>
</template>

<script>
import btnBg from "./assets/img/btn_bg.png";
export default {
  name: "topicBtn",
  props: {
    dataSource: {
      type: Object,
      default: () => ({
        title: "",
        color: "",
        bottom: false,
        url: ""
      })
    },
  },
  data() {
    return {
      btnStyle: {
        background: `${this.dataSource.color || "#FF8855"} no-repeat 100% 100%`,
        backgroundImage:`url(${btnBg})`,
        backgroundPosition: "center"
      }
    };
  },
  watch: {
    "dataSource.color": function(val, old) {
      if(old!==val) {
        this.btnStyle.background = `${val} no-repeat 100% 100%`;
      }
    }
  },
  methods: {
    hadnleClick() {
      if(this.dataSource.url) {
        window.location = this.dataSource.url;
      }
    }
  }
};
</script>

<style lang="less" scoped>
  .operationTopic-btn-wrapper{
    width: 100%;
    padding: 8px 15px 12px;
    box-sizing: border-box;
    font-family:PingFangSC-Medium,PingFang SC;
    position: relative;
    z-index: 999;
    &.isFixed{
      position: fixed;
      bottom: 0;
      left: 0;
    }
    .operationTopic-btn-view{
      width: 100%;
      padding: 12px 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-radius: 23px;
      border:2px solid rgba(255,255,255,0.5);
      line-height:22px;
      color: #fff;
      font-weight:500;
      font-size:16px;
      position: relative;
      outline: none;
      &:active{
        opacity: 0.9;
      }
    }
  }
</style>
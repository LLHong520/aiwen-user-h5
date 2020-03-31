<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop>
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="title" v-if="title!=''">{{title}}</p>
          <p class="text">{{text}}</p>
          <div class="operate">
            <div @click="confirm" class="operate-btn c_main">{{confirmBtnText}}&nbsp;<span v-if="show_time">({{timer}}s)</span></div>
            <div @click="saveBack" class="operate-btn c_bule_ctrl">{{saveBtnText}}</div>
            <div @click="cancel" class="operate-btn c_bule_ctrl">{{cancelBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: ""
      },
      title: {
        type: String,
        default: "提示"
      },
      confirmBtnText: {
        type: String,
        default: "确定"
      },
      cancelBtnText: {
        type: String,
        default: "取消"
      },
      saveBtnText:{
        type: String,
        default: "保存并返回"
      },
      show_time:{
        type:Boolean,
        default: false
      },
      timer:{
        type:Number,
        default: 3
      }
    },
    data() {
      return {
        showFlag: false,
      };
    },
    methods: {
      show() {
        this.showFlag = true;
      },
      hide() {
        this.showFlag = false;
      },
      cancel() {
        this.hide();
        this.$emit("cancel");
      },
      confirm() {
        this.hide();
        this.$emit("confirm");
      },
      saveBack(){
        this.$emit("saveBack");
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
  .c_bule_ctrl{
    color:#458EE5!important
  }
  .confirm{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9998;
    background-color:rgba(0,0,0,.3);
    &.confirm-fade-enter-active{
      .animation(confirm-fadein 0.3s);
      .confirm-content{
        .animation(confirm-zoom 0.3s);
      }
    }
    .confirm-wrapper{
      position: absolute;
      top: 50%;
      left: 50%;
      .transform(translate(-50%, -50%));
      z-index: 999;
      .confirm-content{
        width: 270px;
        border-radius: 13px;
        background: #fff;

        .title{
          padding: 10px 15px;
          line-height: 22px;
          text-align: center;
          font-size: 14px;
          color: #333;
        }
        .text{
          padding: 25px 15px;
          line-height: 22px;
          text-align: center;
          .font_2xl;
          color: #333;
        }
        .operate{
          text-align: center;
          font-size: 16px;;
          .operate-btn{
            line-height: 22px;
            padding: 10px 0;
            border-top: 1px solid #CFCFCF;
            color: #999;
          }
        }
      }
    }
  }

  .keyframes(confirm-fadein,{
    from {
      .opacity(0);
    }

    to {
      .opacity(1);
    }
  });


  .keyframes(confirm-zoom,{
    0%
      {
        .transform(scale(0));
      }
    50%
      {
        .transform(scale(1.1));
      }
    100%
      {
        .transform(scale(1));
      }
  });
</style>

<template>
  <div>
    <transition name="fade">
      <div class="action_mask" v-show="showFlag" @click="hide()"></div>
    </transition>
    <transition name="pop-form-fade">
      <div class="pop-form" v-show="showFlag" @click.stop>
        <div class="pop-form-wrapper">
          <div class="operate">
            <div @click="cancel" class="operate-btn left">{{cancelBtnText}}</div>
            <div class="title">{{title}}</div>
            <div @click="confirm" class="operate-btn">{{confirmBtnText}}</div>
          </div>
          <div class="pop-form-content">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ""
      },
      confirmBtnText: {
        type: String,
        default: "确定"
      },
      cancelBtnText: {
        type: String,
        default: "取消"
      }
    },
    data() {
      return {
        showFlag: false
      };
    },
    methods: {
      show() {
        this.showFlag = true;
        $("body").addClass("full-body");
      },
      hide() {
        this.showFlag = false;
        $("body").removeClass("full-body");
      },
      cancel() {
        this.hide();
        this.$emit("cancel");
      },
      confirm() {
        this.$emit("confirm");
      }
    },
    destroyed() {
      $("body").removeClass("full-body");
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
 .action_mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
    z-index: 8;
  }
  .pop-form{
    position: absolute;
    width: 100%;
    left: 0;
    // right: 0;
    // top: 0;
    bottom: 0;
    z-index: 9989;
    background-color:rgba(0,0,0,.3);
    // .pop-form-wrapper{
    //     .animation(pop-form-zoom 0.5s);
    // }
    // &.pop-form-fade-enter-active{
    //     .animation(confirm-fadein 0.5s);
    // }
    .pop-form-wrapper{
      position: absolute;
      width: 100%;
      left:0;
      // right: 0;
      bottom:0;
      // top: 0;
      z-index: 999;
      background-color: #fff;

      .operate {
        .flexbox();
        text-align: center;
        font-size: 14px;
        border-bottom:1px solid @bor_c;
        background-color: #f2f2f2;
        .operate-btn {
          .flex(1);
          line-height: 22px;
          .font_xl;
          padding: 10px 0;
          color: #333;
          &.left {
            color: #78C1BE;
            // border-right: 1px solid #eee;
          }
        }


        .title {
          .flex(3);
          line-height: 22px;
          padding: 10px 0;
          .font_2xl;
          color: #333;
          &.left {
            border-right: 1px solid #eee;
          }
        }

      }

      .pop-form-content{
        border-radius: 13px;
        background: #fff;
        .text{
          padding: 19px 15px;
          line-height: 22px;
          text-align: center;
          font-size: 14px;
          color: #747474;
        }
      }
    }
  }

  // .keyframes(pop-form-fadein,{
  //   from {
  //     .opacity(0);
  //   }

  //   to {
  //     .opacity(1);
  //   }
  // });


  // .keyframes(pop-form-zoom,{
  //   from {
  //     .transform(translate3d(0,100%,0));
  //   }

  //   to {
  //     .transform(translate3d(0,0,0));
  //   }
  // });


.pop-form-fade-active {
  animation: bounce-in .5s;
}
.pop-form-fade-active {
  animation: bounce-out .5s;
}
@keyframes bounce-in {
  0% {
    transform: translateY(300px);
  }

  100% {
    transform: translateY(0px);
  }
}
@keyframes bounce-out {
   0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(300px);
  }
}

.fade-enter-active {
  animation: fade-in .5s;
}
.fade-leave-active {
  animation: fade-out .5s;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.5;
  }
}
@keyframes fade-out {
   0% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}
</style>

<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop>
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="title" v-if="title!=''">{{title}}</p>
          <p class="text">{{text}}</p>
          <div class="operate">
            <div @click="cancel" class="operate-btn left">{{cancelBtnText}}</div>
            <div @click="confirm" class="operate-btn">{{confirmBtnText}}</div>
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
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
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
          .font_xl;
          // font-size: 14px;
          color: #333;
        }
        .text{
          padding: 25px 15px;
          line-height: 22px;
          text-align: center;
          .font_xl;
          color: #333;
        }
        .operate{
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          text-align: center;
          font-size: 16px;;
          .operate-btn{
            -webkit-box-flex: 1;
                -ms-flex: 1;
                    flex: 1;
            line-height: 22px;
            padding: 10px 0;
            border-top: 1px solid @bor_c;
            color: #999;
            &.left{
              color: #78C1BE;
              border-right: 1px solid #eee;
            }
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

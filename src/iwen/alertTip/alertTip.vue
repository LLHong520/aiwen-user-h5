<template>
  <div class="alet_container">
    <section class="tip_text_container">
      <div class="tip_icon">
        <span></span>
        <span></span>
      </div>
      <p class="tip_text">{{alertText}}</p>
      <div class="confrim" @click="closeTip">{{confirmText}}</div>
    </section>
  </div>
</template>

<script>
  /**
   * [positionY description]
   * @type {Number}
   *
   * <alert-tip
     alertText="未登录"
     @closeTip="load_ad_banners"
     >
     </alert-tip>
   */
  export default {
    data() {
      return {
        positionY: 0,
        timer: null,
      };
    },
    mounted() {},
    props: {
      alertText:{
        type:String,
        default:"提示信息"
      },
      confirmText:{
        type:String,
        default:"确定"
      },
    },
    methods: {
      closeTip() {
        this.$emit("closeTip");
      }
    }
  };

</script>

<style lang="less" scoped>
  @assets: "~@/assets";
  @import "@{assets}/css/flex.less";
  @import "@{assets}/css/fix.less";
  @keyframes tipMove {
    0% {
      transform:translate(-50%, -50%) scale(1);
    }
    35% {
      transform:translate(-50%, -50%) scale(.8);
    }
    70% {
      transform:translate(-50%, -50%) scale(1.1);
    }
    100% {
      transform:translate(-50%, -50%) scale(1);
    }
  }

  .alet_container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background-color: rgba(0, 0, 0, .1);
  }

  .tip_text_container {
    // border:1px solid @bor_c;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 270px;
    animation: tipMove .4s;
    background-color: rgba(255, 255, 255, 1);
    padding-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    .tip_icon {
      width: 40px;
      height: 40px;
      border: 0.15rem solid #f8cb86;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      span:nth-of-type(1) {
        width: 5px;
        height: 20px;
        background-color: #f8cb86;
      }
      span:nth-of-type(2) {
        width: 5px;
        height: 5px;
        border: 1px;
        border-radius: 50%;
        margin-top: 5px;
        background-color: #f8cb86;
      }
    }
    .tip_text {
      color: #333;
      .font_2xl;
      text-align: center;
      margin-top: 15px;
      padding: 10px;
    }
    .confrim {
      color: #fff;
      font-size: 16px;
      margin-top: 20px;
      background-color: @main_c;
      width: 100%;
      text-align: center;
      line-height: 40px;
      border: 1px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }

</style>

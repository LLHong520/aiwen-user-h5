<template>
  <transition name="pop-win-fade">
    <div class="pop-win" v-show="showFlag">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {},
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

@import "../../assets/css/flex.less";
@import "../../assets/css/fix.less";
  .pop-win{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9989;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #fff;
    &.pop-win-fade-enter-active{
        .animation(pop-win-fadein 0.5s);
    }
  }

  .keyframes(pop-win-fadein,{
    from {
      .transform(translateX(100%));
    }

    to {
      .transform(translateX(0));
    }
  });
</style>

<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll";

  export default {
    props: {
      startY: {
        type: Number,
        default: 0
      },
      probeType: {
        type: Number,
        default: 3
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 200
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll();
      }, 200);
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return;
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          startY: this.startY,
          probeType: this.probeType,
          click: this.click
        });
        if (this.listenScroll) {
          let me = this;
          this.scroll.on("scroll", (pos) => {
            // let goTop = $("#go_top");
            // if (Math.abs(pos.y) > 600) {
            //   goTop.css("display", "block");
            //   goTop.click(function () {
            //     me.scroll.scrollTo(0,0);
            //   });
            // }else{
            //   goTop.css("display", "none");
            // }
            me.$emit("scroll", pos);
          });
        }

        this.scroll.on("touchEnd", () => {

        });


        if (this.beforeScroll) {
          this.scroll.on("beforeScrollStart", () => {
            this.$emit("beforeScroll");
          });
        }
      },
      disable() {
        this.scroll && this.scroll.disable();
      },
      enable() {
        this.scroll && this.scroll.enable();
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
      }
    },
    watch: {
      "data":{
        handler(a,b) {
          setTimeout(() => {
            this.refresh();
          }, this.refreshDelay);
        },
        deep:true
      }
    },
    updated(){
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>

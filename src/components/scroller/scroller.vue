<template>
  <scroller ref="scroller">
  <slot></slot>
</scroller>
</template>

<script>
import Vue from "vue";
import VueScroller from "vue-scroller";
Vue.use(VueScroller);

export default {
  props: {
    refresh: {
      type: Function,
      default: function(){}
    },
    infinite: {
      type: Function,
      default: function(){}
    }
  },
  mounted() {
    // let This=this;
    // utils.addEvent(This.$refs.scroller.$el,"touchmove",function(){
    //   // console.log(This.$refs.scroller.getPosition())
    // });
    // setTimeout(function(){
    //   This.$refs.scroller.scrollBy(0,200);
    //   // This.$refs.scroller.scrollTo(0,500)
    // },10000);
  },
  methods: {}
};
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>

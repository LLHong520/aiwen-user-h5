<!--
loading ==>加载中
loadFn ==>点击或滚动加载时执行的函数
title ==>未加载时的按钮文字
scroll_load ==>是否开启滚动加载 开启则滚动到页面底部就会加载，否则点击才会加载
 -->
<template>
  <div class="load-btn" @click='clickFn'>
     <div class="loading" :class="{'white':isWhite}" v-if="loading">
       <img width="24" height="24" src="./loading.gif">
       <!-- <span></span>正在加载内容 -->
     </div>
      <div class="loading"  v-if="!loading">{{title}}</div>
  </div>
</template>
<script>
  export default {
    name:"loading-btn",
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      loadFn: {
        type: Function,
        default: function(){}
      },
      title:{
        type:String,
        default:"点击加载更多"
      },
      scroll_load:{
        type:Boolean,
        default:false
      },
      isWhite:{
        type:Boolean,
        default:false
      },
    },
    created (){
      let This=this;
      if(this.scroll_load){
        This.$nextTick(function(){
          let wrapper_inner = $(this.getScrollEle());
          wrapper_inner.scroll(This.scrollHandler);
        });
      }
    },
    methods: {
      scrollHandler() {
        let This=this;
        let wrapper_inner = $(this.getScrollEle());
        if($(".load-btn").size()>0){
          let btn_top=$(".load-btn").eq(0).offset().top;
          let scrollTop=wrapper_inner.scrollTop();
          if(btn_top<(platformInfo.deviceInfo.height+scrollTop)&&!This.loading){
            This.$emit("loadFn");
          }
        }
      },
      unbindScrollFn() {
        let wrapper_inner = $(this.getScrollEle());
        wrapper_inner.off("scroll",this.scrollHandler);
      },
      clickFn() {
        this.$emit("loadFn","click");
      },//获取添加滚动事件的元素
      getScrollEle() {
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var scrollEle=null;

        if(isiOS&&platformInfo.isWeibo){
          scrollEle="#wrapper__inner";
        }else{
          scrollEle=window;
        }

        return scrollEle;
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";

  .loading{
    width: 100%;
    text-align: center;
    padding: 15px 0px;
    background-color: #fff;
    border-top: 1px solid #EFEFEF;
    color:#999;
    cursor: pointer;
    .font_xl;
    .desc{
      line-height: 20px;
      .font_s;
      color:#ccc;
      padding: 15px 0;
    }
  }
  .loading.white{
    background-color: #fff;
  }
</style>

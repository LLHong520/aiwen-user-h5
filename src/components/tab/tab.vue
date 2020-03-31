<template>
  <!-- nav -->
  <div class="fixed_scroll swiper_tab_container">
    <ul class="swiper_tab_wrapper topics_nav clearfix">
      <li v-for="(elem,key) in tabs" :key="elem.key" class="swiper_tab_cell" :class="{'active':key==current}" @click="changeTab(key)">
        <a href="javascript:void(0);">{{elem}}</a>
      </li>
    </ul>
  </div>
  <!-- /nav -->
</template>
<script>
  export default {
    props: {
      changeCallBack:{
        type: Function,
        default:()=>{}
      },
      tabs:{
        type: Array,
        default:[]
      },
      currentIndex:{
        type: Number,
        default:0
      }
    },
    data() {
      return {
        current:0
      };
    },
    methods: {
      changeTab(index) {
        this.current=index;
        this.$emit("changeCallBack",index);
      },
      reset() {
        this.changeTab(0);
      }
    },
    watch:{
      "currentIndex"(val){
        this.current=val;
      }
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
/** tab 切换**/
.swiper_tab_container{
  background-color: #fff;
 .swiper_tab_wrapper{
  //  height: 45px;
   width: 100%;
   .transition(transform .5s ease 0s);
   border-bottom: 1px solid @bor_c;
   .flexbox();
 }

 .swiper_tab_cell{
   line-height: 45px;
   display: inline-block;
   .flex(1);
   text-align: center;
   padding: 0 15px;
   a{
     color: #999;
     .font_xl;
     display: block;
     margin: 0px 0;
     border-bottom: 4px solid #fff;
     margin: 0 auto;
     position: relative;
     &:after{
       content: ' ';
       position: absolute;
       left: 50%;
       bottom: -4px;
       .transform(translateX(-32/@r));
       width: 64/@r;
       height: 4px;
       background-color: #fff;
       .border-radius(4px);
     }
   }
   &.active a{
     color: @main_c;
     &:after{
       background-color: @main_c;
     }
   }
 }
}
</style>

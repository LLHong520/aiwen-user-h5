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
  margin-top: 0;
  background-color: #F6F7FA;
  height: 104/@r;
  line-height: 104/@r;
 .swiper_tab_wrapper{
  //  height: 45px;
   width: 100%;
   .transition(transform .5s ease 0s);
   border-bottom: 0;
   .flexbox();
 }

 .swiper_tab_cell{
   display: inline-block;
   text-align: center;
   padding: 0 15px;
   background-color: #F6F7FA;
   line-height: 104/@r;
   width: auto;
   a{
     color: #999;
     .font_xl;
     display: block;
     margin: 0px 0;
     margin: 0 auto;
     position: relative;
   }
   &.active a{
     background: url(line.gif) no-repeat center 76/@r;
     background-size: 36/@r 2px;
     color:#2688fc
   }
 }
}
</style>

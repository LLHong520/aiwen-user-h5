<template>
  <div class="swiper_tab_container">
    <ul class="swiper_tab_wrapper infos_nav clearfix">
      <router-link to='/home/focus'  tag='li' class="swiper_tab_cell">
      <!-- <i class="icon icon20 icon_focus"></i> -->
         我的关注
      </router-link>
      <router-link to='/home'  tag='li' class="swiper_tab_cell " exact>
      <!-- <i class="icon icon20 icon_hot"></i> -->
         热门
      </router-link>
      <router-link to='/home/guang'  tag='li' class="swiper_tab_cell ">
       <!-- <i class="icon icon20 icon_moment"></i>  -->
        逛圈
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "tab"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
/**swiper tab 切换**/
.swiper_tab_container{
  position: relative;
  // z-index: 9;
  border-bottom:3px solid @bor_c;
 .swiper_tab_wrapper{
   .font_xl;
   padding: 0 40/@r;
   background-color: #fff;
   .transition(transform .5s ease 0s);
 }

 .swiper_tab_cell{
   padding:12px 0px;
   float: left;
   width: 33.3%;
   cursor: pointer;
   // width: 70px;
   color: #999;
   text-align: center;
   position: relative;
   &.router-link-active:after{
    content: "";
    position: absolute;
    bottom: -1px;
    left: 50%;

    margin-left: -16px;
    width: 32px;
    background-color: @main_c;
    height: 4px;
    .border-radius(4px);
   }
   &.router-link-active{
     color: #333;
   }
 }
}
</style>

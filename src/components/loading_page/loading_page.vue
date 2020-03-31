<template>
  <div class="loading_page">
    <div class="loading">
    <img width="24" height="24" src="./loading.gif">
      <!-- <p class="desc">{{title}}</p> -->
    </div>
  </div>
</template>
<script>
  export default {
    name:"loading_page",
    props: {
      title: {
        type: String,
        default: "加载中..."
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
  .loading_page{
    position: fixed;
    top: 0;
    left: 0;
    right:0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0);
  }
  .loading{
    width: 100px;
    height: 100px;
    margin: 0 auto;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
    text-align: center;
    padding: 0px 0px;
    // background-color: rgba(0, 0, 0, .6);
    .border-radius(10px);
    padding-top: 30px;
    .box-sizeing(border-box);
    img{
      // width:60/@r;
    }
    .desc{
      line-height: 20px;
      font-size:14px;
      color:#ccc;
      padding: 15px 0;
    }
  }
</style>

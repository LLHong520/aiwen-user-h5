<template>
  <div class="loading">
  <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: "正在载入..."
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
    padding: 30px 0px;
    img{
      // width:60/@r;
    }
    .desc{
      line-height: 20px;
      .font_xl;
      color:#ccc;
      padding: 15px 0;
    }
  }

</style>

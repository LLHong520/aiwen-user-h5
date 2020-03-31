<template>
  <form class="search_form clearfix">
    <div class="input-pull">
      <input type="search" autocomplete="off" @focus="search_btn"  name="search" placeholder="搜医生/圈子/帖子"  class="search_input needsclick">
      <span class="icon-search"></span>
    </div>
    <input type="cancel" name="cancel" class="search_submit" value="取消" />
  </form>
</template>

<script >
export default {
  props:{},
  computed:{
    isInApp(){
      return platformInfo.isWeibo||platformInfo.isWx;
    },
  },
  methods: {
    search_btn(){
      this.$router.push({ path: "/search" });
    },
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";

//搜索框样式
@search-bor: #F3F5F7;
.search-wrap {
// padding:20/@r;
}
.search_form {
position: relative;
padding: 20/@r 20/@r;
box-shadow: 0 0 5px 0 rgba(7, 17, 27, 0.10);
border-bottom: 1px solid @bor_c;
display: flex;
.box-sizeing(border-box);
.input-pull {
  display: inline-block;
  margin-right: 0;
  flex: 1;
  height: 54/@r;
  line-height: 54/@r;
  border: 1px solid @search-bor;
  border-radius: 4px;
  padding: 5/@r 10/@r;
  .search_input {
    width: 85%;
    height: 100%;
    line-height: 100%;
  }
  .icon-search {
    float: right;
    width: 26/@r;
    height: 54/@r;
    display: inline-block;
    background: url('~@/assets/images/icon-search@2x.png') no-repeat 0 13/@r;
    background-size: 100%, 100%;
    display: inline-block;
  }
}
.search_submit {
  width: 15%;
  .font_l;
  color: #2B333B;
  background: none;
  outline: none;
  display: inline-block;
  height: 64/@r;
  line-height: 64/@r;
  text-align: center;
}
}
</style>

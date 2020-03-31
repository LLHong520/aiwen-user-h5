<template>
  <layout class="login">
    <!-- page_container -->
    <div slot="page_container" class="app_wrapper_inner top0 login">
      <div class="logo_wrapper">
        <div class="logo">
          <img src="./images/img_logo@3x.png" />
          <img src="./images/img_logo_font1@3x.png" />
        </div>
        <div class="slogon">
          真实的健康经验交流社区
        </div>
      </div>
      <div class="login-btns">
        <div class="btn sina" @click="login('wb')">
          微博登录
        </div>
        <div v-if="isInWX" class="btn wx" @click="login('wx')">
          微信登录
        </div>
      </div>
    </div>
  </layout>
</template>
<script>
import platformLogin from "@/common/platformFn";
import {commonMixin} from "@/mixins";
export default {
  name:"login",
  mixins:[commonMixin],
  data(){
    return {
      toogle_memu:false,
      isInWX:platformInfo.isWx
    };
  },
  created(){
    let type="";
    if(platformInfo.isWeibo){
      type="wb";
      this.login(type);
    }else if(platformInfo.isWx){
      type="wx";
      this.login(type);
    }else{
      type="account";
      this.login(type);
    }
  },
  methods:{
    login(type){
      platformLogin(this.$route.query.refer,type);
    },
  },
  components:{}
};
</script>
<style  scoped lang="less" rel="stylesheet/less">
  @import './css.less';
</style>

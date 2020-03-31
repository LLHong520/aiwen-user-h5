<template>
  <!-- <transition enter-active-class='animated slideInUp'  leave-active-class='animated fadeOut' mode='out-in'> -->
    <layout :curTabIndex="4" :tabbarSwitch="false">
     <!-- page_header -->
        <m-header  slot="page_header" title='绑定手机' :menu_on='false'></m-header>
     <!-- page_header -->

     <!-- page_container -->
     <div slot="page_container" class="app_wrapper_inner">
       <top-tip ref="topTip">
          <div class="tip-text">{{tipText}}</div>
      </top-tip>

      <!-- 修改昵称 -->
      <section class="post_topic_wrapper">
          <div class="form">
              <h2 class="block_label">
                  <span>若您其他第三方账号已绑定手机，可继续绑定该手机</span>
              </h2>
              <div class="inp_text_wrapper">
                  <span class="label">手机号</span>
                  <span class="input"><input class='inp_text needsclick' @blur="validMobile()" name="mobile" v-model="mobile" maxlength="11" placeholder="请输入11位手机号" /></span>
              </div>
              <div class="inp_text_wrapper valid_code">
                  <span class="label">验证码</span>
                  <span class="input"><input type="number" class='inp_text needsclick' name="mobile"  maxlength="6" v-model="valid_code" placeholder="请输入验证码" /></span>
                  <count-down  :class="{'sm-btn':true,'disable':sending}"  :fn="getValidCode" :deftext="'获取验证码'" ref='btn'  :second='60'></count-down>
              </div>
          </div>
          <div class="post_topic_action">
              <input type="button" @click="bind()" class='block_btn needsclick' :class="{'enable':enable&&!binding}" name="" :value="binding? '绑定中...':'完成'" />
          </div>
      </section>
      <!-- /修改昵称 -->
    </div>
    <!-- /page_container -->

    </layout>
  <!-- </transition> -->
</template>
<script>
import {commonMixin} from "@/mixins";
import Header from "@/components/header/Header";
import TopTip from "@/components/top-tip/top-tip";
import countDown from "@/iwen/count-down/count-down";
import sysService from "@/services//sysService";
export default {
  name: "bind_mobile",
  mixins:[commonMixin],
  data() {
    return {
      mobile:"",
      valid_code:"",
      sending:false,
      binding:false,
      tipText:"",
      isChecking:false,
    };
  },
  created() {

  },
  methods: {
    //验证手机号码是否可用
    isPhoneUsed(){
      if(this.isChecking) return;
      this.isChecking=true;
      sysService.checkPhoneBind({phone:this.mobile})
        .then(res=>{
          this.isChecking=false;
          if(res.status==200&&res.data){
            this.getCode();
          }else if(res.status==20121){
            this.$toast.tip("该手机号码已绑定，请更换其它手机号码！");
            return false;
          }else{
            this.$toast.tip(res.message);
            return false;
          }
        });
    },
    getCode(){
      if(this.sending) return;
      let This = this;
      This.sending = true;
      sysService.sendCaptcha({
        phone: this.mobile
      })
        .then(res => {
          if(res.data){
            This.$refs.btn.run();
            setTimeout(This.sended, 60000);
          }else{
            This.sending=false;
            This.$toast.tip(res.message);
          }
        });
    },
    sended() {
      this.sending = false;
    },
    getValidCode(){
      if(!this.validMobile()||this.sending){
        return;
      }else{
        this.isPhoneUsed();
      }
    },
    // getValidCode:function(){
    //   if(this.sending){
    //     return;
    //   }
      // if(utils.isEmpty(this.mobile)){
      //   this.$toast.tip("请输入手机号！");
      //   return;
      // }
      // if(!utils.isMobile(this.mobile)){
      //   this.$toast.tip("手机号格式错误，请重新输入");
      //   return;
      // }
    //   let This=this;
    //   This.sending=true;
    //   userService.captchar({phoneNumber:this.mobile})
    //     .then(res=>{
    //       if(res.code==0){
    //         This.$refs.btn.run();
    //         setTimeout(This.sended, 60000);
    //       }else{
    //         This.sending=false;
    //       }
    //     });
    // },
    // sended:function(){
    //   this.sending=false;
    // },
    bind(){
      if(this.binding||!this.enable) return;
      if(!utils.isNumber(this.valid_code)||utils.trim(this.valid_code).length!=6){
        this.$toast.tip("验证码错误，请重新输入");
        return;
      }
      this.binding=true;
      let This=this;
      sysService.phoneBind({
        phone: this.mobile,
        captcha: this.valid_code
      })
        .then(res=>{
          this.binding=false;
          if(res.status == 200&&res.data){
            This.$toast.tip("绑定成功");
            This.$store.dispatch("update_userinfo");
            setTimeout(function(){
              This.goToRefer();
            }, 1000);
          }else{
            // This.$toast.tip("验证码错误，请重新输入");
            if(res.status==20130||res.status==20131||res.status==20135){
              This.$toast.tip(res.message);
            }else{
              this.$toast.tip("绑定失败");
            }
          }
        });
    },
    // validMobile(){
    //   if(utils.isEmpty(this.mobile)){
    //     this.$toast.tip("请输入手机号！");
    //     return;
    //   }
    //   if(!utils.isMobile(this.mobile)){
    //     this.$toast.tip("手机号格式错误，请重新输入");
    //   }
    // },
    validMobile() {//校验要绑定的手机号
      let isPass;
      if (utils.isEmpty(this.mobile)) {
        this.$toast.tip("请输入手机号");
        isPass = false;
      } else if (!utils.isMobile(this.mobile)) {
        this.$toast.tip("请输入正确的手机号");
        isPass = false;
      } else {
        isPass = true;
      }
      return isPass;
    },
    goToRefer(){
      if(this.$route.query.refer){
        this.$router.replace(this.$route.query.refer);
      }else{
        this.$router.replace("/home");
      }
    }
  },
  computed:{
    enable(){
      return utils.isMobile(this.mobile)&&!utils.isEmpty(this.valid_code);
    }
  },
  components: {
    mHeader: Header,
    TopTip: TopTip,
    countDown: countDown,
  }
};
</script>
<style  scoped lang="less" rel="stylesheet/less">
@import './css.less';
</style>

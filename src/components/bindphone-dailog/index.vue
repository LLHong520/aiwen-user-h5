<template>
  <section v-show="isShow">
      <div class="bind-phone-wrapper" ref="bindPhone">
        <div slot="content" class="content">
          <p class="title">亲，为了更好的为您服务，请绑定手机</p>
          <div class="form-group-wrapper">
            <div class="form-group">
              <input @blur="validMobile" v-model="bindForm.phone" maxlength="11" placeholder="手机号" />
            </div>
            <div class="form-group verification-code">
              <input v-model="bindForm.code" placeholder="验证码" @blur="inputBlur" />
              <count-down :class="{'sm-btn':true,'disable':computedSending}" :fn="getValidCode" :deftext="'获取验证码'"
                ref='btn' :second='60'>
              </count-down>
            </div>
            <div @click="phoneBind" class="btn-wrapper" :class="{'enable':enable}">
              {{this.bindForm.binding? "绑定中...":"放心绑定"}}
            </div>
          </div>
        </div>
      </div>
     <div @click="hide()" class="shadow-mask"></div>
  </section>
</template>

<script>
  import {commonMixin} from "@/mixins";
  import sysService from "@/services/sysService";
  import countDown from "@/iwen/count-down/count-down";
  export default {
    name: "bindphoneDailog",
    mixins: [commonMixin],
    data() {
      return {
        isShow: false,
        bindForm: { //绑定手机信息
          phone: "",
          code: "",
          sending: false,
          binding: false,
          isChecking:false,
        },
      };
    },
    computed: {
      computedSending() { //计算验证码
        return this.bindForm.sending;
      },
      enable() {
        return utils.isMobile(this.bindForm.phone) && !utils.isEmpty(this.bindForm.code);
      }
    },
    components: {
      countDown,
    },
    methods: {
      show() {
        this.isShow = true;
      },
      hide() {
        this.isShow = false;
      },
      validMobile() { //校验要绑定的手机号
        setTimeout(function(){
          window.scrollTo(0, 0);
        },100);
        let isPass;
        if (utils.isEmpty(this.bindForm.phone)) {
          this.$toast.tip("请输入手机号！");
          isPass = false;
        } else if (!utils.isMobile(this.bindForm.phone)) {
          this.$toast.tip("手机号格式错误，请重新输入");
          isPass = false;
        } else {
          isPass = true;
        }
        return isPass;
      },
      //验证手机号码是否可用
      isPhoneUsed(){
        if(this.bindForm.isChecking) return;
        this.bindForm.isChecking=true;
        sysService.checkPhoneBind({phone:this.bindForm.phone})
          .then(res=>{
            this.bindForm.isChecking=false;
            if(res.status==200&&res.data){
              this.getCode();
            }else if(res.status==20121){
              this.$toast.tip("该手机号码已绑定，请更换其它手机号码!");
              return false;
            }else{
              this.$toast.tip(res.message);
              return false;
            }
          });
      },
      getCode(){
        if(this.bindForm.sending) return;
        let This = this;
        this.bindForm.sending = true;
        sysService.sendCaptcha({
          phone: this.bindForm.phone
        })
          .then(res => {
            if(res.data){
              This.$refs.btn.run();
              setTimeout(function () {
                This.bindForm.sending = false;
              }, 60000);
            }else{
              This.$toast.tip(res.message);
              this.bindForm.sending=false;
            }
          });
      },
      sended() {
        this.bindForm.sending = false;
      },
      getValidCode:function(){
        if(!this.validMobile()||this.bindForm.sending){
          return;
        }else{
          this.isPhoneUsed();
        }
      },
      phoneBind() {
        //绑定手机
        if (this.bindForm.binding) return;
        if (!this.validMobile()) return;
        if (utils.isEmpty(this.bindForm.code)) {
          this.$toast.tip("请输入验证码！");
          return;
        } else if (!utils.isNumber(this.bindForm.code) || utils.trim(this.bindForm.code).length != 6) {
          this.$toast.tip("验证码错误！");
          return;
        }
        this.bindForm.binding = true;
        let This = this;
        sysService.phoneBind({
          phone: this.bindForm.phone,
          captcha: this.bindForm.code,
        }).then(res => {
          This.bindForm.binding = false;
          if (res.status == 200&&res.data) {
            This.$toast.tip("绑定成功");
            This.is_bind = true;
            This.$store.dispatch("update_userinfo");
            This.hide();
          } else {
            if(res.status==20130||res.status==20131||res.status==20135){
              This.$toast.tip(res.message);
            }else{
              this.$toast.tip("绑定失败");
            }
          }
        });
      }
    }
  };

</script>

<style lang="less" scoped>
  @assets: "~@/assets";
  @import "@{assets}/css/flex.less";
  @import "@{assets}/css/fix.less";

  .shadow-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 98;
  }

  .bind-phone-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: #fff;
    padding: 10px;
    transform: translate(-50%, -50%);
    width: 600/@r;
    z-index: 99;
    border-radius: 10px;

    .title {
      color: #2d2d2d;
      font-size: 15px;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 10px;
      height: 40px;
      line-height: 40px;
      background: #F3F4F5;

      input {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #F3F4F5;
        text-indent: 10px;
      }
    }

    .btn-wrapper {
      margin: 30px auto 20px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #ccc;
      color: #fff;
      font-size: 15px;
      border-radius: 2px;
      box-shadow: 0px 6px 10px 1px rgba(0, 0, 0, 0.2);

      &.enable {
        background: @main_c;
        box-shadow: 0px 6px 10px 1px rgba(152, 152, 152, 0.2);
      }
    }
  }

  .verification-code {
    input {
      float: left;
      width: 60% !important;
    }

    .sm-btn {
      float: right;
      margin: 5px 10px 0 0;
      padding: 0 8px;
      height: 30px;
      line-height: 30px;
      border-radius: 4px;
      background: #fff;
      color: @main_c;
      text-align: center;
      .font_l;
      .border-radius(4px);

      &.disable {
        color: #999;
      }
    }
  }

</style>

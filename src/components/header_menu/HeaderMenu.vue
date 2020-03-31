<template>
<div>
  <!-- 标题导航 -->
<transition name='slide'>
<nav class="header_menu" v-show="showMenu" @click="toggle">
  <ul class="menu-list">
    <router-link tag='li' to="/home/focus">
      <i class="icon icon_focus"></i>我的关注
    </router-link>
    <router-link tag='li' to="/home">
      <i class="icon icon_hot"></i>热门
    </router-link>
    <router-link tag='li' to="/home/guang">
      <i class="icon icon_guang"></i>逛圈
    </router-link>
    <li @click="toUserCenter()">
      <i class="icon icon_home"></i>我的主页
    </li>
    <router-link tag='li' to="/u_msg">
      <i class="icon icon_news"></i>我的消息<span  v-show="messageNum>0" class="msg_num">{{messageNum>99?"99+":messageNum}}</span>
    </router-link>
    <router-link tag='li' to="/my/sms">
      <i class="icon icon_smes"></i>我的私信<span  v-show="smsNum>0" class="msg_num">{{smsNum>99?"99+":smsNum}}</span>
    </router-link>
    <router-link tag='li' to="/my/activity">
      <i class="icon icon_star"></i>我的活动
    </router-link>
    <router-link tag='li' v-if="VX_isBindAccount" to="/u_avaters">
      <i class="icon icon_moment"></i>账号管理
    </router-link>
  </ul>

</nav>
</transition>
<transition enter-active-class='animated fadeIn'  leave-active-class='animated fadeOut' mode='out-in' v-if='show'>
  <div class="modal" @click='toggle()'></div>
</transition>
<!-- /标题导航 -->
</div>
</template>

<script>
import {commonMixin} from "@/mixins";
import {mapState} from "vuex";
export default {
  name: "header_memu",
  props:["show"],
  mixins:[commonMixin],
  data () {
    return {
      showMenu:false
    };
  },
  watch:{
    show(){
      let This=this;
      // setTimeout(function(){
      This.showMenu=This.show;
      // },200)
    }
  },
  methods:{
    toggle(){
      this.$emit("update:show", false);
      $(".header_wrapper .hd_menu").eq(0).removeClass("active");
    },
    toUserCenter(){
      if(!this.VX_islogin){
        this.goLogin(this.$route.fullPath);
      }else{
        //是否编辑昵称
        if(!this.VX_isNickEdited){
          this.$router.push("/nike_name?refer="+this.$route.fullPath);
          return;
        }
        //是否绑定手机
        if(!this.VX_isBindMobile){
          this.$router.push("/bind_mobile?refer="+this.$route.fullPath);
          return;
        }
        this.$router.push("/u/"+ this.VX_userInfo.id);
      }
    }
  },
  computed:{
    ...mapState(["messageNum","smsNum"]),
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'  rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
/**标题右侧 点击显示导航蓝鸟**/
.modal{
  position:fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-color: rgba(0,0,0,0.4);
  z-index:93;
}
.header_menu{
  position: fixed;
  top: 70/@r;
  right: 0px;
  border-bottom: none;
  z-index: 999;
  // width: 135px;
  .font_xl;
  .box-sizeing(border-box);
  background-color:#fff;
  .transform-origin(top right);
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
  // &:before{
  //   position: absolute;
  //   content: ' ';
  //   border: 8px solid transparent;
  //   border-bottom: 8px solid @main_c;
  //   right: 10px;
  //   top: -16px;
  // }
 }

 .msg_num{
   margin-left: 10px;
   background-color: #F5A623;
   color: #fff;
   display: inline-block;
   padding: 0px 10px;
   .border-radius(10px);
   .font_s;
   vertical-align: center;
   position: relative;
   top: -2px;
 }

&.slide-enter-active{
  .animation(slide-zoom 0.3s);
  .transform-origin(top right);
}
.keyframes(slide-zoom,{
  0%
    {
      .transform(scale(0) translateZ(0))
    }
  50%
    {
      .transform(scale(1.1) translateZ(0))
    }
  100%
    {
      .transform(scale(1) translateZ(0))
    }
});

@media screen and(min-device-width:760px){
  .header_menu{
    li{
      margin-left: 0px
    }
  }
}


.menu-list{
  padding:0 15px;
  li{
    line-height: normal;
    width:100%;
    padding: 10px 0 15px 0;
    color: #555;
    text-align: left;
    .font_2xl;
    .box-sizeing(border-box);
    &:last-child{
      border-bottom: none;
    }
    .icon{
      width:17px;;
      height:20px;
      vertical-align: baseline;
      position: relative;
      top: 4px;
      margin-right:12/@r;
    }
    .icon_focus{
      background:url('images/icon-concern@2x.png') no-repeat center;
    .background-size(100% auto);
    }
    .icon_hot{
      background:url('images/icon-hot@2x.png') no-repeat center;
    .background-size(100% auto);
    }
    .icon_guang{
      background:url('images/icon-guangquan@2x.png') no-repeat center;
    .background-size(100% auto);
    }
    .icon_home{
      background:url('images/icon-person@2x.png') no-repeat center;
    .background-size(100% auto);
    }
    .icon_news{
      background:url('images/icon-mes@2x.png') no-repeat center;
    .background-size(100% auto);
    }
    .icon_smes{
      background:url('images/icon-smes@2x.png') no-repeat center;
    .background-size(100% auto);
    }
    .icon_star{
      background:url('images/icon-star@2x.png') no-repeat center;
    .background-size(100% auto);
    }
    .icon_moment{
      background:url('images/icon-person@2x.png') no-repeat center;
    .background-size(100% auto);
    }
  }
}

</style>

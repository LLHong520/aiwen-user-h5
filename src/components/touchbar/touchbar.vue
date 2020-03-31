<template>
  <div class="nav-wrapper" :class="{'isInIframe':platformInfo.isInIframe}">
    <div class="mask" v-show="toogleTouchState"></div>
  	<ul class="nav-list clearfix"  v-show="toogleTouchState" @click="toogleTouch">
      <template v-for="(navItem,index) in navInfo">
        <router-link v-if="navItem.urltype==0" :to="navItem.router" class="nav-item"  :key="index">
          <span class="icon" :class="[navItem.iconClass,'off']"></span>
          <p >{{navItem.text}}</p>
        </router-link>
        <a v-else :href="navItem.router" :key="index">
          <span class="icon" :class="[navItem.iconClass,'off']"></span>
          <p>{{navItem.text}}</p>
        </a>
      </template>
          <a href="javascript:;" @click="loginCheck">
        <span class="icon" :class="[userNav.iconClass,'off']"></span>
        <p >{{userNav.text}}</p>
      </a>
  	</ul>
    <div class="trigger" :class="chooseClass" @click="toogleTouch"></div>
  </div>
</template>

<script>
import {USER_CENTER_URL,FORUM_URL} from "@/config";
import platformInfo from "@/common/platformInfo.js";
import platformLogin from "@/common/platformFn";
import { mapGetters } from "vuex";
export default {
  props:{
    curTabIndex:{
      type:Number,
      default:0,
    }
  },
  computed:{
    ...mapGetters({
      VX_islogin:"islogin",
    }),
    chooseClass(){
      let arr=["icon-home","icon-health","icon-act","icon-forum","icon-mine"];
      return arr[this.curTabIndex];
    }
  },
  data(){
    return {
      toogleTouchState:false,
      platformInfo:platformInfo,
      navInfo:[
        {
          urltype:0,
          router:"/home",
          iconClass:"icon-home",
          text:"首页"
        },
        {
          urltype:0,
          router:"/health",
          iconClass:"icon-health",
          text:"健康"
        },
        {
          urltype:0,
          router:"/act",
          iconClass:"icon-act",
          text:"活动"
        },
        // {
        //   urltype:1,
        //   router:FORUM_URL,
        //   iconClass:"icon-forum",
        //   text:"社区"
        // }
      ],
      userNav:{
        router:USER_CENTER_URL,
        iconClass:"icon-mine",
        text:"我的"
      }
    };
  },
  methods: {
    toogleTouch(){
      this.toogleTouchState=!this.toogleTouchState;
    },
    loginCheck(){
      this.toogleTouch();
      if(!this.VX_islogin){
        this.goLogin(this.USER_CENTER_URL);
      }else{
        window.location.href=USER_CENTER_URL;
      }
    },
    goLogin(refer){
      platformLogin(refer);
    }
  }
};
</script>

<style lang="less" scoped>
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
.mask{
  position:fixed;
  top:0;
  right:0;
  left:0;
  bottom:0;
  background-color:rgba(0,0,0,.8);
}
  .nav-wrapper{
  	position: fixed;
  	bottom:130px;
  	left:0;
  	height:55px;
  	width:100%;
    z-index: 9999;
    /*&.isInIframe{*/
      /*bottom: 65px;*/
    /*}*/
  }
  .nav-list{
    display: flex;
    position: fixed;
    z-index:112;
    right:20px;
    left:20px;
  }
  .nav-list a{
    flex: 1;
  	text-align: center;
    font-size:12px;
    padding-top: 8px;
    color:#fff;
  }
  .icon{
    display: block;
    width: 44px;
    height: 44px;
    margin: 0 auto;
    background-color: #f2f2f2;
  }

    .trigger{
      position:fixed;
      bottom:50px;
      left:50%;
      margin-left:-18px;
      display: block;
      width: 40px;
      height: 40px;
      z-index:111;
      background: url('./images/Group 18.png') no-repeat center;
      background-size: contain;
    }

    .icon-home{
      background: url('./img/1.png') no-repeat center;
      background-size: contain;
    }
    .icon-home.off{
      background: url('./images/1.png') no-repeat center;
      background-size: contain;
    }
    .icon-health{
      background: url('./img/21.png') no-repeat center;
      background-size: contain;
    }
    .icon-health.off{
      background: url('./images/21.png') no-repeat center;
      background-size: contain;
    }
    .icon-act{
      background: url('./img/3.png') no-repeat center;
      background-size: contain;
    }
    .icon-act.off{
      background: url('./images/3.png') no-repeat center;
      background-size: contain;
    }
    .icon-forum{
      background: url('./img/4.png') no-repeat center;
      background-size: contain;
    }
    .icon-forum.off{
      background: url('./images/4.png') no-repeat center;
      background-size: contain;
    }
    .icon-mine{
      background: url('./img/5.png') no-repeat center;
      background-size: contain;
    }
    .icon-mine.off{
      background: url('./images/5.png') no-repeat center;
      background-size: contain;
    }
</style>

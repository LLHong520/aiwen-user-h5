<template>
  <div class="nav-container">
    <div class="nav-wrapper" ref="fixed_header">
      <ul class="nav-list clearfix">
        <template v-for="(navItem,index) in navInfo">
          <router-link v-if="navItem.urltype==0" :to="navItem.router" class="nav-item"  :key="index">
            <span class="icon" :class="[navItem.iconClass,{'off':curTabIndex!=index}]"></span><p :class="{'on':curTabIndex==index}">{{navItem.text}}</p>
          </router-link>
          <a v-else :href="navItem.router+com_channel" :key="index">
            <span class="icon" :class="[navItem.iconClass,{'off':curTabIndex!=index}]"></span><p :class="{'on':curTabIndex==index}">{{navItem.text}}</p>
          </a>
        </template>
        <a href="javascript:;" @click="loginCheck">
          <span class="icon" :class="[userNav.iconClass,{'off':curTabIndex!=4}]"></span><p :class="{'on':curTabIndex==4}">{{userNav.text}}</p>
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
import {USER_CENTER_URL} from "@/config";
import platformLogin from "@/common/platformFn";
import { mapGetters,mapState } from "vuex";
export default {
  name: "navBar",
  props:{
    curTabIndex:{
      type:Number,
      default:0,
    }
  },
  data(){
    return {
      fixed_header:null,
      navInfo:[
        {
          urltype:0,
          router:"/home",
          iconClass:"icon-home",
      	  text:"首页"
        },
        {
          urltype:0,
          // router:YK_URL+"/main",
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
        // },
      ],
      userNav:{
        router:USER_CENTER_URL,
        iconClass:"icon-mine",
        text:"我的"
      }
    };
  },
  computed:{
    ...mapGetters({
      VX_islogin:"islogin",
    }),
    ...mapState(["channel"]),
    com_channel(){
      if(this.channel){
        return "?channel=" + this.channel;
      }else{
        return "";
      }
    }
  },
  methods: {
    loginCheck(){
      if(!this.VX_islogin){
        this.goLogin(this.USER_CENTER_URL);
      }else{
        this.$router.push({
          name:"Mine"
        });
      }
    },
    goLogin(refer){
      platformLogin(refer);
    }
  },
  components:{},
  mounted(){
    $("#wrapper__inner").append("<div id='navBar-shim' style='height:55px'></div>");
  },
  destoryed(){
    $("#navBar-shim").remove();
  }
};
</script>

<style lang="less" scoped>
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
  .nav-container{
    // height: 55px;
  }
  .nav-wrapper{
    z-index: 9999;
    transform: translateZ(0);
  	position: fixed;
  	bottom:0;
  	left:0;
  	height:49px;
  	width:100%;
    background: #fff;
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2);
    padding-bottom: env(safe-area-inset-bottom);
  }
  .nav-list{
    display: flex;
  }
  .nav-list a{
    flex: 1;
  	text-align: center;
    font-size:8px;
    line-height: 10px;
    padding-top: 4px;
    color: #4F566B;
    p.on{
      color: rgba(38, 136, 252, 0.85);
    }
  }
  .icon{
    display: block;
    width: 30px;
    height: 30px;
    margin: 0 auto;
    background-color: #f2f2f2;
  }

  .icon-home{
    background: url('./images/tabbar_icon_home_pre@2x.png') no-repeat center;
    background-size: contain;
  }
  .icon-home.off{
    background: url('./images/tabbar_icon_home@2x.png') no-repeat center;
    background-size: contain;
  }
  .icon-health{
    background: url('./images/tabbar_icon_health_pre@2x.png') no-repeat center;
    background-size: contain;
  }
  .icon-health.off{
    background: url('./images/tabbar_icon_health@2x.png') no-repeat center;
    background-size: contain;
  }
  .icon-act{
    background: url('./images/tabbar_icon_event_pre@2x.png') no-repeat center;
    background-size: contain;
  }
  .icon-act.off{
    background: url('./images/tabbar_icon_event@2x.png') no-repeat center;
    background-size: contain;
  }
  .icon-forum{
    background: url('./images/nav-forum-on.png') no-repeat center;
    background-size: contain;
  }
  .icon-forum.off{
    background: url('./images/nav-forum-off.png') no-repeat center;
    background-size: contain;
  }
  .icon-mine{
    background: url('./images/tabbar_icon_me_pre@2x.png') no-repeat center;
    background-size: contain;
  }
  .icon-mine.off{
    background: url('./images/tabbar_icon_me@2x.png') no-repeat center;
    background-size: contain;
  }
</style>

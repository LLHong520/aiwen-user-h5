<template>
  <div v-if="!isInApp||isShowInApp" class="header_wrapper"  ref="fixed_header">
    <header class="header hide-in-pc" :class="{border_on:border_on,bgGray:bgGray}">
      <slot name='left' class="left">
        <span  class="icon-search-big" @click="search_btn"></span>
      </slot>
      <slot name='center'>
        <h2 v-if="title!=''">{{title}}</h2>
      </slot>
      <slot name='right' class="right">
        <a href="javascript:;" @click="loginCheck" class="hd_menu" >
          <img class="min-home-head" :src="GET_IMG_URL(userinfo.photoPicURL,'u')" alt="用户头像" />
          <span class="pop_point" v-show="messageNum>0"></span>
        </a>
      </slot>
    </header>
    <div class="header-placeholder"></div>
  </div>
</template>

<script>
import {USER_CENTER_URL} from "@/config";
import HeaderMenu from "@/components/header_menu/HeaderMenu";
import {commonMixin,toTopMixin} from "@/mixins";
import {mapState,mapGetters} from "vuex";
export default {
  name: "mHeader",
  mixins:[commonMixin,toTopMixin],
  props:{
    title:{
      type:String,
      default:""
    },
    menu_on:{
      type:Boolean,
      default:true
    },
    border_on:{
      type:Boolean,
      default:true
    },
    bgGray:{
      type:Boolean,
      default:false
    },
    isShowInApp:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      USER_CENTER_URL,
    };
  },
  components:{
    headerMenu:HeaderMenu
  },
  computed:{
    userinfo(){
      if(this.VX_islogin){
        return this.VX_userInfo?this.VX_userInfo:{
          faceImage:"",
          nickName:"",
          credit:0,
          level:0
        };
      }else{
        return {
          faceImage:"",
          nickName:"",
          credit:0,
          level:0
        };
      }
    },
    ...mapState(["messageNum"]),
    ...mapGetters(["isInSinaHealthApp","isInIwenApp","isInHapHealApp"]),
    isInApp(){
      return platformInfo.isWeibo || platformInfo.isWx || this.isInSinaHealthApp || this.isInIwenApp || this.isInHapHealApp;
    }
  },
  methods:{
    loginCheck(){
      if(!this.VX_islogin){
        this.goLogin(this.USER_CENTER_URL);
      }else{
        this.$router.push({
          name:"Mine"
        });
      }
    },
    search_btn(){
      this.$router.push({ path: "/search" });
    },
  },
  mounted(){},
  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
/*头部默认风格*/
@headerHeight:88;
.header-placeholder{
  height: @headerHeight/@r;
}
.header_wrapper{
  position: relative;
  .transition(opacity .3s ease 0s);
  height: @headerHeight/@r;
}
.header_wrapper.fixed_top{
  .header{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
.header {
  height: @headerHeight/@r;
  line-height: @headerHeight/@r;
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  &.border_on{
    border-bottom: 1px solid @bor_c;
    line-height: @headerHeight/@r;
  }
  &.bgGray{
    background-color: #F9FAFD;
  }
  .flexbox();
  z-index: 99;
  position: fixed;
}
.header h2 {
  font-size: 32/@r;
  font-weight: normal;
  .flex(1);
  text-align: center;
  color: #282828;
  font-weight: bold;
  height: 88/@r;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.header_wrapper.fixed_scroll .header{
    .transition(all .3s ease 0s);
}
.header_wrapper.fixed_top .header{
  box-shadow: 0 0 4px rgba(0,0,0,.2);
  .opacity(1);
}
.hd_login {
  display: block;
  position: relative;
  width: 20px;
  margin-right: 10px;
}
.hd_login img {
  width: 17px;
  height: auto;
}

.hd_login span {
  /*display:block; width:6px; height:6px; border-radius:3px; background-color:#ff6555; right:0; top:0; position:absolute;*/
  background-color: #ff6555;
  color: #fff;
  height: 16px;
  min-width: 12px;
  padding: 0 2px;
  line-height: 16px;
  text-align: center;
  border-radius: 8px;
  top: 2px;
  right: -5px;
  position: absolute;
}
.header .retrun {
  display: block;
  width: 80/@r;
  height: 80/@r;
  margin-left: 10/@r;
  margin-top: 4/@r;
  display: flex;
  align-items: center;
}
.header .retrun b.white{
  display: block;
  width: 80/@r;
  height: 80/@r;
  text-align: center;
  &::before{
    display: inline-block;
    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 80/@r;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    content: "\E902";
    display: inline-block;
    font-size: 20px;
    position: relative;
    color: #fff;
    .transform-origin(center);
    .transform(rotate(180deg));
  }
}
.header .retrun b.gray{
  display: block;
  width: 80/@r;
  height: 80/@r;
  background: url('./images/nav_back@2x.png') no-repeat center;
  background-size:contain;
}

.hd_menu {
  display: block;
  position: relative;
  width: 26px;
  margin-right: 15px;
  &.active i.icon-menu{
    background: url('../../assets/images/icons/icon-triangle@3x.png') no-repeat;
    background-size: 20px auto;
  }
  &.active{
    .pop_point{
      display: none;
    }
  }
  .pop_point{
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #F5A623;
    color: #fff;
    display: inline-block;
    .border-radius(50%);
    top:5px;
    right:0px;
  }
}
.hd_menu img {
  width: 26px;
  height: 26px;
  .border-radius(50%);
}

.header .back {
  width: 32px;
  height: 44px;
  display: inline-block;
  // background: url(../../assets/images/hd_back.png) center center no-repeat;
  background-size: 11px 18px;
}
.place_holder {
  width: 20px;
  margin-right: 15px;
  display: inline-block;
}
.icon-menu-new{
  background:url('../../assets/images/default/headpic-default@3x.png') no-repeat center;
  width: 26px;
  height: 26px;
  .background-size(26px auto);
  border-radius:50%;
}
</style>

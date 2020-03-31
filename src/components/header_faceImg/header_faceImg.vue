<template>
  <div class="header_wrapper fixed_scroll"  ref="fixed_header">
    <header class="header hide-in-pc">
      <slot name='left'>
        <span></span>
      </slot>
      <slot name='center'>
        <h2 v-if="title!=''">{{title}}</h2>
      </slot>

      <slot name='right'>
        <a v-if="menu_on" @click='do_toogle_memu' href="javascript:;" class="hd_menu" >
          <img class="min-home-head" :src="GET_IMG_URL(userinfo.photoPicURL,'u')" alt="用户头像" /><!--  @imgEvent="img_event" -->
          <span class="pop_point" v-show="messageNum>0"></span>
        </a>
      </slot>
    </header>
    <header-menu :show.sync="toogle_memu"></header-menu>
  </div>
</template>

<script>
import HeaderMenu from "@/components/header_menu/HeaderMenu-new";
import { toTopMixin , commonMixin} from "@/mixins";
import {mapState} from "vuex";
export default {
  name: "mHeader",
  mixins:[toTopMixin, commonMixin],
  props:{
    title:{
      type:String,
      default:""
    },
    menu_on:{
      type:Boolean,
      default:true
    }
  },
  data () {
    return {
      toogle_memu:false
    };
  },
  components:{
    headerMenu:HeaderMenu
  },
  computed:{
    userinfo(){
      if(this.VX_islogin){
        return this.VX_userInfo;
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
  },
  methods:{
    //获取添加滚动事件的元素
    getScrollEle() {
      var u = navigator.userAgent, app = navigator.appVersion;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

      var scrollEle=null;
      if(isiOS){
        scrollEle="#wrapper__inner";
      }else{
        scrollEle=window;
      }

      return scrollEle;
    },
    do_toogle_memu(){
      this.toogle_memu=!this.toogle_memu;
      if(this.toogle_memu){
        $(".header_wrapper .hd_menu").eq(0).addClass("active");
      }else{
        $(".header_wrapper .hd_menu").eq(0).removeClass("active");
      }
      let guang_moment_wrapper=$(".guang_moment_wrapper").eq(0);
      let message_wrapper=$(".message_wrapper").eq(0);
      if(this.toogle_memu){
        // guang_moment_wrapper.css('position','inherit');
        // message_wrapper.css('position','inherit');
      }else{
        // guang_moment_wrapper.css('position','absolute');
        // message_wrapper.css('position','absolute');
      }
    },
    scroll(){
      var oWrapper_inner=$(this.getScrollEle());
      let fixed_header=this.$refs.fixed_header;
      var aFixed_scroll=$(fixed_header);
      if(!aFixed_scroll.hasClass("inited")){
        //页面加载记录当前位置
        aFixed_scroll.attr("top",aFixed_scroll.offset().top);
        aFixed_scroll.wrapAll("<div style=\"height:"+aFixed_scroll.height()+"px\"></div>");
        aFixed_scroll.addClass("inited");
      }
      var sTop=oWrapper_inner.scrollTop(); //滚动条滚动的高度
      var cHeight=oWrapper_inner.height(); //可视区域高度
      var sHeight=oWrapper_inner.get(0).scrollHeight;  //页面内容高度
      var This=$(this);

      var oTop=aFixed_scroll.attr("top");
      if (sTop >= oTop) {
        // aFixed_scroll.eq(i).addClass('fixed_top');
        aFixed_scroll.addClass("fixed_top");
        // aFixed_scroll.eq(i).css({'position':'absolute','top':sTop+'px'});
      } else {
        aFixed_scroll.removeClass("fixed_top");
      }
    }
  },
  mounted(){
    var oWrapper_inner=$(this.getScrollEle());
    let This=this;
    this.fixed_header=This.$refs.fixed_header;
    //滚动时位置固定
    oWrapper_inner.on("scroll",this.scroll);
  },

  destroyed() {
    var oWrapper_inner=$(this.getScrollEle());
    oWrapper_inner.off("scroll",this.scroll);

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
/*头部默认风格*/
.header_wrapper{
  position: relative;
  .transition(opacity .3s ease 0s);
    height: 70/@r;
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
  height: 70/@r;
  line-height: 70/@r;
  width: 100%;
  // border-bottom: 1px solid @bor_c;
  // .gradient(90deg,#EddEC5,#fef2d5);
  background-color: @main_c;
  .flexbox();
  z-index: 99;
  position: relative;
}
.header h2 {
  font-size: 18px;
  font-weight: normal;
  .flex(1);
  text-align: center;
  color: #fff;
  height: 44px;
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
  width: 20px;
  margin-left: 15px;
}
.header .retrun b{
  display: block;
  width: 22px;
  height: 22px;
  &::before{
    display: inline-block;
    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    content: "\E902";
    display: inline-block;
    width: 20px;
    height: 20px;
    font-size: 20px;
    position: relative;
    top: 2px;
    color: #fff;
    .transform-origin(center);
    .transform(rotate(180deg));
  }
}

.hd_menu {
  display: block;
  position: relative;
  width: 28%;
  text-align: right;
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
</style>

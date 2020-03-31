<template>
  <div v-if="!VX_isInSinaHealthApp && !VX_isInIwenApp" class="header_wrapper fixed_scroll"  >
    <header class="header hide-in-pc" :class="{white:isWhite,border_on:border_on}" ref="fixed_header">
      <slot name='left'>
        <span  class="icon-search-big" @click="search_btn"></span>
      </slot>
      <slot name='center'>
        <h2 v-if="title!=''">{{title}}</h2>
      </slot>

      <slot name='right'>
      </slot>
    </header>
    <div class="blank" v-if="isWhite"></div>
    <!-- <div class="header_bg"></div> -->
    <header-menu :show.sync="toogle_memu"></header-menu>
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
      default:false
    },
    isWhite:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      toogle_memu:false,
      USER_CENTER_URL,
    };
  },
  components:{
    headerMenu:HeaderMenu
  },
  computed:{
    userinfo(){
      if(this.VX_islogin){
        return this.VX_userInfo||{
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
    ...mapGetters({
      VX_isInSinaHealthApp: "isInSinaHealthApp",
      VX_isInIwenApp: "isInIwenApp",
    }),
  },
  methods:{
    search_btn(){
      this.$router.push({ path: "/search" });
    },
    //获取添加滚动事件的元素
    getScrollEle() {
      var u = navigator.userAgent;
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
    },
    scroll(){
      var oWrapper_inner=$(this.getScrollEle());
      let fixed_header=this.$refs.fixed_header;
      var aFixed_scroll=$(fixed_header);
      if(!aFixed_scroll.hasClass("inited")){
        //页面加载记录当前位置
        aFixed_scroll.attr("top",aFixed_scroll.offset().top);
        // aFixed_scroll.wrapAll("<div style=\"height:"+aFixed_scroll.height()+"px\"></div>");
        aFixed_scroll.addClass("inited");
      }
      var sTop=oWrapper_inner.scrollTop(); //滚动条滚动的高度
      // var cHeight=oWrapper_inner.height(); //可视区域高度
      // var sHeight=oWrapper_inner.get(0).scrollHeight;  //页面内容高度
      // var This=$(this);

      // var oTop=aFixed_scroll.attr("top");
      if (sTop > 0) {
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
.blank{
  height: 88/@r;
}
.header_wrapper{
  .transition(opacity .3s ease 0s);
  position: relative;
}
.header_wrapper{
  .header.fixed_top{
    // position: absolute;
    background: #54BDFE linear-gradient(-90deg,#2789FC 0,#54BDFE 100%);
  }
  .header.white.fixed_top{
    // position: absolute;
    background:#fff;
    box-shadow: 0 0 5px rgba(0,0,0,.3);
  }
}
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 88/@r;
  line-height: 88/@r;
  width: 100%;
  .flexbox();
  z-index: 99;
  background:transparent;
  box-sizing: border-box;
}

.header.border_on{
  border-bottom:1px solid #EFEFEF;
}

.header h2 {
  font-size: 18px;
  font-weight: normal;
  .flex(1);
  text-align: center;
  color: #fff;
  height: 87/@r;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.header.header.white h2{
  color: #2D2D2D;
}
.header_wrapper.fixed_top .header{
  // box-shadow: 0 0 4px rgba(0,0,0,.2);
  .opacity(1);
}
.header .retrun {
  display: block;
  width: 80/@r;
  display: flex;
  align-items: center;
}
.header .retrun b.white{
  display: block;
  width: 80/@r;
  height: 80/@r;
  margin-left: 10/@r;
  background: url('./images/nav_back_pure@2x.png') no-repeat center;
  background-size:contain;
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
    background: url('@{assets}/images/icons/icon-triangle@3x.png') no-repeat;
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
  width: 39px;
  height: 88/@r;
  display: inline-block;
  background:url('@{assets}/images/icons/icon-search@3x.png') no-repeat center;
  .background-size(39/@r 39/@r);
}
.icon-menu-new{
  background:url('@{assets}/images/default/headpic-default@3x.png') no-repeat center;
  width: 26px;
  height: 26px;
  .background-size(26px auto);
  border-radius:50%;
}
/* header-left-back */
.header-left{
  display: inline-block;
  width:80/@r;
  text-align: center;
   b.split::before{
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
    width: 10px!important;
    height: 20px;
    font-size:18px;
    position: relative;
    top: 0px;
    color: #fff;
    .transform-origin(center);
    .transform(rotate(180deg));
  }
}
/* header-right-text */
.header-right{
  display: inline-block;
  width:80/@r;
  color:#fff;
}
</style>

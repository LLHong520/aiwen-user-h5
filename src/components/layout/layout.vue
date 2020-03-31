<template>
  <div id="wrapper">
    <div id="wrapper__inner">
      <div class="app_wrapper page_wrapper" :class="{'banner':show_banner,'tabbar':tabbarSwitch}">
      <!-- page_header -->
      <slot name="page_header"></slot>
      <!-- /header -->
      <!-- page_container -->
      <slot name="page_container"></slot>
      <!-- /page_container -->
      </div>
      <!-- page_footer -->
      <slot name="page_footer"></slot>
      <!-- page_layer -->
    </div>
    <!-- /page_footer -->
    <template v-if="tabbarSwitch&&!isInSinaHealthApp&&!isInIwenApp">
      <keep-alive>
        <navbar :curTabIndex="curTabIndex"></navbar>
      </keep-alive>
    </template>
    <template v-else-if="docSwitch">
      <navbar-doc :isShowNav="isShowNav"></navbar-doc>
    </template>
    <template v-else-if="isRoomView">
      <navbar-roomview :isShowNav="isShowNav"></navbar-roomview>
    </template>
    <template v-else-if="isAppView"></template>
    <template v-else-if="isInSinaHealthApp"></template>
    <template v-else-if="isInIwenApp"></template>
    <template v-else-if="isInHapHealApp"></template>
    <router-link class="fixBackHome" v-else :to="{ name: 'homeIndex'}">
      <i class="backToIndex"></i>
    </router-link>
    <slot name="page_layer"></slot>
  </div>
</template>

<script>
  import navbar from "@/components/navbar/navbar";
  import navbar_doc from "@/components/navbar_doc/navbar_doc";
  import navbar_roomview from "@/components/navbar_roomview/navbar_roomview";
  import { mapGetters } from "vuex";
  export default {
    name: "layout",
    computed: {
      ...mapGetters({
        isInSinaHealthApp:"isInSinaHealthApp",
        isInIwenApp:"isInIwenApp",
        isInHapHealApp:"isInHapHealApp"
      })
    },
    props: {
      show_banner: {
        type: Boolean,
        default: false
      },
      curTabIndex: {
        type: Number,
        default: 0,
      },
      tabbarSwitch: {
        type: Boolean,
        default: false,
      },
      docSwitch: {
        type: Boolean,
        default: false,
      },
      isShowNav:{
        type: Boolean,
        default: true,
      },
      isRoomView:{
        type: Boolean,
        default: false,
      },
      isAppView:{
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        platformInfo: platformInfo,
      };
    },
    components: {
      navbar,
      navbarDoc:navbar_doc,
      navbarRoomview:navbar_roomview,
    },
    methods: {
      getQueryString() {
        var search = location.search.substring(1);
        var queryStringArr = search.split("&");
        var queryString = {};
        for (let i in queryStringArr) {
          var prop = queryStringArr[i].split("=")[0];
          var val = queryStringArr[i].split("=")[1];
          queryString[prop] = val;
        }
        return queryString;
      }
    },
    mounted() {

      function getClientHeight() {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
          var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body
            .clientHeight :
            document.documentElement.clientHeight;
        } else {
          var clientHeight = (document.body.clientHeight >
              document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement
            .clientHeight;
        }
        return clientHeight;
      }
      // console.log(getClientHeight());
      var u = navigator.userAgent;
      var That = this;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      var isWeiboWallet = (function () {
        var is = false;
        var queryString = That.getQueryString();
        var isWeiboWallet = sessionStorage.getItem("isWeiboWallet") || "";
        if ((queryString.channel && queryString.channel == "01GF00000200032000") || isWeiboWallet ==
          "01GF00000200032000") {
          is = true;
          sessionStorage.setItem("isWeiboWallet", "01GF00000200032000");
        }
        return is;
      })();
      // console.log(window.parent===window);
      // console.log(window.top);
      // console.log(window.self);
      // console.log(window.self==window.top);

      try {
        if (isiOS && platformInfo.isWeibo) {
        // if (isiOS) {
          var sheight;
          var sWidth = window.screen.width;
          if (window.parent!==window) {
            // sheight=window.screen.height-115;
            console.log("被嵌套");
            sheight = isWeiboWallet ? window.screen.height - 64 : window.screen.height - 110;
          } else {
            console.log("没有被嵌套");
            sheight = window.screen.height - 64;
          }
          sheight = this.$store.state.layoutWrapperHeight>0?this.$store.state.layoutWrapperHeight:getClientHeight();
          this.$store.commit("SET_LAYOUT_HEIGHT",sheight);
          // let url=That.$route.fullPath;
          // if(url.indexOf("linkcard")>=0){
          //   sheight = window.screen.height - 110;
          // }
          // // alert(sheight);
          // // alert(window.screen.height);
          // // $('#wrapper').css({'width': sWidth +'px'});
          // console.log("没有走catch");

          $("#wrapper").css({
            "height": sheight + "px",
            "width": sWidth + "px",
            "overflow": "hidden"
          });
          $("#wrapper__inner").css({
            "height": "100%",
            "width": sWidth + "px",
            "overflow": "auto",
            "-webkit-overflow-scrolling": "touch"
          });
          //绑定窗口被缩放大小事件
          window.onresize = function(){
            let w = window.screen.width;
            $("#wrapper").css({"width": w +"px"});
          };
        }else if(isiOS && window.parent!==window){
          $("#wrapper").css({
            "width": sWidth + "px",
            "overflow": "hidden"
          });
          $("#wrapper__inner").css({
            "width": sWidth + "px",
          });
          //绑定窗口被缩放大小事件
          window.onresize = function(){
            let w = window.screen.width;
            $("#wrapper").css({"width": w +"px"});
          };
        }
      } catch (e) {
        console.log("走了catch");

        $("#wrapper").css({"width": window.screen.width +"px" , "overflow":"hidden"});
        $("#wrapper__inner").css({"height":"100%", "width": window.screen.width +"px", "overflow":"auto","-webkit-overflow-scrolling":"touch"});
      }
    }
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' rel="stylesheet/less">
  @assets: "~@/assets";
  @import "@{assets}/css/flex.less";
  @import "@{assets}/css/fix.less";
  a.fixBackHome {
    position: fixed;
    bottom: 66/@r;
    left: 14px;
    z-index: 99;
    .backToIndex {
      display: block;
      width: 92/@r;
      height: 92/@r;
      background: url("images/home@3x.png") no-repeat center;
      background-size: contain;
    }
  }

  .page_wrapper.tabbar {
    // padding-bottom: 55px;
  }

  .layout_wrapper {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  @media screen and(min-device-width:760px) {
    .layout_wrapper {
      position: relative;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
    }
    .page_wrapper.banner {
      top: 0;
    }
  }

</style>

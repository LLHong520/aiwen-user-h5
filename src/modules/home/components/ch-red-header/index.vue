<template>
  <div class="home_header_wrapper">
    <div class="home_header">
      <div class="logo"><img src="./logo_sina@3x.png" alt=""></div>
      <div v-if="!isInWeibo" class="down_load">
        <a @click="dowloadApp" href="javascript:;">下载<b>APP</b></a>
      </div>
      <div class="search_box">
        <input autocomplete="off" @focus="search_btn" type="needsclick text" placeholder="搜索医生/文章">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    mapGetters
  } from "vuex";
  export default {
    props: {
      content: {
        type: String,
        default: ""
      },
      btnTxt: {
        type: String,
        default: "打开App"
      },
      isFixed: {
        type: Boolean,
        default: false
      },
      isIndex: {
        type: Boolean,
        default: false
      },
      isConsult: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        isClosed: false,
        appUrl: "https://health.sina.cn"
      };
    },
    methods: {
      search_btn() {
        this.$router.push({
          path: "/search"
        });
      },
      dowloadApp() {
        console.log("xiazai");
        try {
          iwenJSNativeBridge.openApp();
        } catch (e) {
          console.log("catch");
          this.$router.push({
            name: "appDownload"
          });
        }
      }
    },
    computed: {
      isInWeibo() {
        return platformInfo.isWeibo;
      },
      ...mapGetters(["isInSinaHealthApp", "isInIwenApp", "healAppInfo"])
    }
  };

</script>

<style lang="less" scoped rel="stylesheet/less">
  @assets: "~@/assets";
  @import "@{assets}/css/flex.less";
  @import "@{assets}/css/fix.less";
  @r: 75rem;

  //顶部搜索栏
  .home_header_wrapper {
    position: relative;
    height: 176/@r;
    z-index: 999;
    background:url(./bg@3x.png) no-repeat center;
    background-size: 750/@r 176/@r;
    box-sizing: border-box;
  }

  .home_header {
    height: 176/@r;
    width: 100%;
    left: 0;
    top: 0;
    padding-top: 10px;
    .logo {
      width: 200/@r;
      height: 64/@r;
      display: block;
      margin: 0px auto 10px;

      img {
        width: 200/@r;
        height: 64/@r;
        display: block;
      }
    }

    .search_box {
      flex: 1;
      width: 690/@r;
      box-flex: 1;
      margin: 0 auto;

      input {
        width: 100%;
        height: 60/@r;
        line-height: 36/@r;
        border-radius: 30/@r;
        font-size: 24/@r;
        padding: 10/@r 0 10/@r 0;
        background: #fff url(./icon_search@2x@3x.png) no-repeat 220/@r 10/@r;
        background-size: 30/@r 32/@r;
        box-sizing: border-box;
        color: #AEB1B6;
        &::-webkit-input-placeholder{
          text-align: center;
          color: #AEB1B6;
        }
      }
    }
  }


  .down_load a{
    display: block;
    width:128/@r;
    height:48/@r;
    text-align: center;
    background:linear-gradient(270deg,rgba(255,170,73,.2) 0%,rgba(255,130,39,.2) 100%);
    box-shadow:0px 6/@r 14/@r 0px rgba(245,0,0,1);
    border-radius:6/@r;
    border:1px solid rgba(255,255,255,0.65);
    color: #fff;
    line-height: 48/@r;
    font-size: 10px;
    font-weight: lighter;
    position:absolute;
    right: 34/@r;
    top: 28/@r;
  }
 </style>

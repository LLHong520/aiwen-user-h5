<template>
  <layout :isAppView="true">
    <div class="wrapper" slot="page_container">
      <div class="header">
        <a href="javascript:;" class="arrow" @click="router_back"></a>
        <h2>新浪健康APP</h2>
      </div>
      <div class="version_box">
        <div class="logo"><img src="./images/icon_applogo@2x.png" width="164" alt=""></div>
      </div>
      <div class="down_txt">
        <img src="./images/main_front@2x.png" alt="">
        <p>连接·健康</p>
      </div>
      <div class="btn_box">
        <a href="javascript:;" id="downApp1" @click="downloadApp" class="btn">下载新浪健康</a>
        <a href="javascript:;" v-show="!platformInfo.isWx" @click="openApp" class="btn white mt10">打开APP</a>
        <p>使用APP，体验更好，更多的服务</p>
      </div>
      <div class="img_box">
        <img src="./images/bg01@2x.png" width="100%" alt="">
        <img src="./images/bg02@2x.png" width="100%" alt="">
        <img src="./images/bg03@2x.png" width="100%" alt="">
        <img src="./images/bg04@2x.png" width="100%" alt="">
      </div>
      <div class="btn_box bottom">
        <a href="javascript:;" id="downApp2" @click="downloadApp" class="btn">下载新浪健康</a>
      </div>
      <div v-show="platformInfo.isWeibo">
        <div class="wechatImg">
          <img src="./images/tips_dl@3x.png" />
        </div>
      </div>
    </div>
  </layout>
</template>
<script>
  import platformInfo from "@/common/platformInfo";
  import {
    commonMixin
  } from "@/mixins";
  export default {
    mixins: [commonMixin],
    data() {
      return {
        platformInfo,
      };
    },
    created() {
      console.log(this.$route.query.referer);
      //如果是要求立即打开 则直接运行打开的函数
      if (this.$route.query.openNow && this.$route.query.openNow == 1) {
        this.openApp();
      }
    },
    mounted() {
      document.dispatchEvent(new Event("render-event"));
    },
    computed: {
      isShowTip() {
        let is = false;
        if (this.platformInfo.isWeibo) {
          is = true;
        } else if (this.platformInfo.isWx) {
          if (!SINA_HEAL_APP_CONF.hasYingYongBao) {
            is = true;
          }
        }
        return is;
      }
    },
    methods: {
      openApp() {
        let referer = this.$route.query.referer;
        if (referer && referer != "") {
          // console.log(referer);
          iwenJSNativeBridge.openApp(referer, false);
        } else {
          iwenJSNativeBridge.openApp("", false);
        }
      },
      downloadApp() {
        _hmt.push(["_trackEvent", "新浪健康App下载页", "下载", "渠道[" + (this.$route.query.openFrom || "无") + "]"]);
        let urlKey = "android";
        if (this.platformInfo.isWx && SINA_HEAL_APP_CONF.hasYingYongBao) {
          urlKey = "appBao";
        } else if (this.platformInfo.isAndroid) {
          urlKey = "android";
        } else if (this.platformInfo.isiOS) {
          urlKey = "ios";
        }
        let downloadUrl = SINA_HEAL_APP_CONF.downloadUrl[urlKey];
        window.location.href = downloadUrl;
      }
    },
    metaInfo: {
      title: "新浪健康",
      meta: [{
        name: "keyWords",
        content: "健康医疗、健康资讯、在线医疗、新浪健康、爱问医联、医疗资讯"
      },
      {
        name: "description",
        content: "新浪健康，严肃医疗资讯平台，健康无忧"
      },
      ]
    }
  };

</script>

<style scoped lang="less" rel="stylesheet/less">
  @import './css.less';

</style>

<template>
  <div v-if="!isInSinaHealthApp && !isInIwenApp && !isInWeibo" class="ad_wrapper">
    <div style="height:48px" v-if="isFixed&&!isIndex"></div>
    <div v-if="!isConsult">
      <div class="app_btn" v-if="isIndex" @click="dowloadApp">
        <div class="app_logo">
          <img src="./icon_app_sina@2x.png" width="38" height="38" alt>
        </div>
        <div class="ad_txt">
          <p>下载<br/>APP</p>
        </div>
      </div>
      <div v-else-if="!isClosed" class="ad_app" :class="{'fixed':isFixed}">
        <a href="javascript:;" class="btn_close" @click="close"></a>
        <div class="app_logo">
          <img src="./icon_app_sina@2x.png" width="38" height="38" alt>
        </div>
        <div class="ad_txt">
          <dl>
            <dt>{{healAppInfo.name}}</dt>
            <dd>{{content}}</dd>
          </dl>
        </div>
        <div class="btn">
          <a @click="dowloadApp" href="javascript:;">{{btnTxt}}</a>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="ad_app consult" v-if="!isClosed">
        <a href="javascript:;" class="btn_close" @click="close"></a>
        <div class="ad_txt">
          <p>全国三甲名医，爱医日<span class="yellow">免费<em><img src="./icon_smile@2x.png"/></em></span>问</p>
        </div>
        <div class="btn" v-if="isIndex">
          <a :href="appUrl + '/commonwealActivity/nostart/5cb59edbe4b0c9a36f502ab7?source_channel=index'">立即咨询</a>
        </div>
        <div class="btn" v-else>
          <a :href="appUrl + '/commonwealActivity/nostart/5cb59edbe4b0c9a36f502ab7?source_channel=article'">立即咨询</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from "vuex";
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
      default: true
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
      appUrl:"https://health.sina.cn"
    };
  },
  methods: {
    close() {
      this.isClosed = true;
    },
    dowloadApp() {
      console.log("xiazai");
      try {
        iwenJSNativeBridge.openApp();
      } catch (e) {
        console.log("catch");
        this.$router.push({
          name:"appDownload"
        });
      }
    }
  },
  computed:{
    isInWeibo(){
      return platformInfo.isWeibo;
    },
    ...mapGetters(["isInSinaHealthApp","isInIwenApp","healAppInfo"])
  }
};
</script>

<style lang="less" scoped rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
@r:75rem;
.app_btn{
  display: flex;
  font-size: 20/@r;
  color: #2688FC;
  background-color: #E9F3FF;
  border-radius: 4/@r;
  padding-right: 6/@r;
  align-items: center;
  margin-left: 14/@r;
  .app_logo{
    width: 56/@r;
    height: 56/@r;
    margin-right: 6/@r;
    img{
      width: 56/@r;
      height: 56/@r;
    }
  }
  .ad_txt{
    flex: 1;
    line-height: 24/@r;
    height: 48/@r;
    overflow: hidden;
  }
}
.ad_app {
  display: flex;
  height: 48px;
  background: url(bg_big@2x.png) no-repeat right center,
    linear-gradient(
      360deg,
      rgba(243, 248, 254, 1) 0%,
      rgba(226, 240, 254, 1) 100%
    );
  background-size: auto 48px;
  &.consult{
    background-image: url(./bg_main_s.png),linear-gradient(90deg,rgba(37,198,198,1) 0%,rgba(15,184,184,1) 100%);
    // background-size: 82/@r 76/@r;
    background-position: 0 10px;
    position: relative;
    .btn {
      width: 148/@r;
      height: 27px;
      border: 0;
      position:absolute;
      right:0;
      a{
        width: 148/@r;
        height: 27px;
        line-height: 28px;
        color: rgba(15,184,184,1);
        background:linear-gradient(90deg,rgba(255,255,255,1) 100%,rgba(15,184,184,1) 0%);
        box-shadow:0px 3px 6px 0px rgba(0,0,0,0.2);;
        font-size: 24/@r;
        border-radius: 2px;
      }
    }
    .btn_close{
      background-color: rgba(5,144,144,.3);
    }
    .ad_txt{
        margin-right: 148/@r;
        background: url(./bg_main_l.png) no-repeat;
        // background-size: 82/@r 76/@r;
        background-position: right 0px;
      p{
        line-height: 38px;
        font-size: 30/@r;
        color: #fff;
        font-weight: 700;
        .yellow{
          color: #FFE800;
          position: relative;
          em{
            display: block;
            position: absolute;
            left: 50%;
            margin-left: -19/@r;
            bottom: -10/@r;
            background: url(icon_smile@2x.png) no-repeat;
            width: 38/@r;
            height: 14/@r;
            background-position: 0 bottom;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
.ad_app.fixed {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 999;
}
.ad_app .btn_close {
  display: block;
  background: rgba(74, 149, 234, 0.3) url(btn_close@2x.png) no-repeat center
    center;
  background-size: 8px 8px;
  width: 14px;
  height: 14px;
  border-radius: 14px;
  margin: 17px 0 17px 10px;
}
.ad_app .app_logo {
  padding-left: 10px;
  padding-top: 5px;
  width: 38px;
  height: 38px;
}
.ad_app .app_logo img {
  display: block;
}
.ad_app .ad_txt {
  flex: 1;
  overflow: hidden;
  padding-left: 8px;
  padding-top: 5px;
  height: 38px;
  display: flex;
}
.ad_app .ad_txt dt {
  font-size: 14px;
  color: #0e3a6a;
  line-height: 20px;
}
.ad_app .ad_txt dd {
  font-size: 10px;
  color: #96b5cd;
  line-height: 14px;
}
.ad_app .btn {
  width: 74px;
  height: 27px;
  border-radius: 2px;
  padding: 0;
  margin: 10px 15px 0 0;
}
.ad_app .btn a {
  display: block;
  width: 74px;
  height: 27px;
  text-align: center;
  line-height: 27px;
  background: rgba(38, 136, 252, 1);
  box-shadow: 0px 3px 6px 0px rgba(131, 198, 255, 0.67);
  color: #fff;
  font-size: 12px;
}

.add_app_index{
  height: 72px;
  background: url(bg_big_home@2x.png) no-repeat right center,
    linear-gradient(
      360deg,
      rgba(243, 248, 254, 1) 0%,
      rgba(226, 240, 254, 1) 100%
    );
  background-size: auto 72px;
}
.add_app_index .app_logo{
  padding-top: 17px;
}
.add_app_index .ad_txt{
  padding-top: 17px;
}
.add_app_index .ad_txt dt{
  line-height: 38px;
  font-size: 30/@r;
  font-weight: 700;
}
.add_app_index .btn{
  margin-top: 22px;
}
.add_app_index .btn_close{
  margin-top: 29px;
}
</style>

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
// import "amfe-flexible";
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueLazyload from "vue-lazyload";
import MetaInfo from "vue-meta-info";
import VueClipboard from "vue-clipboard2";
import $ from "n-zepto";
// import VueAwesomeSwiper from "vue-awesome-swiper";
import store from "./store";
import "@/assets/css/base.less";
import "@/assets/css/animate.less";
import "@/assets/css/common.less";

import Toast from "@/common/toast.js";
import FastClick from "fastclick-vue";
import "@/common/common.js";
import "@/common/iwenJSNativeBridge.js";

Vue.use(MetaInfo);
Vue.use(VueClipboard);

Vue.use(VueLazyload, {
  // loading: require('./assets/images/img_loading.png'),
  // error: require('./assets/images/img_load_err.png'),
  attempt:1,
  adapter: {
    loaded ({ bindType, el, naturalHeight, naturalWidth}) {
      //懒加载适应器
      var currentEl=$(el);
      var parentEl=$(el).parent();
      var parentW=parentEl.width();
      var parentH=parentEl.height();
      if(currentEl.hasClass("adapter")){
        if(naturalHeight<naturalWidth){
          currentEl.height(parentH);
          currentEl.width((naturalWidth*parentH)/naturalHeight).css("max-width","unset");
        }else{
          currentEl.width(parentW);
          currentEl.height((naturalHeight*parentW)/naturalWidth);
        }
      }
    }
  }
});

Vue.use(Toast, {});

$(function(){
  FastClick.attach(document.body);
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
let root = new Vue({
  // el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
document.addEventListener("DOMContentLoaded", function () {
  root.$mount("#app");
  setTimeout(function(){
    var loadingAnim = document.getElementById("loading_app");
    setTimeout(function(){
      loadingAnim.style.display="none";
    },310);
  },500);
});

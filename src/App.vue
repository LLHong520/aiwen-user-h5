<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
Vue.use(VueAwesomeSwiper);

import preview from "vue-photo-preview";
import "vue-photo-preview/dist/skin.css";
Vue.use(preview);

import AwesomePicker from "vue-awesome-picker";
Vue.use(AwesomePicker);

import "swiper/dist/css/swiper.css";
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload
    };
  },
  data(){
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style lang="less">

@import "./assets/css/flex.less";
@import "./assets/css/fix.less";
#app{
  min-height: 100vh;
}
.wrapper__inner{
  position: relative;
  width: 100%;
  // height: 100%;
  // overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}

[v-cloak] {
  // display: none;
  visibility: hidden;
}
.animated {
  .animation-duration(.3s);
  .animation-fill-mode(both);
}

//右侧划入
.keyframes(slideInRight,{
  from {
    .transform(translate3d(100%, 0, 0));
    visibility: visible;
  }

  to {
    .transform(translate3d(0, 0, 0));
  }
});

.slideInRight {
  .animation-name(slideInRight);
}

.keyframes(fadeOut,{
  from {
    .opacity(1);
  }

  to {
    .opacity(0);
  }
});

.fadeOut {
  .animation-name(fadeOut);
}


.keyframes(fadeIn,{
  from {
    .opacity(0);
  }

  to {
    .opacity(1);
  }
});

.fadeIn {
  .animation-name(fadeIn);
}


.keyframes(slideInUp,{
  from {
    .transform(translate3d(0, 100%, 0));
    visibility: visible;
  }

  to {
    .transform(translate3d(0, 0, 0));
  }
});

.slideInUp {
  .animation-name(slideInUp);
}


//==================================pc
@media screen and(min-device-width:760px){
  .pc_header_wrapper{
    background-color: #fff;
    margin-bottom: 10px;
  }
  .pc_header{
    line-height: 80px;
    width: 1000px;
    margin: 0 auto;
    .flexbox();
  }

  .header_menu{
   li{
     float: left;
     margin-left: 20px;
     &.router-link-active a{
       color: @main_c;
     }
   }
  }

  .pc_container{
    width: 1000px;
    margin: 0 auto;
    .flexbox();
    .c_left{
      .flex(1);
    }
    .c_right{
      width: 230px;
      height: 800px;
      background-color: #fff;
    }
  }
}
</style>

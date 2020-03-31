<template>
  <div class="tab-holder">
    <div ref="tab" class="tab-wrapper">
      <ul class="tab-list clearfix">
        <li class="tab-item" v-for="(tabItem,index) in tabInfo"
          :key="index" :class="{'active':index==current}" @click="chooseDepart(index)">{{tabItem.name}}
        </li>
      </ul>
      <span class="icon-menu-heal icon" @click="showLeftMenu"></span>
      <transition name="fade">
        <div class="action_mask" v-show="show" @click="hideLeftMenu"></div>
      </transition>
      <transition name="bounce">
        <div class="left-menu" v-show="show">
          <div class="menu-wrapper">
            <h3 class="title">请选择科室</h3>
            <ul class="menu-list">
              <!-- <li class="all">全部</li> -->
              <li class="menu-item" :class="{'active':index==current}" @click="chooseDepart(index)"
                v-for="(departItem,index) in menuInfo" :key="index">{{departItem.name}}
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tabInfo: {
      type: Array,
      default: ()=>[]
    },
    menuInfo: {
      type: Array,
      default: ()=>[]
    },
    show: {
      type: Boolean,
      default: false
    },
    current: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {

    };
  },
  mounted() {
    this.$nextTick(function() {
      var el = $(this.$refs.tab);
      var tabTop = el.position().top;// var tabTop = el.offset().top;
      var tabH = el.height();
      //滚动条事件
      let wrapper_inner = $(this.getScrollEle());
      wrapper_inner.scroll(function() {
        //获取滚动条的滑动距离
        var scroH = wrapper_inner.scrollTop();
        // console.log(scroH);
        //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
        // if (scroH -160 >= tabTop) {
        if (scroH > tabTop + tabH) {
          el.addClass("fixed_top");
        } else {
          el.removeClass("fixed_top");
        }
      });
    });
  },
  created() {},
  methods: {
    chooseDepart(index){
      let This = this;
      // This.myCurrent=index;
      This.hideLeftMenu();
      this.$emit("chooseFn",index);
    },
    showLeftMenu() {
      this.$emit("menuFn");
    },
    hideLeftMenu() {
      this.$emit("update:show", false);
    },
    //获取添加滚动事件的元素
    getScrollEle() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      var scrollEle = null;
      if (isiOS&&platformInfo.isWeibo) {
        scrollEle = "#wrapper__inner";
      } else {
        scrollEle = window;
      }
      return scrollEle;
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "~@/assets/css/fix.less";
.tab-holder {
  height: 88/@r;
  line-height: 88/@r;
  z-index: 99999;
}
.tab-wrapper {
  position: relative;
  border-bottom: 3px solid #fff;
  padding: 0 20/@r;
  height: 88/@r;
  line-height: 88/@r;
  background-color: #f4f8fa;
  z-index: 99999;
}

.tab-list {
  width: 100%;
  /* overflow-x:scroll; */
  overflow-x: hidden;
  white-space: nowrap;
  .font_xl;
  .transition(transform 0.5s ease 0s);
  position: relative;
}

.tab-list li {
  display: inline-block;
  white-space: normal;
  padding: 0 12px;
  cursor: pointer;
  color: #acacac;
  text-align: center;
  position: relative;
  &.active {
    color: @main_c;
  }
  &.active:after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 50%;
    margin-left: -16px;
    width: 32px;
    background-color: @main_c;
    height: 4px;
    .border-radius(4px);
  }
}

.tab-wrapper .icon {
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -20px;
  z-index: 99999;
}

.action_mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
  z-index: 8;
  padding: 10px;
}

.left-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 120px;
  height: 100%;
  background-color: #5e5e5e;
  z-index: 99999;
}

.menu-wrapper {
  text-align: center;
  height: 100%;
  overflow-y: scroll;
  .title {
    color: #a8a8a8;
    font-size: 15px;
    padding: 10px 0 0;
  }
  .menu-list li {
    line-height: 40px;
    color: #ffffff;
    font-size: 15px;
    &.active {
      color: @main_c;
    }
  }
}

//动画效果
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-out 0.5s;
}

@keyframes bounce-in {
  0% {
    transform: translateX(100px);
  }

  100% {
    transform: translateX(0px);
  }
}

@keyframes bounce-out {
  0% {
    transform: translateX(0px);
  }

  100% {
    transform: translateX(100px);
  }
}

.fade-enter-active {
  animation: fade-in 0.5s;
}

.fade-leave-active {
  animation: fade-out 0.5s;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.5;
  }
}

@keyframes fade-out {
  0% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}

/* 设置滚动条的样式 */

::-webkit-scrollbar {
  width: 0;
}

/* 滚动槽 */

// ::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 0 rgba(0,0,0,0);}/* 滚动条滑块 */
// ::-webkit-scrollbar-thumb {background: rgba(0,0,0,0);-webkit-box-shadow: inset 0 0 0 rgba(0,0,0,0);}
// ::-webkit-scrollbar-thumb:window-inactive {background: rgba(0,0,0,0);}
</style>

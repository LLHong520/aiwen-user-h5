import Vue from "vue";
import Router from "vue-router";
import setTitle from "@/common/setTitle";
import Auth from "../auth";
import commonRoutes from "@/modules/common/router";
import homeRoutes from "@/modules/home/router";
import departRoutes from "@/modules/depart/router";
import doctorRoutes from "@/modules/doctor/router";
import activityRoutes from "@/modules/activity/router";
import healthRoutes from "@/modules/health/router";
import mediaRoutes from "@/modules/media/router";
import appRoutes from "@/modules/app/router";
import phoneRoutes from "@/modules/phone/router";
import paymentRoutes from "@/modules/payment/router";
import patientRoutes from "@/modules/patient/router";
import userRoutes from "@/modules/my/router";
import cdcRoutes from "@/modules/cdc/router";
import channelRoutes from "@/modules/channel/router";
import operationTopic from "@/modules/operation_topic/router";
import wuhanTopic from "@/modules/wuhan/router";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: "/zt",
  fallback:true,
  scrollBehavior (to, from, savedPosition) {
    console.log("savedPosition====");
    console.log(savedPosition);
    console.log("savedPosition====");
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes:[
    ...commonRoutes,
    ...homeRoutes,
    ...departRoutes,
    ...activityRoutes,
    ...doctorRoutes,
    ...healthRoutes,
    ...mediaRoutes,
    ...appRoutes,
    ...phoneRoutes,
    ...paymentRoutes,
    ...patientRoutes,
    ...userRoutes,
    ...cdcRoutes,
    ...channelRoutes,
    ...operationTopic,
    ...wuhanTopic,
    {
      path: "**",
      redirect: "/home"
    }
  ]
});
import store from "../store";
import platformLogin from "@/common/platformFn";

router.beforeEach(async (to, from, next) => {
  console.log(to);
  console.log(store.state.sinaAppQueryString);
  if (store.state.sinaAppQueryString){
    Auth.save_sinaAppQueryString(store.state.sinaAppQueryString);
  }
  if (store.getters.isInSinaHealthApp){
    iwenJSNativeBridge.hiddenShare({
      hidden: true,
    });
  }
  //整个应用的百度统计
  if (to.path) {
    _hmt.push(["_trackPageview","/zt"+to.fullPath]);
  }
  let toWithChannel=null;
  //记录首次进入页面的渠道号
  if (!store.state.channel) {
    if(to.query&&to.query.channel){
      store.commit("SET_QUERY_CHANNEL", to.query.channel);
    }
  }else{
    //当前链接没有渠道号则加上渠道号再跳转
    if(!to.query.channel){
      toWithChannel={
        path:to.path,
        params:to.params,
        query:to.query,
        replace:true
      };
      toWithChannel.query.channel=store.state.channel;
    }
  }
  //记录首次进入页面的url
  if (!store.state.wxConfigUrl) {
    store.commit("SET_WXCONGIG_URL", document.URL);
  }
  //设置文档标题
  let title = to.meta.title;
  setTitle(title);
  //显示路由切换中
  $("#changeing_page").css("display","block");
  $("#go_top").css("display","none");

  if(!store.state.token){
    store.dispatch("check_login");
  }else{
    console.log(store.state.token);
    console.log("check_login");
  }
  //是否存在token 若存在则获取用户信息
  if(store.state.token&&store.state.userInfo==null){
    console.log("store.state.token");
    console.log(store.state.token);
    console.log("获取用户信息");
    let isGetUserInfoSucc = await store.dispatch("update_userinfo");
    // console.log(isGetUserInfoSucc);
    console.log("获取用户信息======", isGetUserInfoSucc);
  }

  //如果已经登录则获取消息数目
  if (store.getters.islogin) {
    store.dispatch("refresh_message_num");
  }

  //如果在微信和微博下 未登录 则自动重定向登录
  // if ((platformInfo.isWx||platformInfo.isWeibo)&&!store.getters.islogin) {
  //   if(to.name!="Login"&&to.name!="Callback"){
  //      platformLogin(to.fullPath);
  //   }else{
  //     next();
  //   }
  // }else{
  //普通浏览器则判断是否需要登录 需要则去登录
  if (to.meta && to.meta.needLogin) {
    //需要登录
    if (store.getters.islogin) {
      next();
    } else {
      if (store.getters.isInSinaHealthApp){
        console.log("调起登录");
        iwenJSNativeBridge.appLogin();
        console.log("调起登录-----");
      } else{
        platformLogin(to.fullPath);
      }
    }
  } else {
    //无需登录
    if(toWithChannel!=null){
      next(toWithChannel);
    }else{
      next();
    }

  }
  // }
});

router.afterEach(route => {
  $("#changeing_page").css("display","none");
});

export default router;

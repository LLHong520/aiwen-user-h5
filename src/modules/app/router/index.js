//app模块
const about = resolve => require(["../pages/about/index"], resolve);
const down = resolve => require(["../pages/down/index"], resolve);
const rules = resolve => require(["../pages/rules/index"], resolve);
const agreementPatient = resolve => require(["../pages/agreement_patient"], resolve);
const privateRules = resolve => require(["../pages/privateRules/index"], resolve);
const articleList = resolve => require(["../pages/articleList/index"], resolve);
const selfDescriptionList = resolve => require(["../pages/self_description_list/index"], resolve);
const zixunList = resolve => require(["../pages/zixun/index"], resolve);
const yuyueList = resolve => require(["../pages/yuyue/index"], resolve);
const myActivity = resolve => require(["../pages/myActivity/index"], resolve);
const appAudio = resolve => require(["../pages/audio/index"], resolve);
export default [
  {
    path: "/app/about",
    name: "about",
    component: about,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "关于我们"
    }
  },
  {
    path: "/app/down",
    name: "appDownload",
    component: down,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "下载新浪健康"
    }
  },
  {
    path: "/app/rules",
    name: "rules",
    component: rules,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "新浪健康服务协议"
    }
  },
  {
    path: "/agreement/patient",
    name: "agreementPatient",
    component: agreementPatient,
    meta: {
      needLogin: false,
      messageOn: false,
      title: "新浪健康隐私协议"
    }
  },
  {
    path: "/app/privateRules",
    name: "app.privateRules",
    component: privateRules,
    meta: {
      needLogin: false,
      messageOn: false,
      title: "用户隐私协议"
    }
  },
  {
    path: "/app/articleList",
    name: "articleList",
    component: articleList,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "健康科普"
    }
  },
  {
    path: "/app/descriptionList",
    name: "selfDescriptionList",
    component: selfDescriptionList,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "自述热榜"
    }
  },
  {
    path: "/app/zixun",
    name: "zixunList",
    component: zixunList,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "我的咨询"
    }
  },
  {
    path: "/app/yuyue",
    name: "yuyueList",
    component: yuyueList,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "我的预约"
    }
  },
  {
    path: "/app/activity",
    name: "myActivity",
    component: myActivity,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "我的活动"
    }
  },
  {
    path: "/app/audio",
    name: "appAudio",
    component: appAudio,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "语音消息"
    }
  }
];

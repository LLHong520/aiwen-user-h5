//医生模块
const famousDocs = resolve => require(["../pages/famous-docs/famous-docs"], resolve);
const docIndex = resolve => require(["../pages/doc_index/doc_index"], resolve);
const docIndexView = resolve => require(["../pages/doc_index_view/doc_index_view"], resolve);
const docConsult = resolve => require(["../pages/doc_consult/doc_consult"], resolve);
const docComments = resolve => require(["../pages/doc_comments/doc_comments"], resolve);
const docVideo = resolve => require(["../pages/doc_video/doc_video"], resolve);
const docSelfDescription = resolve => require(["../pages/doc_self_description/doc_self_description"], resolve);
const docDiary = resolve => require(["../pages/doc_diary/doc_diary"], resolve);
const docScience = resolve => require(["../pages/doc_science/doc_science"], resolve);
const docIllCase = resolve => require(["../pages/doc_illcase/doc_illcase"], resolve);
const docMoments = resolve => require(["../pages/doc_moments/doc_moments"], resolve);
const docActivity = resolve => require(["../pages/doc_activity/doc_activity"], resolve);
const docHistory = resolve => require(["../pages/doc_history/doc_history"], resolve);
const docIntroduce = resolve => require(["../pages/doc_info/doc_info"], resolve);
const serviceMonth = resolve => require(["../pages/service_month/service_month"], resolve);

export default [
  {
    path: "/doc_list",
    name: "famousDocs",
    component: famousDocs,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"推荐医生"
    }
  },
  {
    path: "/doc/:dId",
    name: "docIndex",
    component: docIndex,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"医生诊室"
    }
  },
  {
    path: "/docview/:dId",
    name: "docIndexView",
    component: docIndexView,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "医生诊室"
    }
  },
  {
    path: "/docIntroduce/:dId",
    name: "docIntroduce",
    component: docIntroduce,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "医生个人详情页面"
    }
  },
  {
    path: "/doc_comments",
    name: "docComments",
    component: docComments,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"患者评价"
    }
  },
  {
    path: "/doc_consult",
    name: "docConsult",
    component: docConsult,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"咨询案例"
    }
  },
  {
    path: "/doc_video/:dId",
    name: "docVideo",
    component: docVideo,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"医生视频"
    }
  },
  {
    path: "/doc_self_description/:dId",
    name: "docSelfDescription",
    component: docSelfDescription,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "自述热榜"
    }
  },
  {
    path: "/doc_diary/:dId",
    name: "docDiary",
    component: docDiary,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "诊间日记"
    }
  },
  {
    path: "/doc_science/:dId",
    name: "docScience",
    component: docScience,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "健康科普"
    }
  },
  {
    path: "/doc_illcase/:dId",
    name: "docIllCase",
    component: docIllCase,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "病例分析"
    }
  },
  {
    path: "/doc_moments/:dId",
    name: "docMoments",
    component: docMoments,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "我的社区"
    }
  },
  {
    path: "/doc_activity/:dId",
    name: "docActivity",
    component: docActivity,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "我的活动"
    }
  },
  {
    path: "/doc_history/:dId",
    name: "docHistory",
    component: docHistory,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "最近动态"
    }
  },
  {
    path: "/serviceMonth",
    name: "serviceMonth",
    component: serviceMonth,
    meta: {
      needLogin: true,
      messageOn: true,
      title: "包月服务"
    }
  }
];

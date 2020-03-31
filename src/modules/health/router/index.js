//健康
const Index = resolve => require(["../pages/index/index"], resolve);
const searchDoc = resolve => require(["../pages/search_doctor/search_doctor"], resolve);
const Diary = resolve => require(["../pages/diary/diary"], resolve);
const Article = resolve => require(["../pages/science_article/science_article"], resolve);
const disAnalysis = resolve => require(["../pages/dis_analysis/dis_analysis"], resolve);
const Course = resolve => require(["../pages/course/course"], resolve);
const Special = resolve => require(["../pages/special/special"], resolve);
const singleCloumn = resolve => require(["../pages/single_cloumn/single_cloumn"], resolve);
const moreCloumn = resolve => require(["../pages/more_cloumn/more_cloumn"], resolve);
const specialList = resolve => require(["../pages/special_list/special_list"], resolve);
const specialSingle = resolve => require(["../pages/special_single/special_single"], resolve);


// const patientAsk = resolve => require(["../pages/patient_ask/patient_ask"], resolve);

export default [
  {
    path: "/health",
    name: "healthIndex",
    component: Index,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"健康首页"
    }
  },
  {
    path: "/search/doctor",
    name: "searchDoc",
    component:searchDoc,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"找医生"
    }
  },
  {
    path: "/heal/diary",
    name: "heal.diary",
    component: Diary,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"健康-诊间日记"
    }
  },
  {
    path: "/heal/article",
    name: "heal.article",
    component: Article,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"健康-科普文章"
    }
  },
  {
    path: "/heal/analysis",
    name: "heal.disAnalysis",
    component: disAnalysis,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"健康-病例分析"
    }
  },
  {
    path: "/heal/course",
    name: "heal.course",
    component: Course,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"健康-在线课堂"
    }
  },
  {
    path: "/heal/special",
    name: "heal.special",
    component: Special,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"健康-专题"
    }
  },
  // {
  //   path: "/heal/patientAsk",
  //   name: "heal.patientAsk",
  //   component: patientAsk,
  //   meta: {
  //     needLogin: false,
  //     messageOn:true,
  //     title:"健康-患者自述"
  //   }
  // },
  {
    path: "/heal/article/cloumn/:id",
    name: "heal.article.cloumn",
    component: singleCloumn,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "栏目页面"
    }
  },
  {
    path: "/heal/article/moreCloumn",
    name: "heal.article.more",
    component: moreCloumn,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "更多栏目"
    }
  },
  {
    path: "/heal/special/moreColumn",
    name: "heal.special.more",
    component: specialList,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"专题更多"
    }
  },
  {
    path: "/heal/special/column/:id",
    name: "heal.special.column",
    component: specialSingle,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"专题栏目"
    }
  },
];

//频道
const channelIndex = resolve => require(["../pages/index/index"], resolve);
const channelSearch = resolve => require(["../pages/search/index"], resolve);
const channelDoctorList = resolve => require(["../pages/doctorList/index"], resolve);
const channelHospitalList = resolve => require(["../pages/hospitalList/index"], resolve);
const channelArticleList = resolve => require(["../pages/articleList/index"], resolve);
const channelPostList = resolve => require(["../pages/postList/index"], resolve);
const channelClassList = resolve => require(["../pages/classList/index"], resolve);
const channelSubjectList = resolve => require(["../pages/subjectList/index"], resolve);
const channelCaseList = resolve => require(["../pages/caseList/index"], resolve);
const channelSubjectDetail = resolve => require(["../pages/subjectDetail/index"], resolve);
const channelCaseDetail = resolve => require(["../pages/caseDetail/index"], resolve);
const channelArticleDetail = resolve => require(["../pages/articleDetail/index"], resolve);
const channelHospitalDetail = resolve => require(["../pages/hosiptalDetail/index"], resolve);
const channelHospitalMap = resolve => require(["../pages/map/map"], resolve);
const channelClassDetail = resolve => require(["../pages/classDetail/index"], resolve);
const channelPostDetail = resolve => require(["../pages/postDetail/index"], resolve);
const channelColumnList = resolve => require(["../pages/columnList/index"], resolve);
const columnClassList = resolve => require(["../pages/columnClassList/index"], resolve);
const columnIndex = resolve => require(["../pages/columnIndex/index"], resolve);
const columnEntry = resolve => require(["../pages/columnEntry/index"], resolve);
const columnEntryIndex = resolve => require(["../pages/entryIndex/index"], resolve);
const channelComtyList = resolve => require(["../pages/comtyList/index"], resolve);

export default [
  {
    path: "/channel/:id",
    name: "channelIndex",
    component: channelIndex,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"频道首页"
    }
  },
  {
    path: "/channel/:id/search",
    name: "channelSearch",
    component: channelSearch,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "频道搜索"
    }
  },
  {
    path: "/channel/:id/doctors",
    name: "channelDoctorList",
    component: channelDoctorList,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "医生列表"
    }
  },
  {
    path: "/channel/:id/hospital",
    name: "channelHospitalList",
    component: channelHospitalList,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "医院列表"
    }
  },
  {
    path: "/channel/:id/article",
    name: "channelArticleList",
    component: channelArticleList,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "科普列表"
    }
  },
  {
    path: "/channel/:id/post",
    name: "channelPostList",
    component: channelPostList,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "帖子列表"
    }
  },
  {
    path: "/channel/:id/class",
    name: "channelClassList",
    component: channelClassList,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "课堂列表"
    }
  },
  {
    path: "/channel/:id/subject",
    name: "channelSubjectList",
    component: channelSubjectList,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "专题列表"
    }
  },
  {
    path: "/channel/:id/case",
    name: "channelCaseList",
    component: channelCaseList,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "案例列表"
    }
  },
  {
    path: "/channel/:id/subjectInfo",
    name: "channelSubjectDetail",
    component: channelSubjectDetail,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "专题详情"
    }
  },
  {
    path: "/channel/:id/caseInfo",
    name: "channelCaseDetail",
    component: channelCaseDetail,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "案例详情"
    }
  },
  {
    path: "/channel/:id/articleInfo",
    name: "channelArticleDetail",
    component: channelArticleDetail,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "科普详情"
    }
  },
  {
    path: "/channel/:id/hospitalInfo",
    name: "channelHospitalDetail",
    component: channelHospitalDetail,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "医院详情"
    }
  },
  {
    path: "/channel/:id/hospitalInfo/map",
    name: "channelHospitalMap",
    component: channelHospitalMap,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "医院地图"
    }
  },
  {
    path: "/channel/:id/classInfo",
    name: "channelClassDetail",
    component: channelClassDetail,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "课堂详情"
    }
  },
  {
    path: "/channel/:id/postInfo",
    name: "channelPostDetail",
    component: channelPostDetail,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "帖子详情"
    }
  },
  {
    path: "/channel/:id/column",
    name: "channelColumnList",
    component: channelColumnList,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "专栏列表"
    }
  },
  {
    path: "/channel/:id/column/:columnId/columnClass",
    name: "columnClassList",
    component: columnClassList,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "专栏课堂列表"
    }
  },
  {
    path: "/channel/:id/column/:columnId",
    name: "columnIndex",
    component: columnIndex,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "专栏首页"
    }
  },
  {
    path: "/channel/:id/column/:columnId/entry",
    name: "columnEntry",
    component: columnEntry,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "分类百科"
    }
  },
  {
    path: "/channel/:id/column/:columnId/entry/:entryId",
    name: "columnEntryIndex",
    component: columnEntryIndex,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "词条详情"
    }
  },
  {
    path: "/channel/:id/comty",
    name: "channelComtyList",
    component: channelComtyList,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "社区推荐"
    }
  },
];

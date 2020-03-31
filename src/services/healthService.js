import request from "@/request";
let healthInterfaces = {
  Banners: "/awyh/banner/getBannersByModuleAndPosition",
  heal_articles: "/awyh/recommend/getRecommendManages",
  course: "/awyh/lesson/healthLesson",

  kepuArticle: "/health/list",
  healthInfo: "/health/info",
  subscribe: "/article/subscribe",
  addFavorites: "/article/addFavorites",
  delFavorites: "/article/delFavorites",
  addLike: "/article/addLike",
  addDoctor: "/doctor/addDoctorRelation.do",
  heal_article: "/article/articleDetails.do",
  doctorInfo: "/article/getDoctorInfoByPspId.do",
  popComment: "/article/getPopCommentByPspId",
  related_article: "/article/getRelatedArticle.do",
  disAnswer: "/article/getDiseasePspAnswerById.do",
  videoInfo: "/article/getVideoInfoById.do",

  cloumnInfoList: "/awyh/articleIndex/getScienceColumns",
  diaryList: "/awyh/articleIndex/getDiaryByPage",
  singleCloumnInfoList: "/health/artice/cloumn/list",
  scienceList: "/awyh/articleIndex/getScienceByPage",
  moreCloumn: "/awyh/articleIndex/getScienceChannels",
  disAnalysis: "/awyh/articleIndex/getAnalysisByPage",

  sevenColumn:"/awyh/subject/home/column",
  specialHots:"/awyh/subject/home/hotrecommend",
  manHealth:"/awyh/subject/home/singlecolumn",
  totalSpecial:"/awyh/subject/home/allsubject",
  adsSpecial:"/awyh/advert/advertisements",
  selectedArticle:"/awyh/subject/home/choosecolumn",
  allColumn:"/awyh/subject/home/allcolumn"
};
export default {
  //健康Banners
  Banners: function (data) {
    let url = healthInterfaces.Banners;
    return request.get(url, data);
  },
  //健康首页的文章
  heal_articles: function (data) {
    let url = healthInterfaces.heal_articles;
    return request.post(url, data);
  },
  //在线课堂
  course: function (data) {
    let url = healthInterfaces.course;
    return request.get(url, data);
  },

  //科普文章
  kepuArticle: function (data) {
    let url = healthInterfaces.kepuArticle;
    return request.post(url, data);
  },
  //测试数据
  healthInfo: function (data) {
    let url = healthInterfaces.healthInfo;
    return request.post(url, data);
  },
  //文章订阅
  art_subscribe: function (data) {
    let url = healthInterfaces.subscribe;
    return request.post(url, data);
  },
  //文章收藏
  add_favorites: function (data) {
    let url = healthInterfaces.addFavorites;
    return request.post(url, data);
  },
  //文章取消收藏
  del_favorites: function (data) {
    let url = healthInterfaces.delFavorites;
    return request.post(url, data);
  },
  //文章点赞
  add_zan: function (data) {
    let url = healthInterfaces.addLike;
    return request.post(url, data);
  },
  //科普文章--内容页
  heal_article: function (data) {
    let url = healthInterfaces.heal_article;
    return request.post(url, data);
  },
  //科普文章--医生的信息
  heal_doctor: function (data) {
    let url = healthInterfaces.doctorInfo;
    return request.post(url, data);
  },
  //科普文章--加医生
  addDoctor: function (data) {
    let url = healthInterfaces.addDoctor;
    return request.post(url, data);
  },
  //科普文章--精彩评论
  getPopComment: function (data) {
    let url = healthInterfaces.popComment;
    return request.post(url, data);
  },
  //科普文章--相关文章
  relatedArticle: function (data) {
    let url = healthInterfaces.related_article;
    return request.post(url, data);
  },
  //科普文章--病例回顾
  dis_answer: function (data) {
    let url = healthInterfaces.disAnswer;
    return request.post(url, data);
  },
  //科普文章--视频
  video_info: function (data) {
    let url = healthInterfaces.videoInfo;
    return request.post(url, data);
  },
  //诊间日记banner
  diaryBanners: function (data) {
    let url = healthInterfaces.diaryBanner;
    return request.post(url, data);
  },
  //诊间日记最新
  diaryLatest: function (data) {
    let url = healthInterfaces.diaryLatest;
    return request.post(url, data);
  },
  //诊间日记热门
  diaryHot: function (data) {
    let url = healthInterfaces.diaryHot;
    return request.post(url, data);
  },
  //诊间日记精选
  diaryPerfect: function (data) {
    let url = healthInterfaces.diaryPerfect;
    return request.post(url, data);
  },
  //诊间日记列表
  diaryList: function (data) {
    let url = healthInterfaces.diaryList;
    return request.post(url, data);
  },
  //科普文章--专栏
  cloumnInfoList: function (data) {
    let url = healthInterfaces.cloumnInfoList;
    return request.post(url, data);
  },
  singleCloumnInfoList: function (data) {
    let url = healthInterfaces.singleCloumnInfoList;
    return request.post(url, data);
  },
  scienceList: function (data) {
    let url = healthInterfaces.scienceList;
    return request.post(url, data);
  },
  moreCloumn: function (data) {
    let url = healthInterfaces.moreCloumn;
    return request.post(url, data);
  },
  //病历分析
  disAnalysis: function (data) {
    let url = healthInterfaces.disAnalysis;
    return request.post(url, data);
  },
  //专题列表 栏目列表
  sevenColumn: function (data) {
    let url = healthInterfaces.sevenColumn;
    return request.post(url, data);
  },
  //专题列表 栏目列表
  allColumn: function (data) {
    let url = healthInterfaces.allColumn;
    return request.post(url, data);
  },
  //专题列表 热门推荐
  specialHots: function (data) {
    let url = healthInterfaces.specialHots;
    return request.post(url, data);
  },
  //专题列表 女性健康&男性健康
  manHealth: function (data) {
    let url = healthInterfaces.manHealth;
    return request.post(url, data);
  },
  //专题列表 全部专题
  totalSpecial: function (data) {
    let url = healthInterfaces.totalSpecial;
    return request.post(url, data);
  },
  //专题列表 广告
  adsSpecial: function (data) {
    let url = healthInterfaces.adsSpecial;
    return request.post(url, data);
  },
   //专题列表 选中专题
  selectedArticle: function (data) {
    let url = healthInterfaces.selectedArticle;
    return request.post(url, data);
  }
};

import request from "@/request";
let channelInterfaces={
  getIndexConfiguration: "/patient/h5/channel/getIndexConfiguration",
  getArticleBySubjectId: "/patient/h5/subject/getArticleBySubjectId",
  getSubjectDetail: "/patient/h5/subject/subjectDetail",
  getRelatedSubject: "/patient/h5/subject/getRelatedSubject",
  getSubjectList: "/patient/h5/subject/subjectList",
  getDoctorById: "/patient/h5/doctor/getDoctorById",
  findVideoById: "/patient/h5/video/findVideoById",
  findVideoByPage: "/patient/h5/video/findVideoByPage",
  findVideoCommentPage: "/patient/h5/video/findVideoCommentPage",
  findComtyList: "/patient/h5/hospital/findComtyList",
  findHospitalById: "/patient/h5/hospital/findHospitalById",
  getDoctorListByHospital: "/patient/h5/hospital/getDoctorListByHospital",
  getPageChannelHospital: "/patient/h5/hospital/pageChannelHospital",
  getPostDetail: "/patient/h5/post/postDetail",
  getPostList: "/patient/h5/post/postList",
  getCommentList: "/patient/h5/comment/commentList",
  findCaseDetail: "/patient/h5/case/findCaseDetail",
  getRelatedCase:"/patient/h5/case/getRelatedCase",
  getPageCaseList: "/patient/h5/case/pageCaseList",
  getArticlById: "/patient/h5/article/getArticlById",
  getPageRelateArticle: "/patient/h5/article/pageRelateArticle",
  getPageArticle: "/patient/h5/article/pageArticle",
  getPlaceList: "/patient/h5/hospital/getPlaceList",

  getDoctorPageList: "/patient/h5/doctor/getDoctorPageList",
  getSearchKeyWords: "/patient/h5/channel/getSearchKeyWords",

  getDepartmentByChId: "/patient/h5/channel/getDepartmentByChId",

  receive: "/patient/h5/data/receive",

  getChannelInfo: "/patient/h5/channel/getChannelInfo",

  getColumnList:"/patient/h5/channel/column/getColumnList",
  getColumnHomePageInfo:"/patient/h5/channel/column/getColumnHomePageInfo",
  getColumnInfo:"/patient/h5/channel/column/getColumnInfo",
  getColumnVideoList:"/patient/h5/channel/column/getColumnVideoList",
  getColumnLWentryList:"/patient/h5/channel/column/getColumnLWentryList",
  getColumnWentryInfo:"/patient/h5/channel/column/getColumnWentryInfo",
  getColumnCaseList:"/patient/h5/channel/column/getColumnCaseList",

  pageCommunityRecommendList:"/patient/h5/channel/community/pageCommunityRecommendList",
  addReply:"/patient/h5/post/addReply",
  isExistRecord:"/patient/h5/data/isExistRecord",
};
export default {
  //查询首页配置
  getIndexConfiguration: function (data) {
    let url = channelInterfaces.getIndexConfiguration;
    return request.get(url,data);
  },
  //分页获取专题的文章列表
  getArticleBySubjectId: function (data) {
    let url = channelInterfaces.getArticleBySubjectId;
    return request.get(url, data);
  },
  //查询相关专题
  getRelatedSubject: function (data) {
    let url = channelInterfaces.getRelatedSubject;
    return request.get(url, data);
  },
  //查询专题详情
  getSubjectDetail: function (data) {
    let url = channelInterfaces.getSubjectDetail;
    return request.get(url, data);
  },
  //(复用)根据条件分页查询专题，不分页查专题列表size = 1000
  getSubjectList: function (data) {
    let url = channelInterfaces.getSubjectList;
    return request.get(url, data);
  },
  //根据医生id查询医生信息
  getDoctorById: function (data) {
    let url = channelInterfaces.getDoctorById;
    return request.get(url, data);
  },
  //查询单个视频信息
  findVideoById: function (data) {
    let url = channelInterfaces.findVideoById;
    return request.get(url, data);
  },
  //分页查询视频
  findVideoByPage: function (data) {
    let url = channelInterfaces.findVideoByPage;
    return request.get(url, data);
  },
  //根据视频id获取视频评论
  findVideoCommentPage: function (data) {
    let url = channelInterfaces.findVideoCommentPage;
    return request.get(url, data);
  },
  //查询医院社区列表
  findComtyList: function (data) {
    let url = channelInterfaces.findComtyList;
    return request.get(url, data);
  },
  //查询医院详情
  findHospitalById: function (data) {
    let url = channelInterfaces.findHospitalById;
    return request.get(url, data);
  },
  //查询医院医生分页列表（医院详情页面需要）
  getDoctorListByHospital: function (data) {
    let url = channelInterfaces.getDoctorListByHospital;
    return request.get(url, data);
  },
  //查询医院列表
  getPageChannelHospital: function (data) {
    let url = channelInterfaces.getPageChannelHospital;
    return request.get(url, data);
  },
  //查询帖子详情
  getPostDetail: function (data) {
    let url = channelInterfaces.getPostDetail;
    return request.get(url, data);
  },
  //查询帖子列表
  getPostList: function (data) {
    let url = channelInterfaces.getPostList;
    return request.get(url, data);
  },
  //查询帖子评论列表
  getCommentList: function (data) {
    let url = channelInterfaces.getCommentList;
    return request.get(url, data);
  },
  //查询案例详情
  findCaseDetail: function (data) {
    let url = channelInterfaces.findCaseDetail;
    return request.get(url, data);
  },
  //查询相关案例接口
  getRelatedCase: function (data) {
    let url = channelInterfaces.getRelatedCase;
    return request.post(url, data);
  },
  //查询案例列表(相关案例)
  getPageCaseList: function (data) {
    let url = channelInterfaces.getPageCaseList;
    return request.get(url, data);
  },
  //按照科普文章ID查询详情
  getArticlById: function (data) {
    let url = channelInterfaces.getArticlById;
    return request.get(url, data);
  },
  //相关健康科普
  getPageRelateArticle: function (data) {
    let url = channelInterfaces.getPageRelateArticle;
    return request.post(url, data);
  },
  //根据条件分页查询文章列表
  getPageArticle: function (data) {
    let url = channelInterfaces.getPageArticle;
    return request.get(url, data);
  },
  //地区接口
  getPlaceList: function (data) {
    let url = channelInterfaces.getPlaceList;
    return request.get(url, data);
  },

  //查询医生列表
  getDoctorPageList: function (data) {
    let url = channelInterfaces.getDoctorPageList;
    return request.get(url, data);
  },

  //搜索
  getSearchKeyWords: function (data) {
    let url = channelInterfaces.getSearchKeyWords;
    return request.get(url, data);
  },

  //频道关联科室列表
  getDepartmentByChId: function (data) {
    let url = channelInterfaces.getDepartmentByChId;
    return request.get(url, data);
  },

  //打点
  receive: function (data) {
    let url = channelInterfaces.receive;
    return request.get(url, data);
  },

  //查询频道信息
  getChannelInfo: function (data) {
    let url = channelInterfaces.getChannelInfo;
    return request.get(url, data);
  },

  //查询该频道的所有专栏
  getColumnList: function (data) {
    let url = channelInterfaces.getColumnList;
    return request.get(url, data);
  },
  //查询该专栏的首页信息
  getColumnHomePageInfo: function (data) {
    let url = channelInterfaces.getColumnHomePageInfo;
    return request.post(url, data);
  },
  //查询专栏基本信息
  getColumnInfo: function (data) {
    let url = channelInterfaces.getColumnInfo;
    return request.get(url, data);
  },
  //查询专栏课堂列表
  getColumnVideoList: function (data) {
    let url = channelInterfaces.getColumnVideoList;
    return request.get(url, data);
  },
  //查询该专栏的词条信息
  getColumnLWentryList: function (data) {
    let url = channelInterfaces.getColumnLWentryList;
    return request.get(url, data);
  },
  //根据词条ID查询词条相关内容
  getColumnWentryInfo: function (data) {
    let url = channelInterfaces.getColumnWentryInfo;
    return request.get(url, data);
  },
  //查询专栏案例列表
  getColumnCaseList: function (data) {
    let url = channelInterfaces.getColumnCaseList;
    return request.get(url, data);
  },
  //查询社区推荐
  pageCommunityRecommendList: function (data) {
    let url = channelInterfaces.pageCommunityRecommendList;
    return request.post(url, data);
  },
  //帖子评论
  addReply: function (data) {
    let url = channelInterfaces.addReply;
    return request.post(url, data);
  },
  //统计科普、案例文章详情点赞数及当前用户是否有点赞
  isExistRecord: function (data) {
    let url = channelInterfaces.isExistRecord;
    return request.get(url, data);
  },
};

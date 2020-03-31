import request from "@/request";
let interfaces={
  qryConsultDynamic: "/awyh/doctor/qryConsultDynamic",
  getPopSciencePaperByPage: "/awyh/articleIndex/getPopSciencePaperByPage",
  getDrPopsListByType: "/awyh/article/getDrPopsListByType",
  getRecommendManages: "/awyh/recommend/getRecommendManages",
  getInformationStream: "/awyh/recommend/getInformationStream",
};

let apis = {
  //获取新浪健康首页就诊动态
  qryConsultDynamic: function (data) {
    let url = interfaces.qryConsultDynamic;
    return request.post(url, data);
  },
  //获取新浪健康首页文章
  getPopSciencePaperByPage: function (data) {
    let url = interfaces.getPopSciencePaperByPage;
    return request.post(url, data);
  },
  //搜索文章
  getDrPopsListByType: function (data) {
    let url = interfaces.getDrPopsListByType;
    return request.get(url, data);
  },
  //获取明星医生
  getRecommendManages: function (data) {
    let url = interfaces.getRecommendManages;
    return request.post(url, data);
  },
  //首页信息流
  getInformationStream: function (data) {
    let url = interfaces.getInformationStream;
    return request.post(url, data);
  },
};
export default apis;

export const getPopSciencePaperByPage = apis.getPopSciencePaperByPage;


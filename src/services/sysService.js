import request from "@/request";
let sysInterfaces={
  wbShare:"/awyh/weiboShare/feed",
  qryHotWords: "/awyh/hotword/qryWords",
  // getWxConfig:"/awyh/weixinShare/getWXApiTick",
  getWxConfig:"/weixin/v1/getJsApiTick",//正式
  homeNews:"/awyh/system/notice",
  homeSubjects:"/awyh/activity/latestSubject",
  getArticleByType:"/awyh/article/getDrPopsListByType",
  homeActs:"/awyh/activity/latestActivities",
  homeBanners:"/awyh/article/getFocusimg",
  autoFollowDoc: "/awyh/friendships/focusAndsaveDataFans",
  actionFollowDoc: "/awyh/friendships/focusAndsaveDataFansToActivity",
  cancelFollowDoc: "/awyh/friendships/cancelfocus",
  userBehaviorDataRecord: "/awyh/data/userBehaviorDataRecord",
  qryProvince :"/awyh/sys/qryProvince",
  qryCityListByProvinceId: "/awyh/sys/qryCityListByProvinceId",
  uploadImg: "/awyh/img/upload",
  removeImg: "/awyh/img/remove",
  // sendCaptcha: "/community/sys/sendCaptcha",
  sendCaptcha: "/patient/h5/auth/phoneCode",
  // phoneBind: "/community/sys/validCaptcha",
  phoneBind: "/patient/h5/auth/phoneBind",
  checkPhoneBind:"/patient/h5/auth/checkPhoneBind",
  appIndexBanners: "/patient/h5/home/banner",
};
export default {
  //微信分享
  getWxConfig:function(data){
    let url=sysInterfaces.getWxConfig;
    return request.post(url,data);
  },
  //微博分享
  wbShare:function(data){
    let url=sysInterfaces.wbShare;
    return request.post(url,data);
  },
  //查询搜索时的热门关键字
  qryHotWords: function (data) {
    let url = sysInterfaces.qryHotWords;
    return request.get(url, data);
  },
  //首页头条新闻
  homeNews:function(data){
    let url=sysInterfaces.homeNews;
    return request.get(url,data);
  },
  //首页专题
  homeSubjects:function(data){
    let url=sysInterfaces.homeSubjects;
    return request.post(url,data);
  },
  //首页文章
  getArticleByType:function(data){
    let url=sysInterfaces.getArticleByType;
    return request.post(url,data);
  },
  //主页banners
  homeBanners:function(data){
    let url=sysInterfaces.homeBanners;
    return request.post(url,data);
  },
  //主页最新活动
  homeActs:function(data){
    let url=sysInterfaces.homeActs;
    return request.post(url,data);
  },
  //主动加粉-医生
  actionFollowDoc: function (data, callback) {
    let url = sysInterfaces.actionFollowDoc;
    return request.post(url, data, callback);
  },
  //自动加粉-医生
  autoFollowDoc: function (data, callback) {
    let url = sysInterfaces.autoFollowDoc;
    return request.post(url, data, callback);
  },
  //取消加粉-医生
  cancelFollowDoc: function (data, callback) {
    let url = sysInterfaces.cancelFollowDoc;
    return request.post(url, data, callback);
  },
  //用户行为数据打点
  userBehaviorDataRecord: function (data) {
    let url = sysInterfaces.userBehaviorDataRecord;
    return request.post(url, data);
  },
  //获取省份列表
  qryProvince: function (data) {
    let url = sysInterfaces.qryProvince;
    return request.get(url, data);
  },
  //根据省份ID获取城市列表
  qryCityListByProvinceId: function (data) {
    let url = sysInterfaces.qryCityListByProvinceId;
    return request.get(url, data);
  },
  //上传图片
  uploadImg: function (data) {
    let url = sysInterfaces.uploadImg;
    return request.postFile(url, data);
  },
  //上传图片
  removeImg: function (data) {
    let url = sysInterfaces.removeImg;
    return request.post(url, data);
  },
  //发送验证码
  sendCaptcha: function (data) {
    let url = sysInterfaces.sendCaptcha;
    return request.post(url, data);
  },
  //绑定手机
  phoneBind: function (data) {
    let url = sysInterfaces.phoneBind;
    return request.post(url, data);
  },
  //验证手机号是否可以绑定
  checkPhoneBind: function (data) {
    let url = sysInterfaces.checkPhoneBind;
    return request.post(url, data);
  },
  //获取APP配置的banner
  appIndexBanners: function (data) {
    let url = sysInterfaces.appIndexBanners;
    return request.get(url, data);
  },
};

/**
 * 用户行为打点
*/
export const userBehaviorDataRecord = function (data) {
  let url = sysInterfaces.userBehaviorDataRecord;
  return request.post(url, data);
};

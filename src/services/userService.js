import request from "@/request";
let userInterfaces = {
  myinfo: "/awyh/personal/qryInfo",
  nike_name: "/awyh/u/qryNickName",
  nike_change: "/awyh/u/editiNickName",
  bind_mobile: "/awyh/sys/validCaptcha",
  captchar: "/awyh/sys/sendCaptcha",
  
  get_token: "/awyh/sys/getToken",
  addToMyDoc: "/awyh/doctor/addAsMyDoctor",
  setMsgRead: "/awyh/personal/messageRead",
  myService: "/awyh/personal/myService",
  addMedicalRecord: "/awyh/personal/addMedicalRecord",
  messagesData: "/awyh/personal/messageCount",
  mySubscribe: "/awyh/personal/subscribe",
  myDelSub: "/awyh/personal/cancelSubscribe",
  //公益活动
  my_interrogation: "/awyh/personal/message",
  my_course: "/awyh/personal/getCurriculum",
  my_favoriet_article: "/awyh/personal/myFavorite",

  // sendCaptcha: "/community/sys/sendCaptcha",
  sendCaptcha: "/patient/h5/auth/phoneCode",
  // phoneBind: "/community/sys/validCaptcha",
  phoneBind: "/patient/h5/auth/phoneBind",
};

export default {
  //用户个人信息
  myinfo: function (data) {
    let url = userInterfaces.myinfo;
    return request.post(url, data);
  },
  //查询用户昵称
  nike_name: function (data = {}) {
    let url = userInterfaces.nike_name;
    return request.post(url, data);
  },
  //修改用户昵称
  nike_change: function (data) {
    let url = userInterfaces.nike_change;
    return request.post(url, data);
  },
  //绑定手机号
  bind_mobile: function (data) {
    let url = userInterfaces.bind_mobile;
    return request.post(url, data);
  },
  //发送验证码
  captchar: function (data) {
    let url = userInterfaces.captchar;
    return request.post(url, data);
  },
  //发送验证码(绑定手机号码弹框)
  sendCaptcha: function (data, callback) {
    let url = userInterfaces.sendCaptcha;
    return request.post(url,data,callback);
  },
  //绑定手机号(绑定手机号码弹框)
  phoneBind: function (data, callback) {
    let url = userInterfaces.phoneBind;
    return request.post(url,data,callback);
  },
  //用code換取token
  get_token: function (data) {
    let url = userInterfaces.get_token;
    return request.post(url, data);
  },
  //加为我的医生
  addToMyDoc: function (data) {
    let url = userInterfaces.addToMyDoc;
    return request.post(url, data);
  },
  //设置服务信息已读状态
  setMsgRead: function (data) {
    let url = userInterfaces.setMsgRead;
    return request.post(url, data);
  },
  //我的预约 我的咨询
  myService: function (data) {
    let url = userInterfaces.myService;
    return request.get(url, data);
  },
  //添加患者病历
  addMedicalRecord: function (data) {
    let url = userInterfaces.addMedicalRecord;
    return request.post(url, data);
  },
  //用户的个人消息数目
  messagesData: function (data) {
    let url = userInterfaces.messagesData;
    return request.post(url, data);
  },
  //用户的圈子列表
  moments: function (data) {
    let url = userInterfaces.moments;
    return request.post(url, data);
  },
  //用户的收藏
  favours: function (data) {
    let url = userInterfaces.favours;
    return request.post(url, data);
  },
  //我的医生
  my_doctor: function (data) {
    let url = userInterfaces.my_doctor;
    return request.post(url, data);
  },
  //我的预约
  my_interrogation: function (data) {
    let url = userInterfaces.my_interrogation;
    return request.post(url, data);
  },
  //我的课堂
  my_course: function (data) {
    let url = userInterfaces.my_course;
    return request.post(url, data);
  },
  //我收藏的文章
  my_favoriet_article: function (data) {
    let url = userInterfaces.my_favoriet_article;
    return request.post(url, data);
  },
  //我的订阅
  my_sub: function (data) {
    let url = userInterfaces.mySubscribe;
    return request.get(url, data);
  },
  //取消订阅
  my_delSub: function (data) {
    let url = userInterfaces.myDelSub;
    return request.post(url, data);
  },
};

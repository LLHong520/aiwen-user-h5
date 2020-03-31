import request from "@/request";
let doctorInterfaces={
  query_docs:"/awyh/doctor/qryDoctorList",
  query_doc_bykeywords:"/awyh/doctor/qryDoctorListByKeyWord",
  doc_circles:"/community/doc/qryJoinCircle",
  doc_consults:"/awyh/docConsultingRoom/qryConsult",
  service_count:"/awyh/docConsultingRoom/qryMyServiceCount",
  station_msg:"/awyh/docConsultingRoom/qryStationMsg",
  doc_info:"/awyh/doctor/qryDoctorInfo",
  doc_comments:"/awyh/docConsultingRoom/qryAppraises",
  service_info:"/awyh/docConsultingRoom/qryDocServiceMsg",
  regiont_list:"/awyh/doctor/qryDrRegiontList",
  titles_list:"/awyh/doctor/qryTitlesList",
  cw_num:"/awyh/activity/getServiceNumber",
  doc_news:"/awyh/activity/news",
  weiTalkActivity:"/awyh/activity/getWeiTalkActivity",
  commonwealActivity:"/awyh/activity/getCommonwealActivity",
  departMsg: "/awyh/doctor/findDoctorList",
  achievement:"/awyh/commonweal/board",
  commonwealAct: "/awyh/commonweal/commonwealActivity",
  setRemind: "/awyh/commonweal/addRemind",
  cancelRemind: "/awyh/commonweal/cancelRemind",
  focusDoc: "/awyh/doctor/addAsMyDoctor",
  askNumber: "/awyh/commonweal/getUserNumberToActivity",
  addLogRecord: "/awyh/commonweal/addLogRecord",
  actionRecord: "/awyh/commonweal/addUserActionRecord",
  record: "/awyh/data/record",
  wxShareCallBack: "/awyh/weixinShare/callBack",
  doctorIntroduce: "/awyh/doctor/doctorIntroduce",
  getAllJoinActivity: "/awyh/docConsultingRoom/getAllJoinActivity",
  addAsMyDoctor: "/awyh/doctor/addAsMyDoctor",
  delMyDoctor: "/awyh/doctor/delMyDoctor",
  qryInteractiveRecording: "/awyh/doctor/qryInteractiveRecording",
  selectCommunityList: "/patient/h5/doctor/selectCommunityList",
};
export default {
  //查询医生/科室 加入的圈子
  doc_circles:function(data){
    let url=doctorInterfaces.doc_circles;
    return request.post(url,data);
  },
  //查询医生/科室 加入的圈子
  query_docs:function(data){
    let url=doctorInterfaces.query_docs;
    return request.post(url,data);
  },
  //根据关键词查询医生
  query_doc_bykeywords:function(data){
    let url=doctorInterfaces.query_doc_bykeywords;
    return request.post(url,data);
  },
  //查询医生咨询案例
  doc_consults:function(data){
    let url=doctorInterfaces.doc_consults;
    return request.post(url,data);
  },
  //查询医生互动记录 咨询和预约次数
  service_count:function(data){
    let url=doctorInterfaces.service_count;
    return request.post(url,data);
  },
  //查询医生主页的站内通知
  station_msg:function(data){
    let url=doctorInterfaces.station_msg;
    return request.post(url,data);
  },
  //查询医生信息
  doc_info:function(data){
    let url=doctorInterfaces.doc_info;
    return request.post(url,data);
  },
  //查询医生患者评价
  doc_comments:function(data){
    let url=doctorInterfaces.doc_comments;
    return request.post(url,data);
  },
  //查询医生服务信息 服务了多少人 好评率
  service_info:function(data){
    let url=doctorInterfaces.service_info;
    return request.post(url,data);
  },
  //医生地区列表
  regiont_list:function(data){
    let url=doctorInterfaces.regiont_list;
    return request.post(url,data);
  },
  //医生职称列表
  titles_list:function(data){
    let url=doctorInterfaces.titles_list;
    return request.post(url,data);
  },
  //医生公益之星信息
  cw_num:function(data){
    let url=doctorInterfaces.cw_num;
    return request.post(url,data);
  },
  //活动成就
  achievement:function(data){
    let url=doctorInterfaces.achievement;
    return request.post(url,data);
  },
  //医生最新动态
  doc_news:function(data){
    let url=doctorInterfaces.doc_news;
    return request.post(url,data);
  },
  //医生诊室在线访谈
  weiTalkActivity:function(data){
    let url=doctorInterfaces.weiTalkActivity;
    return request.post(url,data);
  },
  //医生诊室公益活动
  commonwealActivity:function(data){
    let url=doctorInterfaces.commonwealActivity;
    return request.post(url,data);
  },
  //科室-推荐医生-科室信息
  departMsg: function (data) {
    let url = doctorInterfaces.departMsg;
    return request.get(url, data);
  },
  //医生诊室-公益活动信息
  commonwealAct: function (data) {
    let url = doctorInterfaces.commonwealAct;
    return request.post(url, data);
  },
  //医生诊室-设置活动提醒
  setRemind: function (data) {
    let url = doctorInterfaces.setRemind;
    return request.post(url, data);
  },
  //医生诊室-取消活动提醒
  cancelRemind: function (data) {
    let url = doctorInterfaces.cancelRemind;
    return request.post(url, data);
  },
  //医生诊室-获取用户id的提问名额和是否分享
  askNumber: function (data) {
    let url = doctorInterfaces.askNumber;
    return request.post(url, data);
  },
  //医生诊室-关注医生
  focusDoc: function (data) {
    let url = doctorInterfaces.focusDoc;
    return request.post(url, data);
  },
  //医生诊室-用户行为打点记录（PV）
  addLogRecord: function (data) {
    let url = doctorInterfaces.addLogRecord;
    return request.post(url, data);
  },
  //医生诊室-用户行为打点记录（UV）
  actionRecord: function (data) {
    let url = doctorInterfaces.actionRecord;
    return request.post(url, data);
  },
  //医生诊室页浏览打点PV、UV
  record: function (data) {
    let url = doctorInterfaces.record;
    return request.post(url, data);
  },
  //微信分享回调医生咨询名额）
  wxShareCallBack: function (data) {
    let url = doctorInterfaces.wxShareCallBack;
    return request.post(url, data);
  },
  //获取医生荣誉
  doctorIntroduce: function (data) {
    let url = doctorInterfaces.doctorIntroduce;
    return request.get(url, data);
  },
  // 获取医生参加的活动的列表
  getAllJoinActivity: function (data) {
    let url = doctorInterfaces.getAllJoinActivity;
    return request.get(url, data);
  },
  // 关注医生
  addAsMyDoctor: function (data) {
    let url = doctorInterfaces.addAsMyDoctor;
    return request.get(url, data);
  },
  // 取消关注医生
  delMyDoctor: function (data) {
    let url = doctorInterfaces.delMyDoctor;
    return request.get(url, data);
  },
  // 获取互动记录列表
  qryInteractiveRecording: function (data) {
    let url = doctorInterfaces.qryInteractiveRecording;
    return request.get(url, data);
  },
  // 医生加入的社区信息
  selectCommunityList: function (data) {
    let url = doctorInterfaces.selectCommunityList;
    return request.get(url, data);
  },
};

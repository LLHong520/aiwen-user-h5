import request from "@/request";
let phoneInterfaces={
  saveFamilyMember: "/awyh/personal/saveFamilyMember",
  getFamilyMemberList: "/awyh/personal/getFamilyMemberList",
  getFamilyMember: "/awyh/personal/getFamilyMember",
  qryQuestion: "/awyh/telephone/qryQuestion",
  qryDocTelConfig: "/awyh/telephone/qryDocTelConfig",
  saveQuestion: "/awyh/telephone/saveQuestion",
  qryOrderDetail: "/awyh/telephone/qryOrderDetail",
  payOrder: "/awyh/pay/payOrder",
  addTelephoneOrder: "/awyh/telephone/addTelephoneOrder",
  payFreeOrder: "/awyh/pay/freePay",
  cancelTelephoneOrder: "/patient/h5/phoneConsult/cancelOrder",
  phoneConcultPay: "/patient/h5/phoneConsult/pay",
  // setRead:"/awyh/telephone/inquiry/patient/read",

  getPhoneConsultSetting:"/patient/h5/doctor/getPhoneConsultSetting",
  getfamilymembers:"/patient/h5/familymembers/getfamilymembers",
  savefamilymembers:"/patient/h5/familymembers/savefamilymembers",
  createOrder:"/patient/h5/phoneConsult/createOrder",
  createDialogue:"/patient/h5/phoneConsult/createDialogue",
  getDialogue:"/patient/h5/phoneConsult/getDialogue",
  cancleOrder:"/patient/h5/phoneConsult/cancleOrder",
  getOrder:"/patient/h5/phoneConsult/getOrder",
  getAppraises:"/patient/h5/appraise/getAppraises",
  saveAppraise:"/patient/h5/appraise/saveAppraise"
};
export default {
  //保存家庭成员
  saveFamilyMember: function (data) {
    let url = phoneInterfaces.saveFamilyMember;
    return request.post(url,data);
  },
  //家庭成员列表
  getFamilyMemberList: function (data) {
    let url = phoneInterfaces.getFamilyMemberList;
    return request.get(url, data);
  },
  //查询单个家庭成员信息
  getFamilyMember: function (data) {
    let url = phoneInterfaces.getFamilyMember;
    return request.get(url, data);
  },
  //查询
  qryQuestion: function (data) {
    let url = phoneInterfaces.qryQuestion;
    return request.post(url, data);
  },
  //查询电话咨询配置
  qryDocTelConfig: function (data) {
    let url = phoneInterfaces.qryDocTelConfig;
    return request.post(url, data);
  },
  //发送消息
  saveQuestion: function (data) {
    let url = phoneInterfaces.saveQuestion;
    return request.post(url, data);
  },
  //查询订单明细
  qryOrderDetail: function (data) {
    let url = phoneInterfaces.qryOrderDetail;
    return request.post(url, data);
  },
  //支付接口
  payOrder: function (data) {
    let url = phoneInterfaces.payOrder;
    return request.get(url, data);
  },
  //支付接口
  addTelephoneOrder: function (data) {
    let url = phoneInterfaces.addTelephoneOrder;
    return request.post(url, data);
  },
  //支付接口
  payFreeOrder: function (data) {
    let url = phoneInterfaces.payFreeOrder;
    return request.post(url, data);
  },
  //用户取消电话咨询订单
  cancelTelephoneOrder: function (data) {
    let url = phoneInterfaces.cancelTelephoneOrder;
    return request.post(url, data);
  },
  //电话咨询支付
  phoneConcultPay: function (data) {
    let url = phoneInterfaces.phoneConcultPay;
    return request.get(url, data);
  },
  //获取医生主页电话咨询配置
  getPhoneConsultSetting: function (data) {
    let url = phoneInterfaces.getPhoneConsultSetting;
    return request.get(url, data);
  },
  //获取咨询人家庭成员
  getfamilymembers: function (data) {
    let url = phoneInterfaces.getfamilymembers;
    return request.get(url, data);
  },
  //保存咨询人家庭成员
  savefamilymembers: function (data) {
    let url = phoneInterfaces.savefamilymembers;
    return request.post(url, data);
  },
  //创建订单
  createOrder: function (data) {
    let url = phoneInterfaces.createOrder;
    return request.post(url, data);
  },
  //发送消息
  createDialogue: function (data) {
    let url = phoneInterfaces.createDialogue;
    return request.post(url, data);
  },
  //获取消息列表
  getDialogue: function (data) {
    let url = phoneInterfaces.getDialogue;
    return request.get(url, data);
  },
  //取消订单
  cancleOrder: function (data) {
    let url = phoneInterfaces.cancleOrder;
    return request.put(url, data);
  },
  //获取订单详情
  getOrder: function (data) {
    let url = phoneInterfaces.getOrder;
    return request.get(url, data);
  },
  //获取评价标签
  getAppraises: function (data) {
    let url = phoneInterfaces.getAppraises;
    return request.post(url, data);
  },
  //评价
  saveAppraise: function (data) {
    let url = phoneInterfaces.saveAppraise;
    return request.post(url, data);
  },
};

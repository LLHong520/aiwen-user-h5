//app模块
const dialogueList = resolve => require(["../pages/dialogueList/index"], resolve);
const consultInfo = resolve => require(["../pages/consultInfo/index"], resolve);
const addUser = resolve => require(["../pages/addUser/index"], resolve);
const diseaseInfo = resolve => require(["../pages/diseaseInfo/index"], resolve);
const orderDetail = resolve => require(["../pages/orderDetail/index"], resolve);
const orderTip = resolve => require(["../pages/orderTip/index"], resolve);
const comment = resolve => require(["../pages/comment/index"], resolve);

export default [
  {
    path: "/phone/dialogueList/:dId",
    name: "dialogueList",
    component: dialogueList,
    meta: {
      needLogin: true,
      messageOn: true,
      title: "电话咨询-对话列表"
    }
  },
  {
    path: "/phone/consultInfo/:dId",
    name: "consultInfo",
    component: consultInfo,
    meta: {
      needLogin: true,
      messageOn: true,
      title: "电话咨询"
    }
  },
  {
    path: "/phone/diseaseInfo/:dId",
    name: "phone.diseaseInfo",
    component: diseaseInfo,
    meta: {
      needLogin: true,
      messageOn: true,
      title: "填写病情信息"
    }
  },
  {
    path: "/phone/addUser",
    name: "phone.addUser",
    component: addUser,
    meta: {
      needLogin: true,
      messageOn: true,
      title: "添加咨询人"
    }
  },
  {
    path: "/phone/orderDetail/:orderId",
    name: "phone_orderDetail",
    component: orderDetail,
    meta: {
      needLogin: true,
      messageOn: true,
      title: "订单详情"
    }
  },
  {
    path: "/phone/orderTip",
    name: "phone_orderTip",
    component: orderTip,
    meta: {
      needLogin: true,
      messageOn: true,
      title: "支付成功"
    }
  },
  {
    path: "/phone/comment/:orderId/:dId",
    name: "phone_comment",
    component: comment,
    meta: {
      needLogin: true,
      messageOn: true,
      title: "评价"
    }
  },
  {
    path: "/phone/payment/:businessId",
    name: "phone.Payment",
    redirect: "/payment/:businessId",
    meta: {
      title: "支付"
    }
  }
];

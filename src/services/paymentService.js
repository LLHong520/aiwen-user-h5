import request from "@/request";
let interfaces = {
  payOrder: "/awyh/pay/payOrder",
  getWXconfig: "/awyh/pay/getWXconfig",
};
export default {
  //发起支付
  payOrder: function (data) {
    let url = interfaces.payOrder;
    return request.post(url, data);
  },
  getWXconfig: function (data) {
    let url = interfaces.getWXconfig;
    return request.get(url, data);
  }
};

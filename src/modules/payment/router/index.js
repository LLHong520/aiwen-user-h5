//app模块
const Payment = resolve => require(["../pages/payment/index"], resolve);
export default [
  {
    path: "/payment/:businessId",
    name: "Payment",
    component: Payment,
    meta: {
      title: "支付"
    }
  }
];

//活动模块
const Index = resolve => require(["../pages/index/index"], resolve);

export default [
  {
    path: "/act",
    name: "actIndex",
    component: Index,
    meta: {
      needLogin: false,
      messageOn:true,
      title: "公益访谈"
    }
  }
];

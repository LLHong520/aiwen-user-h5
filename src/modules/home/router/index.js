//主页模块
const Index = resolve => require(["../pages/index/index"], resolve);

export default [
  {
    path: "/home",
    name: "homeIndex",
    component: Index,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"新浪健康"
    }
  },
];


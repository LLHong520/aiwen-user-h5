//cdc模块
const index = resolve => require(["../pages/about/index"], resolve);
export default [
  {
    path: "/cdc/:name",
    name: "cdcIndex",
    component: index,
    meta: {
      needLogin: false,
      messageOn: true,
      title: "疾控中心"
    }
  }
];

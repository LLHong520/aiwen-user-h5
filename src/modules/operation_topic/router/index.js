//app模块
const Page = resolve => require(["../pages/index"], resolve);
export default [
  {
    path: "/operationtopic/content",
    name: "operationTopicContent",
    component: Page,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"运营专题"
    }
  }
];

//科室模块
const departInfo = resolve => require(["../pages/depart_info/depart_info"], resolve);
const Departs = resolve => require(["../pages/departs/departs"], resolve);

export default [
  {
    path: "/depart/:dId",
    name: "departInfo",
    component: departInfo,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"科室详情"
    }
  },
  {
    path: "/departs",
    name: "Departs",
    component: Departs,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"所有科室"
    }
  }
];

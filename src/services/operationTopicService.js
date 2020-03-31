import request from "@/request";
let operationInterfaces={
  operationTopicComponents:"/operate/getComponentList",
  operationTopicInfo: "/operate/findSubjectById",
  addWeiboFans: "/operate/addWeiboFocus",
  collectData: "/operate/datapvuvcollect"
};
export default {
  // 专题组件内容
  getOperationTopicDetail: function (data) {
    let url = operationInterfaces.operationTopicComponents;
    return request.get(url,data);
  },
  // 专题内容
  getOperationTopicInfo: function (data) {
    let url = operationInterfaces.operationTopicInfo;
    return request.get(url,data);
  },
  // 添加微博粉丝
  addWeiboFans: function (data) {
    let url = operationInterfaces.addWeiboFans;
    return request.postJSON(url,data);
  },
  // 专题内容
  colletDataPv: function (data) {
    let url = operationInterfaces.collectData;
    return request.postJSON(url,data);
  },
};

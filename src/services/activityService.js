import request from "@/request";
let activityInterfaces={
  newHomeActivity:"/awyh/activity/newHomeActivity",
  myActivity: "/awyh/personal/myActivity",
};
export default {
  //活动首页
  home_activity:function(data){
    let url=activityInterfaces.newHomeActivity;
    return request.post(url,data);
  },
  //活动首页
  myActivity: function (data) {
    let url = activityInterfaces.myActivity;
    return request.get(url,data);
  },
};

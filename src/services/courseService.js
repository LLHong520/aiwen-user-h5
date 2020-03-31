import request from "@/request";
let courseInterfaces={
  home_lesson:"/awyh/lesson/home",
  latestLesson:"/awyh/lesson/latestLesson",
  doc_video:"/awyh/video/doc/latest",
};
export default {
  //活动首页
  home_lesson:function(data){
    let url=courseInterfaces.home_lesson;
    return request.post(url,data);
  },
  //医生诊室在线课堂
  latestLesson:function(data){
    let url=courseInterfaces.latestLesson;
    return request.post(url,data);
  },
  //医生诊室科普视频
  doc_video:function(data){
    let url=courseInterfaces.doc_video;
    return request.post(url,data);
  },
};

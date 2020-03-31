import request from "@/request";
let departmentInterfaces={
  // depart_circles:"/community/doc/qryCircleByDept",
  depart_circles:"/awyh/department/qryCircleByDept",
  depart_docs:"/awyh/doctor/qryDeptDoctorList",
  depart_info:"/awyh/department/qryDepartmentDetail",
  depart_acts:"/awyh/activity/departActivities",
  depart_subjects:"/awyh/activity/deparSubject",
  allDepartments:"/awyh/department/qryDepartmentList",
  hotDepartments:"/awyh/recommend/getRecommendManages",
};
export default {
  //查询医生列表
  depart_docs:function(data){
    let url=departmentInterfaces.depart_docs;
    return request.get(url,data);
  },
  //查询科室信息
  depart_info:function(data){
    let url=departmentInterfaces.depart_info;
    return request.post(url,data);
  },
  //查询科室 加入的圈子
  depart_circles:function(data){
    let url=departmentInterfaces.depart_circles;
    return request.post(url,data);
  },
  //查询科室 的活动
  depart_acts:function(data){
    let url=departmentInterfaces.depart_acts;
    return request.post(url,data);
  },
  //查询科室 的专题
  depart_subjects:function(data){
    let url=departmentInterfaces.depart_subjects;
    return request.post(url,data);
  },
  //所有科室
  allDepartments:function(data){
    let url=departmentInterfaces.allDepartments;
    return request.post(url,data);
  },
  //热门科室
  hotDepartments:function(data){
    let url=departmentInterfaces.hotDepartments;
    return request.post(url,data);
  },
};

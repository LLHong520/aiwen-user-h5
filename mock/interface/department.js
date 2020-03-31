var tools = require("../tools.js");
var departments = require("../json/departs.js");
module.exports=[
  {
    url:"/awyh/department/qryDepartmentList",
    method:"POST",
    mockdata:departments
  },
  {
    url:"/awyh/doctor/qryDeptDoctorList",
    method:"GET",
    mockdata:(
        function(){
          var items=[];
          for (var j = 0; j <5; j++) {
            var item={
              id: "59b25f2684aed84b755044aa",
              photo:tools.getAvater(),
              realName:tools.getName(),
              titles: "住院医师",
              departments:"科室",
              workUnit:"天津市公安医院",
              sicknessExpertise:"天津市公安医院",
              answerNum: tools.rand(0,1000),
              popNum: tools.rand(0,1000),
              areasOfExpertise:"擅长：内外妇科、疑难杂症、丹毒、疱疹、等问题。",
              isNowsuspendService: tools.rand(0,1),
              qPrice: tools.rand(0,1000),
              qCaps: tools.rand(0,1000),
              register: tools.rand(0,1),
              advice: tools.rand(0,1)
            };
            items.push(item);
          }
          return items;
        }
      )()
  },
  {
    url:"/awyh/department/qryDepartmentDetail",
    method:"POST",
    mockdata:{
      id:"10402",
      name:"心理疾病科",
      introduction:"心理疾病科介绍心理疾病科介绍心理疾病科介绍心理疾病科介绍心理疾病科介绍心理疾病科介绍心理疾病科介绍",
      picture:"",
    }
  },
  {
    url:"/awyh/activity/departActivities",
    params:["departId"],
    method:"POST",
    mockdata:(
        function(){
          var items=[];
          for (var i = 0; i <3; i++) {
            var item={
              id: "5a1b85b484aebaf359da7d20",
              title: "【爱医日】01.21微博爱医日新年专场",
              activityStatus: tools.rand(0,1),
              activityType: tools.rand(0,1),
              image:"",
              startTime:"2018-01-21",
              endTime:"2018-01-21",
              enrolment:tools.rand(0,4000),
              invitedGuest:"受邀嘉宾",
              createTime:"2018-01-21",
              sourcesType:"2018-01-21",
            };
            items.push(item);
          }
          return items;
        }
      )()
  },
  {
    url:"/awyh/activity/deparSubject",
    params:["departId"],
    method:"POST",
    mockdata:(
        function(){
          var items=[];
          for (var i = 0; i <3; i++) {
            var item={
              "id": "5a1b85b484aebaf359da7d20",
              image: "https://pic.wenwo.com/fimg/194832937.jpg",
              link: "https://pic.wenwo.com/fimg/194832937.jpg",
              title: "修复牙齿，多少方法你知道几种",
              sourcesType: "修复牙齿，多少方法你知道几种",
            };
            items.push(item);
          }
          return items;
        }
      )()
  }
];

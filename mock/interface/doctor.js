var tools = require("../tools.js");
var consts = require("../consts.js");
module.exports=[
  {
    url:"/community/doc/qryJoinCircle",
    method:"GET",
    mockdata:(
        function(){
          var items=[];
          for (var i = 0; i <10; i++) {
            var item={
              "id": "5a1b85b484aebaf359da7d20",
              "circleName": "#爱医日#",
              "visitedNum": tools.rand(0,10000),
              "circlePhoto": tools.getAvater()
            };
            items.push(item);
          }
          return items;
        }
      )(),
    handleEvent:function(params,query){
      return params;
    }
  },

  {
    url:"/awyh/docConsultingRoom/qryConsult",
    method:"POST",
    mockdata:(
        function(){
          var items=[];
          for (var i = 0; i <10; i++) {
            var item={
              question:{
                questionId:"5a1b85b484aebaf359da7d20",
                questionTime:"2017-12-12 12:12:12",
                userId:"5a1b85b484aebaf359da7d20",
                userNick:tools.getName(),
                userHeadImg:tools.getAvater(),
                docName:tools.getName(),
                questionContent:"咨询内容",
                questionImgs:[tools.getAvater(),tools.getAvater()],
              },
              answer:{
                answerId:"5a1b85b484aebaf359da7d20",
                answerTime:"2017-12-12 12:12:12",
                docId:"5a1b85b484aebaf359da7d20",
                docName:tools.getName(),
                docHeadImg:tools.getAvater(),
                answerContent:"咨询内容",
                answerImgs:[tools.getAvater(),tools.getAvater()],
              }
            };
            items.push(item);
          }
          return items;
        }
      )()
  },
  {
    url:"/awyh/docConsultingRoom/qryServiceCount",
    method:"POST",
    mockdata:{
      "consultCount": tools.rand(0,10000),
      "appointmentCount": tools.rand(0,10000),
    }
  },
  {
    url:"/awyh/docConsultingRoom/qryStationMsg",
    method:"POST",
    mockdata:{
      "msg": "医生回复了您的咨询。",
      "linkUrl": "https//www.991kang.com/msg/detail/0987"
    }
  },
  {
    url:"/awyh/docConsultingRoom/qryDocServiceMsg",
    method:"POST",
    mockdata:{
      "patientCount":tools.rand(0,10000),
      "praiseRate": tools.rand(0,100)+"%"
    }
  },
  {
    url:"/awyh/doctor/qryDoctorInfo",
    method:"POST",
    mockdata:{
      id:"594a3be4e4b08fadf71e1a28",
      photo:tools.getAvater(),
      realName:"胡一刀",
      titles:"主任医师",
      workUnit:"北京中医大学东方医院海淀分院",
      WeiboNickName:"北京中医大学东方医院海淀分院",
      WeiXinNickName:"北京中医大学东方医院海淀分院",
      departments:"亚健康科室",
      sicknessExpertise:"呼吸道感染、慢性咽炎、腹泻、湿疹、手足口病、发烧",
      areasOfExpertise:"亚健康科室",
      pattenNum:tools.rand(0,10000),
      answerNum:tools.rand(0,10000),
      grade:tools.rand(0,100),
      advice:tools.rand(0,1),
      isNowsuspendService:tools.rand(0,1),
      register:tools.rand(0,1),
      qPrice:tools.rand(0,1000),
      qCaps:tools.rand(0,1000),
      visitingTime:"2017-12-12 12:12:12",
      location:"北京中医大学东方医院海淀分院",
      relation:tools.rand(0,1),
      canCaps:tools.rand(0,1),
      rankCount:tools.rand(1,8),
      latestArticles:[
        {
          title:"发布了在线课程《如何进行胎教》",
          timeStr:"5小时前",
        },
        {
          title:"发表了文章《亲吻宝宝会患川崎病吗,如何精确的知道是否是不好的",
          timeStr:"5小时前",
        }
      ],
    }
  },
  {
    url:"/awyh/commonweal/commonwealActivity",
    method:"POST",
    mockdata:{
      "id": "5aebf63984ae1c6020e1a3cc",
      "activityType": "DOCTORDAY",
      "activityStatus": tools.rand(0,2),//tools.rand(0,2)
      "shared": true,
      "isRemind": tools.getStatus(),
      "image": tools.getAvater(),
      "enrolment": tools.rand(50,100),
      "startTime": "2018-06-21",
      "endTime": "2018-06-21",
      "invitedGuest": "黄大仙",
      "createTime": "2018-04-23",
      "title": "微博爱医日分享",
      "sourcesType": "CUSTOMER",
      "startDate": 1529510400000,
      "type": 0,
      "shareContent": "这是一个分享语分享语"
    }
  },
  {
    url:"/awyh/commonweal/addRemind",
    method:"POST",
    mockdata:true
  },
  {
    url:"/awyh/commonweal/addRemind",
    method:"POST",
    mockdata:true
  },
  {
    url:"/awyh/docConsultingRoom/qryAppraises",
    method:"POST",
    mockdata:(
      function(){
        var items=[];
        for (var j = 0; j <3; j++) {
          var item={
            appraisesId:"5acf898884ae1c6f8bef19ea",
            content:"很满意。",
            contentTime:"2018-04-13 00:30:00",
            contentType:"咨询",
            headImg:"https://www.991kang.com/static/images/default.gif",
            nickname:"周大生",
            stars:5,
            userId:null
          };
          items.push(item);
        }
        return items;
      }
    )()
  },
  {
    url:"/awyh/commonweal/board",
    method:"POST",
    mockdata:(
      function(){
        var items=[];
        for (var j = 0; j <6; j++) {
          var item={
            "docId": "59f8238584ae68b15a4c7c5e",
            "activityId": "5aebf63984ae1c6020e1a3cc",
            "activityType": "DOCTORDAY",
            "activityTitle": "12.21关爱妇女儿童的健康权益12.21关爱妇女儿童的健康权益12.21关爱妇女儿童的健康权益",
            "lovePoint": "999",
            "ranking": "100",
            "drDepartId": "1",
            "drDepartment": "儿科",
            "medal": "1"
          };
          items.push(item);
        }
        return items;
      }
    )()
  },
  {
    url:"/awyh/department/doc_comments",
    method:"POST",
    mockdata:(
          function(){
            var items=[];
            for (var j = 0; j <10; j++) {
              var item={
                id: "59b25f2684aed84b755044aa",
                name:tools.getName(),
                faceImg:tools.getAvater(),
                starNum: tools.rand(0,5),
                content:"谢谢医生，很耐心",
                time: "2018-01-25 20:30:03"
              };
              items.push(item);
            }
            return items;
          }
        )()
  },
  {
    url:"/awyh/doctor/addAsMyDoctor",
    method:"POST",
    mockdata:null
  },
  {
    url:"/awyh/commonweal/addLogRecord",
    method:"POST",
    mockdata:null
  },
  {
    url:"/awyh/commonweal/addUserActionRecord",
    method:"POST",
    mockdata:null
  },
  {
    url:"/awyh/commonweal/getUserNumberToActivity",
    method:"POST",
    mockdata:{
      capCount: tools.rand(0,2),
      isShare: tools.getStatus()
    }
  },
  {
    url:"/awyh/doctor/qryDoctorList",
    method:"POST",
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
    url:"/awyh/doctor/qryDrRegiontList",
    method:"POST",
    mockdata:consts.cityList
  },
  {
    url:"/awyh/doctor/qryTitlesList",
    method:"POST",
    mockdata:consts.teachList
  },
  {
    url: "/awyh/doctor/qryDoctorList",
    method: "POST",
    mockdata: (
      { "page": { "pageIndex": 1, "pageSize": 10, "pageCount": 36, "total": 360 }, "data": [{ "id": "52bd33bd84ae6b53b7230d6f", "photo": "http://tva2.sinaimg.cn/crop.0.0.996.996.180/442a09cbjw8f7mwl7skn8j20ro0rogq0.jpg", "realName": "蒋佩茹", "titles": "主任医师", "workUnit": "上海市（复旦大学附属）公共卫生临床中心", "departId": null, "departments": "产科", "sicknessExpertise": "高危妊娠、产后出血", "areasOfExpertise": "高危妊娠，产后出血，高龄初产，不良产史，妊娠合并肝病和其他感染性疾病", "pattenNum": 1282, "answerNum": 215, "popNum": 149, "grade": "100%", "advice": true, "qPrice": 388.0, "qCaps": 4, "register": false, "visitingTime": null, "location": null, "relation": false, "weixin": null, "weixinCard": null, "weiboID": null, "nowsuspendService": false, "weiboNickName": "蒋佩茹医生", "weiXinNickName": "蒋佩茹" }, { "id": "54c26f30e4b05195cd71a8bc", "photo": "http://tva2.sinaimg.cn/crop.0.15.640.640.180/005R9acEjw8f7ayqwmdt3j30hs0int9n.jpg", "realName": "张炜", "titles": "主任医师", "workUnit": "复旦大学附属妇产科医院", "departId": null, "departments": "妇科", "sicknessExpertise": "性发育异常、异常子宫出血、闭经、多囊卵巢综合征、卵巢早衰、围绝经期综合征、高泌乳素血症", "areasOfExpertise": "擅长诊治各种妇科内分泌常见病和疑难杂症，如青春期延迟、性发育异常、异常子宫出血、闭经、多囊卵巢综合征", "pattenNum": 2568, "answerNum": 532, "popNum": 51, "grade": "100%", "advice": true, "qPrice": 388.0, "qCaps": 5, "register": false, "visitingTime": null, "location": null, "relation": false, "weixin": null, "weixinCard": null, "weiboID": null, "nowsuspendService": false, "weiboNickName": "生殖内分泌专家张炜", "weiXinNickName": null }, { "id": "54a3d4ec84aed26177d72979", "photo": "http://tva3.sinaimg.cn/crop.0.0.180.180.180/98483e06jw1e8qgp5bmzyj2050050aa8.jpg", "realName": "段洁", "titles": "主任医师", "workUnit": "湖北省妇幼保健院", "departId": null, "departments": "妇科", "sicknessExpertise": "", "areasOfExpertise": "妇科内分泌、妇科微创", "pattenNum": 323, "answerNum": 279, "popNum": 28, "grade": "100%", "advice": true, "qPrice": 30.0, "qCaps": 3, "register": false, "visitingTime": null, "location": null, "relation": false, "weixin": null, "weixinCard": null, "weiboID": null, "nowsuspendService": false, "weiboNickName": "小洁大夫", "weiXinNickName": "小洁大夫\uD83C\uDF4E" }, { "id": "565069980cf23a8e907e61b7", "photo": "http://tva1.sinaimg.cn/crop.0.0.598.598.180/005yePHSgw1eeuf9ztqcpj30go0p0gq3.jpg", "realName": "段涛", "titles": "主任医师", "workUnit": "上海市第一妇婴保健院", "departId": null, "departments": "妇产科", "sicknessExpertise": null, "areasOfExpertise": "妇产科", "pattenNum": 2570, "answerNum": 1, "popNum": 379, "grade": "100%", "advice": false, "qPrice": 999.0, "qCaps": 0, "register": false, "visitingTime": null, "location": null, "relation": false, "weixin": null, "weixinCard": null, "weiboID": null, "nowsuspendService": false, "weiboNickName": "段涛医生", "weiXinNickName": null }, { "id": "590cf52d0cf26ee8a1871ab1", "photo": "https://pic.wenwo.com/fimg/16662135048.jpg", "realName": "郭红军", "titles": "副主任医师", "workUnit": "郑州大学第一附属医院", "departId": null, "departments": "妇科", "sicknessExpertise": null, "areasOfExpertise": "常见妇科病，妇科肿瘤和月经不调", "pattenNum": 423, "answerNum": 260, "popNum": 57, "grade": "100%", "advice": true, "qPrice": 58.0, "qCaps": 10, "register": false, "visitingTime": null, "location": null, "relation": false, "weixin": null, "weixinCard": null, "weiboID": null, "nowsuspendService": false, "weiboNickName": "妇科老郭", "weiXinNickName": "郭红军郑大一附院妇科" }, { "id": "51b2a556e4b0411400639717", "photo": "https://pic.wenwo.com/fimg/2111135551_120.jpg", "realName": "王良", "titles": "主任医师", "workUnit": "浙江大学医学院附属第二医院", "departId": null, "departments": "妇科", "sicknessExpertise": "子宫内膜异位症、妇科肿瘤", "areasOfExpertise": "擅长子宫肌瘤、子宫内膜异位症、不孕不育、卵巢囊肿等妇科疾病的诊治，擅长宫、腹腔镜等妇科微创手术", "pattenNum": 510, "answerNum": 479, "popNum": 16, "grade": "100%", "advice": true, "qPrice": 90.0, "qCaps": 10, "register": false, "visitingTime": null, "location": null, "relation": false, "weixin": null, "weixinCard": null, "weiboID": null, "nowsuspendService": false, "weiboNickName": "王良医生", "weiXinNickName": "王良" }, { "id": "5a6ed5f6e4b0bbf0bdac4ab0", "photo": "http://tvax2.sinaimg.cn/crop.0.15.750.750.1024/565fdb67ly8fhdshmkk3ej20ku0lp3zx.jpg", "realName": "周玲", "titles": "副主任医师", "workUnit": "中国人民解放军第306医院", "departId": null, "departments": "妇产科", "sicknessExpertise": null, "areasOfExpertise": "优生优育，围产期保健，妊娠合并症（糖尿病、高血压等）", "pattenNum": 20, "answerNum": 14, "popNum": 9, "grade": "100%", "advice": true, "qPrice": 5.0, "qCaps": 10, "register": false, "visitingTime": null, "location": null, "relation": false, "weixin": null, "weixinCard": null, "weiboID": null, "nowsuspendService": false, "weiboNickName": "玲珑画语", "weiXinNickName": null }, { "id": "5a9a745ae4b01c7ec37e4af8", "photo": "http://tvax3.sinaimg.cn/crop.37.28.542.542.1024/0075MImQly8foyh4o3m21j30i30r4gmc.jpg", "realName": "贺银燕", "titles": "副主任医师", "workUnit": "上海市第一人民医院", "departId": null, "departments": "妇科", "sicknessExpertise": null, "areasOfExpertise": "子宫肌瘤 子宫内膜癌 卵巢囊肿 月经紊乱 生殖免疫性疾病（反复自然流产等）", "pattenNum": 15, "answerNum": 2, "popNum": 4, "grade": "100%", "advice": true, "qPrice": 58.0, "qCaps": 30, "register": false, "visitingTime": null, "location": null, "relation": false, "weixin": null, "weixinCard": null, "weiboID": null, "nowsuspendService": false, "weiboNickName": "贺银燕医生_64678", "weiXinNickName": "贺银燕医生" }, { "id": "537820f0e4b03c01422e9be6", "photo": "http://tva4.sinaimg.cn/crop.0.38.398.398.180/6a0c5037gw1eowgfpyjanj20b30fu40q.jpg", "realName": "冯秀山", "titles": "主治医师", "workUnit": "福建协和医院", "departId": null, "departments": "妇科", "sicknessExpertise": "", "areasOfExpertise": "妇科肿瘤与内分泌，生殖道感染", "pattenNum": 284, "answerNum": 857, "popNum": 37, "grade": "100%", "advice": true, "qPrice": 45.0, "qCaps": 20, "register": false, "visitingTime": null, "location": null, "relation": false, "weixin": null, "weixinCard": null, "weiboID": null, "nowsuspendService": false, "weiboNickName": "妇产科冯秀山医生", "weiXinNickName": "Dr. FENG" }, { "id": "5a6eef5ae4b0aaab222aa873", "photo": "http://tvax1.sinaimg.cn/crop.15.0.185.185.50/00721wCFly8fn71rlzejlj306d05j760.jpg", "realName": "孙燕", "titles": "主任医师", "workUnit": "广西医科大学第一附属医院", "departId": null, "departments": "妇科", "sicknessExpertise": null, "areasOfExpertise": "辅助生殖、卵巢衰退、输卵管堵塞、女性不孕、子宫内膜异常、抗精子抗体、免疫性不孕等治疗。", "pattenNum": 49, "answerNum": 26, "popNum": 58, "grade": "100%", "advice": true, "qPrice": 0.0, "qCaps": 99, "register": false, "visitingTime": null, "location": null, "relation": false, "weixin": null, "weixinCard": null, "weiboID": null, "nowsuspendService": false, "weiboNickName": "试管婴儿刘国芬医生", "weiXinNickName": null }], "code": 0, "msg": "SUCCESS" }
    )
  },
  {
    url: "/awyh/doctor/qryDeptDoctorList",
    method: "POST",
    handleEvent: function (params, query) {
      if (params.deptId == 10400) {
        var data1 = {
          "id": "10400",
          "name": "儿科",
          "picture": "694438408",
          "introduction": "小儿感冒、小儿肺炎、小儿咳嗽、发烧、疝气、新生儿黄疸、先天性巨结肠等等"
        };
        return data1;
      } else if (params.deptId == 10800) {
        var data2 = {
          "id": "10800",
          "name": "妇产科",
          "picture": "",
          "introduction": "妇产科的科室信息的详细介绍呀呀呀"
        };
        return data2;
      } else if (params.deptId == 11000) {
        var data3 = {
          "id": "11000",
          "name": "皮肤性病科",
          "picture": "",
          "introduction": "皮肤性病科的科室信息的详细介绍呀呀呀"
        };
        return data3;
      } else if (params.deptId == 10500) {
        var data4 = {
          "id": "10500",
          "name": "内科",
          "picture": "",
          "introduction": "内科的科室信息的详细介绍呀呀呀"
        };
        return data4;
      } else {
        var data5 = {
          "id": "10600",
          "name": "外科",
          "picture": "",
          "introduction": "外科的科室信息的详细介绍呀呀呀"
        };
        return data5;
      }
    }
  }
];

var tools = require("../tools.js");
module.exports=[
  {
    url:"/awyh/lesson/home",
    method:"POST",
    mockdata:(
      function(){
        var items=[];
        for (var i = 0; i <5; i++) {
          var item={
            "id": "5a93b44484aea3b769a3c0f1",
            status: tools.rand(0,3),
            image: "https://pic.wenwo.com/fimg/194832937.jpg",
            title: "直播1"
          };
          items.push(item);
        }
        return items;
      }
    )()
  },
  {
    url:"/awyh/system/notice",
    method:"GET",
    mockdata:(
      function(){
        var items=[];
        for (var i = 0; i <5; i++) {
          var item={
            "id": "5ae188389f760c1de10bc28d",
			      "title": " 系统公告",
            "content": "预防心脏病，从小做起，减压减脂肪，好好预防，需要锻炼？",
            "linkURL": " www.baidu.com",
            "createTime": "2018/4/26",
            "pushTime": "2018/4/26 ",
            "status": "1"
          };
          items.push(item);
        }
        return items;
      }
    )()
  },
  {
    url:"/awyh/activity/latestSubject",
    method:"POST",
    mockdata:(
      function(){
        var items=[];
        for (var i = 0; i <5; i++) {
          var item={
            id:"5ae03a2984ae41c5d8e56927",
            image:"https://pic.wenwo.com/fimg/1242861.jpg",
            sourcesType:"USER",
            title:"1212"
          };
          items.push(item);
        }
        return items;
      }
    )()
    // mockdata:{
      // "id": "5a54587e84aed40c9773349b",
      // "activityType": "1",
      // "activityStatus": "1",
      // "image": "https://pic.wenwo.com/fimg/33371977.jpg",
      // "enrolment": null,
      // "startTime": "2018-01-09",
      // "endTime": "2018-01-09",
      // "invitedGuest": [{
      //   "druserId": "57611f49e4b04cf20a430c46",
      //   "nickName": "nickname201705",
      //   "name": "李玮",
      //   "drPhoto": "https://pic.wenwo.com/fimg/3272993.jpg",
      //   "weiboId": "6236892841",
      //   "answerCount": 0,
      //   "attentionCount": 0,
      //   "introduce": "\"S\"C1    \n\n2341",
      //   "titles": "",
      //   "departments": "眼科",
      //   "medicalInstitutions": "九江县人民医院",
      //   "sortNum": 1
      // }, {
      //   "druserId": "58a126afe4b09a4807b4b169",
      //   "nickName": "最爱麻麻1314",
      //   "name": "田甜",
      //   "drPhoto": "http://tva1.sinaimg.cn/default/images/default_avatar_female_50.gif",
      //   "weiboId": "5662792084",
      //   "answerCount": 0,
      //   "attentionCount": 0,
      //   "introduce": "善良。大方，，医术超群",
      //   "titles": null,
      //   "departments": null,
      //   "medicalInstitutions": "爱问医联",
      //   "sortNum": 1
      // }],
      // "createTime": "2018-01-08",
      // "title": "1.9访谈",
      // "sourcesType": null
    // }
  },
  {
    url:"/awyh/article/getDrPopsListByType",
    method:"POST",
    mockdata:(
      function(){
        var items=[];
        for (var i = 0; i <5; i++) {
          var item={
            id:tools.rand(0,1000),
            title:"照射胸部的病人进食时为什么会出现下咽疼痛",
            readCount:15,
            trueReadCountPv:15,
            picName:"PSP888049",
            contentType:"1",
            trueReadCount:22,
            drUserId:"5848f9d70a09a061b9d42abe",
            drUserName:"张大伟",
            drPhoto:"https://pic.wenwo.com/fimg/782721486_120.jpg",
            hospital:"广东军区第四医院专家门诊",
            drTitles:"主任医生",
            deptName:"小儿外科",
            deptId:"10402"
          };
          items.push(item);
        }
        return items;
      }
    )()
  },
  {
    url:"/awyh/home/all_departments",
    method:"POST",
    mockdata:(
      function(){
        var items=[];
        for (var i = 0; i <32; i++) {
          var item={
            id: "5a1b85b484aebaf359da7d20",
            img: tools.getAvater(),
            name:"科室名称"
          };
          items.push(item);
        }
        return items;
      }
    )()
  },
  // {
  //   url:"/awyh/activity/latestActivities",
  //   method:"POST",
  //   mockdata:(
  //     function(){
  //       var items=[];
  //       for (var i = 0; i <3; i++) {
  //         let item={
  //           id: "5a1b85b484aebaf359da7d20",
  //           title: "【爱医日】01.21微博爱医日新年专场",
  //           activityStatus: tools.rand(0,1),
  //           activityType: tools.rand(0,1),
  //           image:"",
  //           startTime:"2018-01-21",
  //           endTime:"2018-01-21",
  //           enrolment:tools.rand(0,4000),
  //           invitedGuest:"受邀嘉宾",
  //           createTime:"2018-01-21",
  //           sourcesType:"2018-01-21",
  //         };
  //         if(i==1){
  //           item.activityType=1;
  //         }
  //         items.push(item);
  //       }
  //       return items;
  //     }
  //   )()
  // },
  {
    url:"/health/info",
    method:"POST",
    mockdata:{
      "title": "文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题",
      "text": "文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容",
      "img": tools.getAvater(),
      "name":"胡毅",
      "docmask":"主任医师",
      "department": "XX科室",
      "createTime": "2017-11-22 16:32",
      "disease":["腹泻","湿疹","发烧","发烧","黄疸","呼吸道感染","手足口病"],
      "desc": "活动描述,文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章",
      "circleId":"599bfdd584aea001deab9621",
      "circleName":"骨骼圈",
      "authorId":"559e65a1e4b0d310e42676e1",
      "authorNick":"",
      "authorHeadImg":"http://tva3.sinaimg.cn/crop.0.0.720.720.50/0063QoWdjw8es41drllbij30k00k1dhm.jpg",
      "id":"5a5f15d384aeb3b50920d4f3",
      "content":"哈哈哈哈h，**测试医生回复看看",
      "imgList":[],
      "tagList":[{"tagId":"5f972b10-1f6c-422e-9afb-ee415f38dd8f","name":"哈哈","status":1}],
      "status":"1",
      "isEssence":0,
      "isTop":0,
      "isRecommend":0,
      "recommenderUserId":null,
      "recommenderUserName":null,
      "recommenderUserType":null,
      "critique":{"userId":"57beae6a0cf2a45ea185de62",
        "userName":"郭医生",
        "userHeadImg":"https://pic.wenwo.com/fimg/21812845.jpg",
        "titles":"副主任医师",
        "introduce":"11高危孕产妇的处理，熟练诊治各类妊娠合并症和并发症，如妊娠合并心脏病、肾脏病、血液病、免疫性疾病等",
        "content":"公分公分",
        "createTime":"01-17 17:49",
        "weiboId":"6013020093",
        "weiboNickname":"Lily_guodandan"},
      "adminModifyRecord":null,"readVirtualAmount":50,
      "recoveryAmount":7,
      "hugAmount":0,
      "hasHug":0,
      "hasEnshrine":0,
      "isFollow":"0",
      "isAccusation":"0",
      "rewardCreditRecord":[],
      "isHasCredit":"0",
      "creditList":[25,-15,10,20,5,5,8,9],
      "actId":null,
      "actType":null,
      "actCoverImg":null,
      "isPublic":null,
      "sex":null,
      "age":null,
      "miniProgramUrlList":[]
    }
  },
  {
    url: "/awyh/article/getFocusimg",
    method: "POST",
    mockdata: (
        function () {
          var item = {
            createTime: 1467270226779,
            description: null,
            fromType: "M",
            gotoType: "Y",
            gotoUrl: "http://www.baidu.com",
            id: "5774c452e4b076e7ca655d02",
            imgPosition: null,
            imgPositions: "USER_INDEX_TUIJIAN",
            imgUrl: "http://pic.wenwo.com/fimg/302256196_850.jpg",
            sort: 3
          };
          var items = [];
          for (var i = 0; i < 3; i++) {
            items.push(item);
          }
          return items;
        }
      )()
  },
  {
    url: "/awyh/activity/latestActivities",
    method: "POST",
    mockdata: {
      activityStatus: "0",
      activityType: "0",
      createTime: "2018-04-22",
      endTime: "2018-04-26",
      enrolment: "2000",
      id: "5add4feb84aecd392ffedc1f",
      image: "https://pic.wenwo.com/fimg/74394574.jpg",
      invitedGuest: null,
      shareContent: null,
      sourcesType: "CUSTOMER",
      startDate: 1524412800000,
      startTime: "2018-04-23",
      title: "测试发布分享测试发布分享",
      type: 0
    }
  },
];

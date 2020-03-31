var tools = require("../tools.js");
module.exports=[
  {
    url:"/circle/qryCategory",
    method:"POST",
    mockdata:(
        function(){
          var item={
            id: "59b25f2684aed84b755044aa",
            categoryName: "风湿科",
            parentId: null,
            circleCategoryUIList: [],
            departmentId: "10508",
            departmentName: "风湿科",
            circleList: []
          };
          var c_item={
            id: "59b25fd684aed84b755044b8",
            joinStatus: true,
            circleName: "风湿科圈",
            circlePhoto: null,
            joinStatus: true
          };
          var items=[];
          for (var i = 0; i <10; i++) {
            for (var j = 0; j <10; j++) {
              item.circleList.push(c_item);
            }
            items.push(item);
          }
          return items;
        }
      )()
  },

  {
    url:"/circle/qryExpertUsers",
    method:"POST",
    mockdata:(
        function(){
          var item={
            "expertId": "59c3931984aedc9a425ebbec",
            "expertUserType": "1",
            "expertUserId": "583803310cf21ea86708b117",
            "expertUserName": "陈启周",
            "expertUserPhoto": "https://pic.wenwo.com/fimg/7586104_516.jpg",
            "areasOfExpertise": null,
            "departments": null,
            "introduce": null,
            "titles": null,
            "medicalInstitutions": null,
            "doctorUrl": "http://www.991kang.com/doctor/doctorIndex?docId=583803310cf21ea86708b117"
          };
          var items=[];
          for (var i = 0; i <10; i++) {
            items.push(item);
          }
          return items;
        }
      )()
  },
  {
    url:"/community/visitUser/circlePage",
    method:"POST",
    mockdata:{
      "count": tools.rand(0,10000)
    }
  },
  {
    url:"/circle/qryActiveUser",
    method:"POST",
    mockdata:(
        function(){
          var item={
            "userId": "57c672de0cf2501fec2dfd5f",
            "nickName": "Lily_guo",
            "faceImage": "433213705",
            "gender": "female",
            "activeTime": 1509711170559
          };
          var items=[];
          for (var i = 0; i <10; i++) {
            items.push(item);
          }
          return items;
        }
      )()
  } ,
  {
    url:"/circle/topPosts",
    method:"POST",
    mockdata:(
        function(){
          var items=[];
          for (var i = 0; i <5; i++) {
            var item={
              "id": "57c672de0cf2501fec2dfd5f",
              "title": "Lily_guo",
              "type": tools.rand(0,1),
              "actType": "愛醫日",
              "status": tools.rand(1,3)
            };
            items.push(item);
          }
          return items;
        }
      )()
  } ,
  {
    url:"/community/circle/qryHotCircleNew",
    method:"POST",
    mockdata:(
        function(){
          var item={
            id: "599d07a784ae1d8476a49d4e",
            circleName: " 眼科圈",
            circlePhoto: tools.getAvater(),
            joinStatus: false,
            postsTempList: null,
            circleIntroduction: ""
          };
          var items=[];
          for (var i = 0; i <10; i++) {
            items.push(item);
          }
          return items;
        }
      )()
  },
  {
    url:"/community/doc/qryCircleByDept",
    method:"POST",
    mockdata:(
        function(){
          var item={
            id: "599d07a784ae1d8476a49d4e",
            circleName: " 眼科圈",
            circlePhoto: tools.getAvater(),
            joinStatus: false,
            postsTempList: null,
            circleIntroduction: ""
          };
          var items=[];
          for (var i = 0; i <10; i++) {
            items.push(item);
          }
          return items;
        }
      )()
  },
  {
    url:"/circle/qryHotPosts",
    method:"get",
    mockdata:(
         function(){
           var item={
             "id": "5a05624784aee8e2d5589968",
             "title": "你好吗，我很好",
             "authorId": "57c672de0cf2501fec2dfd5f",
             "authorNick": "Lily_guo",
             "imgList": [
               tools.getAvater(),
               tools.getAvater()
             ],
             "doctorFlag": true,
             "readVirtualAmount": 16,
             "recoveryAmount": 4,
             "circleId": "599bfdd584aea001deab9621",
             "circleName": "骨骼圈",
             "createTime": "11-10"
           };
           var items=[];
           for (var i = 0; i <15; i++) {
             items.push(item);
           }
           return items;
         }
       )()
  },
  {
    url:"/circle/qryCircle",
    method:"post",
    mockdata:{
      "id": "599bfdd584aea001deab9621",
      "categoryId": "599bfdcb84aea001deab9620",
      "circleName": "骨骼圈",
      "circleIntroduction": "快来逛逛圈吧！！！~~~快来逛逛圈吧！！！~~~快来逛逛圈吧！！！~~~快来逛逛圈吧！！！~~~快来逛逛圈吧！！！~~~快来逛逛圈吧！！！~~~",
      "circlePhoto": tools.getAvater(),
      "userAmount": 144,
      "postsAmount": 313,
      "circleAdminUserList": [
        {
          "userId": "57c672de0cf2501fec2dfd5f",
          "userName": "Lily_guo",
          "userPhoto": tools.getAvater()
        },
        {
          "userId": "599ab2f384ae772c56a51731",
          "userName": "浅酌酌酌酌酌酌",
          "userPhoto": tools.getAvater()
        },
        {
          "userId": "5966ca75e4b03d73f8633bfe",
          "userName": "狂奔的蜗牛111",
          "userPhoto": "http://wx.qlogo.cn/mmhead/gdUHj1Qwgy5J1zadbDfGckt9BvwbeXzcyHnC1biaWsWc/0"
        },
        {
          "userId": "55fe7431e4b01bd5cc80bf02",
          "userName": "多多洛龙猫君",
          "userPhoto": "http://tva2.sinaimg.cn/crop.0.39.498.498.50/006xCCekjw8f6pluyp7f9j30dw0hy40d.jpg"
        },
        {
          "userId": "59e071d884aeca351b98d26c",
          "userName": "明天的幸福彩虹",
          "userPhoto": "http://tva3.sinaimg.cn/crop.0.0.720.720.50/e05f2787jw8eejjjhtk5ej20k00k0mzl.jpg"
        }
      ],
      "expertUserList": [
        {
          "expertId": "599c1eee84aeb153e8d13518",
          "expertUserType": "1",
          "expertUserId": "57beae6a0cf2a45ea185de62",
          "expertUserName": "郭医生",
          "expertUserPhoto": tools.getAvater(),
          "areasOfExpertise": "高危孕产妇的处理，熟练诊治各类妊娠合并症和并发症，如妊娠合并心脏病、肾脏病、血液病、免疫性疾病等",
          "departments": "妇科",
          "introduce": "赶紧离开经济法了解了解给佛挡杀佛的是佛挡杀佛"
        },
        {
          "expertId": "59c3931984aedc9a425ebbec",
          "expertUserType": "1",
          "expertUserId": "583803310cf21ea86708b117",
          "expertUserName": "陈启周",
          "expertUserPhoto": "https://pic.wenwo.com/fimg/7586104_516.jpg",
          "areasOfExpertise": null,
          "departments": null,
          "introduce": null
        },
        {
          "expertId": "59bf2d29521c76455c58106d",
          "expertUserType": "1",
          "expertUserId": "57ae8cb5e4b0648353b05d81",
          "expertUserName": "艾威",
          "expertUserPhoto": tools.getAvater(),
          "areasOfExpertise": "心理咨询，神经症，人格障碍，行为障碍等的某些精神疾病。",
          "departments": "中医科",
          "introduce": "深圳大学第一医院\n\n"
        },
        {
          "expertId": "59ad41b584ae1514bac758a6",
          "expertUserType": "1",
          "expertUserId": "5971612fe4b09a32f249eafe",
          "expertUserName": "杨子涵",
          "expertUserPhoto": tools.getAvater(),
          "areasOfExpertise": "养生",
          "departments": "",
          "introduce": null
        },
        {
          "expertId": "59ad41a384ae1514bac758a5",
          "expertUserType": "1",
          "expertUserId": "59717463e4b09a32f249eb95",
          "expertUserName": "测试石敏",
          "expertUserPhoto": "https://pic.wenwo.com/fimg/782721486.jpg",
          "areasOfExpertise": null,
          "departments": "眼科",
          "introduce": ""
        },
        {
          "expertId": "59ad419484ae1514bac758a4",
          "expertUserType": "1",
          "expertUserId": "599d4e1084aeffa9206ba110",
          "expertUserName": "徐慕聪",
          "expertUserPhoto": "https://pic.wenwo.com/fimg/782721486.jpg",
          "areasOfExpertise": "吃饭",
          "departments": "",
          "introduce": ""
        },
        {
          "expertId": "59ad418984ae1514bac758a3",
          "expertUserType": "1",
          "expertUserId": "59a4dfa684ae50f5de5cb423",
          "expertUserName": null,
          "expertUserPhoto": tools.getAvater(),
          "areasOfExpertise": null,
          "departments": null,
          "introduce": null
        },
        {
          "expertId": "59ad40ea84ae1514bac758a2",
          "expertUserType": "1",
          "expertUserId": "595603aae4b04950a2862877",
          "expertUserName": "李伟松",
          "expertUserPhoto": "http://tva1.sinaimg.cn/crop.0.0.533.533.50/0066gbPjjw8ewz95165t3j30qo0k0769.jpg",
          "areasOfExpertise": null,
          "departments": "",
          "introduce": null
        },
        {
          "expertId": "59ad40c384ae1514bac758a0",
          "expertUserType": "1",
          "expertUserId": "5760ff91e4b04cf20a430c30",
          "expertUserName": "黄剑勇",
          "expertUserPhoto": "http://tva3.sinaimg.cn/crop.0.0.1242.1242.50/78f0bec1jw8f30ulrv713j20yi0yiadd.jpg",
          "areasOfExpertise": "小儿内科",
          "departments": "小儿内科",
          "introduce": "深圳大学\n\n\n深圳宝安人民医院\n\n\n成果\n\n\n文章\n\n\n"
        },
        {
          "expertId": "59ad40af84ae1514bac7589f",
          "expertUserType": "1",
          "expertUserId": "58a1273ce4b09a4807b4b16e",
          "expertUserName": "梁敏华",
          "expertUserPhoto": "https://pic.wenwo.com/fimg/447311750.jpg",
          "areasOfExpertise": null,
          "departments": "小儿内科",
          "introduce": ""
        },
        {
          "expertId": "59ad409d84ae1514bac7589e",
          "expertUserType": "1",
          "expertUserId": "551113bae4b04ebb118e2961",
          "expertUserName": "黄萍",
          "expertUserPhoto": "http://tva3.sinaimg.cn/crop.0.0.720.720.180/006539tpjw8eqhq1s8iqlj30k00k1mzp.jpg",
          "areasOfExpertise": "B、专注于食鳝调理养身、减肥，营养专家，专注于食鳝调理养身、减肥，营养专家库去KTV途径解决咯计算！",
          "departments": "中医科",
          "introduce": "A、专注于食鳝调理养身、减肥，营养专家，专注于食鳝调理养身、减肥，营养专家就开始露臀物体黄军净流入不脆了起来了哦特特爬起来去塔特特斯拉配合特UFO托普卡帕塞浦路斯巨头穆勒茶色特屠夫多头呢专注于食鳝调理养身、减肥，营养专家，鳝调理养身、减肥，营养专家，\n\n\n2、补充一点，很流行一种叫做“华尔街日报体”（DEE）的格式，这个格式的主要特点就是在文首特写新闻事件中的一个“镜头”，一般是以一个人的言行为主，从而引出整个的新闻报道，比如央行关于房贷要加息的消息，新闻报道就可以从一个普通市民的住房贷款行为写起，比较能贴近实际，贴近群众，贴近生活。\n\n\n标题对于新闻报道很重要，甚至都出现了一个标题就是一条报道的情况。因而，标题要提炼新闻事件的“精华”，把最吸引人的地方体现出来，同时要简洁。如果需要可以在主标题前加上引题专注于食鳝调理养身、减肥，营养专家\n\n\n举办新闻发布会，请行业及大众媒体参会，由企业新闻发言人对外公开发布企业重大消息。这种方式对企业来讲，费用花费很高，而且是有一定社会知名度的大型企业才有这样的号召力和媒体关注度。过这些媒体关系发布。这种方式的优点是比较直接比较快，费用少;缺点是工作难度大，媒体范围小，发稿数量受限制，稿件发布率低\n\n\nA新闻稿如何传播新闻稿营销最重要的一个问题就是稿件的传播与效果监控。稿件的传播成功与否直接决定了新闻稿营销事件是否成功。好的新闻稿没有好的传播渠道，策划就可以与零划等号。\n\n\n1.高质量的新闻稿件，能够获得在这些大型新闻网站首页展示的机会，这些新闻网站每日的访问量大的惊人，恐怕传统的电视广告，都不具备与这种互联网媒体相媲美的能力。"
        }
      ],
      "activeUserList": [
        {
          "userId": "57c672de0cf2501fec2dfd5f",
          "nickName": "Lily_guo",
          "faceImage": tools.getAvater(),
          "gender": "female",
          "activeTime": 1503479748756
        },
        {
          "userId": "55fe7431e4b01bd5cc80bf02",
          "nickName": "多多洛龙猫君",
          "faceImage": "http://tva2.sinaimg.cn/crop.0.39.498.498.50/006xCCekjw8f6pluyp7f9j30dw0hy40d.jpg",
          "gender": "male",
          "activeTime": 1503899841618
        },
        {
          "userId": "596c985be4b09a32f249ca60",
          "nickName": "草头_黄",
          "faceImage": tools.getAvater(),
          "gender": "male",
          "activeTime": 1503908278405
        },
        {
          "userId": "581454e89cb4a342bcd8fe87",
          "nickName": "伊楼908",
          "faceImage": tools.getAvater(),
          "gender": "male",
          "activeTime": 1504519747814
        }
      ],
      "isBrowseByTag": 0,
      "tagList": [
        {
          "tagId": "a06c68de-f501-4732-8a62-f20ef4773e2c",
          "name": "发烧",
          "sort": 0,
          "isEnable": 1,
          "status": 1,
          "createTime": null,
          "updateTime": 1510307996881
        },
        {
          "tagId": "362091de-b75b-436b-a5ca-370b1e3fbc5f",
          "name": "感冒",
          "sort": 0,
          "isEnable": 1,
          "status": 1,
          "createTime": null,
          "updateTime": 1510307996881
        },
        {
          "tagId": "292ba6aa-b0e0-45f7-95a1-8f66c8e23178",
          "name": "内分泌",
          "sort": 0,
          "isEnable": 1,
          "status": 1,
          "createTime": null,
          "updateTime": 1510307996881
        },
        {
          "tagId": "5f972b10-1f6c-422e-9afb-ee415f38dd8f",
          "name": "哈哈",
          "sort": 0,
          "isEnable": 1,
          "status": 1,
          "createTime": null,
          "updateTime": 1510307996881
        },
        {
          "tagId": "146a9f3a-d817-44f0-988e-e3f297725f4b",
          "name": "头晕",
          "sort": 0,
          "isEnable": 1,
          "status": 1,
          "createTime": null,
          "updateTime": 1510307996881
        },
        {
          "tagId": "81488cde-2550-4a0f-b04c-11456a7a2b67",
          "name": "伤心凉意",
          "sort": 0,
          "isEnable": 1,
          "status": 1,
          "createTime": null,
          "updateTime": 1510307996881
        },
        {
          "tagId": "ac14cea5-d9cb-46c6-b4e0-87ad35da1cbe",
          "name": "还行没了",
          "sort": 0,
          "isEnable": 1,
          "status": 1,
          "createTime": null,
          "updateTime": 1510307996881
        },
        {
          "tagId": "7507394c-1c73-4943-be7b-e959d6ad8d37",
          "name": "对法律的反垄断法",
          "sort": 0,
          "isEnable": 1,
          "status": 1,
          "createTime": null,
          "updateTime": 1510307996881
        },
        {
          "tagId": "45b59ae1-7fdc-4766-906e-e48c2db2af26",
          "name": "多发的说法是谁",
          "sort": 0,
          "isEnable": 1,
          "status": 1,
          "createTime": null,
          "updateTime": 1510307996881
        }
      ],
      "joinStatus": true,
      "postsList": [
        {
          "id": "5a05118e84aee8e2d55898ec",
          "title": "f 第三方的"
        },
        {
          "id": "59f8588084aeea55e320de82",
          "title": "111今天31号，成为热门帖"
        },
        {
          "id": "59ddf3f784aeca351b98d238",
          "title": "大大方方             德辅道"
        },
        {
          "id": "59ddf85e84aeca351b98d23e",
          "title": "啊啊"
        },
        {
          "id": "59dec74f84aeca351b98d243",
          "title": "额无聊发呆家里附近的"
        },
        {
          "id": "59dec77984aeca351b98d246",
          "title": "呵呵呵                  呵呵"
        }
      ],
      "postsDefaultSortField": "2",
      "postsDefaultSort": "0",
      "isHotCircle": 1,
      "enablePostsAudit": 0,
      "enablePostsRecycleBin": 1,
      "enablePostsTag": 1,
      "isPostsWithTag": 0,
      "circleHostUser": false
    }
  },

  {
    url:"/posts/findByCircle",
    method:"GET",
    mockdata:(
           function(){
             var items=[];
             for (var i = 0; i <10; i++) {
               var item= {
                 "id": "5a0440ed84aeeb110a6217d4",
                 "circleId": "599bfdd584aea001deab9621",
                 "circleName": "骨骼圈",
                 "authorId": "59c48a9e37f16b8279f90d19",
                 "authorNick": "阳光子籽",
                 "authorHeadImg": "http://tva4.sinaimg.cn/crop.5.3.55.55.50/4dc6673ejw8f3tlxwu3l8j202s02smx0.jpg",
                 "title": "今天话咖啡壶的看法活动开始疯狂到货付款的话疯狂到货付款的话顺丰快递很舒服客户打款司法活动开始疯狂的",
                 "content": "今天周四了广泛的广泛个健康浪费记得了减肥啦的积分",
                 "createTime": "11-09",
                 "imgList": [
                   "3824823",
                   "8411824"
                 ],
                 "tagList": [],
                 "isEssence": 0,
                 "isRecommend": 0,
                 "isShowDocFlag": 1,
                 "readVirtualAmount": 17,
                 "recoveryAmount": 3
               };
               if(tools.rand(0,1)===0){
                 item.actId="5a0440ed84aeeb110a6217d4";
                 item.actType="義診日";
               }
               items.push(item);
             }
             return items;
           }
         )()
  }
    ,
  {
    url:"/community/hotword/qryWords",
    method:"post",
    mockdata:["健康","京东","哇哈哈","cba","t","d","这是什么","不知道","怎么发帖","不知道+1"]
  },
  {
    url:"/circle/qryCircleBySearchWord",
    method:"post",
    mockdata:(
          function(){
            var item={
              "id": "59f7e0ed84aea357740ae4d5",
              "circleName": "新热门圈",
              "circlePhoto": null
            };
            var items=[];
            for (var i = 0; i <15; i++) {
              items.push(item);
            }
            return items;
          }
        )()
  }
   ,
  {
    url:"/awyh/posts/findPostsBySearchWord",
    method:"post",
    mockdata:(
          function(){
            var item={
              "id": "5a05624784aee8e2d5589968",
              "title": "你好吗，我很好",
              "authorId": "57c672de0cf2501fec2dfd5f",
              "authorNick": "Lily_guo",
              "imgList": [
                "38402919",
                "38424920"
              ],
              "doctorFlag": true,
              "readVirtualAmount": 16,
              "recoveryAmount": 4,
              "circleId": "599bfdd584aea001deab9621",
              "circleName": "骨骼圈",
              "createTime": "11-10"
            };
            var items=[];
            for (var i = 0; i <15; i++) {
              items.push(item);
            }
            return items;
          }
        )()
  }
];

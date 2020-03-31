var tools = require("../tools.js");
module.exports=[
  {
    url:"/awyh/recommend/getRecommendManages",
    method:"POST",
    handleEvent:function(params,query){
      if(params.category=="recommendArticl"){
        var items=[];
        for (var i = 0; i <3; i++) {
          var item={
            "id": "4894ks36278462375ychd",
            "title": "小米跟麻麻说她想去泰国，妈妈说为什么会去泰国而不去越南呢",
            "picId": tools.getAvater(),
            "type": tools.rand(1,5),
            "linkURL": "http://www.baidu.com"
          };
          items.push(item);
        }
        return items;
      }
      else if(params.category=="diary" || params.category == "science"){
        var items2=[];
        for (var j = 0; j <2; j++) {
          var item2={
            "id": "5ad01ddb84aea9b5017a480e",
            "title": "健康首页欧元真见日记文章标题标题文章标题标题文章标题标题文章标题标题",
            "content": "文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容",
            "picName":tools.getAvater(),
            "readCount":tools.rand(30,600),
            "departId": "10400",
            "departName" :"儿科",
            "contentType":tools.rand(1,5),
            "drUserId" : "5a211935e4b0ed39804fc7c6",
            "drUserName": "石敏",
            "drPhoto" : tools.getAvater(),
            "drTitles":"主治医生",
          };
          items2.push(item2);
        }
        return items2;
      }
      else if(params.category == "analysis"){
        var items=[];
        for (var j = 0; j <2; j++) {
          var item={
            "id": "25735",
		        "questionId": "257272",
		        "ucontent": "病历描述病历描述病历描述病历描述病历描述病历描述",
            "postTime": "2017-10-08 10:00",
            "answerTime": "2017-10-08 10:00",
            "uPic": tools.getAvater(),
	          "acontent": "医生回答问题内容医生回答问题内容医生回答问题内容医生回答问题内容医生回答问题内容医生回答问题内容",
            "departId" : "10400",
            "departName" :"儿科",
            "drUserId" : "65465465",
            "drUserName" : "娄丹丹",
            "drPhoto" : tools.getAvater(),
            "drTitles": "主治医生"
          };
          items.push(item);
        }
        return items;
      }
      else if(params.category == "lesson"){
        var items3 = [];
        for (var j = 0; j <2; j++) {
          var item3 = {
            "id": "599c012584aea001deab9622",
            "status": "0",
            "image": tools.getAvater(),
            "title": "直播1小米跟麻麻说她想去泰国，妈妈说为什么会去泰国而不去越南呢？"
          };
          items3.push(item3);
        }
        return items3;
      }
      else if(params.category == "column"){
        var items4 = [];
        for (var j = 0; j <4; j++) {
          var item4 = {
            "columnId": "10400",
		        "columnName": "女性专栏",
            "columnPic": tools.getAvater(),
            "columnSort":0
          };
          items4.push(item4);
        }
        return items4;
      }
      else if(params.category == "subject"){
        var items4 = [];
        for (var j = 0; j <4; j++) {
          var item4 = {
            "id": "599c012584aea001deab9622",
		        "image": tools.getAvater(),
            "title": "事实上是事实是事实是事实是事实是事实是事实是事实是事实是事实是事实妈妈说为什么会去泰国而不去越南呢",
            "sourcesType":"index"
          };
          items4.push(item4);
        }
        return items4;
      }
    }
  },
  {
    url:"/awyh/lesson/healthLesson",
    method:"POST",
    mockdata:(
        function(){
          var item={
            id: "5ad05cf8e4b0ef9c1cd8928d",
            lessonType: tools.rand(0,1),//0 单课  1系列课
            lessonsName: "课程名称西两侧的健康",
            lessonsPrice: tools.rand(0,120),
            createTime: 1517379047400,
            lessonsStatus: tools.rand(0,2),//单课独有(0直播中、1未开始 、2 已结束)
            applyNumber: tools.rand(20,120),
            lessonsImageId: tools.getAvater(),
            promotionPrice: tools.rand(-1,10),
            serialUpdateNum: tools.rand(2,10),
            serialNum: tools.rand(10,30),
            serialStatus: tools.rand(-1,3),//系列课状态（-1 未发布 1 未结课 2已结课 3已取消）
            lessonsStartTime: 1517379047400,
            lessonsEndTime:  1517379047400,
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
    url:"/health/list",
    method:"POST",
    handleEvent:function(params,query){
      if(params.pageIndex%2==0){
        var items=[];
        for (var i = 0; i <10; i++) {
          var item={
            contentType:"1",
            deptId:"10501",
            deptName:"内分泌科",
            drPhoto:"https://pic.wenwo.com/fimg/225564196_120.jpg",
            drTitles:"主治医生",
            drUserId:"5a211935e4b0ed39804fc7c6",
            drUserName:"石敏2",
            drName:"皮肤科2",
            id:"57b3db47e4b024c603306735",
            picName:tools.getAvater(),
            publishTime:"1523928439622",
            readCount:"9",
            title: i +"为什么有的人长的丑，但是却打心眼里觉得自己长的好看？",
            trueReadCount:"9",
            trueReadCountPv:"0",
          };
          items.push(item);
        }
        return items;
      }else{
        var items2=[];
        for (var j = 0; j <10; j++) {
          var item2={
            contentType:"2",
            deptId:"10501",
            deptName:"妇产科",
            drPhoto:tools.getAvater(),
            drTitles:"主治医生",
            drUserId:"5a211935e4b0ed39804fc7c6",
            drUserName:"李大大",
            drName:"泌尿科",
            id:"57b3db47e4b024c603306735",
            picName:tools.getAvater(),
            publishTime:"1523928439622",
            readCount:"9",
            title: j +"妻子意外怀孕，怎么办？",
            trueReadCount:"9",
            trueReadCountPv:"0",
          };
          items2.push(item2);
        }
        return items2;
      }
    }
  },
  {
    url:"/health/info",
    method:"POST",
    mockdata:{
      "id":"5a1b85b484aebaf359da7d20",
      "title": "文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题",
      "text": "文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容",
      "img": tools.getAvater(),
      "name":"胡毅",
      "docmask":"主任医师",
      "department": "XX科室",
      "createTime": "2017-11-22 16:32",
      "disease":["腹泻","湿疹","发烧","发烧","黄疸","呼吸道感染","手足口病"],
      "desc": "活动描述,文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章",
      "spacial":[{"sid":"5a581a1e84aed610c0b9fa67","title":"商业直客运营导入文章1"},{"sid":"5a581a1e84aed610c0b9fa67","title":"商业直客运营导入文章2"},{"sid":"5a581a1e84aed610c0b9fa67","title":"商业直客运营导入文章3"},{"sid":"5a581a1e84aed610c0b9fa67","title":"商业直客运营导入文章4"},{"sid":1,"title":"商业直客运营导入文章5"},],

      "circleId":"599bfdd584aea001deab9621",
      "circleName":"骨骼圈",
      "authorId":"559e65a1e4b0d310e42676e1",
      "authorNick":"",
      "authorHeadImg":"http://tva3.sinaimg.cn/crop.0.0.720.720.50/0063QoWdjw8es41drllbij30k00k1dhm.jpg",
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
        "picName":tools.getAvater(),
        "readCount":5656,
        "drUserName":"大漠",
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
    url:"/article/subscribe",
    method:"POST",
    mockdata:{
    }
  },
  {
    url:"/article/addFavorites",
    method:"POST",
    mockdata:{
    }
  },
  {
    url:"/article/delFavorites",
    method:"POST",
    mockdata:{
    }
  },
  {
    url:"/article/addLike",
    method:"POST",
    mockdata:{
    }
  },
  {
    url:"/doctor/addDoctorRelation.do",
    method:"POST",
    mockdata:{
    }
  },
  {
    url:"/awyh/banner/getBannersByModuleAndPosition",
    method:"GET",
    mockdata:(
      function(){
        var item={
          "id": "5ae3d47468c49e83eaa0a628",
          "moduleType": "1",
          "position": "4",
          "picId": tools.getAvater(),
          "linkURL": "https://www.baidu.com",
          "sort": 10,
          "status": 0,
          "createTime": 1524880500378,
          "updateTime": 1524880500378
        };
        var items=[];
        for (var i = 0; i <5; i++) {
          items.push(item);
        }
        return items;
      }
    )()
  },
  {
    url:"/article/articleDetails.do",
    method:"POST",
    mockdata:{
      "id":"aid-1b85b484aebaf359da7d20",
      "title": "文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题",
      "content": "<div>文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内</div><div><img src='http://img3.imgtn.bdimg.com/it/u=951120017,198117664&fm=26&gp=0.jpg' ></div>",
      "readCount":5656,
      "publishTime":"2017-11-22 16:32",
      "departId":"145",
      "departName":"心理疾病科",
      "like":tools.getStatus(),
      "likeCount":"8",
      "subscribe":tools.getStatus(),
      "favorite":tools.getStatus(),
      "commentNum":14,
      "bizDoc":tools.getStatus(),
      "subjectList":[
        {"subjectId":"5a581a1e84aed610c0b9fa67","subjectName":"商业直客运营导入文章1"},
        {"subjectId":"5a581a1e84aed610c0b9fa67","subjectName":"商业直客运营导入文章2"},
        {"subjectId":"5a581a1e84aed610c0b9fa67","subjectName":"商业直客运营导入文章3"},
        {"subjectId":"5a581a1e84aed610c0b9fa67","subjectName":"商业直客运营导入文章4"},
        {"subjectId":"15655","subjectName":"商业直客运营导入文章5"},
      ],

      "text": "文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容",
      "img": tools.getAvater(),
    }
  },
  {
    url:"/article/getDoctorInfoByPspId.do",
    method:"POST",
    mockdata:{
      "drUserId": "53df5e79e4b04749584a5de1",
      "drUserName": "林霞",
      "photo": "http://tva2.sinaimg.cn/crop.175.74.439.439.180/005IGRGKjw8f74oow0qpyj30lz0gdq8b.jpg",
      "consultStatus": tools.rand(-6,0),
      "commonwealStatus": tools.rand(-4,0),
      "departId": "56fcfe82e4b06559e2ece87d",
      "departName": "心理疾病科",
      "docTitles": "主治医师",
      "workUnit": "深圳市南山医院",
      "weiboId": "27563782",
      "weiboName": "东方",
      "weixinId": "498494",
      "weixinName": "东方",
      "sicknessExpertise": ["腹泻","湿疹","发烧","发烧","黄疸","呼吸道感染","手足口病"],
      "answerNum": 288,
      "applauseRate": "99.8%",
      "subscribe": tools.getStatus(),
      "relation": "NO",
      "userPrice": 88,
    }
  },
  {
    url:"/article/getPopCommentByPspId",
    method:"POST",
    mockdata:(
      function(){
        var item={
          "id":"1763527",
          "pspId":"57a999ade4b07553dacf0275",
          "content":"隔热管合同和人体就会退办公费发放隔热管合同和人体就会退办公费发放隔热管合同和人体就会退办公费发放",
          "fromUserId":"498498",
          "nickName":"夜空中最亮的星",
          "headPhoto":tools.getAvater(),
        };
        var items=[];
        for (var i = 0; i <5; i++) {
          items.push(item);
        }
        return items;
      }
      )()
  },
  {
    url:"/article/getRelatedArticle.do",
    method:"POST",
    mockdata:(
      function(){
        var item={
          "id":"aid-1b85b484aebaf359da7d20",
          "title": "文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题",
          "content": "文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内",
          "picName":tools.getAvater(),
          "readCount":5656,
          "departId":"rthtrhyr",
          "departName":"心理疾病科",
          "contentType":tools.rand(1,10),
          "drUserId":"29856546",
          "drUserName":"大漠",
        };
        var items=[];
        for (var i = 0; i <5; i++) {
          items.push(item);
        }
        return items;
      }
      )()
  },
  {
    url:"/article/getDiseasePspAnswerById.do",
    method:"POST",
    mockdata:{
      "id":"498489",
      "questionId": "79856",
      "content": "病历描述:病历描述:病历描述:病历描述:病历描述:病历描述:病历描述:",
      "qtitle": "病历标题",
      "qneed": "希望获得帮助",
      "postTime": "2017-11-22 16:32",
      "answerTime": "2017-12-22 16:32",
      "uPic": tools.getAvater(),
      "drPic": tools.getAvater(),
      "drPicIds":["123","124578"],
      "picIds": ["1256565","124595578"],
      "acontent": "医生回答问题内容回答问题内容回答问题内容回答问题内容回答问题内容回答问题内容",
      "dialogs": [
        {
          "type":1,
          "content": "追问/追答内容追问/追答内容追问/追答内容追问/追答内容追问/追答内容",
          "picIds":["123","124578","4984656"],
          "isQuest": "y追问|n回复",
          "postTime": "2017-12-23 16:32"
        },
        {
          "type":2,
          "content": "追问/追答内容追问/追答内容追问/追答内容追问/追答内容追问/追答内容",
          "picIds":["123","124578","4984656"],
          "isQuest": "y追问|n回复",
          "postTime": "2017-12-23 16:32"
        },
      ],
      "crateTime": "2017-12-20 16:32",
    }
  },
  {
    url:"/article/getVideoInfoById.do",
    method:"POST",
    mockdata:{
      "id":"49846849",
      "title": "视频标题标题标题标题",
      "content": "视频内容:充分积分开发破风婆婆",
      "readCount":"阅读数",
      "publishTime":"2017-12-20 16:32",
      "like":tools.getStatus(),
      "likeCount" : 45,
      "subscribe" : tools.getStatus(),
      "favorite" : tools.getStatus(),
      "videoUrl" : "http://www.zhangxinxu.com/study/media/cat.mp4",
      "seriesName" : "视频集名称",
    }
  },
  {
    url:"/awyh/banner/getBannersByModuleAndPosition",
    method:"GET",
    mockdata:(
        function(){
          var item={
            id:"5ae3d47468c49e83eaa0a628",
            moduleType: "2",
            position: "3",
            picId: "44068201",
            linkURL: "https://www.991kang.com",
            sort: 10,
            status: 0,
            createTime: 1524880500378,
            updateTime: 1524880500378
          };
          var items=[];
          for (var i = 0; i <3; i++) {
            items.push(item);
          }
          return items;
        }
      )()
  },
  {
    url:"/awyh/articleIndex/getDiaryByPage",
    method:"POST",
    handleEvent:function(params,query){
      if(params.sort==0){
        var items1=[];
        for (var i = 0; i <12; i++) {
          var item1={
            id: "5474401051f9d811d1ed29f6",
            title: "照射胸部的病人进食时为什么会出现下咽疼痛?",
            readCount: "21",
            trueReadCountPv: "0",
            picName: "116612359",
            contentType: "1",
            trueReadCount: "21",
            drUserId: "5848f9d70a09a061b9d42abe",
            drUserName: "liu",
            drPhoto: "https://pic.wenwo.com/fimg/782721486_120.jpg",
            drTitles: "副主任医师",
            deptName: "小儿外科",
            deptId: "10402"
          };
          items1.push(item1);
        }
        return items1.slice(params.limit*(params.pageIndex-1),params.limit*params.pageIndex);
      }else if(params.sort==1){
        var items2=[];
        for (var j = 0; j <16; j++) {
          var item2={
            id: "5474401051f9d811d1ed29f6",
            title: "照射胸部的病人进食时为什么会出现下咽疼痛?",
            readCount: "21",
            trueReadCountPv: "0",
            picName: "44068201",
            contentType: "1",
            trueReadCount: "21",
            drUserId: "5848f9d70a09a061b9d42abe",
            drUserName: "liu",
            drPhoto: "https://pic.wenwo.com/fimg/782721486_120.jpg",
            drTitles: "副主任医师",
            deptName: "小儿外科",
            deptId: "10402"
          };
          items2.push(item2);
        }
        return items2.slice(params.limit*(params.pageIndex-1),params.limit*params.pageIndex);
      }
    }
  },
  {
    url: "/awyh/articleIndex/getScienceColumns",
    method: "POST",
    mockdata:(
      function(){
        var items = [
          {
            columnPic: tools.getAvater(),
            columnName: "女性健康",
            columnId: "1111",
            channelId: "1222"
          },
          {
            columnPic: tools.getAvater(),
            columnName: "男性健康",
            columnId: "1112",
            channelId: "1222"
          },
          {
            columnPic: tools.getAvater(),
            columnName: "孕产课堂",
            columnId: "1113",
            channelId: "1222"
          },
          {
            columnPic: tools.getAvater(),
            columnName: "育儿指南",
            columnId: "1114",
            channelId: "1222"
          },
          {
            columnPic: tools.getAvater(),
            columnName: "大话用药",
            columnId: "1115",
            channelId: "1222"
          },
          {
            columnPic: tools.getAvater(),
            columnName: "心理健康",
            columnId: "1116",
            channelId: "1222"
          },
          {
            columnPic: tools.getAvater(),
            columnName: "整形美容",
            columnId: "1117",
            channelId: "1222"
          },
          {
            columnPic: tools.getAvater(),
            columnName: "中医养生",
            columnId: "1118",
            channelId: "1222"
          },
          {
            columnPic: tools.getAvater(),
            columnName: "健康指南",
            columnId: "1119",
            channelId: "1222"
          }
        ];
        return items;
      }
      )()
  },
  {
    url: "/health/artice/cloumn/list",
    method: "POST",
    handleEvent: function(params,query) {
      var items=[];
      for(let o = 0 ; o < 10 ; o ++) {
        var item = {
          contentType:"1",
          deptId:params.id,
          deptName:"内分泌科",
          drPhoto:"https://pic.wenwo.com/fimg/225564196_120.jpg",
          drTitles:"助理医师",
          drUserId:"5a211935e4b0ed39804fc7c6",
          drUserName:"女性健康1",
          drName:"皮肤科2",
          id:"5ad54d5284aea9b5017a490e",
          picName:tools.getAvater(),
          publishTime:"1523928439622",
          readCount:"9",
          trueReadCount:"9",
          trueReadCountPv:"0",
        };
        item.drUserName=`[页码${params.pageIndex}]女性健康`;
        item.drPhoto=tools.getAvater();
        item.picName=tools.getAvater();
        item.title=params.id+"切记 经期来了7种药不能乱吃"+((parseInt(params.pageIndex)-1)*10+o);
        items.push(item);
      }
      return items;
    },
  },
  {
    url: "/awyh/articleIndex/getScienceByPage",
    method: "POST",
    handleEvent: function (params, query) {
      var items = [];
      for (let i = 0; i < 10; i++) {
        var item = {
          id: "5474401051f9d811d1ed29f6",
          title: params.departId + "照射胸部的病人进食时为什么会出现下咽疼痛?",
          readCount: "21",
          trueReadCountPv: "0",
          picName: tools.getAvater(),
          contentType: "5",
          trueReadCount: "21",
          drUserId: "5848f9d70a09a061b9d42abe",
          drUserName: "石敏" + params.pageIndex,
          drPhoto: tools.getAvater(),
          drTitles: "副主任医师" + i,
          deptName: "小儿外科",
          deptId: "10402",
        };
        items.push(item);
      }
      return items;
    },
  },
  {
    url: "/awyh/subject/home/column",
    method: "POST",
    mockdata:(
      function(){
        var items = [
          {
            id: "1111",  //columnId: "1111"
            channelId: "1222",
            columnName: "女性健康",
            columnDescribe:"专注女性身心健康的专题栏目",
            columnPic: tools.getAvater(),
          },
          {
            id: "1112",
            channelId: "1222",
            columnName: "男性健康",
            columnDescribe:"专注男性身心健康的专题栏目",
            columnPic: tools.getAvater(),
          },
          {
            id: "1113",
            channelId: "1222",
            columnName: "孕产课堂",
            columnDescribe:"专注男性身心健康的专题栏目",
            columnPic: tools.getAvater(),
          },
          {
            id: "1114",
            channelId: "1222",
            columnName: "育儿指南",
            columnDescribe:"专注男性身心健康的专题栏目",
            columnPic: tools.getAvater(),
          },
          {
            id: "1115",
            channelId: "1222",
            columnName: "大话用药",
            columnDescribe:"专注男性身心健康的专题栏目",
            columnPic: tools.getAvater(),
          },
          {
            id: "1116",
            channelId: "1222",
            columnName: "心理健康",
            columnDescribe:"专注男性身心健康的专题栏目",
            columnPic: tools.getAvater(),
          },
          {
            id: "1117",
            channelId: "1222",
            columnName: "整形美容",
            columnDescribe:"专注男性身心健康的专题栏目",
            columnPic: tools.getAvater(),
          },
          {
            id: "1118",
            channelId: "1222",
            columnName: "中医养生",
            columnDescribe:"专注男性身心健康的专题栏目",
            columnPic: tools.getAvater(),
          },
          {
            id: "1119",
            channelId: "1222",
            columnName: "健康指南",
            columnDescribe:"专注男性身心健康的专题栏目",
            columnPic: tools.getAvater(),
          }
        ];
        return items;
      }
      )()
  },
  {
    url: "/awyh/subject/home/hotrecommend",
    method: "POST",
    handleEvent: function(params,query) {
      var items=[];
      var item0={
        id:"513",
        title:"0在医院看病，如何向医生正确清晰地描述你的症状",
        imgUrl:"https://pic.wenwo.com/fimg/854572784.jpg",
        columnId:"1112"
      };
      items.push(item0);
      for (var i = 0; i <8; i++) {
        var item={
          id:"513",
          title:i+1+"我是最热推荐标题我是最热推荐标题我是最热推荐标题我是最热推荐标题",
          imgUrl:"https://pic.wenwo.com/fimg/854572784.jpg",
          columnId:"1112"
        };
        item.imgUrl=tools.getAvater();
        items.push(item);
      }
      return items;
    },
  },
  {
    url: "/awyh/subject/home/singlecolumn",
    method: "POST",
    handleEvent: function(params,query) {
      var items=[];
      for (var i = 0; i <5; i++) {
        var item={
          id:"513",
          title:"男性健康男性健康男性健康男性健康男性健康",
          imgUrl:"https://pic.wenwo.com/fimg/854572784.jpg",
          columnId:"1113"
        };
        item.imgUrl=tools.getAvater();
        items.push(item);
      }
      return items;
    },
  },
  {
    url: "/awyh/subject/home/allsubject",
    method: "POST",
    handleEvent: function(params,query) {

      var items=[];
      for (var i = 0; i <14; i++) {
        var item={
          id:"513",
          title:"全全全部部部全全全部部部全全全部部部",
          imgUrl:"https://pic.wenwo.com/fimg/225564196_120.jpg",
          columnId:"1114"
        };
        items.push(item);
      }
      return items.slice(params.pageNum*(params.curpage-1),params.pageNum*params.curpage);
    }
  },
  {
    url: "/awyh/subject/home/choosecolumn",
    method: "POST",
    handleEvent: function (params, query) {
      var items = [];
      for (let i = 0; i < 14; i++) {
        var item = {
          id: "513",
          title: params.columnId + "你好"+(i+1)+"，根据你说的情况诊断考虑大概可应该是不用太担心，首先确定下现在的状态自身是否承受不了担心的就按等级我去你家。",
          imgUrl: tools.getAvater(),
          columnId: "1115"
        };
        items.push(item);
      }
      if(params.selectType==1){
        return items.slice(params.pageNum*(params.curpage-1),params.pageNum*params.curpage);
      }else if(params.selectType==2){
        return items.reverse().slice(params.pageNum*(params.curpage-1),params.pageNum*params.curpage);
      };
    }
  },
  {
    url: "/awyh/articleIndex/getScienceChannels",
    method: "POST",
    mockdata: (
      function () {
        var items = [];
        for (var i = 0 ; i < 4 ; i++) {
          var item = {
            channelId: "",
            channelName: "男女保健",
            channelSort: "",
            channelStatus: "",
            columnInfo: [
              {
                columnId: "1111",
                columnName: "女性健康",
                columnPic: tools.getAvater(),
              },
              {
                columnId: "1112",
                columnName: "男性健康",
                columnPic: tools.getAvater(),
              }
            ],
          };
          items.push(item);
        };
        return items;
      }
    )()
  },
  {
    url: "/awyh/articleIndex/getAnalysisByPage",
    method: "POST",
    handleEvent: function (params, query) {
      var items = [];
      for (let i = 0; i < 10; i++) {
        var item = {
          id: "5474401051f9d811d1ed29f6",
          questionId: "问题ID",
          ucontent: params.departId + "照射胸部的病人进食时为什么会出现下咽疼痛?",
          postTime: "提问时间",
          uPic: tools.getAvater(),
          answerTime: "回答时间",
          acontent: "医生回答问题内容",
          departId: "10402",
          departName: "小儿外科",
          drUserId: "文章作者ID",
          drUserName: "石敏" + params.pageIndex,
          drPhoto: tools.getAvater(),
          drTitles: "副主任医师" + i
        };
        items.push(item);
      }
      return items;
    },
  }
];

var tools = require("../tools.js");
module.exports=[
  {
    url:"/community/commonwealQuestion/qryHomeAct",
    method:"POST",
    mockdata:(
        function(){
          var item={
            id: "59b25f2684aed84b755044aa",
            actType: "#爱医日#",
            title: "心理有问题，我式应该去看心里",
            createTime: "2017-11-12 08:00:00"
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
    url:"/community/commonwealQuestion/qryHomeQues",
    method:"POST",
    mockdata:(
        function(){
          var items=[];
          for (var j = 0; j <5; j++) {
            var item={
              qid: "59b25f2684aed84b755044aa",
              actType: "#爱医日#",
              circleId: "59b25f2684aed84b755044aa",
              title: "心理有问题，我式应该去看心里",
              status: tools.rand(0,3),
              circleName: "风湿科圈",
              createTime: "2017-11-13 08:00:00"
            };
            items.push(item);
          }
          return items;
        }
      )()
  },
  {
    url:"/community/u/qryInfo",
    method:"POST",
    mockdata:(
        function(){
          var items={
            "id": "59e071d884aeca351b98d26c",
            "nickName": "明天的幸福彩虹",
            "faceImage": "http://tva3.sinaimg.cn/crop.0.0.720.720.50/e05f2787jw8eejjjhtk5ej20k00k0mzl.jpg",
            "gender": "女",
            "topic": 5,
            "reply": 22,
            "posts": 27,
            "circles": 6,
            "followUsers": 0,
            "fansUsers": 2,
            "province": "江西",
            "city": "南昌",
            "isFollow": tools.rand(0,1),
            "favorites": null,
            "phoneNumber": "13106549642",
            "isNickEdited": 1,
            "memberType": 1,
            "status": "normal",
            "credit": 268,
            "level": 1,
            "experience": 89
          };
          return items;
        }
      )()
  },
  {
    url:"/community/privateLetter/msgUnReadNumberTotal",
    method:"POST",
    mockdata:tools.rand(0,100)
  },
  {
    url:"/community/sys/qryCodeAndMsg",
    method:"post",
    mockdata:{}
  },
  {
    url:"/community/u/messagData",
    method:"post",
    mockdata:tools.rand(0,150)
  },
  {
    url:"/community/u/home/qryInfo",
    method:"post",
    mockdata:{
      "id": "581454e89cb4a342bcd8fe87",
      "nickName": "伊楼908",
      "faceImage": tools.getAvater(),
      "gender": "男",
      "topic": 48,
      "reply": 126,
      "posts": 174,
      "circles": 10,
      "followUsers": 5,
      "fansUsers": 4,
      "province": "广东",
      "city": "深圳",
      "isFollow": null,
      "favorites": 8,
      "phoneNumber": "13560181591",
      "isNickEdited": 1,
      "memberType": 2,
      "status": "normal",
      "credit": 2869,
      "level": 1,
      "experience": 279
    }
  }
];

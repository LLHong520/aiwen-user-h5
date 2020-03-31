var tools = require("../tools.js");
module.exports=[
  {
    url:"/awyh/lesson/latestLesson",
    method:"POST",
    mockdata:(
      function(){
        var items=[];
        for (var i = 0; i <5; i++) {
          var item={
            "id": "5a93b44484aea3b769a3c0f1",
            startTime: "1519797080479",
            endTime: "1519797080479",
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
    url:"/awyh/video/doc/latest",
    method:"POST",
    mockdata:(
      function(){
        var items=[];
        for (var i = 0; i <5; i++) {
          var item={
            "id": "5a93b44484aea3b769a3c0f1",
            readCount: tools.rand(0,3),
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
    url:"/awyh/lesson/home",
    method:"POST",
    mockdata:(
      function(){
        var items=[];
        for (var i = 0; i <5; i++) {
          var item={
            id:"5acdbc7fe4b04e2e8ba3320a",
            image:"204433677",
            status:"2",
            title:"我的人生是不是很好"+i
          };
          items.push(item);
        }
        return items;
      }
    )()
  },
];

var tools = require("../tools.js");
module.exports=[
  {
    url:"/awyh/activity/newHomeActivity",
    method:"POST",
    mockdata:{
      latest:[
        	{
        	  "id":"165485",
        	  "activityType":tools.rand(0,1),
        	  "activityStatus":tools.rand(0,1),
        	  "image":tools.getAvater(),
        	  "enrolment":66,
        	  "startTime":"2017-12-12 10:00",
          	  "endTime":"2018-1-1 09:00",
          	  "invitedGuest":"受邀嘉宾：徐毅",
          	  "createTime":"2017-10-10 08:00",
          	  "title":"本次活动标题查看监控",
          	  "sourcesType":"来自于拜访丁海峰刚交话费看坎坎坷坷"
        	},
        	{
        	  "id":"14894984",
        	  "activityType":tools.rand(0,1),
        	  "activityStatus":tools.rand(0,1),
        	  "image":tools.getAvater(),
        	  "enrolment":88,
        	  "startTime":"2017-12-12 10:00",
          	  "endTime":"2018-1-1 09:00",
          	  "invitedGuest":"受邀嘉宾：从第三个人",
          	  "createTime":"2017-10-10 08:00",
          	  "title":"本次活动和田玉江汉油田标题查看监控",
          	  "sourcesType":"来自于拜访给他任何丁海峰刚交话费看坎坎坷坷"
          	}
      ],
      commonweal:[
        {
          "id":"14894984",
        	  "activityStatus":tools.rand(0,2),
        	  "image":tools.getAvater(),
        	  "enrolment":188,
        	  "startTime":"2017-12-12 10:00",
          	  "endTime":"2018-1-1 09:00",
          	  "createTime":"2017-10-10 08:00",
          	  "title":"本次活动和田玉江汉油田标题查看监控",
          	  "sourcesType":"来自于拜访给他任何丁海峰刚交话费看坎坎坷坷",
          	  "invitedGuest":"受邀嘉宾：从第三个人",
        },
        {
          "id":"1484",
        	  "activityStatus":tools.rand(0,2),
        	  "image":tools.getAvater(),
        	  "enrolment":188,
        	  "startTime":"2017-12-12 10:00",
          	  "endTime":"2018-1-1 09:00",
          	  "createTime":"2017-10-10 08:00",
          	  "title":"本次活动和田玉江汉油田标题查看监控",
          	  "sourcesType":"来自于拜访给他任何丁海峰刚交话费看坎坎坷坷",
          	  "invitedGuest":"受邀嘉宾：从第三个人",
        },
      ],
      Interview:[
        {
          "id":"14894324",
        	  "startTime":"2017-12-12 10:00",
          	  "endTime":"2018-1-1 09:00",
          	  "invitedGuest":"1受邀嘉宾：从第三个人",
          	  "createTime":"2017-10-10 08:00",
          	  "title":"本次活动和田玉江汉油田标题查看监控",
          	  "sourcesType":"来自于拜访给他任何丁海峰刚交话费看坎坎坷坷",
          	  "activityStatus":tools.rand(0,2),
        },
        {
          "id":"14824",
        	  "startTime":"2017-12-12 10:00",
          	  "endTime":"2018-1-1 09:00",
          	  "invitedGuest":"2受邀嘉宾：从第三个人",
          	  "createTime":"2017-10-10 08:00",
          	  "title":"本次活动和田玉江汉油田标题查看监控",
          	  "sourcesType":"来自于拜访给他任何丁海峰刚交话费看坎坎坷坷",
          	  "activityStatus":tools.rand(0,2),
        },
      ],
      subject:[
        {
          "id":"14894984",
			  "title":"1本次活动和田玉江汉油田标题查看监控",
          	  "sourcesType":"来自于拜访给他任何丁海峰刚交话费看坎坎坷坷",
          	  "image":tools.getAvater(),
        },
        {
          "id":"1489",
			  "title":"2本次活动和田玉江汉油田标题查看监控",
          	  "sourcesType":"来自于拜访给他任何丁海峰刚交话费看坎坎坷坷",
          	  "image":tools.getAvater(),
        },
      ]
    }
  },

];

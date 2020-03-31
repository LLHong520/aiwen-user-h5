var tools = require("../tools.js");
module.exports = [
  {
    url: "/awyh/media/getMediaVideoInfoById",
    method: "POST",
    mockdata: {
      "followCtrl": null,
      "addWeiboId": "2243860187",
      "sourceType": "",
      "isFocus": false,
      "likeCount": 0,
      "publishTime": "2018-09-04 16:52:11",
      "readCount": 329,
      "videoUrl": "http://dev.v.wenwo.com/17619/17777/facec4d72de7a698555d8589d07b5db5.mp4",
      "addWeiboNickName": "腾讯视频168",
      "normalTime": "40",
      "bussinessTime": "15",
      "favorite": false,
      "like": false,
      "id": "5b8d651de4b02941ad7ef032",
      "content": "远望可以治疗近视吗",
      "isDestroy": false,
      "title": "远望可以治疗近视吗",
      "seriesName": "眼睛疼到治疗方法",
      "doctorId": "5abc4a6c84ae5c125484a484",
      "videoId": "5b8d64a2e4b02941ad7ef027",
      "login": false,
      "picName": "https://pic.wenwo.com/fimg/768815493.jpg",
      "subjectList": [],
      "seriesId": "5b8d39ede4b029ed45f8fce5",
      "sourceBusinessId": ""
    }
  },
  {
    url: "/awyh/media/mediaUserInfo",
    method: "POST",
    mockdata: {
      "id": "595f0084e4b0ec5c87f9aade",
      "mediaName": "85测试个人自",
      "mediaCategory": "1",
      "strategyGrade": "MEDIA_B",
      "provName": "广东",
      "provId": "2",
      "cityName": "东莞",
      "cityId": "2920",
      "logo": "21049109",
      "describe": "85测试个人自媒体",
      "headPhoto": null,
      "operateName": "测试环境",
      "operatePhone": "15347743116",
      "operateTelephone": null,
      "operateMail": "djffj",
      "auditStatus": "Y",
      "authenticationDate": 1499407434552,
      "checkDate": 1499407434552,
      "checkUserId": "305",
      "checkUserName": "刘志龙",
      "checkReason": null,
      "userGroup": {
        "weixinInfo": null,
        "weiboInfo": {
          "opendUid": "3232",
          "nickName": null,
          "photoPicURL": null,
          "address": null,
          "verifiedType": null,
          "weiboFansNum": null,
          "idolNum": null,
          "weiboProfile": null,
          "weiboTags": null,
          "verifiedReason": null
        },
        "qqInfo": null
      },
      "assistantName": null,
      "assistantId": null,
      "weiboVAuth": {
        "weiboApproveNickName": null,
        "weiboApproveId": null,
        "weiboApproveContext": null,
        "weiboApproveDate": null,
        "certificationAuditSource": null,
        "approveStatus": "I",
        "approveInfomation": null,
        "weiboReason": null,
        "orgOfficialLetters": null
      },
      "personalAttest": {
        "identityId": "888888888888888888",
        "identityCardPics": [
          "48922110",
          "54391111"
        ],
        "workProvePics": [
          "58085112"
        ],
        "otherPics": []
      },
      "mechanismAttest": null,
      "firstBoot": null,
      "statusMap": null,
      "createDate": 1499398277456,
      "createUserId": "305",
      "createUserName": "刘志龙",
      "lastLoginIp": null,
      "lastLoginTime": null,
      "dataSource": null,
      "lastLoginForm": null,
      "completeTaskRate": 0,
      "blacklistStatus": "0",
      "configInfo": {
        "taskServiceStatus": 0
      },
      "orgOfficialLetterList": null,
      "identityCardPicList": null,
      "workProvePicList": null,
      "orgPaperList": null,
      "otherPicList": null
    }
  },
  {
    url: "/awyh/media/getMediaVideoCommentByPspId",
    method: "POST",
    mockdata: (
      function () {
        var items = [];
        for (var i = 0; i < 5; i++) {
          var item = {
            "commentNum": 1,
            "content": "1",
            "id": "59b20636d12c34a251d23d75",
            "pspId": "",
            "bType": 3,
            "sourceForm": "M",
            "toUserId": null,
            "nickName": "aiwen8869519",
            "headPhoto": "https://pic.wenwo.com/fimg/621121650.jpg",
            "toNickName": null,
            "fromUserId": "59a3e64784ae7e9ad6b35132",
            "userType": "USER"
          };
          items.push(item);
        }
        return items;
      }
    )()
  },
  {
    url: "/awyh/media/addMediaVideoLike",
    method: "POST",
    mockdata: true
  },
  {
    url: "/awyh/media/addMediaVideoFavorites",
    method: "POST",
    mockdata: true
  },
  {
    url: "/awyh/media/delMediaVideoFavorites",
    method: "POST",
    mockdata: true
  },
  {
    url: "/awyh/media/saveMediaVideoCommen",
    method: "POST",
    mockdata: true
  },
];

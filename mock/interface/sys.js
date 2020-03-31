var tools = require("../tools.js");
module.exports = [
  {
    url: "/weixin/v1/getJsApiTick",
    method: "POST",
    mockdata: {
      appId: "4444",
      timestamp: "4444",
      nonceStr: "4444",
      signature: "4444",
    }
  },
  {
    url: "/awyh/weiboShare/feed",
    method: "POST",
    mockdata: true
  },
  {
    url: "/awyh/friendships/focusAndsaveDataFans",
    method: "POST",
    mockdata: true
  },
  {
    url: "/awyh/friendships/focusAndsaveDataFansToActivity",
    method: "POST",
    mockdata: true
  },
  {
    url: "/awyh/friendships/cancelfocus",
    method: "POST",
    mockdata: true
  },
];

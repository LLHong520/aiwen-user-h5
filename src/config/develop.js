/*api联调配置*/
const YY_BASE_URL = "http://localhost:3033/zt";
const configs = {
  API_URL:"/api",
  LOGIN_URL: "https://health.sina.cn/awyh",
  APP_URL: "https://health.sina.cn/zt",
  PIC_URL:"https://pic.wenwo.com/fimg/",//图片路径修复
  SUB_FIX:".jpg",//图片后缀
  YY_BASE_URL,
  FORUM_URL:YY_BASE_URL,//社区链接地址
  USER_CENTER_URL:YY_BASE_URL+"/mine",//用户个人中心连接
  MOMENT_URL: YY_BASE_URL + "/m/", //圈子详情
  IWEN_COMTY_ID: ["5d2fcff0b9d82100087747d2"] //社区id
};
export default  configs;

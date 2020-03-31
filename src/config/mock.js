/*前端开发配置*/
const YY_BASE_URL = "http://localhost:3009/forum";
const configs = {
  API_URL:"/mapi",
  APP_URL: "https://health.sina.cn/zt",
  LOGIN_URL: "https://health.sina.cn/awyh",
  PIC_URL:"https://pic.wenwo.com/fimg/",//图片路径修复
  SUB_FIX:".jpg",//图片后缀
  YY_BASE_URL,
  FORUM_URL:YY_BASE_URL,//社区链接地址
  USER_CENTER_URL:YY_BASE_URL+"/mine",//用户个人中心连接
  MOMENT_URL:YY_BASE_URL+"/m/"//用户个人中心连接
};
export default  configs;

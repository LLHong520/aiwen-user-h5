import mock from "./mock";//前端开发
import develop from "./develop";//对接api
import dev from "./dev";//对接api
import test from "./test";//测试配置
import production from "./production";//生产配置

// const env = "mock";
const env = "develop";
// const env = "dev";
//const env = "test";
// const env = "production";
const envConfigs = {mock,develop,test,dev,production};

export const API_URL= envConfigs[env].API_URL;
export const LOGIN_URL=envConfigs[env].LOGIN_URL;
export const APP_URL=envConfigs[env].APP_URL;
export const PIC_URL = envConfigs[env].PIC_URL;//图片路径修复
export const SUB_FIX = envConfigs[env].SUB_FIX;//图片后缀
export const YY_BASE_URL = envConfigs[env].YY_BASE_URL;
export const FORUM_URL = envConfigs[env].FORUM_URL;//社区链接地址
export const USER_CENTER_URL = envConfigs[env].USER_CENTER_URL;//用户个人中心连接
export const MOMENT_URL = envConfigs[env].MOMENT_URL;//圈子详情
export const IWEN_COMTY_ID = envConfigs[env].IWEN_COMTY_ID; //爱问社区id


export const LINK_CARD_BASE_URL = "https://health.sina.cn"; //linkcard基础链接
export const YK_URL = "https://health.sina.cn"; //医康基础链接
export const YK_BASE_URL = "https://health.sina.cn"; //医康基础链接
export const DOC_CONSULT_URL = YK_URL+"/consult/index?drId=";//医生咨询基础链接
export const DOC_ORDER_URL = YK_URL+"/outpatient/doctorOutpatientList/";//医生预约基础链接
export const DOC_DESC_URL = YK_URL+"/doctor/doctorIntroduce?docId=";//医生简介基础链接
export const CW_ACT = YK_URL+"/commonwealActivity/detail/";//公益活动基础链接
export const CW_ACT_Index = YK_URL+"/commonwealActivity/detail/";//公益活动主页链接
export const COMTY_BASE_URL = "https://health.sina.cn/c/?comtyId=";
export const COMTY_URL = "https://health.sina.cn/c/";
export const FORUM_BASE_URL = "https://health.sina.cn/forum"; //愈言社区基础链接
export const OUTER_LINKS ={
  subscribeIndex:YK_URL+"/index",
  recommenrIndex:YK_URL+"/index?card=1",
  dairyIndex:YK_URL+"/index?card=2",
  scienceIndex:YK_URL+"/index?card=3",
  patientIndex:YK_URL+"/index?card=4",
  caseIndex:YK_URL+"/index?card=5",
  subjectIndex:YK_URL+"/index?card=6&swiper_num=7",
  courseIndex:YK_URL+"/index?card=7",
  videoIndex:YK_URL+"/index?card=8",
  courseDetails:YK_URL+"/lesson/intro/",
  activityIndex:YK_URL+"/commonwealIndex/index",
  weiTalkIndex:YK_URL+"/weiTalkIndex/index",
  weiTalkDetail:YK_URL+"/weiTalkDetail/detail/",
  consultDetail:YK_URL+"/article/conAnalysis/",
  subjectDetail:YK_URL+"/popSubject/detail/",//专题详情

  serviceList:YK_URL+"/personal/service",
  //医生部分
  docConsult:YK_URL+"/consult/index?drId=",
  docOrder:YK_URL+"/outpatient/doctorOutpatientList/",
  docAchievement:YK_URL+"/doctor/achievement/",

  //社区部分
  forumIndex:YY_BASE_URL,
  momentDetails:FORUM_BASE_URL+"/m/",
  topicDetails:FORUM_BASE_URL+"/t/",
  userDetails:FORUM_BASE_URL+"/u/",
  userCenter:FORUM_BASE_URL+"/mine",

};

export const MY_LINKS = {
  service: YK_URL + "/personal/service",
  feedback: YK_URL + "/personal/feedback",
  // registration: YK_URL + "/userRegister/registrationClause",
  doctor: YK_URL + "/personal/doctor",
  download: "https://www.wenwo.com/jump/app/download.html",
  editUserInfo: YK_URL + "/userAuth/userCenter/index?callBackUrl=" + encodeURIComponent("https://health.sina.cn/zt/home"),
};
export const DOC_BASE_URL = YK_URL + "/zt/doc/"; //医生主页基础链接

export const COURSE_DETIALS_URL = YK_BASE_URL+"/lesson/intro/";//课程介绍基础链接
export const SERAL_COURSE_DETIALS_URL = YK_BASE_URL+"/serial/intro/";//系列课主页基础链接

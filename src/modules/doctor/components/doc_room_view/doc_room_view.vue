<template>
  <layout class="doc-info-page" :isRoomView="true" :isShowNav="isShowNav">
    <!-- page_container -->
    <div slot="page_container" class="app_wrapper_inner">
      <!-- <conHeader :title="docInfo.realName+'的诊室'">
      <span class="retrun" slot='left'>
        <b class="white"></b>
        </span>
        <span class="placeholder" slot='right'>
          <i class="icon icon-share"></i>
        </span>
      </conHeader>-->
      <div class="view_tip">
        <em></em>该页面仅支持预览
      </div>
      <div class="doc_card_bg"></div>
      <div class="doc_card">
        <div class="doc_share" v-if="docInfo.weiboNickName||docInfo.weixin">
          <a href="javascript:void(0);" class="wb" v-if="docInfo.weiboNickName"></a>
          <span class="line" v-if="docInfo.weiboNickName&&docInfo.weixin">|</span>
          <a href="javascript:;" class="wx" v-if="docInfo.weixin" @click="toogleWxCode"></a>
        </div>
        <div class="doc_info">
          <div class="doc_img">
            <img :src="GET_IMG_URL(docInfo.photo,'doc')">
            <span class="num" v-if="achievement>0">已服务{{achievement}}次</span>
            <em v-if="achievement>0">
              <a href="javascript:void(0);"></a>
            </em>
          </div>
          <dl :class="{'nopt':achievement>=0}">
            <dt>
              <a href="javascript:void(0);" class="name">{{docInfo.realName}}</a>
              &nbsp;&nbsp;&nbsp;&nbsp;{{docInfo.titles}}
            </dt>
            <dd>{{docInfo.workUnit}}&nbsp;&nbsp;&nbsp;&nbsp;{{docInfo.departments}}</dd>
          </dl>
        </div>
        <!-- 擅长领域 start -->
        <a href="javascript:void(0);" v-if="docInfo.areasOfExpertise||docInfo.illnessTags.length>0">
          <div class="good_at" v-if="docInfo.areasOfExpertise">擅长领域：{{docInfo.areasOfExpertise}}</div>
          <div v-if="docInfo.illnessTags.length>0" class="good_at">擅长疾病：{{illnessTagsText}}</div>
        </a>
        <!-- 擅长领域 end -->
        <!-- 医生图文咨询  门诊预约 电话咨询等信息 -->
        <div class="service_list clearfix">
          <div class="service_item">
            <a href="javascript:;">
              <img src="./images/clinic_icon_consult@2x.png" width="34" alt="">
              <dl>
                <dt>图文咨询</dt>
                <dd v-if="!docInfo.advice">
                  <span class="gray" >未开通</span>
                </dd>
                <dd v-else>
                  <div v-if="!docInfo.nowsuspendService">
                    <div v-if="!this.docInfo.qCaps > 0"><!--没有名额-->
                      <span class="gray">今日名额已用完</span>
                    </div>
                    <div v-else><!--有名额-->
                      <div>
                        <span class="blue">¥{{docInfo.qPrice}}</span>
                      </div>
                    </div>
                  </div>
                  <span class="gray" v-else>暂停服务</span>
                </dd>
              </dl>
            </a>
          </div>
          <div class="service_item" v-if="!VX_isInSinaHealthApp&&!VX_isSinaHealthAppForceIng">
            <div>
              <a href="javascript:;">
                <img src="./images/clinic_icon_phone@2x.png" width="34" alt="">
                <dl>
                  <dt>电话咨询</dt>
                  <dd>
                    <span class="blue" v-if="phoneSetting.status=='10001'&&phoneSetting.remainSource>0">¥{{phoneSetting.charge}}/{{phoneSetting.serviceTime}}分钟</span>
                    <span class="gray" v-else-if="phoneSetting.status=='10001'&&phoneSetting.remainSource<=0">今日名额已用完</span>
                    <span class="gray" v-else>未开通</span>
                  </dd>
                </dl>
              </a>
            </div>
          </div>
          <div class="service_item">
            <a href="javascript:;">
              <img src="./images/clinic_icon_order@2x.png" width="34" alt="">
              <dl>
                <dt>门诊预约</dt>
                <dd>
                  <div v-if="!docInfo.register==1">
                    <span class="gray">未开通</span>
                  </div>
                </dd>
              </dl>
            </a>
          </div>

        </div>
        <!-- 医生图文咨询  门诊预约 电话咨询等信息 end-->

        <!-- 互动记录入口 start-->
        <div class="toRecordList" v-if="(orderList||[]).length>0">
          <a href="javascript:;"><em></em>你与{{docInfo.realName}}医生的互动记录</a>
        </div>
        <!-- 互动记录入口 end-->
      </div>
      <empty-place-holder title="暂无内容" v-if="isDoctorEmpty"></empty-place-holder>
      <div class="activity_slide" v-if="activityList.length>0">
        <swiper :options="swiperOption2" class="video_container" ref="mySwiper">
          <swiper-slide v-for="(item,index) in activityList" :key="index" v-if="index<10">
            <div class="activity_item">
              <div class="activity_hd">
                <em class="icon_activity"></em>
                <span class="blue" v-if="item.activityType=='0'">公益咨询</span>
                <span class="blue" v-if="item.activityType=='1'">在线访谈</span>
                <span class="blue" v-if="item.activityType=='2'">在线课堂</span>
                ：{{item.title}}
              </div>
              <div class="activity_img">
                <span class="state" v-if="item.activityStatus=='0'">火热进行中</span>
                <span class="state" v-if="item.activityStatus=='1'">报名中</span>
                <a href="javascript:void(0);" v-if="item.activityType=='2'">
                  <img :src="GET_IMG_URL(item.image,'slide')" alt />
                </a>
                <a href="javascript:void(0);" v-else-if="item.activityType=='1'">
                  <img :src="GET_IMG_URL(item.image,'slide')" alt />
                </a>
                <a href="javascript:void(0);" v-else-if="item.activityType=='0'">
                  <img :src="GET_IMG_URL(item.image,'slide')" alt />
                </a>
                <p>活动时间：{{item.startTime|dataFormat}} — {{item.endTime|dataFormat}}</p>
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <!-- 最新动态 -->
      <template>
        <div
          class="box_wrapper news_list"
          :class="{'top10':activityList.length>0}"
          v-if="latestArticles.length>0"
        >
          <div class="common_hd">
            <h3>最新动态</h3>
            <a href="javascript:void(0);" class="toMore"></a>
          </div>
          <div class="common_bd">
            <div class="sliderWrapper">
              <ul ref="sliderNews">
                <li v-for="(elem,index) in latestArticles" :key="index">
                  <p>
                    <a href="javascript:vod(0);">{{elem.content}}</a>
                  </p>
                  <span>{{elem.time}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
      <!-- 最新动态 end -->
      <!-- 荣誉勋章 -->
      <div class="box_wrapper top10 prise_box" v-if="(doctorMedals||[]).length>0">
        <div class="common_hd">
          <h3>荣誉勋章</h3>
          <a href="javascript:;" class="toMore"></a>
        </div>
        <div class="common_bd">
          <swiper :options="swiperOption3" class="video_container" ref="mySwiper3">
            <swiper-slide ref v-for="(item,index) in doctorMedals" :key="index">
              <a href="javascript:;">
                <div class="honor_card honor_card1" v-if="item.medalType=='10100'">
                  <!--年度全站-->
                  <p>{{item.medalName}}</p>
                </div>
                <div class="honor_card honor_card2" v-else-if="item.medalType=='10101'">
                  <!--年度科室-->
                  <p>{{item.medalName}}</p>
                </div>
                <div class="honor_card honor_card3" v-else-if="item.medalType=='10300'">
                  <!--月度全站-->
                  <p>{{item.medalName}}</p>
                </div>
                <div class="honor_card honor_card4" v-else-if="item.medalType=='10301'">
                  <!--月度科室-->
                  <p>{{item.medalName}}</p>
                </div>
                <div class="honor_card" v-else>
                  <!--其他-->
                  <p>{{item.medalName}}</p>
                </div>
              </a>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <!-- 荣誉勋章 end -->
      <!-- 个人成就 -->
      <div class="box_wrapper top10 prise_box" v-if="achievementList.length>0">
        <div class="common_hd">
          <h3>个人成就</h3>
          <a href="javascript:;" class="toMore"></a>
        </div>
        <div class="common_bd">
          <swiper :options="swiperOption1" class="video_container" ref="mySwiper1">
            <swiper-slide v-for="(item,index) in achievementList" :key="index">
              <a href="javascript:;">
                <div class="prise_card">
                  <dl v-if="item.type==0">
                    <dt>·荣誉头衔·</dt>
                    <dd>{{item.data}}</dd>
                  </dl>
                  <dl v-if="item.type==1">
                    <dt>·获得奖项·</dt>
                    <dd>{{item.data.date}}&nbsp;{{item.data.name}}</dd>
                  </dl>
                  <dl v-else-if="item.type==2">
                    <dt>·科研成果·</dt>
                    <dd>{{item.data.name}}</dd>
                  </dl>
                  <dl v-else-if="item.type==3">
                    <dt>·发表作品·</dt>
                    <dd>{{item.data.date}}&nbsp;{{item.data.name}}</dd>
                  </dl>
                </div>
              </a>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <!-- 个人成就 end -->
      <!-- 患者评价 -->
      <div class="box_wrapper top10" v-if="comments.length>0">
        <div class="common_hd">
          <h3>患者评价</h3>
          <span class="toMore"></span>
        </div>
        <div class="common_bd">
          <div class="point_tj">
            <dl>
              <dt>{{commontsInfo.total}}</dt>
              <dd>用户评价</dd>
            </dl>
            <dl>
              <dt>
                <span class="blue">{{docInfo.grade}}</span>
              </dt>
              <dd>好评率</dd>
            </dl>
            <dl>
              <dt>{{parseInt(docInfo.recoveryRate)}}%</dt>
              <dd>24小时回复率</dd>
            </dl>
          </div>
          <div
            class="point_card"
            v-for="(comment,index) in comments"
            :key="comment.index"
            v-if="index<1"
          >
            <div class="point_author">
              <span class="img">
                <img v-lazy="GET_IMG_URL(comment.headImg,'u')" alt>
              </span>
              <span class="name">{{comment.nickname | hideName}}</span>
              <div class="docase_star">
                <span :class="{'light':comment.stars>0}"></span>
                <span :class="{'light':comment.stars>1}"></span>
                <span :class="{'light':comment.stars>2}"></span>
                <span :class="{'light':comment.stars>3}"></span>
                <span :class="{'light':comment.stars>4}"></span>
              </div>
              <span class="time">{{comment.contentTime}}</span>
            </div>
            <div class="point_cont">{{comment.content||"默认好评"}}</div>
          </div>
        </div>
      </div>
      <!-- 患者评价 end -->
      <!-- 咨询案例 -->
      <section>
        <div class="box_wrapper top10" v-if="consultList.length>0">
          <div class="common_hd">
            <h3>咨询案例</h3>
            <span class="toMore"></span>
          </div>
          <div class="common_bd">
            <div
              class="case_item"
              v-for="(elem,index) in consultList"
              :key="elem.index"
              v-if="index<1"
            >
              <div class="item_ask">
                <em class="icon_ask">问</em>
                <div class="txt">{{(elem.question.questionContent||"")|removeHtmlTag}}</div>
              </div>
              <div class="item_answer">
                <div class="img">
                  <img :src="GET_IMG_URL(elem.answer.docHeadImg,'doc')" alt>
                </div>
                <div class="txt">{{(elem.answer.answerContent||"")|removeHtmlTag}}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 咨询案例 end -->
    </div>
    <!-- /page_container -->
    <!-- page_footer -->
    <div slot="page_footer">
      <loading-page v-show="initing_page"></loading-page>
      <alertTip
        v-show="show_alert_tip"
        ref="alertTip"
        alertText="该医生诊室已注销！"
        confirmText="我知道了"
        @closeTip="closeTipHandler"
      ></alertTip>
    </div>
    <div slot="page_layer">
      <!-- 微信二维码 -->
      <div class="ewm" v-show="showWxCode">
        <div class="layer_ewm">
          <dl>
            <dt>
              <img :src="GET_IMG_URL(docInfo.photo,'doc')" width="50" height="50" alt>
            </dt>
            <dd>{{docInfo.weixin||"公众号名称"}}</dd>
          </dl>
          <div class="ewm_box">
            <img :src="GET_IMG_URL(docInfo.weixinCard,'s')" alt>
            <p>扫一扫 关注公众号</p>
          </div>
          <a href="javascript:;" class="close" @click="toogleWxCode"></a>
        </div>
        <div class="shadow" @click="toogleWxCode"></div>
      </div>
      <!-- /微信二维码 -->
    </div>
  </layout>
</template>
<script>
import platformLogin from "@/common/platformFn";
import loadingBtn from "@/components/loading-btn/loading-btn";
import {
  CW_ACT,
  LINK_CARD_BASE_URL,
  MOMENT_URL,
  FORUM_URL,
  APP_URL,
  DOC_CONSULT_URL,
  DOC_DESC_URL
} from "@/config";
import Header from "@/components/header/Header";
import conHeader from "@/components/con-header-doctor/con-header-doctor";
import noResult from "@/components/no-result/no-result";
import emptyPlaceHolder from "@/components/empty-place-holder/empty-place-holder";
import tab from "@/components/tab/tab";
import shareFns from "@/common/share";
import share from "@/iwen/share/share";
import alertTip from "@/iwen/alertTip/alertTip";
import shareSina from "@/iwen/share-sina/share-sina";
import shareWechat from "@/iwen/share-wechat/share-wechat";
import contentTitle from "../../components/content_title/content_title";
import articleCell from "../../components/article-cell/article-cell";
import actCell from "../../components/act-cell/act-cell";
import relativeMoments from "../../components/relative-moments/relative-moments";
import relativeSubjects from "../../components/relative-subjects/relative-subjects";
import { commonMixin, toTopMixin, shareMixin } from "@/mixins";
import { mapGetters } from "vuex";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import sysService from "@/services/sysService.js";
import userService from "@/services/userService.js";
import doctorService from "@/services/doctorService.js";
import phoneService from "@/services/phoneService.js";
export default {
  name: "doc-info",
  mixins: [commonMixin, toTopMixin, shareMixin],
  data() {
    return {
      dId: "",
      APP_URL,
      MOMENT_URL,
      FORUM_URL,
      DOC_CONSULT_URL,
      CW_ACT,
      DOC_DESC_URL,
      show_alert_tip: false,
      newsTimer: null,
      currentTab: 1,
      currentTabAct: 0,
      share_show: false,
      share_con_show: false,
      showWxCode: false,
      show_wechatShare: false,
      shareSinaInfo: {
        sharedContent: "",
        sharedImg: ""
      },
      docInfo: {
        id: "",
        relation: 0,
        photo: "",
        realName: "...",
        departments: "...",
        titles: "...",
        answerNum: 0,
        workUnit: "...",
        sicknessExpertise: "",
        departId:"",
        illnessTags:[],
      },
      latestArticles: [],
      latestArticlesNum: 50,
      weiTalkActivity: null,
      commonwealActivity: null,
      station_msg: null,
      consultList: [],
      articleList: [],
      activityList: [],
      actInfo: {
        title: "...",
        status: 0,
        coverImg: "",
        time: "0000-00-00",
        member: "0"
      },
      showFixedTip: true,
      service_info: null,
      achievement: 0,
      comments: [],
      commontsInfo: {},
      diaryList: [],
      subjects: [],
      departments: [],
      moments: [],
      courses: null,
      videoList: [],
      service_count: null,
      docIntro: {},
      doctorMedals:[],
      swiperOption3: {
        observer: true,
        observeParents: true,
        loop: false,
        slidesPerView: 2.2,
        spaceBetween: 5
      },
      swiperOption1: {
        observer: true,
        observeParents: true,
        loop: false,
        slidesPerView: 2.5,
        spaceBetween: 10
      },
      swiperOption2: {
        observer: true,
        observeParents: true,
        loop: true,
        // autoHeight:true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      isShowNav: true,
      achievementList: [],
      phoneSetting: {
        status: ""
      },
      orderList:[],
    };
  },
  components: {
    mHeader: Header,
    conHeader,
    tab,
    loadingBtn,
    actCell,
    articleCell,
    contentTitle,
    relativeMoments,
    relativeSubjects,
    noResult,
    alertTip,
    share,
    shareSina,
    shareWechat,
    swiper,
    swiperSlide,
    emptyPlaceHolder
  },
  destroyed() {
    clearInterval(this.newsTimer);
  },
  computed: {
    ...mapGetters({
      VX_isInSinaHealthApp: "isInSinaHealthApp",
      VX_isInIwenApp: "isInIwenApp",
    }),
    isDoctorEmpty(){
      let is = (this.activityList||[]).length==0&&(this.latestArticles||[]).length==0&&(this.comments||[]).length==0&&(this.consultList||[]).length==0&&(this.achievementList||[]).length==0&&(this.doctorMedals||[]).length==0;
      return is;
    },
    illnessTagsText(){
      let illnessTags = this.docInfo.illnessTags;
      let text = illnessTags.map((item)=>{
        return item.labelName;
      });
      return text.join("、");
    }
  },
  methods: {
    initPage() {
      this.dId = this.$route.params.dId;
      this.record();
      this.getDocinfo();
      this.getdocComments();
      this.homeSubjects();
      // this.doc_circles();
      this.getdocConsults();
      this.getAchievement();
      this.getLatestArticles();
      this.getWeiTalkActivity();
      this.getCommonwealActivity();
      this.getDocIntro();
      this.getAllJoinActivity();
      this.qryDocTelConfig();
      //登录则调用
      if (this.VX_islogin) {
        this.getService_count();
        this.getStation_msg();
        this.qryInteractiveRecording();
      }
    },

    record() {
      let This = this;
      doctorService
        .record({
          fromType: "M",
          businessId: This.dId,
          businessType: "DOCTOR_ROOM_INDEX",
          type: 0,
          remark: "浏览"
        })
        .then(res => {});
    },
    backTodepart() {
      if (this.docInfo.departId) {
        this.$router.push({
          name: "departInfo",
          params: { dId: this.docInfo.departId }
        });
      } else {
        this.$router.push({
          name: "homeIndex"
        });
      }
    },
    closeTipHandler() {
      console.log("关闭提示");
      this.$router.replace({
        name: "famousDocs"
      });
      this.show_alert_tip = false;
    },
    toogleWxCode() {
      this.showWxCode = !this.showWxCode;
    },
    setMsgRead() {
      userService
        .setMsgRead({
          id: this.station_msg.id
        })
        .then(res => {});
    },
    hideFixedTip() {
      this.showFixedTip = false;
    },
    getLatestArticles() {
      let This = this;
      doctorService
        .doc_news({
          docId: this.dId
        })
        .then(res => {
          if (res.code == 0 && res.data) {
            let type = Object.prototype.toString.call(res.data);
            if (type === "[object Array]") {
              This.latestArticles = res.data;
              This.latestArticlesNum = res.totalCount;
            } else {
              // This.latestArticles = [res.data];
            }
            if (This.latestArticles.length > 2) {
              This.latestArticles.push(This.latestArticles[0]);
              This.latestArticles.push(This.latestArticles[1]);
              This.$nextTick(() => {
                This.init_sliderNews();
              });
            }
          }
        });
    },
    getAllJoinActivity() {
      let This = this;
      doctorService
        .getAllJoinActivity({
          docId: this.dId,
          isDocIndex: 1,
          nowPage: 1,
          pageSize: 10
        })
        .then(res => {
          if (res.code == 0 && res.data) {
            This.activityList = res.data;
          }
        });
    },
    init_sliderNews() {
      let sliderNews = $(this.$refs.sliderNews);
      let sliderWrapper = sliderNews.parent();
      let liHeight = sliderNews
        .find("li")
        .eq(0)
        .height();
      // sliderNews.find("li").height(liHeight);
      sliderWrapper.height(liHeight * 2);
      let index = 1;
      this.newsTimer = setInterval(function() {
        sliderNews.css("margin-top", -liHeight * index + "px");
        index++;
        if (index == sliderNews.find("li").size() - 1) {
          sliderNews.css("transition", "all 0s ease 0s");
          sliderNews.css("margin-top", "0px");
          index = 1;
          setTimeout(() => {
            sliderNews.css("transition", "all .5s ease 0s");
            sliderNews.css("margin-top", -liHeight * index + "px");
          }, 5);
        }
      }, 2000);
    },
    getAchievement() {
      let This = this;
      doctorService.cw_num({ docId: this.dId }).then(res => {
        if (res.code == 0 && res.data) {
          This.achievement = res.data.number;
        }
      });
    },
    getWeiTalkActivity() {
      let This = this;
      doctorService.weiTalkActivity({ docId: this.dId }).then(res => {
        if (res.code == 0 && res.data) {
          This.weiTalkActivity = res.data;
        }
      });
    },
    getCommonwealActivity() {
      let This = this;
      doctorService.commonwealActivity({ docId: this.dId }).then(res => {
        if (res.code == 0 && res.data) {
          This.commonwealActivity = res.data;
        }
      });
    },
    get_service_info() {
      let This = this;
      doctorService.service_info({ docId: this.dId }).then(res => {
        if (res.code == 0 && res.data) {
          This.service_info = res.data;
        }
      });
    },
    getdocComments() {
      let This = this;
      doctorService
        .doc_comments({
          pageIndex: 1,
          docId: this.dId,
          pageSize: 1
        })
        .then(res => {
          if (res.code == 0 && res.data) {
            This.comments = This.comments.concat(res.data);
            This.commontsInfo = res.page;
          }
        });
    },
    getStation_msg() {
      let This = this;
      doctorService.station_msg({ docId: this.dId }).then(res => {
        if (res.code == 0 && res.data) {
          This.station_msg = res.data;
        }
      });
    },
    getService_count() {
      let This = this;
      doctorService.service_count({ docId: this.dId }).then(res => {
        if (res.code == 0 && res.data) {
          This.service_count = res.data;
        }
      });
    },
    getdocConsults() {
      let This = this;
      doctorService
        .doc_consults({ nowPage: 1, docId: this.dId, qryType: 0 })
        .then(res => {
          if (res.code == 0 && res.data) {
            This.consultList = This.consultList.concat(res.data);
          }
        });
    },
    setSinaAPPShareInfo() {
      let url = this.$route.fullPath;
      //如果在新浪健康App内部 则调起原生分享
      if (this.VX_isInSinaHealthApp) {
        iwenJSNativeBridge.hiddenShare({
          hidden: false,
          share: {
            sourceType: 2,
            title: "分享一个好医生：" + this.docInfo.realName,
            url: this.APP_URL + url.split("?")[0],
            img: this.GET_IMG_URL(this.docInfo.photo),
            content: `${this.docInfo.realName}，${
              this.docInfo.workUnit
            }-${this.docInfo.titles},擅长${this.docInfo.areasOfExpertise || ""}`
          }
        });
      }
    },
    getDocinfo(){
      let This=this;
      doctorService.doc_info({docId:this.dId})
      .then(res=>{
        if(res.code==0&&res.data){
          This.docInfo=res.data;
          This.SET_PAGE_TITLE(This.docInfo.realName+"的个人诊室");
          console.log("医生详情");
          console.log(res.data);
          // This.get_service_info();
          This.setShareInfo();
          This.setSinaAPPShareInfo();
          return true;
        } else if (res.code == "-2") {
          This.show_alert_tip = true;
        }
      });
    },
    getDocIntro() {
      let This = this;
      doctorService.doctorIntroduce({ docId: this.dId }).then(res => {
        if (res.code == 0 && res.druser) {
          This.docIntro = res.druser;
          let achievements = [];
          if (res.druser.honor && (res.druser.honor||"") != "") {
            //荣誉头衔
            achievements.push({
              data:res.druser.honor,
              type:0
            });
          }
          if (res.druser.prizeList && (res.druser.prizeList||[]).length > 0) {
            res.druser.prizeList.map(item => {
              //获得奖项
              achievements.push({
                data:item,
                type: 1
              });
            });
          }

          if (res.druser.scientificList && (res.druser.scientificList||[]).length > 0) {
            res.druser.scientificList.map(item => {
              //科研成果
              achievements.push({
                data:item,
                type: 2
              });
            });
          }
          if (res.druser.worksList && (res.druser.worksList||[]).length > 0) {
            res.druser.worksList.map(item => {
              //发表作品
              achievements.push({
                data:item,
                type: 3
              });
            });
          }
          res.druser.doctorMedals = res.druser.doctorMedals||[];
          res.druser.doctorMedals.map(item => {
            //荣誉勋章
            if(item!=null){
              This.doctorMedals.push({
                ...item,
              });
            }
          });

          for (let i = 0; i < (achievements.length>10?10:achievements.length); i++) {
            This.achievementList.push(achievements[i]);
          }
          console.log("11111111111");
          console.log(This.achievementList);
        }
      });
    },
    setShareInfo() {
      let This = this;
      var lineLink = location.href.split("#")[0];
      sysService
        .getWxConfig({ shareURL: lineLink })
        .then(res => {
          if (res.appId) {
            shareFns.setConfig(res);
            return true;
          } else {
            //签名失败
            return false;
          }
        })
        .then(isConfig => {
          if (isConfig) {
            let url = This.$route.fullPath;
            let momentUrl = This.$route.fullPath;
            if (url.indexOf("?") >= 0) {
              url += "&channel=02HZ00004100023000";
              momentUrl += "&channel=02HZ00004200023000";
            } else {
              url += "?channel=02HZ00004100023000";
              momentUrl += "?channel=02HZ00004200023000";
            }
            shareFns.setShareInfo({
              lineLink: This.APP_URL + url,
              momentLineLink: This.APP_URL + momentUrl,
              imgUrl: This.GET_IMG_URL(This.docInfo.photo),
              shareTitle: `【${This.docInfo.realName}】${This.docInfo.titles} ${
                This.docInfo.workUnit
              } ${This.docInfo.departments}`,
              descContent: `${This.docInfo.areasOfExpertise}`
            });
          }
        });
    },
    cancelShare() {
      this.share_show = false;
      this.isShowNav = true;
    },
    checkLogin() {
      if (!this.VX_islogin) {
        this.goLogin(this.$route.fullPath);
        return false;
      } else {
        return true;
      }
    },
    checkNikeAndMobile() {
      //是否编辑昵称
      if (!this.VX_isNickEdited) {
        this.$router.push("/nike_name?refer=" + this.$route.fullPath);
        return false;
      } else if (!this.VX_isBindMobile) {
        this.$router.push("/bind_mobile?refer=" + this.$route.fullPath);
        return false;
      } else {
        return true;
      }
    },
    share() {
      //如果在新浪健康App内部 则调起原生分享
      if (this.VX_isInSinaHealthApp) {
        let url = this.$route.fullPath;
        iwenJSNativeBridge.appShare({
          sourceType:2,
          title: "分享一个好医生：" + this.docInfo.realName,
          url: this.APP_URL + url.split("?")[0],
          img: this.GET_IMG_URL(this.docInfo.photo),
          content: `${this.docInfo.realName}，${
            this.docInfo.departments
          }-${this.docInfo.titles},擅长${this.docInfo.areasOfExpertise || ""}`
        });
        return;
      }
      // if(!this.checkLogin()) return;
      // if(!this.checkNikeAndMobile()) return;
      this.isShowNav = false;
      if (platformInfo.isWx) {
        this.share_show = true;
      } else {
        if (!this.checkLogin()) return;
        this.share_con_show = true;
      }
      this.shareSinaInfo.sharedContent = `推荐新浪爱问医生-${
        this.docInfo.realName
      }-${this.docInfo.departments}-${this.docInfo.titles},擅长${this.docInfo
        .areasOfExpertise || ""}`;
      this.shareSinaInfo.sharedImg = this.GET_IMG_URL(this.docInfo.photo);
    },
    confirmShare(params) {
      if (params.type == "wx") {
        this.show_wechatShare = true;
        return;
      } else if (params.type == "wb") {
        if (!this.VX_islogin) {
          this.goLogin(this.$route.fullPath);
          return;
        }
        this.share_show = false;
        this.share_con_show = true;
      }
    },
    cancelShareCon() {
      let _this = this;
      _this.share_con_show = false;
      _this.isShowNav = true;
    },
    confirmShareCon(sharedContent) {
      let This = this;
      This.isShowNav = true;
      let url = LINK_CARD_BASE_URL + `/linkcard/awyh_doctorindex/${this.docInfo.id}.htm`;
      if (url.indexOf("?") >= 0) {
        url +=
          "&channel=01HZ00000600023000&tag=pc&m=doctor_Index&n=" +
          this.docInfo.id;
      } else {
        url +=
          "?channel=01HZ00000600023000&tag=pc&m=doctor_Index&n=" +
          this.docInfo.id;
      }
      sysService
        .wbShare({
          sharedContent: sharedContent,
          // sharedUrl:encodeURIComponent(url),
          sharedUrl: url
          // sharedImg:this.shareSinaInfo.sharedImg
        })
        .then(res => {
          if (res.code == 0) {
            This.$toast.tip("分享成功");
          }
        })
        .catch(() => {
          This.$toast.tip("分享失败");
        });
    },
    homeSubjects() {
      let This = this;
      sysService.homeSubjects({ dId: this.dId }).then(res => {
        if (res.code == 0) {
          This.subjects = res.data;
        }
      });
    },
    addToMyDoc() {
      if (!this.checkLogin()) return;
      // if(!this.checkNikeAndMobile()) return;
      let This = this;
      userService.addToMyDoc({ docId: this.dId }).then(res => {
        if (res.code == 0) {
          This.docInfo.relation = true;
        }
      });
    },
    doc_circles() {
      let This = this;
      doctorService
        .doc_circles({
          docId: this.dId,
          grantType: 1
        })
        .then(res => {
          if (res.code == 0) {
            This.moments = res.data;
          }
        });
    },
    changeCallBack(index) {
      this.currentTab = index + 1;
    },
    changeCallBackArt(index) {
      this.currentTabAct = index;
    },
    zxFn(){
      let This=this;
      // if(this.VX_isSinaHealthAppForceIng && this.docInfo.qPrice > 0) {
      //   this.$toast.tip("图文咨询服务未开通");
      //   return;
      // };

      if(!This.docInfo.advice){
        This.$toast.tip("图文咨询服务未开通");
      } else {
        if (!this.docInfo.nowsuspendService) {
          if (!this.docInfo.qCaps > 0) {
            This.$toast.tip("今日无名额");
          }else{
            if (!this.VX_islogin) {
              if (this.VX_isInSinaHealthApp) {
                iwenJSNativeBridge.appLogin();
              } else {
                platformLogin(this.$route.fullPath);
              }
              return;
            }
            window.location.href = this.OUTER_LINKS.docConsult + this.docInfo.id + "&bizType=NOR";
          }
        } else {
          This.$toast.tip("暂停服务");
        }
      }
    },
    // toConsult() {
    //   if(this.VX_isSinaHealthAppForceIng && this.docInfo.qPrice > 0) {
    //     this.$toast.tip("图文咨询服务未开通");
    //     return;
    //   };

    //   console.log(this.VX_islogin);
    //   if (!this.VX_islogin) {
    //     if (this.VX_isInSinaHealthApp) {
    //       iwenJSNativeBridge.appLogin();
    //     } else {
    //       platformLogin(this.$route.fullPath);
    //     }
    //     return;
    //   }
    //   window.location.href = this.OUTER_LINKS.docConsult + this.docInfo.id + "&bizType=NOR";
    // },
    yyFn(){
      if(this.docInfo.register==1){
        window.location.href = this.OUTER_LINKS.docOrder+this.docInfo.id;
      }else{
        this.$toast.tip("门诊预约服务未开通");
      };
    },
    phoneFn() {
      let This = this;
      if(This.phoneSetting.status=="10001"&&This.phoneSetting.remainSource>0){
        console.log("已开通电话咨询");
        console.log(this.VX_islogin);
        if (!this.VX_islogin) {
          if (this.VX_isInSinaHealthApp) {
            iwenJSNativeBridge.appLogin();
          } else {
            platformLogin(this.$route.fullPath);
          }
          return;
        }
        This.$router.push({name:"dialogueList", params:{ dId:This.dId}});
      }
      else if (This.phoneSetting.remainSource<=0&&This.phoneSetting.status=="10001") {
        This.$toast.tip("今日名额已用完");
      }else {
        This.$toast.tip("电话咨询服务未开通");
        
      }
    },
    toRecordList(){
      if (!this.VX_islogin) {
        if (this.VX_isInSinaHealthApp) {
          iwenJSNativeBridge.appLogin();
        } else {
          platformLogin(this.$route.fullPath);
        }
        return;
      }
      this.$router.push({ name: "myDoc", params:{ dId: this.dId }});
    },
    qryDocTelConfig() {
      //电话咨询配置
      let This = this;
      phoneService
        .getPhoneConsultSetting({
          doctorId: This.dId,
          departmentId: "",
        })
        .then(res => {
          if (res.status == 200 && res.data) {
            This.phoneSetting = res.data;
          }
        });
    },
    qryInteractiveRecording() {
      let This = this;
      doctorService.qryInteractiveRecording({
        drUserId: This.dId,
        userId: this.VX_userInfo.id,
        pageNum: 1,
        pageSize: 10,
      })
      .then(res => {
        if (res.code == 0) {
          This.orderList=res.data;
        }
      });
    },
  },
  mounted() {
    this.initPage();
    this.USER_BEHAVIOR_DATA_RECORD({
      contentId: this.$route.params.dId,
      contentType:"7",
      sceneId:"",
      scene:4,
      actionType:0
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>

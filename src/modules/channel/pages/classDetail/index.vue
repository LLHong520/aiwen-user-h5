<template>
  <layout :isAppView="true">
    <div slot="page_header" class="header_wrapper">
      <m-header  :title="classInfo.title" :isShowInApp="true">
        <a href="javascript:;" slot="left" class="back" @click="router_back"></a>
        <div class="right" slot="right">
          <span class="share" @click="share(false)"></span>
        </div>
      </m-header>
    </div>
    <div slot="page_container">
      <div class="class_info">
        <div class="video_box">
          <video :poster="classInfo.videoCover" preload="metadata" :src="classInfo.url" controls="controls"></video>
           <!-- <video is="true" id="video-player" controlslist="nodownload" playsinline="true" webkit-playsinline="" x-webkit-airplay="true" poster="classInfo.videoCover" preload="metadata" :src="classInfo.url" controls="controls"></video> -->
        </div>
        <h3 class="title">{{classInfo.title}}</h3>
        <div class="author">
          <div class="img"><img v-lazy="GET_IMG_URL(classInfo.publishCover,'doc')"></div>
          <div class="txt">
            <dl>
              <dt><span class="name">{{classInfo.publisher}}</span>&nbsp;&nbsp;{{classInfo.doctorTitle}}</dt>
              <dd>{{classInfo.createTime | dataFormat}}</dd>
            </dl>
          </div>
        </div>
        <div class="detail_footer">
          <span>{{classInfo.pv}}阅读 · {{classInfo.praisePoints}}赞</span> <span class="resource" v-if="!IS_IWEN_COMTY(classInfo.comtyId)&&classInfo.comtyName">来自 <a :href="COMTY_BASE_URL+classInfo.comtyId">{{classInfo.comtyName}}</a></span>
        </div>
      </div>
      <div class="class_tab_wrapper">
        <div class="navlist">
          <ul>
            <li class="navli" :class="{'active':activeIndex===0}" @click="tabClick(0)">课程介绍<i v-if="activeIndex===0"></i></li>
            <li class="navli" :class="{'active':activeIndex===1}" @click="tabClick(1)" v-if="classInfo.outline">课程大纲<i v-if="activeIndex===1"></i></li>
          </ul>
        </div>
        <div class="class_tab_cont">
          <swiper :options="classOption" ref="classSwiper">
            <swiper-slide>
              <div class="slide_item">
                <div class="class_intro" v-html="classInfo.intro"></div>
              </div>
            </swiper-slide>
            <swiper-slide v-if="classInfo.outline">
              <div class="slide_item">
                <div class="branch_list" v-html="classInfo.outline"></div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <div slot="page_footer">
      <div class="bottom">- 这是我的底线 -</div>
    </div>
    <div slot="page_layer">
      <back-btn></back-btn>
      <!-- 分享 -->
      <m-share :show.sync="isShare" :config="shareConfig"></m-share>
    </div>
  </layout>
</template>
<script>
import {commonMixin,toTopMixin,dataCollectMixin,shareMixin} from "@/mixins";
import {
  DOC_CONSULT_URL,
  COMTY_BASE_URL
} from "@/config";
import Header from "@/components/header/Header";
import caseCell from "../../components/case_cell/case_cell";
import backBtn from "../../components/channelIndexBtn/channelIndexBtn";
import share from "@/iwen/share-all/share.vue"; //分享
import channelService from "@/services/channelService.js";
export default {
  name: "channel",
  mixins: [commonMixin, toTopMixin,dataCollectMixin,shareMixin],
  components: {
    mHeader:Header,
    caseCell,
    backBtn,
    mShare: share  //分享
  },
  data() {
    return {
      DOC_CONSULT_URL,
      COMTY_BASE_URL,
      channelId:"",
      classId:"",
      overHeight:false,
      activeIndex:0,
      classOption:{
        observer:true,
        observeParents:true,
        autoplay:false,
        autoHeight:true,
        initialSlide:0,
        on:{
          // 使用es6的箭头函数，使this指向vue对象          
          slideChange: ()=>{            
          // 通过$refs获取对应的swiper对象            
            let swiper = this.$refs.classSwiper.swiper;            
            let i = swiper.activeIndex;            
            this.activeIndex=i;
          }        
        },
      },
      classInfo:{},

      loading:false,
      isEnd:false,
      loadingText:"加载更多",
      pageIndex:0,
      pageSize:10,
      pageCount:0,
      list:[],
      //分享
      isShare: false,
      shareConfig: {},
    };
  },
  computed: {
    swiper() {
      return this.$refs.classSwiper.swiper;
    }
  },
  created() {
    this.channelId=this.$route.params.id;
    this.classId=this.$route.query.id;
    this.renderDataInfo();
  },
  methods: {
    //分享
    share(isInit = false){
      console.log("点击了分享按钮");
      if (!isInit) {
        this.isShare = true;
      }
      this.shareConfig = {
        pid: this.channelId,
        id: this.classId,
        type: "class",
        title: `${this.classInfo.title} - 来自新浪健康`,
        // content: (this.classInfo.intro||"").replace(/<[^>]+>/g, "").slice(0,50),
        content:"",
        imgUrl: this.classInfo.videoCover||"",
      };
    },
    tabClick(index){
      this.activeIndex = index;
      this.swiper.slideTo(index,0,false);
    },
    renderDataInfo() {
      if(this.loading) return;
      this.loading = true;
      let data = {
        "id": this.classId
      };
      channelService.findVideoById(data).then((res) => {
        this.loading=false;
        if(res.status == 200 && res.data) {
          this.classInfo = res.data;
          this.share(true);//分享
        }
      }).catch(() => {}).finally(() => {
        this.dataCollectInit();
        this.share(true);//分享
      });
    },
    //打点
    dataCollectInit() {
      this._dataCollect({
        contentId: this.classId,
        contentType: "0",
        operationType: "0",
        contentCreateTime: this.classInfo.createTime,
        title: this.classInfo.title,
      });
    },
  },
  mounted(){
    this.swiper.updateSize();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>

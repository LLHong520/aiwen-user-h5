<template>
<layout :tabbarSwitch="true">

  <!-- page_header -->
  <div slot="page_header">
    <div class="home_header_wrapper">
      <div class="home_header">
        <div class="logo"><img src="./images/logo_sina@2x.png" alt=""></div>
        <div class="search_box">
          <input autocomplete="off" @focus="search_btn" type="needsclick text" placeholder="搜索医生/文章">
        </div>
      </div>
    </div>
  </div>

  <div slot="page_container" class="app_wrapper_inner">
    <!-- page_container -->
    <!-- <ad-app :isConsult="false" :isIndex="true" :isFixed="false"></ad-app> -->
    <!-- 顶部banner -->
    <div class="banner">
      <a v-if="isSinaHost" href="https://healthnews.sina.cn/">
        <img  src="./images/banner_top@2x 2.png" alt="">
      </a>
      <img v-else src="./images/banner_top@2x.png" alt="">
    </div>
    <!-- /顶部banner -->
    <!-- 科室 -->
    <swiper :options="departSwiperOption" ref="departSwiper" v-if="departments.length>0&&!isResize" class="depart_wrapper">
        <swiper-slide v-for="(elem,index) in departments" :key="index">
          <div class="departList clearfix">
            <template v-for="(selem,sindex) in elem">
              <router-link :key="sindex" :to="{ name: 'departInfo', params: { dId: selem.id}}">
                <dl>
                  <dt><img v-lazy="GET_IMG_URL(selem.icon)" alt=""></dt>
                  <dd>{{selem.name}}</dd>
                </dl>
              </router-link>
            </template>
          </div>
        </swiper-slide>
        <!-- Add Pagination -->
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="departList clearfix" v-else-if="departs.length>0&&isResize">
        <template v-for="(selem,sindex) in departs">
          <router-link :key="sindex" :to="{ name: 'departInfo', params: { dId: selem.id}}">
            <dl>
              <dt><img v-lazy="GET_IMG_URL(selem.icon)" alt=""></dt>
              <dd>{{selem.name}}</dd>
            </dl>
          </router-link>
        </template>
    </div>
    <!-- <m-swiper :autoPlay="false" :showIndicator="true" interval="2000" duration="500" v-if="departments.length>0" class="depart_box">
      <m-slide v-for="(elem,index) in departments" :key="index">
        <div class="departList clearfix">
          <template v-for="(selem,sindex) in elem">
            <router-link :key="sindex" :to="{ name: 'departInfo', params: { dId: selem.id}}">
              <dl>
                <dt><img :src="GET_IMG_URL(selem.icon)" alt=""></dt>
                <dd>{{selem.name}}</dd>
              </dl>
            </router-link>
          </template>
        </div>
      </m-slide>
    </m-swiper> -->
    <!-- 轮播广告banner -->
    <div v-show="!isResize">
      <swiper :options="bannerOption" ref="bannerSwiper" v-if="latestAct.length>0">
          <swiper-slide v-for="(list,index) in latestAct" :key="index">
            <div class="banner_img">
              <a v-if="list.activityType==0" :href="CW_ACT+list.id">
                <img :src="list.image" :alt="list.title">
              </a>
              <a v-else :href="OUTER_LINKS.weiTalkDetail+list.id">
                <img :src="list.image" :alt="list.title">
              </a>
            </div>
          </swiper-slide>
          <!-- Add Pagination -->
          <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div v-show="isResize">
      <swiper :options="bannerSwiperBigOption" ref="bannerSwiperBig" class="banner_swiper" v-if="latestAct.length>0">
          <swiper-slide v-for="(list,index) in latestAct" :key="index">
            <div class="banner_img">
              <a v-if="list.activityType==0" :href="CW_ACT+list.id">
                <img :src="list.image" :alt="list.title">
              </a>
              <a v-else :href="OUTER_LINKS.weiTalkDetail+list.id">
                <img :src="list.image" :alt="list.title">
              </a>
            </div>
          </swiper-slide>
          <!-- Add Pagination -->
          <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <div class="placeHolder" v-if="latestAct.length==0"></div>
    <!-- 轮播广告banner -->

    <!-- 专题 -->
    <div class="common_box subject_box">
      <div class="common_hd">
        <h3>精选专题</h3>
        <router-link :to="{name:'heal.special'}" class="btn_more">查看更多></router-link>
      </div>
      <div class="common_bd">
        <section v-if="subjects.length>0">
          <relative-subjects class="diy" :subjects="subjects"></relative-subjects>
        </section>
        <loadingPlaceHolder v-else v-for="n in 2" :key="n.key"></loadingPlaceHolder>
      </div>
    </div>

    <!-- 视频 -->
    <div class="common_box video_box">
      <div class="common_hd">
        <span><em class="icon_video"></em>大家都在看</span>
      </div>
      <div class="common_bd">
        <div class="video_shadow" v-show="!isResize">
          <swiper :options="videoSwiperOption" ref="videoSwiper" class="swiper_video" v-if="lessonList.length>0">
            <swiper-slide v-for="(elem,index) in lessonList" :key="index" >
              <section class="video_item_wrapper">
                <div class="image-clip-wrapper">
                  <img v-lazy="GET_IMG_URL(elem.image)">
                  <span class="image-clip"></span>
                </div>
                <a :href="OUTER_LINKS.courseDetails+elem.id" class="video_item">
                  <em v-if="elem.status==0" class="mark"></em>
                  <em v-if="elem.status==1" class="mark nostart"></em>
                  <em v-if="elem.status==2||elem.status==3" class="mark last"></em>
                  <dl>
                    <dt>{{elem.title}}</dt>
                    <dd>{{elem.lessonsStartTime|formatTime}} {{elem.listenNumber}}在看</dd>
                  </dl>
                  <span href="javascript:;" class="btn_play"></span>
                </a>
              </section>
            </swiper-slide>
            <!-- Add Pagination -->
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="video_shadow" v-show="isResize">
          <swiper :options="videoSwiperBigOption" ref="videoSwiperBig" class="swiper_video" v-if="lessonList.length>0">
            <swiper-slide v-for="(elem,index) in lessonList" :key="index" >
              <section class="video_item_wrapper">
                <div class="image-clip-wrapper">
                  <img v-lazy="GET_IMG_URL(elem.image)">
                  <span class="image-clip"></span>
                </div>
                <a :href="OUTER_LINKS.courseDetails+elem.id" class="video_item">
                  <em v-if="elem.status==0" class="mark"></em>
                  <em v-if="elem.status==1" class="mark nostart"></em>
                  <em v-if="elem.status==2||elem.status==3" class="mark last"></em>
                  <dl>
                    <dt>{{elem.title}}</dt>
                    <dd>{{elem.lessonsStartTime|formatTime}} {{elem.listenNumber}}在看</dd>
                  </dl>
                  <span href="javascript:;" class="btn_play"></span>
                </a>
              </section>
            </swiper-slide>
            <!-- Add Pagination -->
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <!-- <m-swiper :autoPlay="false" :showIndicator="true" interval="2000" duration="500" v-if="lessonList.length>0">
          <m-slide v-for="(elem,index) in lessonList" :key="index">
            <section class="video_item_wrapper">
              <div class="image-clip-wrapper">
                <img :src="GET_IMG_URL(elem.image)">
                <span class="image-clip"></span>
              </div>
              <a :href="OUTER_LINKS.courseDetails+elem.id" class="video_item">
                <em v-if="elem.status==0" class="mark"></em>
                <em v-if="elem.status==1" class="mark nostart"></em>
                <em v-if="elem.status==2||elem.status==3" class="mark last"></em>
                <dl>
                  <dt>{{elem.title}}</dt>
                  <dd>{{elem.lessonsStartTime|formatTime}} {{elem.listenNumber}}在看</dd>
                </dl>
                <span href="javascript:;" class="btn_play"></span>
              </a>
            </section>
          </m-slide>
        </m-swiper> -->
      </div>
    </div>

    <!-- 就诊动态 -->
    <div class="common_box desc_box" v-if="consultDynamicList.length>0">
      <div class="common_hd">
        <h3>就诊动态</h3>
        <router-link :to="{name:'famousDocs'}" class="btn_blue">去看看<em></em></router-link>
      </div>
      <div class="common_bd">
        <ul v-if="consultDynamicList.length>0" class="dest_list">
          <li v-for="(item,index) in consultDynamicList" :key="index">
            <a href="javascript:;">
              <span class="tit">{{item.userName}}患者咨询了<span class="blue">{{item.drNickName}}医生</span></span>
              <span class="time">{{item.postTime}}</span>
            </a>
          </li>
        </ul>
        <loadingPlaceHolder v-else v-for="n in 2" :key="n.key"></loadingPlaceHolder>
      </div>
    </div>

    <!-- 明星医生 -->
    <div class="common_box doc_box">
      <div class="common_hd">
        <h3>明星医生</h3>
        <router-link :to="{name:'famousDocs'}" class="btn_more">查看更多></router-link>
      </div>
      <div class="common_bd">
        <div class="doc_list">
          <ul>
            <li v-for="(item,index) in starDoctors" :key="index">
              <router-link :to="{ name: 'docIndex', params: { dId: item.drUserId}}">
                <div class="img"><img v-lazy="item.drPhoto" alt=""></div>
                <p class="name">{{item.drUserName}}</p>
                <p class="hospitalName">{{item.workUnit}}</p>
                <p class="title">{{item.drTitles}}</p>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="common_box article_box">
      <div class="common_hd">
        <ul class="tab">
          <a href="javascript:;" @click="changeArticleType(3)" :class="{'active':indexArticleType==3}">患者自述</a> ·
          <a href="javascript:;" @click="changeArticleType(1)" :class="{'active':indexArticleType==1}">健康科普</a> ·
          <a href="javascript:;" @click="changeArticleType(5)" :class="{'active':indexArticleType==5}">病例分析</a> ·
          <a href="javascript:;" @click="changeArticleType(2)" :class="{'active':indexArticleType==2}">诊间日记</a>
        </ul>
      </div>
      <div class="common_bd">
        <ul v-if="indexArticleList.length>0" class="articleList">
          <template v-for="(item,index) in indexArticleList">
            <li v-if="item.art_images.length<=2" :key="index">
              <a :href="GET_ARTICLE_URL(item.id,indexArticleType)">
                <div class="info">
                  <dl>
                    <dt>
                    <span v-if="indexArticleType==3&&item.icon" :class="item.icon" class="icon-rank"></span>
                    {{item.title}}
                    </dt>
                    <dd class="author_bar">
                      <template v-if="indexArticleType==3">
                        <span>{{item.trueReadCountPv}}热度</span>
                      </template>
                      <template v-else>
                        <span class="face"><img v-lazy="GET_IMG_URL(item.drPhoto)" alt=""></span>
                        <span class="author_name">{{item.drUserName}}</span>
                        <span class="helpNum">阅读{{item.readCount}}</span>
                      </template>
                    </dd>
                  </dl>
                </div>
                <div class="img_box"><img v-lazy="GET_IMG_URL(item.picName)" alt=""></div>
              </a>
            </li>
            <li v-if="item.art_images.length>2" :key="index">
              <a :href="GET_ARTICLE_URL(item.id,indexArticleType)">
                <div class="info_wrap">
                  <div class="tit"><span v-if="indexArticleType==3&&item.icon" :class="item.icon" class="icon-rank"></span>{{item.title}}</div>
                  <div class="img_list clearfix">
                    <div v-for="(image,imgIdx) in item.art_images" v-if="imgIdx<3" :key="image.key" class="img_item">
                      <span><img v-lazy="GET_IMG_URL(image)" alt=""></span>
                    </div>
                  </div>
                  <div class="author_bar">
                    <template v-if="indexArticleType==3">
                      <span>{{item.trueReadCountPv}}热度</span>
                    </template>
                    <template v-else>
                      <span class="face"><img v-lazy="GET_IMG_URL(item.drPhoto)" alt=""></span>
                      <span class="author_name">{{item.drUserName}}</span>
                      <span class="helpNum">阅读{{item.readCount}}</span>
                    </template>
                  </div>
                </div>
              </a>
            </li>
          </template>
        </ul>
        <loadingPlaceHolder v-else v-for="n in 2" :key="n.key"></loadingPlaceHolder>
      </div>
      <loading-btn
        :loading="articleLoading"
        :title="articleLoadingText"
        :scroll_load="true"
        @loadFn="getPopSciencePaperByPage">
      </loading-btn>
    </div>

    <!-- 备案 -->
    <copyright></copyright>
    <!-- /备案 -->

  </div>
  <!-- /page_container -->
  <!-- page_footer -->
  <div slot="page_footer">
    <loading-page v-show='initing_page'></loading-page>
  </div>
</layout>
</template>
<script>
import {
  CW_ACT,
  MOMENT_URL,
  FORUM_URL,
} from "@/config";
import Header from "@/components/header/Header";
import copyright from "@/components/copyright/copyright";
import {
  mSwiper,
  mSlide
} from "@/iwen/swiper";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import loadingPlaceHolder from "@/components/loading-place-holder/loading-place-holder";
import loadingBtn from "@/components/loading-btn/loading-btn";
import searchHolder from "@/components/search-holder/search-holder";
import scrollNews from "@/components/scroll_news/scroll_news";
import actCell from "../../components/act-cell/act-cell";
import contentTitle from "../../components/content_title/content_title";
import articles from "../../components/articles/articles";
import articleCell from "../../components/article-cell/article-cell";
import relativeCourses from "../../components/relative-courses/relative-courses";
import relativeSubjects from "../../components/relative-subjects/relative-subjects";

import {
  commonMixin,
  toTopMixin
} from "@/mixins";

import homeService from "@/services/homeService.js";
import sysService from "@/services/sysService.js";
import departService from "@/services/departService.js";
import courseService from "@/services/courseService.js";
import adApp from "@/components/ad-app/ad_app";

export default {
  name: "index",
  mixins: [commonMixin, toTopMixin],
  data() {
    return {
      CW_ACT,
      MOMENT_URL,
      FORUM_URL,
      latestAct: [],
      starDoctors: [],
      consultDynamicList: [],
      lessonList: [],
      indexArticleList: [],
      indexArticleType: 3,
      articleList: [],
      curPage: 0,
      pageCount: 1,
      articleLoading: false,
      articleLoadingText: "加载更多",
      articleIsEnd: false,
      actInfo: null,
      actInfo_loading: false,
      slideList: [],
      subjects: [],
      departments: [],
      departs:[],
      isResize:false,
      bannerSwiperOption:{
        observer:true,
        observeParents:true,
        loop: true,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        initialSlide:0,
        spaceBetween: 0,
        pagination: {
          el: ".swiper-pagination"
        },
        on:{
          // 使用es6的箭头函数，使this指向vue对象
          resize:()=>{
            // 通过$refs获取对应的swiper对象
            let swiper = this.$refs.bannerSwiper.swiper;
            swiper.autoplay.stop();
            swiper.autoplay.start();
          }
        },
        // init:false,
      },
      bannerSwiperOption1:{
        observer:true,
        observeParents:true,
        loop: false,
        autoplay:false,
        initialSlide:0,
        spaceBetween: 0,
        pagination: {
          el: ".swiper-pagination"
        },
        on:{
          // 使用es6的箭头函数，使this指向vue对象
          resize: ()=>{
            // 通过$refs获取对应的swiper对象
            let swiper = this.$refs.bannerSwiper.swiper;
            swiper.autoplay.stop();
            swiper.autoplay.start();
          }
        },
        // init:false,
      },
      bannerSwiperBigOption:{
        observer:true,
        observeParents:true,
        loop: true,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        initialSlide:0,
        spaceBetween: 15,
        slidesOffsetBefore: -200,
        // slidesOffsetAfter: -100,
        slidesPerView:2,
        pagination: {
          el: ".swiper-pagination"
        },
        on:{
          // 使用es6的箭头函数，使this指向vue对象
          resize: ()=>{
            // 通过$refs获取对应的swiper对象
            let swiper = this.$refs.bannerSwiperBig.swiper;
            swiper.autoplay.stop();
            swiper.autoplay.start();
          }
        },
        // init:false
      },
      departSwiperOption:{
        observer:true,
        observeParents:true,
        loop: true,
        autoplay: false,
        initialSlide:0,
        spaceBetween: 0,
        pagination: {
          el: ".swiper-pagination"
        },
      },
      videoSwiperOption:{
        observer:true,
        observeParents:true,
        loop: true,
        autoplay: false,
        initialSlide:0,
        spaceBetween: 0,
        slidesPerView:1,
        pagination: {
          el: ".swiper-pagination"
        },
      },
      videoSwiperBigOption:{
        observer:true,
        observeParents:true,
        loop: true,
        autoplay: false,
        initialSlide:0,
        spaceBetween: 10,
        slidesOffsetBefore: -200,
        // slidesOffsetAfter: -100,
        slidesPerView:2,
        slidesPerGroup : 3,
        pagination: {
          el: ".swiper-pagination"
        },
      },
    };
  },
  components: {
    mHeader: Header,
    loadingBtn,
    copyright,
    mSwiper,
    mSlide,
    loadingPlaceHolder: loadingPlaceHolder,
    searchHolder: searchHolder,
    actCell,
    articleCell,
    articles,
    contentTitle,
    relativeCourses,
    relativeSubjects,
    scrollNews,
    adApp,
    swiper,
    swiperSlide,
  },
  created() {
    if (this.VX_islogin) {
      this.$store.dispatch("update_userinfo");
    }
    this.getBanners();
    this.homeSubjects();
    this.homeDepartments();
    this.homeLesson();
    this.getConsultDynamic();
    this.getPopSciencePaperByPage();
    this.getRecommendManages();
    this.homeActs();
    this.resize();
  },
  computed: {
    isSinaHost(){
      let is = true;
      if(window.location.hostname=="www.991kang.com"){
        is = false;
      }
      return is;
    },
    bannerOption(){
      if(this.latestAct.length>1){
        return this.bannerSwiperOption;
      }else{
        return this.bannerSwiperOption1;
      }
    }
  },
  methods: {
    search_btn() {
      this.$router.push({
        path: "/search"
      });
    },
    getBanners() {
      let This = this;
      sysService.homeBanners({}).then(res => {
        if (res.code == 0 && res.data) {
          This.slideList = res.data;
        }
      });
    },
    getRecommendManages() {
      console.log("star");
      let This = this;
      homeService.getRecommendManages({
        position:"AWYK_INDEX",
        category:"star_doctor",
        limit:5,
      }).then(res => {
        if (res.code == 0 && res.data) {
          This.starDoctors = res.data;
        }
      });
    },
    getConsultDynamic() {
      let This = this;
      homeService.qryConsultDynamic({}).then(res => {
        if (res.code == 0 && res.data) {
          This.consultDynamicList = res.data;
        }
      });
    },
    getArticleImages(htmlContent) {
      let dom = $("<div>"+htmlContent+"</div>");
      let images = dom.find("img");
      let imageUrls = [];
      images.map((index, el) => {
        if (el.src) {
          imageUrls.push(el.src);
        }
      });
      return imageUrls;
    },
    changeArticleType(contentType) {
      this.indexArticleList = [];
      this.indexArticleType = contentType;
      this.curPage = 0;
      this.pageCount = 1;
      this.articleIsEnd = false;
      this.getPopSciencePaperByPage();
    },
    getPopSciencePaperByPage(eventType) {
      if(this.articleIsEnd&&eventType=="click"){
        if(this.indexArticleType == 1){
          this.$router.push({
            name:"heal.article"
          });
        }
        if(this.indexArticleType == 2){
          this.$router.push({
            name:"heal.diary"
          });
        }
        if(this.indexArticleType == 3){
          this.$router.push({
            name:"selfDescriptionList"
          });
        }
        if(this.indexArticleType == 5){
          this.$router.push({
            name:"heal.disAnalysis"
          });
        }
        return;
      }
      if(this.articleLoading||this.articleIsEnd) return;
      this.articleLoading = true;
      let This = this;
      let params = {
        pageIndex: this.curPage+1,
        limit: 10,
        contentType: this.indexArticleType,
      };
      homeService.getPopSciencePaperByPage(params).then(res => {
        This.articleLoading = false;
        if (res.code == 0 && res.data) {
          let articleList = [];
          res.data.map((item,index) => {
            let images = This.getArticleImages(item.content);
            images = images.reverse();
            images.push(item.picName);
            images = images.reverse();
            articleList.push({
              ...item,
              art_images: images
            });
          });
          This.curPage += 1;
          This.pageCount = res.page.totalPages > 2? 2:res.page.totalPages;
          This.indexArticleList = This.indexArticleList.concat(articleList);
          let indexArticleList = This.indexArticleList;
          indexArticleList.map((item,index) => {
            if(This.indexArticleType == 3&&index<5){
              item.icon = "iconRank"+index;
            }
          });
          This.indexArticleList = indexArticleList;
          // console.log(This.indexArticleList);
          // console.log(This.curPage);
          // console.log(This.pageCount);
          // console.log(res.page.totalPages);
          if(This.curPage>This.pageCount){
            This.articleIsEnd = true;
            This.articleLoadingText = "查看全部";
          }else{
            This.articleIsEnd = false;
          }
        }
      });
    },
    homeSubjects() {
      let This = this;
      sysService.homeSubjects({}).then(res => {
        if (res.code == 0 && res.data) {
          This.subjects = res.data;
        }
      });
    },
    homeDepartments() {
      let This = this;
      departService
        .allDepartments({
          parentId: 0
        })
        .then(res => {
          if (res.code == 0) {
            This.departs=res.data;
            This.departments = sliceArray(res.data, 10);
          }
        });
    },
    homeActs() {
      let This = this;
      this.actInfo_loading = true;
      sysService.homeActs({}).then(res => {
        This.actInfo_loading = false;
        if (res.code == 0) {
          This.latestAct = res.data;
        }
      });
    },
    homeLesson() {
      let This = this;
      courseService.home_lesson({
        position: "AWYK_INDEX"
      }).then(res => {
        if (res.code == 0 && res.data) {
          This.lessonList = res.data;
          This.lessonArray = sliceArray(res.data, 3);
          console.log(This.lessonArray);
        }
      });
    },
    resize(){

      let _this=this;
      if(document.body.clientWidth>750){
        _this.isResize=true;
        // _this.bannerSwiperBigOption.init=true;
        // mySwiper.autoplay.start();
      }else{
        _this.isResize=false;
        // _this.bannerSwiperBigOption.init=false;
      }
    }
  },
  filters:{
    formatTime(val){
      if(val==""||val==0) return "";
      let timeMinSeconds=parseInt(val);
      function fix(num){
        return num>=10?num:"0"+num;
      }
      var date=new Date(timeMinSeconds);
      var month=fix(date.getMonth()+1);
      var day=fix(date.getDate());
      var hour=fix(date.getHours());
      var minute=fix(date.getMinutes());
      return month+"-"+day+" "+hour+":"+minute;

    }
  },
  mounted(){
    window.addEventListener("resize",this.resize);
  },
  destroyed(){
    window.removeEventListener("resize",this.resize);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>

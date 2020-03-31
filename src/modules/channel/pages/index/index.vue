<template>
  <layout :isAppView="true">
    <div slot="page_header">
      <div class="header animated fadeIn" v-show="!showFixTop">
        <div class="header_l">
          <i class="icon_mine" @click="loginCheck"></i><i class="icon_share" @click="share(false)"></i>
        </div>
        <div class="heaer_center">
          <span class="logo"><img src="./images/logo_sina@2x.png" alt=""></span>
          <p class="title">· {{channelInfo.channelName}} ·</p>
        </div>
        <div class="header_r">
          <a href="javascript:;" class="btn_down" @click="dowloadApp">下载 <b>APP</b></a>
        </div>
      </div>
      <div class="search_bar" v-show="!showFixTop"><router-link :to="{name:'channelSearch',params:{id:this.channelId}}"><i></i>搜索医生/医院/文章</router-link></div>
      <div class="fixHeader animated fadeIn" v-show="showFixTop">
        <i class="icon_mine" @click="loginCheck"></i>
        <div class="search_bar"><router-link :to="{name:'channelSearch',params:{id:this.channelId}}"><i></i>搜索医生/医院/文章</router-link></div>
        <i class="icon_share" @click="share(false)"></i>
      </div>
    </div>
    
    <div slot="page_container" class="page_container">
      <!-- 热搜词 start-->
      <div class="hot_wrods" v-if="(channelInfo.channelHotSearch||[]).length>0">
        <span v-for="(item,index) in channelInfo.channelHotSearch" :key="index"><router-link :to="{name:'channelSearch',params:{id:channelId},query:{keywords:item.name}}">{{item.name}}</router-link></span>
      </div>
      <!-- 热搜词 end -->

      <!-- banner start -->
      <div class="banner" v-if="(channelInfo.channelBanner||[]).length>1">
        <swiper :options="bannerSwiperOption" ref="bannerSwiper">
          <swiper-slide v-for="(item,index) in channelInfo.channelBanner" :key="index">
            <div class="banner_img">
              <a :href="item.url" v-if="item.url" target="_blank">
                <img :src="item.pic">
              </a>
              <a href="javascript:void(0);" v-else>
                <img :src="item.pic">
              </a>
            </div>
          </swiper-slide>
          <!-- Add Pagination -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="banner" v-else-if="(channelInfo.channelBanner||[]).length==1">
        <div class="banner_img" v-for="(item,index) in channelInfo.channelBanner" :key="index">
          <a :href="item.url||'javascript:void(0);'">
            <img :src="item.pic">
          </a>
        </div>
      </div>
      <!-- banner end -->

      <!-- 医生推荐 -->
      <div class="box_wrapper top10" v-if="(channelInfo.channelDoctor||[]).length>0">
        <div class="common_hd">
          <h3>医生推荐</h3>
          <router-link :to="{name:'channelDoctorList',params:{id:channelId},query:{channelName:channelInfo.channelName}}"  class="toMore"></router-link>
        </div>
        <div class="common_bd">
          <div class="doctor_wrapper">
            <swiper :options="doctorSwiperOption" ref="mySwiper1">
              <swiper-slide v-for="(item,index) in channelInfo.channelDoctor" :key="index">
                <router-link :to="{name:'docIndex',params:{dId:item.contentId},query:{'resource':'channel'}}">
                  <div class="doctor_card">
                    <div class="doc_info">
                      <dl>
                        <dt>{{item.name}}</dt>
                        <dd>{{item.title}}</dd>
                      </dl>
                      <div class="img"><img v-lazy="GET_IMG_URL(item.doctorInfo?item.doctorInfo.doctorPhoto:'','doc')" alt=""></div>
                    </div>
                    <p class="goodat" v-if="item.sicknessExpertise||item.areasOfExpertise">擅长：{{item.sicknessExpertise||item.areasOfExpertise}}</p>
                  </div>
                </router-link>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
      <!-- 医生推荐 end -->

      <!-- 医院推荐 start -->
      <div class="box_wrapper top10" v-if="(channelInfo.channelHospital||[]).length>0">
        <div class="common_hd">
          <h3>医院推荐</h3>
          <a :href="`${COMTY_URL}comty/list`" class="toMore"></a>
          <!-- <router-link :to="{name:'channelHospitalList',params:{id:channelId},query:{channelName:channelInfo.channelName}}"  class="toMore"></router-link> -->
        </div>
        <div class="common_bd">
          <div class="hospital_list">
            <ul>
              <li v-for="(item,index) in channelInfo.channelHospital" :key="index">
                <!-- <hospital-cell :hospital="item" :cName="channelInfo.channelName"></hospital-cell> -->
                <comty-cell :hospital="item" :cName="channelInfo.channelName"></comty-cell>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 医院推荐 end -->

      <!-- 专栏推荐 start -->
      <div class="box_wrapper top10" v-if="(channelInfo.channelColumn||[]).length>0">
        <div class="common_hd">
          <h3>专栏推荐</h3>
          <router-link :to="{name:'channelColumnList',params:{id:channelId}}"  class="toMore"></router-link>
        </div>
        <div class="common_bd">
          <div v-for="(item,index) in channelInfo.channelColumn" :key="index" class="columnItem">
            <column-cell :column="item" :showComty="false"></column-cell>
          </div>
        </div>
      </div>
      <!-- 专栏推荐 end -->

      <!-- 热门帖子 -->
      <div class="box_wrapper top10" v-if="(channelInfo.channelPost||[]).length>0">
        <div class="common_hd">
          <h3>热门帖子</h3>
          <router-link :to="{name:'channelPostList',params:{id:channelId}}"  class="toMore"></router-link>
        </div>
        <div class="common_bd">
          <div class="doctor_wrapper post_wrapper">
            <swiper :options="(channelInfo.channelPost||[]).length<3?postSwiperOption1:postSwiperOption" ref="postSwiper">
              <swiper-slide v-for="(item,index) in channelInfo.channelPost" :key="index">
                <div class="post_card">
                  <router-link :to="{name:'channelPostDetail',params:{id:channelId},query:{id:item.contentId}}">
                    <dl>
                      <dt>{{item.title}}</dt>
                      <dd>{{item.comments}}回答</dd>
                    </dl>
                  </router-link>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
      <!-- 热门帖子 end -->

      <!-- 推广配图 start -->
      <div class="ad_box clearfix" v-if="(channelInfo.channelSpread||[]).length>0">
        <div class="ad_item" v-for="(item,index) in channelInfo.channelSpread.slice(0,2)" :key="index">
          <a :href="item.url" v-if="item.url" target="_blank"><img v-lazy="GET_IMG_URL(item.pic)" alt=""></a>
          <a href="javascript:void(0);" v-else><img v-lazy="GET_IMG_URL(item.pic)" alt=""></a>
        </div>
      </div>
      <!-- 推广配图 end -->

      <!-- 在线课堂 -->
      <div class="box_wrapper top10" v-if="(channelInfo.channelClass||[]).length>0">
        <div class="common_hd">
          <h3>在线课堂</h3>
          <router-link :to="{name:'channelClassList',params:{id:channelId},query:{channelName:channelInfo.channelName}}"  class="toMore"></router-link>
        </div>
        <div class="common_bd">
          <div class="subject_box">
            <ul class="clearfix">
              <li v-for="(item,index) in channelInfo.channelClass" :key="index">
                <router-link :to="{name:'channelClassDetail',params:{id:channelId},query:{id:item.id}}">
                  <div class="img">
                    <img v-lazy="GET_IMG_URL(item.videoCover)" alt="">
                    <i class="icon_play"></i>
                    <p>
                      <span class="author">主讲人:{{item.publisher}}</span>
                      <!-- <span class="time">21:45</span> -->
                    </p>
                  </div>
                  <dl>
                    <dt>{{item.title}}</dt>
                    <dd v-if="!IS_IWEN_COMTY(item.comtyId)">来自 {{item.comtyName}}</dd>
                  </dl>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 在线课堂 end-->

      <!-- 健康专题 -->
      <div class="box_wrapper top10 " v-if="(channelInfo.channelSubject||[]).length>0">
        <div class="common_hd">
          <h3>健康专题</h3>
          <router-link :to="{name:'channelSubjectList',params:{id:channelId},query:{channelName:channelInfo.channelName}}"  class="toMore"></router-link>
        </div>
        <div class="common_bd">
          <div class="subject_box">
            <ul class="clearfix">
              <li v-for="(item,index) in channelInfo.channelSubject.slice(0,2)" :key="index">
                <router-link :to="{'name':'channelSubjectDetail',params:{id:channelId},query:{id:item.contentId}}">
                  <div class="img">
                    <img v-lazy="GET_IMG_URL(item.logo)" alt="">
                  </div>
                  <dl>
                    <dt>{{item.title}}</dt>
                    <dd v-if="!IS_IWEN_COMTY(item.communityId)">来自 {{item.community}}</dd>
                  </dl>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 健康专题 end-->

      <!-- 健康科普 -->
      <div class="box_wrapper top10" v-if="(channelPaper||[]).length>0">
        <div class="common_hd">
          <h3>健康科普</h3>
          <router-link :to="{name:'channelArticleList',params:{id:channelId},query:{channelName:channelInfo.channelName}}"  class="toMore"></router-link>
        </div>
        <div class="common_bd">
          <div class="article_wrapper">
            <ul class="articleList">
              <li v-for="(item,index) in channelPaper" :key="index">
                <article-cell :article="item"></article-cell>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 健康科普 end-->

      <!-- 案例分析 start -->
      <div class="box_wrapper top10 " v-if="(channelInfo.channelCase||[]).length>0">
        <div class="common_hd">
          <h3>案例分析</h3>
          <router-link :to="{name:'channelCaseList',params:{id:channelId},query:{channelName:channelInfo.channelName}}"  class="toMore"></router-link>
        </div>
        <div class="common_bd">
          <div class="case_wrapper">
            <ul class="case_list">
              <li v-for="(item,index) in channelInfo.channelCase" :key="index">
                <case-cell :caseItem="item" :isIndex="true" :index="index"></case-cell>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 案例分析 end -->
    </div>
    <div slot="page_footer">
      <div class="bottom">- 这是我的底线 -</div>
      <!-- <loading-page v-show="loading"></loading-page> -->
    </div>
    <div slot="page_layer">
      <!-- 分享 -->
      <m-share :show.sync="isShare" :config="shareConfig"></m-share>
    </div>
  </layout>
</template>
<script>
import {commonMixin,toTopMixin,shareMixin} from "@/mixins";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import {USER_CENTER_URL,COMTY_URL} from "@/config";
import platformLogin from "@/common/platformFn";
import articleCell from "../../components/article_cell/article_cell";
import caseCell from "../../components/case_cell/case_cell";
import hospitalCell from "../../components/hospital_cell/hospital_cell";
import comtyCell from "../../components/comty_cell/comty_cell";
import columnCell from "../../components/column_cell/column_cell";
import share from "@/iwen/share-all/share.vue"; //分享
import channelService from "@/services/channelService.js";
export default {
  name: "channel",
  mixins: [commonMixin, toTopMixin,shareMixin],
  components: {
    swiper,
    swiperSlide,
    articleCell,
    caseCell,
    hospitalCell,
    comtyCell,
    columnCell,
    mShare: share  //分享
  },
  data() {
    return {
      USER_CENTER_URL,
      COMTY_URL,
      channelId:"",
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
      },
      doctorSwiperOption: {
        observer: true,
        observeParents: true,
        loop: false,
        slidesPerView: 2.1,
        spaceBetween: 10
      },
      postSwiperOption: {
        observer:true,
        observeParents:true,
        loop: true,
        autoplay: false,
        slidesPerView: "auto",
        slidesPerColumn: 1,
        spaceBetween: 0,
        speed:500,
      },
      postSwiperOption1: {
        observer: true,
        observeParents: true,
        loop: false,
        slidesPerView: 2.2,
        spaceBetween: 2
      },
      channelInfo:{},
      channelPaper:[],
      showFixTop:false,
      //分享
      isShare: false,
      shareConfig: {},
      loading:false,
    };
  },
  computed: {},
  created() {
    this.channelId=this.$route.params.id;
    this.getIndexConfiguration();
  },
  mounted() {
    let _this=this;
    this.$nextTick(function() {
      // var el = $(this.$refs.topBar);
      // var tabTop = el.position().top;// var tabTop = el.offset().top;
      // var tabH = el.height();
      //滚动条事件
      let wrapper_inner = $(this.getScrollEle());
      
      wrapper_inner.scroll(function() {
        //获取滚动条的滑动距离
        var scroH = wrapper_inner.scrollTop();
        // console.log(scroH);
        //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
        // if (scroH -160 >= tabTop) {
        if (scroH > 10) {
          _this.showFixTop=true;
        } else {
          _this.showFixTop=false;
        }
      });
    });
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
        id: this.channelId,
        type: "channelIndex",
        title: `【${this.channelInfo.channelName}】健康频道，健康你我他 - 来自新浪健康`,
        content: "",
        imgUrl: this.channelInfo.channelLogo
      };
    },
    //获取添加滚动事件的元素
    getScrollEle() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      var scrollEle = null;
      if (isiOS&&platformInfo.isWeibo) {
        scrollEle = "#wrapper__inner";
      } else {
        scrollEle = window;
      }
      return scrollEle;
    },
    //进个人中心
    loginCheck(){
      if(!this.VX_islogin){
        this.goLogin(this.USER_CENTER_URL);
      }else{
        this.$router.push({
          name:"Mine"
        });
      }
    },
    goLogin(refer){
      platformLogin(refer);
    },
    //获取首页配置
    getIndexConfiguration(){
      if(this.loading) return;
      this.loading = true;
      let _this=this;
      let data={
        id:this.channelId,
      };
      channelService.getIndexConfiguration(data).then(res => {
        this.loading = false;
        if (res.status == 200) {
          this.channelInfo=res.data;
          this.SET_PAGE_TITLE(res.data.channelName);
          let articleList=[];
          if(res.data.channelPaper){
            res.data.channelPaper.map((item,index) => {
              let images = _this.getArticleImages(item.content);
              articleList.push({
                ...item,
                art_images: images.slice(0,3)
              });
            });
            this.channelPaper=articleList;
          };
          if(res.data.channelColumn){
            res.data.channelColumn=res.data.channelColumn.map((item,index) => {
              return {
                ...item,
                id:item.contentId,
              };
            });
          };
        }
      }).finally(() => {
        this.share(true);//分享
      });
    },
    //获取文章图片
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
    //下载
    dowloadApp() {
      console.log("xiazai");
      try {
        iwenJSNativeBridge.openApp();
      } catch (e) {
        console.log("catch");
        this.$router.push({
          name:"appDownload"
        });
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>

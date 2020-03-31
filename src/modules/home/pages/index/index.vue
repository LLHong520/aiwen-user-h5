<template>
  <layout :tabbarSwitch="true">
    <!-- page_header -->
    <div slot="page_header">
      <!-- 非国庆 -->
      <div v-if="!isChRedDay" class="home_header_wrapper">
        <div class="home_header">
          <div class="logo"><img src="./images/logo_sina@2x.png" alt=""></div>
          <div class="search_box">
            <input autocomplete="off" @focus="search_btn" type="needsclick text" placeholder="搜索医生/文章">
          </div>
          <div class="down_load">
            <ad-app :isIndex="true"></ad-app>
          </div>
        </div>
      </div>
      <!-- 非国庆 -->
      <ch-red-header v-else />
    </div>

    <div slot="page_container" class="app_wrapper_inner">
      <!-- 活动轮播广告banner -->
      <!-- <div v-show="!isResize">
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
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="placeHolder" v-if="latestAct.length==0"></div> -->
      <!-- /活动轮播广告banner -->
      <!-- APPbanner 与 H5banner同步 -->
      <swiper :options="bannerOption" ref="bannerSwiper" v-if="appIndexBanners.length>0">
        <swiper-slide v-for="(list,index) in appIndexBanners" :key="index">
          <div class="banner_img">
            <a :href="list.linkUrl">
              <img :src="list.imgUrl" :alt="list.linkUrl">
            </a>
          </div>
        </swiper-slide>
        <!-- Add Pagination -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <!-- /APPbanner 与 H5banner同步 -->
      <!-- 文章列表 -->
      <div class="common_box article_box">
        <div class="common_bd">
          <ul class="articleList" v-if="indexArticleList.length>0">
            <template v-for="(item,index) in indexArticleList">
              <li v-if="item.advert=='1'&&item.art_images.length<3" :key="index">
                <!-- 纯文本诊间日记 -->
                <textDairyCell v-if="item.contentType==2" :article="item"></textDairyCell>
                <a v-else :href="GET_ARTICLE_URL(item.id,item.contentType)">
                  <div class="info">
                    <dl>
                      <dt>{{item.title}}</dt>
                      <dd class="author_bar">
                        <span class="author_depart">{{item.deptName}}</span>&nbsp;·&nbsp;<span
                          class="author_name">{{item.drUserName}}</span>
                      </dd>
                    </dl>
                  </div>
                  <div class="img_box" v-if="item.picName||''!=''"><img v-lazy="GET_IMG_URL(item.picName)" alt=""></div>
                </a>
              </li>
              <li v-else-if="item.advert=='1'&&item.art_images.length>=3" :key="index">
                <a :href="GET_ARTICLE_URL(item.id,item.contentType)">
                  <div class="info_wrap">
                    <div class="tit">{{item.title}}</div>
                    <div class="img_list clearfix">
                      <div class="img_item" v-for="(image,imgIdx) in item.art_images" :key="imgIdx" v-if="imgIdx<3">
                        <span><img v-lazy="GET_IMG_URL(image)" alt=""></span></div>
                    </div>
                    <div class="author_bar">
                      <span class="author_depart">{{item.deptName}}</span>&nbsp;·&nbsp;<span
                        class="author_name">{{item.drUserName}}</span>
                    </div>
                  </div>
                </a>
              </li>
              <li v-else :key="index">
                <a :href="item.linkURL" class="activity_card">
                  <div class="img_card">
                    <img v-lazy="GET_IMG_URL(item.picId)" alt="">
                  </div>
                </a>
              </li>
            </template>

          </ul>
          <loadingPlaceHolder type="article" v-else v-for="n in 4" :key="n.key"></loadingPlaceHolder>
        </div>
        <loading-btn :loading="articleLoading" :title="articleLoadingText"
          v-if="!articleIsEnd&&indexArticleList.length>0" :scroll_load="true" @loadFn="getInformationStream">
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
  import {
    swiper,
    swiperSlide
  } from "vue-awesome-swiper";
  import copyright from "@/components/copyright/copyright";
  import loadingPlaceHolder from "@/components/loading-place-holder/loading-place-holder";
  import loadingBtn from "@/components/loading-btn/loading-btn";
  import {
    commonMixin,
    toTopMixin
  } from "@/mixins";
  import homeService from "@/services/homeService.js";
  import sysService from "@/services/sysService.js";
  import adApp from "@/components/ad-app/ad_app";
  import chRedHeader from "../../components/ch-red-header";
  import textDairyCell from "@/modules/health/components/text_dairy_cell";
  export default {
    name: "index",
    mixins: [commonMixin, toTopMixin],
    data() {
      return {
        CW_ACT,
        MOMENT_URL,
        FORUM_URL,
        isChRedDay: true,
        indexArticleList: [],
        articleList: [],
        curPage: 0,
        pageCount: 1,
        articleLoading: false,
        articleLoadingText: "加载更多",
        articleIsEnd: false,
        actInfo: null,
        actInfo_loading: false,
        isResize: false,
        adIndex: 0,
        appIndexBanners: [],
        latestAct: [],
        bannerSwiperOption: {
          observer: true,
          observeParents: true,
          loop: true,
          autoplay: {
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: true
          },
          initialSlide: 0,
          spaceBetween: 0,
          pagination: {
            el: ".swiper-pagination"
          },
          on: {
            // 使用es6的箭头函数，使this指向vue对象
            resize: () => {
              // 通过$refs获取对应的swiper对象
              let swiper = this.$refs.bannerSwiper.swiper;
              swiper.autoplay.stop();
              swiper.autoplay.start();
            }
          },
          // init:false,
        },
        bannerSwiperOption1: {
          observer: true,
          observeParents: true,
          loop: false,
          autoplay: false,
          initialSlide: 0,
          spaceBetween: 0,
          pagination: {
            el: ".swiper-pagination"
          },
          on: {
            // 使用es6的箭头函数，使this指向vue对象
            resize: () => {
              // 通过$refs获取对应的swiper对象
              let swiper = this.$refs.bannerSwiper.swiper;
              swiper.autoplay.stop();
              swiper.autoplay.start();
            }
          },
          // init:false,
        },
        bannerSwiperBigOption: {
          observer: true,
          observeParents: true,
          loop: true,
          autoplay: {
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: true
          },
          initialSlide: 0,
          spaceBetween: 15,
          slidesOffsetBefore: -200,
          // slidesOffsetAfter: -100,
          slidesPerView: 2,
          pagination: {
            el: ".swiper-pagination"
          },
          on: {
            // 使用es6的箭头函数，使this指向vue对象
            resize: () => {
              // 通过$refs获取对应的swiper对象
              let swiper = this.$refs.bannerSwiperBig.swiper;
              swiper.autoplay.stop();
              swiper.autoplay.start();
            }
          },
          // init:false
        },
      };
    },
    components: {
      loadingBtn,
      copyright,
      loadingPlaceHolder: loadingPlaceHolder,
      adApp,
      chRedHeader,
      swiper,
      swiperSlide,
      textDairyCell
    },
    created() {
      if (this.VX_islogin) {
        this.$store.dispatch("update_userinfo");
      }
      let HomeData = window.sessionStorage.getItem("HomeData");
      if (HomeData != null) {
        HomeData = JSON.parse(HomeData);
        for (const key in HomeData) {
          this[key] = HomeData[key];
        }
      } else {
        this.getInformationStream();
      }
      //原活动banner
      // this.homeActs();
      //APP首页banner获取
      this.getAppIndexBanners();
      this.resize();
    },
    computed: {
      isSinaHost() {
        let is = true;
        if (window.location.hostname == "www.991kang.com") {
          is = false;
        }
        return is;
      },
      bannerOption() {
        if (this.latestAct.length > 1) {
          return this.bannerSwiperOption;
        } else {
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
      getAppIndexBanners() {
        let This = this;
        this.actInfo_loading = true;
        sysService.appIndexBanners({}).then(res => {
          This.actInfo_loading = false;
          if (res.status == 200 && res.data) {
            This.appIndexBanners = res.data.bannerList || [];
            This.appIndexBanners = This.appIndexBanners.filter((item)=>{
              return item.linkTo == "web";
            });
          }
        });
      },
      getArticleImages(htmlContent) {
        let dom = $("<div>" + htmlContent + "</div>");
        let images = dom.find("img");
        let imageUrls = [];
        images.map((index, el) => {
          if (el.src) {
            imageUrls.push(el.src);
          }
        });
        return imageUrls;
      },

      getInformationStream() {
        if (this.articleLoading || this.articleIsEnd) return;
        this.articleLoading = true;
        let This = this;
        let params = {
          pageNum: this.curPage + 1,
          pageSize: 10,
          advertIndex: this.adIndex,
        };
        homeService.getInformationStream(params).then(res => {
          This.articleLoading = false;
          if (res.code == 0 && res.data) {
            if (res.data.length == 0) {
              console.log("没有更多数据了");
              This.articleIsEnd = true;
              return;
            } else {
              This.articleIsEnd = false;
            }
            let articleList = [];
            res.data.map((item, index) => {
              let images = This.getArticleImages(item.content);
              // images = images.reverse();
              // images.push(item.picName);
              // images = images.reverse();
              articleList.push({
                ...item,
                art_images: images
              });
            });
            This.curPage += 1;
            // This.pageCount = res.page.totalPages;
            This.indexArticleList = This.indexArticleList.concat(articleList);
            let indexArticleList = This.indexArticleList;
            This.indexArticleList = indexArticleList;
            if (res.data[res.data.length - 1].advert == "0") {
              This.adIndex = res.data[res.data.length - 1].position;
            } else {
              This.adIndex = "";
            }

            // console.log(this);
            window.sessionStorage.setItem("HomeData", JSON.stringify(this._data));
            // let HomeData = window.sessionStorage.getItem("HomeData");
            // console.log(HomeData);
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
      resize() {

        let _this = this;
        if (document.body.clientWidth > 750) {
          _this.isResize = true;
          // _this.bannerSwiperBigOption.init=true;
          // mySwiper.autoplay.start();
        } else {
          _this.isResize = false;
          // _this.bannerSwiperBigOption.init=false;
        }
      }
    },
    filters: {
      formatTime(val) {
        if (val == "" || val == 0) return "";
        let timeMinSeconds = parseInt(val);

        function fix(num) {
          return num >= 10 ? num : "0" + num;
        }
        var date = new Date(timeMinSeconds);
        var month = fix(date.getMonth() + 1);
        var day = fix(date.getDate());
        var hour = fix(date.getHours());
        var minute = fix(date.getMinutes());
        return month + "-" + day + " " + hour + ":" + minute;

      }
    },
    mounted() {
      window.addEventListener("resize", this.resize);
    },
    destroyed() {
      window.removeEventListener("resize", this.resize);
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  @import "./css.less";

</style>

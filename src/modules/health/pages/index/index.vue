<template>
  <layout :curTabIndex="1" :tabbarSwitch="true">
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
    <!-- page_header -->
    <!-- page_container -->
    <div slot="page_container" class="app_wrapper_inner">
      <div class="search-doctor">
        <p class="title">支持按照疾病、科室、姓名、医院搜索医生</p>
        <div class="btn_wrapper">
          <router-link :to="{name:'famousDocs'}" class="btn btn-xl btn_color">找医生</router-link>
        </div>
      </div>
      <!-- 科室 -->
      <swiper :options="departSwiperOption" ref="departSwiper" v-if="departments.length>0&&!isResize"
        class="depart_wrapper">
        <swiper-slide v-for="(elem,index) in departments" :key="index">
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
      <!-- 轮播banner -->
      <!-- <m-swiper :autoPlay="true" :showIndicator="true" interval="2000" duration="500" v-if="bannerList.length>0">
      <m-slide v-for="(item,index) in bannerList" :key="index">
        <a :href="item.linkURL?item.linkURL:'javascript:;'" class="banner-box">
          <img :src="GET_IMG_URL(item.picId,'b')">
        </a>
      </m-slide>
    </m-swiper> -->
      <!-- 轮播banner -->
      <div class="recommend-wrapper" v-if="recomInfo.list.length>0">
        <loading-holder :loading="recomInfo.loading">
          <dl class="recommend">
            <dt class="">
              <a href="javascript:;" @click="changeRecommend" class="change">换一换</a>
              为您推荐的内容
            </dt>
            <dd class="recommend-list clearfix" v-for="(item,index) in recomInfo.list" :key="index">
              <!-- <a :href="GET_ARTICLE_URL(item.id,item.type)"> -->
              <a :href="item.linkURL">
                <div class="con-left">
                  <div class="faceImg">
                    <img v-lazy="GET_IMG_URL(item.picId,'u')" alt="用户头像" />
                  </div>
                </div>
                <div class="con-right">
                  <span class="text">{{item.title}}</span>
                  <span v-if="item.type==1" class="name">科普</span>
                  <span v-if="item.type==2" class="name">诊间日记</span>
                  <span v-if="item.type==3" class="name">病例分析</span>
                  <span v-if="item.type==4" class="name">精选专题</span>
                  <span v-if="item.type==5" class="name">在线课堂</span>
                </div>
              </a>
            </dd>
            <loadingPlaceHolder v-if="recomInfo.list.loading" v-for="n in 2" :key="n.key"></loadingPlaceHolder>
          </dl>
        </loading-holder>
      </div>
      <!-- 明星医生 -->
      <div class="box_wrapper">
        <div class="common_hd">
          <h3>明星医生</h3>
          <router-link tag="span" :to="{name:'famousDocs'}" class="toMore"></router-link>
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
      <!-- 明星医生 end-->
      <!-- 诊间日记 -->
      <div class="box_wrapper top10">
        <div class="common_hd">
          <h3>诊间日记</h3>
          <router-link tag="span" :to="{name:'heal.diary'}" class="toMore"></router-link>
        </div>
        <div class="common_bd">
          <section v-if="diaryInfo.list.length>0">
            <ul class="article_list">
              <li v-for="(article,index) in diaryInfo.list" :key="index">
                <!-- 纯文本诊间日记 -->
                <textDairyCell v-if="article.contentType==2" :article="article"></textDairyCell>
                <!-- 纯文本诊间日记 -->
                <!-- 普通文章 -->
                <a v-else :href="GET_ARTICLE_URL(article.id,2)">
                  <articleItem :article="article"></articleItem>
                </a>
                <!-- 普通文章 -->
              </li>
            </ul>
          </section>
          <loadingPlaceHolder v-if="diaryInfo.loading||diaryInfo.list.length==0" v-for="n in 2" :key="n.key">ggerge
          </loadingPlaceHolder>
        </div>
      </div>
      <!-- 诊间日记end -->
      <!-- 病例分析 -->
      <div class="box_wrapper top10">
        <div class="common_hd">
          <h3>病例分析</h3>
          <router-link tag="span" :to="{name:'heal.disAnalysis'}" class="toMore"></router-link>
        </div>
        <div class="common_bd">
          <section v-if="analysisInfo.list.length>0">
            <div class="case_item" v-for="(item,index) in analysisInfo.list" :key="index" v-if="index<2">
              <a :href="GET_ARTICLE_URL(item.id,5)">
                <div class="item_ask">
                  <em class="icon_ask">问</em>
                  <div class="txt">{{item.ucontent|removeHtmlTag}}</div>
                </div>
                <div class="item_answer">
                  <div class="img">
                    <img v-lazy="GET_IMG_URL(item.drPhoto,'u')" alt="用户头像">
                  </div>
                  <div class="txt">{{item.acontent|removeHtmlTag}}</div>
                </div>
              </a>
            </div>
          </section>
          <loadingPlaceHolder v-if="analysisInfo.loading||analysisInfo.list.length==0" v-for="n in 2" :key="n.key">
          </loadingPlaceHolder>
        </div>
      </div>
      <!-- 科普文章 -->
      <div class="box_wrapper top10">
        <div class="common_hd">
          <h3>科普文章</h3>
          <router-link tag="span" :to="{name:'heal.article'}" class="toMore"></router-link>
        </div>
        <div class="common_bd">
          <section v-if="kepuInfo.list.length>0">
            <ul class="article_list">
              <li v-for="(article,index) in kepuInfo.list" :key="index" v-if="index<2">
                <a :href="GET_ARTICLE_URL(article.id,1)">
                  <articleItem :article="article"></articleItem>
                </a>
              </li>
            </ul>
          </section>
          <loadingPlaceHolder v-if="kepuInfo.loading||kepuInfo.list.length==0" v-for="n in 2" :key="n.key">
          </loadingPlaceHolder>
        </div>
      </div>
      <!-- 科普文章end -->

      <!-- 在线课堂 -->
      <div class="box_wrapper course_box top10">
        <div class="common_hd">
          <h3>在线课堂</h3>
          <router-link tag="span" :to="{name:'heal.course'}" class="toMore"></router-link>
        </div>
        <div class="common_bd">
          <swiper :options="swiperOption" class="online-course" ref="mySwiper1">
            <swiper-slide v-for="(elem,index) in courseInfo" :key="index">
              <a :href="OUTER_LINKS.courseDetails+elem.id" class="online-course-item">
                <div>
                  <span v-if="elem.status==0" class="course-type">直播</span>
                  <span v-if="elem.status==1" class="course-type">未开始</span>
                  <span v-if="elem.status==2||elem.status==3" class="course-type">回顾</span>
                  <div class="item-avater">
                    <img v-lazy="GET_IMG_URL(elem.image)" alt="">
                  </div>
                  <div class="course-name">{{elem.title}}</div>
                </div>
              </a>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <!-- 在线课堂end -->

      <!-- 精选专题 -->
      <div class="box_wrapper top10">
        <div class="common_hd">
          <h3>精选专题</h3>
          <router-link tag="span" :to="{name:'heal.special'}" class="toMore"></router-link>
        </div>
        <div class="common_bd">
          <section>
            <ul class="index-config-navs">
              <li v-for="(elem,index) in columnInfo" :key="index">
                <router-link :to="{name:'heal.special.column',params:{id:elem.columnId}}">
                  <div class="nav-icon">
                    <img v-lazy="GET_IMG_URL(elem.columnPic)" />
                  </div>
                  <p class="nav-name">{{elem.columnName}}</p>
                </router-link>
              </li>
            </ul>
          </section>
          <section v-if="subjectsInfo.length>0">
            <ul class="hot-subjects two">
              <li v-for="(elem,index) in subjectsInfo" :key="index" class="online-course-item">
                <!-- <router-link :to="{ name: 'departInfo', params: { dId: elem.id}}"> -->
                <!-- </router-link> -->
                <a :href="GET_SPECIAL_URL(elem.id)">
                  <div class="item-avater">
                    <img :src="GET_IMG_URL(elem.image)" alt="">
                  </div>
                  <div class="course-name">{{elem.title}}</div>
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <!-- 精选专题end -->

      <!-- <div class="special-wrapper">
      <h2 class="c-title mt15">精选专题<router-link tag="span" :to="{name:'heal.special'}" class="r-icon icon-more-heal"></router-link></h2>
      <section>
        <ul class="index-config-navs">
          <li v-for="(elem,index) in columnInfo" :key="index">
            <router-link :to="{name:'heal.special.column',params:{id:elem.columnId}}">
              <div class="nav-icon">
                <img v-lazy="GET_IMG_URL(elem.columnPic)"/>
              </div>
              <p class="nav-name">{{elem.columnName}}</p>
            </router-link>
          </li>
        </ul>
      </section>
      <section v-if="subjectsInfo.length>0">
        <ul class="online-course">
          <li v-for="(elem,index) in subjectsInfo" :key="index" class="online-course-item card-shadow-s">
            <a :href="GET_SPECIAL_URL(elem.id)">
              <div class="item-avater">
                <img :src="GET_IMG_URL(elem.image)" alt="">
              </div>
              <div class="course-name">{{elem.title}}</div>
            </a>
          </li>
        </ul>
      </section>
    </div> -->
    </div>
    <!-- /page_container -->
    <!-- page_footer -->
    <div slot="page_footer">
      <to-top></to-top>
      <loading-page v-show='initing_page'></loading-page>
    </div>
  </layout>
</template>
<script>
  // import {OUTER_LINKS} from "@/config";
  import {
    commonMixin,
    toTopMixin
  } from "@/mixins";
  import healthService from "@/services/healthService.js";
  import departService from "@/services/departService.js";
  import homeService from "@/services/homeService.js";
  import Header from "@/components/header/Header";
  import {
    mSwiper,
    mSlide
  } from "@/iwen/swiper";
  import {
    swiper,
    swiperSlide
  } from "vue-awesome-swiper";
  import loadingPlaceHolder from "@/components/loading-place-holder/loading-place-holder";
  import articleItem from "@/modules/health/components/article_item/article_item";
  import loadingHolder from "@/components/loading-holder/loading-holder";
  import textDairyCell from "@/modules/health/components/text_dairy_cell";
  // import icon_bingli from "@/assets/images/icons/icon-bingli@3x.png";
  // import icon_book from "@/assets/images/icons/icon-book@3x.png";
  // import icon_act from "@/assets/images/icons/icon-act@3x.png";
  // import icon_subject from "@/assets/images/icons/icon-subject@3x.png";
  export default {
    name: "index",
    mixins: [commonMixin, toTopMixin],
    components: {
      mHeader: Header,
      mSwiper,
      mSlide,
      articleItem,
      textDairyCell,
      loadingHolder,
      loadingPlaceHolder,
      swiper,
      swiperSlide,
    },
    data() {
      return {
        bannerList: [],
        starDoctors: [],
        recomInfo: {
          list: [],
          pageIndex: 1,
          loading: false
        },
        diaryInfo: {
          list: [],
          loading: false
        },
        analysisInfo: {
          list: [],
          loading: false
        },
        kepuInfo: {
          list: [],
          loading: false
        },
        courseInfo: [],
        columnInfo: [],
        subjectsInfo: [],
        // config_navs:[
        //   {text:"女性健康",link:"/act?dId=",link_type:0,icon:icon_act},
        //   {text:"孕妇课堂",link:OUTER_LINKS.subjectIndex+"&departId=",link_type:1,icon:icon_subject},
        //   {text:"育儿指南",link:OUTER_LINKS.caseIndex+"&departId=",link_type:1,icon:icon_bingli},
        //   {text:"诊间日记",link:OUTER_LINKS.dairyIndex+"&departId=",link_type:1,icon:icon_book},
        // ],
        departments: [],
        departs: [],
        isResize: false,
        departSwiperOption: {
          observer: true,
          observeParents: true,
          loop: true,
          autoplay: false,
          initialSlide: 0,
          spaceBetween: 0,
          pagination: {
            el: ".swiper-pagination"
          },
        },
        swiperOption: {
          observer: true,
          observeParents: true,
          loop: false,
          slidesPerView: 2.1,
          spaceBetween: 10
        },
      };
    },
    created() {
      this.load_banners();
      this.changeRecommend();
      this.getDiary();
      this.getAnalysis();
      this.getKepu();
      this.getCourse();
      this.getColumn();
      this.getSubjects();
      this.homeDepartments();
      this.getRecommendManages();
    },
    mounted() {
      window.addEventListener("resize", this.resize);
    },
    destroyed() {
      window.removeEventListener("resize", this.resize);
    },
    methods: {
      search_btn() {
        this.$router.push({
          path: "/search"
        });
      },
      getRecommendManages() {
        console.log("star");
        let This = this;
        homeService.getRecommendManages({
          position: "AWYK_INDEX",
          category: "star_doctor",
          limit: 5,
        }).then(res => {
          if (res.code == 0 && res.data) {
            This.starDoctors = res.data;
          }
        });
      },
      homeDepartments() {
        let This = this;
        departService
          .allDepartments({})  //parentId: 0
          .then(res => {
            if (res.code == 0) {
              This.departs = res.data;
              This.departments = sliceArray(res.data, 10);
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
      },
      load_banners() {
        let _this = this;
        healthService.Banners({
          moduleType: 2,
          position: 2
        }).then(res => {
          if (res.code == 0 && res.data) {
            _this.bannerList = res.data;
          }
        });
      },
      changeRecommend() {
        this.recomInfo.loading = true;
        let _this = this;
        let data = {
          position: "HEALTH_INDEX",
          category: "recommendContent",
          pageIndex: _this.recomInfo.pageIndex,
          limit: 3
        };
        healthService.heal_articles(data).then(res => {
          _this.recomInfo.loading = false;
          if (res.code == 0 && res.data) {
            if (_this.recomInfo.pageIndex == 1 && res.data.length == 0) {
              return;
            }
            if (res.data.length > 0) {
              _this.recomInfo.list = res.data;
              _this.recomInfo.pageIndex += 1;
            } else if (res.data.length == 0) {
              _this.recomInfo.pageIndex = 1;
              _this.changeRecommend();
            }
          }
        });
      },
      getDiary() {
        let This = this;
        This.diaryInfo.loading = true;
        let data = {
          position: "HEALTH_INDEX",
          category: "diary",
          pageIndex: 1,
          limit: 2
        };
        healthService.heal_articles(data).then(res => {
          This.diaryInfo.loading = false;
          if (res.code == 0 && res.data) {
            This.diaryInfo.list = res.data;
          }
        });
      },
      getAnalysis() {
        let This = this;
        This.analysisInfo.loading = true;
        let data = {
          position: "HEALTH_INDEX",
          category: "analysis",
          pageIndex: 1,
          limit: 2
        };
        healthService.heal_articles(data).then(res => {
          This.analysisInfo.loading = false;
          if (res.code == 0 && res.data) {
            This.analysisInfo.list = res.data;
          }
        });
      },
      getKepu() {
        let This = this;
        This.kepuInfo.loading = true;
        let data = {
          position: "HEALTH_INDEX",
          category: "science",
          pageIndex: 1,
          limit: 2
        };
        healthService.heal_articles(data).then(res => {
          This.kepuInfo.loading = false;
          if (res.code == 0 && res.data) {
            This.kepuInfo.list = res.data;
          }
        });
      },
      getCourse() {
        let This = this;
        let data = {
          position: "HEALTH_INDEX",
          category: "lesson",
          pageIndex: 1,
          limit: 5
        };
        healthService.heal_articles(data).then(res => {
          if (res.code == 0 && res.data) {
            This.courseInfo = res.data;
          }
        });
      },
      getColumn() {
        let This = this;
        let data = {
          position: "HEALTH_INDEX",
          category: "column",
          pageIndex: 1,
          limit: 4
        };
        healthService.heal_articles(data).then(res => {
          if (res.code == 0 && res.data) {
            This.columnInfo = res.data;
          }
        });
      },
      getSubjects() {
        let This = this;
        let data = {
          position: "HEALTH_INDEX",
          category: "subject",
          pageIndex: 1,
          limit: 2
        };
        healthService.heal_articles(data).then(res => {
          if (res.code == 0 && res.data) {
            This.subjectsInfo = res.data;
          }
        });
      },
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  @import "./css.less";

</style>

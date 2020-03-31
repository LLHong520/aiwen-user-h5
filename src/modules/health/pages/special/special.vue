<template>
    <layout>
        <!-- page_header -->
        <div slot="page_header">
          <m-header slot="page_header"  title="健康 · 专题">
            <span class="retrun" slot='left' @click="router_back">
            <b class="gray"></b>
            </span>
            <span class="retrun" slot='right'></span>
          </m-header>
        </div>
        <!-- page_header -->
        <!-- page_container -->
        <div slot="page_container" class="app_wrapper_inner">
            <!-- 轮播广告banner -->
            <m-swiper :autoPlay="true" :showIndicator="true" interval="2000" duration="500" v-if="bannerList.length>0">
              <m-slide v-for="(item,index) in bannerList" :key="index">
                <a :href="item.linkURL?item.linkURL:'javascript:;'" class="banner-box">
                  <img :src="GET_IMG_URL(item.picId,'b')">
                </a>
              </m-slide>
            </m-swiper>
            <!-- 轮播广告banner -->
            <!-- 专栏 -->
            <section>
              <ul class="plate-list clearfix">
                <li class="plate-item" v-for="(column,index) in sliceCloumn[0]" :key="index" v-if="index<7">
                  <router-link :to="{name:'heal.special.column', params: { id: column.id }}">
                      <div class="icon-wrapper">
                        <img v-lazy="GET_IMG_URL(column.columnPic)"/>
                      </div>
                      <p class="title">{{column.columnName}}</p>
                  </router-link>
                </li>
              </ul>
              <ul class="plate-list clearfix">
                <li class="plate-item" v-for="(column,index) in sliceCloumn[1]" :key="index" v-if="index<7">
                  <router-link :to="{name:'heal.special.column', params: { id: column.id }}">
                      <div class="icon-wrapper">
                        <img v-lazy="GET_IMG_URL(column.columnPic)"/>
                      </div>
                      <p class="title">{{column.columnName}}</p>
                  </router-link>
                </li>
                <li class="plate-item">
                  <router-link :to="{ name: 'heal.special.more'}">
                    <div class="icon-wrapper">
                      <img :src="morePic" alt=""/>
                    </div>
                    <p class="title">更多</p>
                  </router-link>
                </li>
              </ul>
            </section>
            <!-- 热门推荐 -->
            <div class="c-wrapper">
              <h2 class="c-title">热门推荐<span class="piece"></span></h2>
              <section class="border-lan pb10" v-if="specialHots.length>0">
                <div class="hot-subjects">
                  <a :href="GET_SPECIAL_URL(specialHots[0].id)">
                    <div class="item-banner">
                      <img v-if="specialHots[0].userCoverPicture" :src="GET_IMG_URL(specialHots[0].userCoverPicture,'b')">
                    </div>
                    <div class="banner-name">{{specialHots[0].title}}</div>
                  </a>
                </div>
                <swiper-content :subjects="specialHotsSwiper" class="swiper-content"></swiper-content>
              </section>
            </div>
            <!-- 广告位1 -->
            <div v-if="adsSpecial1.picId" class="ads">
              <a :href="adsSpecial1.picLink?adsSpecial1.picLink:'javascript:;'">
                <img v-lazy="GET_IMG_URL(adsSpecial1.picId)"/>
                <span v-if="adsSpecial1.showSuperscript" class="ad-mark">广告</span>
              </a>
            </div>
            <!-- 女性健康 -->
            <div class="c-wrapper b-wrapper d-wrapper">
              <h2 class="c-title">{{showTitle1}}<span class="piece piece4"></span></h2>
              <section class="panel-wrapper">
                <div  v-for="(item,index) in womanHealth" :key="index" class="hot-subjects" v-if="index<1">
                  <a :href="GET_SPECIAL_URL(item.id)">
                    <div class="item-banner">
                      <img v-if="item.userCoverPicture" v-lazy="GET_IMG_URL(item.userCoverPicture,'b')" alt="">
                    </div>
                    <div class="banner-name">{{item.title}}</div>
                  </a>
                </div>
                <!-- <section v-if="womanArray.length>0"> -->
                <div >
                  <ul class="online-course clearfix">
                    <li v-for="(elem,index) in womanHealth" :key="index" v-if="index>0">
                      <a :href="GET_SPECIAL_URL(elem.id)">
                        <div class="item-avater">
                          <img v-if="elem.userCoverPicture" v-lazy="GET_IMG_URL(elem.userCoverPicture,'b')">
                        </div>
                        <div class="course-name card-shadow-s"><p>{{elem.title}}</p></div>
                      </a>
                    </li>
                  </ul>
                </div>
              </section>
              <!-- </section> -->
            </div>
            <!-- 男性健康 -->
            <div class="c-wrapper b-wrapper d-wrapper">
              <h2 class="c-title">{{showTitle2}}<span class="piece piece2"></span></h2>
              <section class="panel-wrapper">
              <div  v-for="(item,index) in manHealth" :key="index" class="hot-subjects" v-if="index<1">
                <a :href="GET_SPECIAL_URL(item.id)">
                  <div class="item-banner">
                    <img v-if="item.userCoverPicture" v-lazy="GET_IMG_URL(item.userCoverPicture,'b')">
                  </div>
                  <div class="banner-name">{{item.title}}</div>
                </a>
              </div>
              <!-- <section v-if="manArray.length>0"> -->
                <!-- <div v-for="(item,index) in manArray" :key="index"> -->
                <div>
                  <ul class="online-course clearfix">
                    <li v-for="(elem,index) in manHealth" :key="index" v-if="index>0">
                      <a :href="GET_SPECIAL_URL(elem.id)">
                        <div class="item-avater">
                          <img v-if="elem.userCoverPicture" v-lazy="GET_IMG_URL(elem.userCoverPicture,'b')">
                        </div>
                        <div class="course-name card-shadow-s"><p>{{elem.title}}</p></div>
                      </a>
                    </li>
                  </ul>
                </div>
              </section>
              <!-- </section> -->
            </div>
          <!-- 广告位2 -->
          <div v-if="adsSpecial2.picId" class="ads">
            <a :href="adsSpecial2.picLink?adsSpecial2.picLink:'javascript:;'">
              <img :src="GET_IMG_URL(adsSpecial2.picId)"/>
              <span v-if="adsSpecial2.showSuperscript" class="ad-mark">广告</span>
            </a>
          </div>
          <!-- 全部专题 -->
            <div class="c-wrapper b-wrapper">
              <h2 class="c-title">全部专题<span class="piece piece3"></span></h2>
              <!-- <section v-if="totalSpecial.length>0"> -->
              <!-- <div v-for="(item,index) in totalArray" :key="index"> -->
              <div>
                <ul class="online-course clearfix">
                  <li v-for="(elem,index) in totalSpecial" :key="index" class="online-course-item">
                    <a :href="GET_SPECIAL_URL(elem.id)">
                      <div class="item-avater">
                        <img v-if="elem.userCoverPicture" v-lazy="GET_IMG_URL(elem.userCoverPicture,'b')" >
                      </div>
                      <div class="course-name card-shadow-s">
                        <p>{{elem.title}}</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <loading-btn
                class="mt10"
                :loading="loading_articleInfo"
                :title="loading_text"
                @loadFn="load_totalSpecial"
                :scroll_load="true">
              </loading-btn>
              <!-- </section> -->
              <no-result v-if="!loading_articleInfo && totalSpecial.length == 0">
                <div class="no-art-icon" slot="iconImg"></div>
                <p class="no-result-text" slot="text">暂无文章，敬请期待</p>
              </no-result>
            </div>
        </div>
        <!-- /page_container -->
        <!-- page_footer -->
        <div  slot="page_footer">
            <!--<health-back-btn></health-back-btn>&lt;!&ndash; 回到健康 &ndash;&gt;-->
            <to-top></to-top>
            <loading-page v-show='initing_page'></loading-page>
        </div>
    </layout>
</template>
<script>
  import Header from "@/components/header/Header";
  import { mSwiper, mSlide } from "@/iwen/swiper";
  // import healthBackBtn from "@/modules/health/components/health_back_btn/health_back_btn";
  import loadingBtn from "@/components/loading-btn/loading-btn";
  import noResult from "@/components/no-result/no-result";
  import { commonMixin, toTopMixin} from "@/mixins";
  import articleCell from "@/modules/health/components/article_cell/article_cell";
  import swiperContent from "@/modules/health/components/swiper-content/swiper-content";
  import healthService from "@/services/healthService.js";
  import morePic from "@/assets/images/specialCloumn/column-08.png";
  export default {
    name: "index",
    mixins:[commonMixin,toTopMixin],
    data () {
      return {
        morePic,
        bannerList:[],
        sevenColumn: [],
        sliceCloumn: [],
        specialHots:[],
        manHealth:[],
        manArray:[],
        womanHealth:[],
        womanArray:[],
        adsSpecial1:{},
        adsSpecial2:{},
        totalSpecial:[],
        totalArray:[],
        titleInfo:{},
        articleInfo:[],
        showLoadMore:true,
        loading_articleInfo:false,
        loading_text:"加载更多",
        show_noResult:false,
        nowPage:1,
        showTitle1:"",
        showTitle2:"",
      };
    },
    computed:{
      specialHotsSwiper(){
        return this.specialHots.slice(1);
      }
    },
    components:{
      mHeader:Header,
      mSwiper,
      mSlide,
      loadingBtn,
      // healthBackBtn,
      articleCell,
      swiperContent,
      noResult
    },
    created(){
      this.load_banners();
      this.load_column();
      this.load_hot();
      this.load_ads();
      this.load_totalSpecial();
    },
    methods:{
      load_banners(){
        let _this=this;
        healthService.Banners({
          moduleType:2,
          position:7
        }).then((res)=>{
          if(res.code==0&&res.data){
            _this.bannerList=res.data;
          }
        });
      },
      load_ads(){
        let _this=this;
        //ad1
        healthService.adsSpecial({
          pageType: "T07",
          category:"C701",
          position:7,
          // province:"广东",
          // city:"深圳",
        }).then(res => {
          if (res.code == 0 && res.data) {
            _this.adsSpecial1 = res.data;
          }
        });
        //ad2;
        healthService.adsSpecial({
          pageType: "T07",
          category:"C701",
          position:8,
          // province:"广东",
          // city:"深圳",
        }).then(res => {
          if (res.code == 0 && res.data) {
            _this.adsSpecial2 = res.data;
          }
        });
      },
      load_women_health(showId1){
        let _this=this;
        healthService.manHealth({columnId: showId1,}).then(res => {
          if (res.code == 0 && res.data) {
            _this.womanHealth = res.data;
          }
          // _this.womanArray = window.sliceArray(_this.womanHealth.slice(1),2);
        });
      },
      load_men_health(showId2){
        let _this=this;
        healthService.manHealth({columnId: showId2},).then(res => {
          if (res.code == 0 && res.data) {
            _this.manHealth = res.data;
          }
          // _this.manArray = window.sliceArray(_this.manHealth.slice(1),2);
        });
      },
      load_column(){
        let _this = this;
        healthService.sevenColumn({}).then(res => {
          if (res.code == 0 && res.data) {
            _this.sevenColumn=res.data;
            _this.sliceCloumn = window.sliceArray(_this.sevenColumn, 4);
            let showId1 = res.data[0].id;
            let showId2 = res.data[1].id;
            _this.showTitle1 = res.data[0].columnName;
            _this.showTitle2 = res.data[1].columnName;
            _this.load_women_health(showId1);
            _this.load_men_health(showId2);
          }
        });
      },
      load_hot(){
        let _this = this;
        healthService.specialHots({}).then(res => {
          if (res.code == 0 && res.data) {
            _this.specialHots = res.data;
          }
        });
      },
      load_totalSpecial(){
        if (this.loading_articleInfo || !this.showLoadMore) return;
        this.loading_articleInfo = true;
        let _this = this;
        let data = {
          curpage: _this.nowPage,
          pageNum: 8
        };
        healthService.totalSpecial(data).then(res => {
          _this.loading_articleInfo = false;
          if (res.code == 0 && res.data.result) {
            _this.totalSpecial=_this.totalSpecial.concat(res.data.result);
            // _this.totalArray = window.sliceArray(_this.totalSpecial,2);
            _this.nowPage += 1;
            let pageCount = Math.ceil(res.data.totalCount / data.pageNum);
            if (_this.nowPage > pageCount) {
              _this.showLoadMore = false;
              _this.loading_text = "你触碰到了我的底线，所以拉不动了";
            } else {
              _this.showLoadMore = true;
            }
          }else{
            _this.showLoadMore = false;
            _this.loading_text = "没有更多内容了";
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
    @import './css.less';
</style>

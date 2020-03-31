<template>
<layout :curTabIndex="1">
  <!-- page_header -->
  <div slot="page_header">
    <m-header slot="page_header"  title="健康 · 科普文章">
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
          <img :src="GET_IMG_URL(item.picId,'b')"  width="100%">
        </a>
      </m-slide>
    </m-swiper>
    <!-- 轮播广告banner -->
    <!-- 专栏 -->
    <!-- <section>
      <ul class="plate-list clearfix">
        <li class="plate-item" v-for="(column,index) in columnInfo" :key="index">
          <router-link :to="{ name: 'heal.article.cloumn', params: { id: column.columnId }}">
            <div class="icon-wrapper">
              <img :src="GET_IMG_URL(column.columnPic,'b')" alt=""/>
            </div>
            <p class="title">{{column.columnName}}</p>
          </router-link>
        </li>
        <li class="plate-item">
          <router-link :to="{ name: 'heal.article.more' }">
            <div class="icon-wrapper">
              <img :src="GET_IMG_URL('','b')" alt=""/>
            </div>
            <p class="title">更多</p>
          </router-link>
        </li>
      </ul>
    </section> -->
    <div class="science-cloumn">
      <special-cloumn
      :cloumnRouterName="routerName"
      :moreCloumnRouterName="moreRouterName"
      :listNum = "4"
      >
      </special-cloumn>
    </div>
    <!-- 专栏 -->
    <!-- 科室tab -->
    <tab
    :show.sync="show_menu"
    :tabInfo="departments"
    :menuInfo="departments"
    :current="current"
    @menuFn="showLeftMenu"
    @chooseFn="chooseDepart">
    </tab>
    <!-- 科室tab -->
    <div>
      <section class="p10" v-if="artInfo.list.length>0">
        <ul class="article-list">
          <li v-for="(article,index) in artInfo.list" :key="index">
            <a :href="GET_ARTICLE_URL(article.id,1)">
              <articleCell :article="article"></articleCell>
            </a>
          </li>
        </ul>
        <loading-btn
          :loading="artInfo.loading"
          :title="artInfo.text"
          @loadFn="load_article"
          :scroll_load="artInfo.scroll_load">
        </loading-btn>
      </section>
      <no-result v-if="!artInfo.loading && artInfo.list.length == 0">
        <div class="no-art-icon" slot="iconImg"></div>
        <p class="no-result-text" slot="text">暂无文章，敬请期待</p>
      </no-result>
    </div>
  </div>
  <!-- /page_container -->
  <!-- page_footer -->
  <div  slot="page_footer">
    <!--<health-back-btn></health-back-btn>&lt;!&ndash; 回到健康 &ndash;&gt;-->
    <to-top></to-top><!-- 回到顶部 -->
    <loading-page v-show='initing_page'></loading-page>
  </div>
</layout>
</template>
<script>
import Header from "@/components/header/Header";
import { mSwiper, mSlide } from "@/iwen/swiper";
import Tab from "@/modules/health/components/tab_com/tab_com";
import articleCell from "@/modules/health/components/article_cell/article_cell";
// import healthBackBtn from "@/modules/health/components/health_back_btn/health_back_btn";
import specialCloumn from "@/modules/health/components/special_cloumn/special_cloumn";
import loadingBtn from "@/components/loading-btn/loading-btn";
import noResult from "@/components/no-result/no-result";
import { commonMixin, toTopMixin } from "@/mixins";
import departService from "@/services/departService.js";
import healthService from "@/services/healthService.js";

export default {
  name: "index",
  mixins: [commonMixin, toTopMixin],
  data() {
    return {
      show_menu: false,
      departments:[],
      departmentsId:[],
      current: 0,
      artInfo: {
        list: [],
        more: true,
        loading: false,
        text: "加载更多",
        nowPage: 1,
        scroll_load: false
      },
      columnInfo: [],
      routerName: "heal.article.cloumn",
      moreRouterName: "heal.article.more",
      departId: "",
      bannerList:[],
    };
  },
  components: {
    mHeader: Header,
    // healthBackBtn,
    mSwiper,
    mSlide,
    Tab,
    articleCell,
    loadingBtn,
    noResult,
    specialCloumn
  },
  created() {
    this.departId = this.$route.query.departId;
    if(this.departId == null) {
      this.departId = "";
      this.current = 0;
    };
    this.load_banners();
    this.allDepartments();
    this.load_article();
  },
  methods: {
    load_banners() {
      let _this = this;
      healthService.Banners({
        moduleType:2,
        position:5
      }).then(res => {
        if (res.code == 0 && res.data) {
          _this.bannerList = res.data;
        }
      });
    },
    allDepartments() {
      let This = this;
      departService
        .allDepartments({
          parentId: 0
        })
        .then(res => {
          if (res.code == 0 && res.data) {
            This.departments = res.data;
            var allItem={
              id:"",
              name:"全部"
            };
            This.departments.unshift(allItem);
            This.departments.forEach(item => {
              This.departmentsId.push(item.id);
            });
            This.current = This.departmentsId.indexOf(This.departId);
          }
        })
        .catch(res => {});
    },
    chooseDepart(index){
      this.departId = this.departments[index].id;
      this.current = index;
      this.$router.replace({
        name: "heal.article",
        params:{ id: this.departId },
      });
      this.artInfo={
        list: [],
        more: true,
        loading: false,
        text: "加载更多",
        nowPage: 1,
        scroll_load: false
      };
      this.load_article();
    },
    load_article() {
      if (this.artInfo.loading || !this.artInfo.more) return;
      this.artInfo.loading = true;
      let _this = this;
      let data = {
        pageIndex: _this.artInfo.nowPage,
        limit: 10,
        departId: _this.departId,
      };
      healthService.scienceList(data).then(res => {
        _this.artInfo.loading = false;
        if (res.code == 0 && res.data) {
          _this.artInfo.list = _this.artInfo.list.concat(res.data);
          _this.artInfo.nowPage += 1;
          let pageCount = Math.ceil(res.page.totalCount / data.limit);
          if (_this.artInfo.nowPage > pageCount) {
            _this.artInfo.more = false;
            _this.artInfo.scroll_load = false;
            _this.artInfo.text = "没有更多内容了";
          } else {
            _this.artInfo.more = true;
            _this.artInfo.scroll_load = true;
          }
        }else{
          _this.artInfo.scroll_load = false;
          _this.artInfo.text = "没有更多内容了";
        }
      });
    },
    showLeftMenu() {
      this.show_menu = true;
    },
  }
};
</script>

<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>


<template>
  <layout>
    <!-- page_header -->
    <div slot="page_header">
      <m-header slot="page_header" title="健康 · 诊间日记">
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
      <!-- tab -->
      <tab :currentIndex="currentIndex" :show.sync="show_menu" :tabInfo="tabInfo" :menuInfo="departments"
        @menuFn="showLeftMenu" @chooseTabFn="chooseTab" @chooseMenuFn="chooseDepart">
      </tab>
      <!-- tab -->
      <section class="p10" v-if="artInfo.list.length>0">
        <ul class="article-list">
          <li v-for="(article,index) in artInfo.list" :key="index">
            <!-- 纯文本诊间日记 -->
            <textDairyCell v-if="article.contentType==2" :article="article"></textDairyCell>
            <!-- 纯文本诊间日记 -->
            <!-- 普通文章 -->
            <a v-else :href="GET_ARTICLE_URL(article.id,2)">
              <articleCell :article="article"></articleCell>
            </a>
            <!-- 普通文章 -->
          </li>
        </ul>
        <loading-btn :loading="artInfo.loading" :title="artInfo.text" :scroll_load="true" @loadFn="load_article">
        </loading-btn>
      </section>
      <no-result v-if="!artInfo.loading&&artInfo.list.length==0">
        <div class="no-art-icon" slot="iconImg"></div>
        <p class="no-result-text" slot="text">暂无文章，敬请期待</p>
      </no-result>
    </div>
    <!-- /page_container -->
    <!-- page_footer -->
    <div slot="page_footer">
      <to-top></to-top><!-- 回到顶部 -->
      <loading-page v-show='initing_page'></loading-page>
    </div>
  </layout>
</template>
<script>
  import {
    commonMixin,
    toTopMixin
  } from "@/mixins";
  import departService from "@/services/departService.js";
  import healthService from "@/services/healthService.js";
  import Header from "@/components/header/Header";
  import {
    mSwiper,
    mSlide
  } from "@/iwen/swiper";
  import tab from "@/modules/health/components/tab_diary/tab_diary";
  import noResult from "@/components/no-result/no-result";
  import articleCell from "@/modules/health/components/article_cell/article_cell";
  import textDairyCell from "@/modules/health/components/text_dairy_cell";
  import loadingBtn from "@/components/loading-btn/loading-btn";
  export default {
    name: "Diary",
    mixins: [commonMixin, toTopMixin],
    data() {
      return {
        currentTab: "pushDate", //当前选中tab 最新
        currentDepart: "", //当前选中科室
        currentIndex: 0,
        tabInfo: ["最新", "热门"],
        departments: [],
        show_menu: false,
        artInfo: {
          list: [],
          more: true,
          loading: false,
          text: "加载更多",
          nowPage: 1
        },
        bannerList: []
      };
    },
    components: {
      mHeader: Header,
      mSwiper,
      mSlide,
      tab,
      articleCell,
      textDairyCell,
      loadingBtn,
      noResult
    },
    created() {
      this.currentDepart = this.$route.query.departId;
      if (this.currentDepart == null) {
        this.currentDepart = "";
        this.currentIndex = 0;
      };
      this.load_banners();
      this.allDepartments();
      this.load_article();
    },
    methods: {
      load_banners() {
        let _this = this;
        healthService.Banners({
          moduleType: 2,
          position: 3
        }).then((res) => {
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
            if (res.code == 0) {
              This.departments = res.data;
              var allItem = {
                id: "",
                name: "全部"
              };
              This.departments.unshift(allItem);
              for (let i = 0; i < This.departments.length; i++) {
                if (This.departments[i].id == This.currentDepart) {
                  This.currentIndex = i;
                  break;
                }
              };
            }
          })
          .catch(res => {});
      },
      chooseTab(index) {
        if (index == 0) {
          this.currentTab = "pushDate";
        } else if (index == 1) {
          this.currentTab = "hotRead";
        };
        this.artInfo = {
          list: [],
          more: true,
          loading: false,
          text: "加载更多",
          nowPage: 1
        };
        this.load_article();
      },
      chooseDepart(index) {
        this.currentDepart = this.departments[index].id;
        this.$router.replace({
          name: "heal.diary",
          params: {
            id: this.currentDepart
          }
        });
        this.artInfo = {
          list: [],
          more: true,
          loading: false,
          text: "加载更多",
          nowPage: 1
        },
        this.load_article();
      },
      load_article() {
        if (this.artInfo.loading || !this.artInfo.more) return;
        this.artInfo.loading = true;
        let _this = this;
        let data = {
          pageIndex: _this.artInfo.nowPage,
          limit: 10,
          sort: _this.currentTab,
          departId: _this.currentDepart
        };
        healthService.diaryList(data).then(res => {
          _this.artInfo.loading = false;
          if (res.code == 0 && res.data) {
            _this.artInfo.list = _this.artInfo.list.concat(res.data);
            _this.artInfo.nowPage += 1;
            let pageCount = Math.ceil(res.page.totalCount / data.limit);
            if (_this.artInfo.nowPage > pageCount) {
              _this.artInfo.more = false;
              _this.artInfo.text = "没有更多内容了";
            } else {
              _this.artInfo.more = true;
            }
          } else {
            _this.artInfo.more = false;
            _this.artInfo.text = "没有更多内容了";
          }
        });
      },
      showLeftMenu() {
        this.show_menu = true;
      }
    }
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  @import "./css.less";

</style>

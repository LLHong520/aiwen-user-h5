<template>
<layout>
  <!-- page_header -->
  <div slot="page_header">
    <m-header slot="page_header"  title="健康 · 病例分析">
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
          <img :src="GET_IMG_URL(item.picId,'b')" width="100%">
        </a>
      </m-slide>
    </m-swiper>
    <!-- 轮播广告banner -->
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
    <section class="p15" v-if="analysisInfo.list.length>0">
      <ul class="analysis_list clearfix">
        <li class="analysis_item bor_bottom_s" v-for="analysis in analysisInfo.list" :key="analysis.key">
          <a :href="GET_ARTICLE_URL(analysis.id,5)">
            <p class="con-ask" v-html="analysis.ucontent">
              <em class="ask">问</em>
            </p>
            <div class="con-card">
              <p v-html="analysis.acontent"></p>
            </div>
            <p class="con-author">
              <span class="faceImg"><img v-lazy="GET_IMG_URL(analysis.drPhoto,'u')" alt="用户头像"></span>
              <span class="title">{{ analysis.drUserName }}&nbsp;&nbsp;{{ analysis.deptName }}&nbsp;<span v-if="analysis.drTitles">|</span>&nbsp;{{ analysis.drTitles }}</span>
              <span class="mark">优质问答</span>
            </p>
          </a>
        </li>
      </ul>
      <loading-btn
        :loading="analysisInfo.loading"
        :title="analysisInfo.text"
        @loadFn="load_analysis"
        :scroll_load="true">
      </loading-btn>
    </section>
    <no-result v-if="!analysisInfo.loading && analysisInfo.list.length == 0">
      <div class="no-art-icon" slot="iconImg"></div>
      <p class="no-result-text" slot="text">暂无文章，敬请期待</p>
    </no-result>
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
import { commonMixin, toTopMixin } from "@/mixins";
import departService from "@/services/departService.js";
import healthService from "@/services/healthService.js";
// import healthBackBtn from "@/modules/health/components/health_back_btn/health_back_btn";
import Tab from "@/modules/health/components/tab_com/tab_com";
import loadingBtn from "@/components/loading-btn/loading-btn";
import noResult from "@/components/no-result/no-result";
import Header from "@/components/header/Header";
import { mSwiper, mSlide } from "@/iwen/swiper";
export default {
  name: "index",
  mixins: [commonMixin, toTopMixin],
  data() {
    return {
      show_menu: false,
      bannerList: [],
      departments:[],
      departmentsId:[],
      analysisInfo: {
        list: [],
        more: true,
        loading: false,
        text: "加载更多",
        nowPage: 1,
      },
      departId: "",
      current: 0
    };
  },
  components: {
    mHeader: Header,
    mSwiper,
    mSlide,
    Tab,
    // healthBackBtn,
    loadingBtn,
    noResult
  },
  created() {
    this.departId = this.$route.query.departId;
    if(this.departId == null) {
      this.departId = "";
      this.current = 0;
    };
    this.load_banners();
    this.allDepartments();
    this.load_analysis();
  },
  methods: {
    load_banners() {
      let _this = this;
      healthService.Banners({
        moduleType:2,
        position:4
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
      let _this = this;
      _this.departId = _this.departments[index].id;
      _this.current = index;
      this.$router.replace({
        name: "heal.disAnalysis",
        params:{ id: this.departId },
      });
      _this.analysisInfo = {
        list: [],
        more: true,
        loading: false,
        text: "加载更多",
        nowPage: 1,
      };
      _this.load_analysis();
    },
    load_analysis() {
      if (this.analysisInfo.loading || !this.analysisInfo.more) return;
      this.analysisInfo.loading = true;
      let _this = this;
      let data = {
        pageIndex: _this.analysisInfo.nowPage,
        limit: 10,
        departId: _this.departId,
      };
      healthService.disAnalysis(data).then(res => {
        _this.analysisInfo.loading = false;
        if (res.code == 0 && res.data) {
          _this.analysisInfo.list = _this.analysisInfo.list.concat(res.data);
          _this.analysisInfo.nowPage += 1;
          let pageCount = Math.ceil(res.page.totalCount / data.limit);
          if (_this.analysisInfo.nowPage > pageCount) {
            _this.analysisInfo.more = false;
            _this.analysisInfo.text = "没有更多内容了";
          } else {
            _this.analysisInfo.more = true;
          }
        }else{
          _this.analysisInfo.text = "没有更多内容了";
          _this.analysisInfo.more = false;
        }
      });
    },
    showLeftMenu() {
      this.show_menu = true;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>

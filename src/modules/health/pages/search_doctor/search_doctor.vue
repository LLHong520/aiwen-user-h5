<template>
<layout>
  <!-- page_container -->
  <div slot="page_container" class="app_wrapper_inner">
    <search-holder></search-holder>
    <div class="hot-depart-wrapper bor_bottom_l">
      <h2 class="c-title ta_l">热门科室</h2>
      <!-- <contentTitle title="热门科室"></contentTitle> -->
      <section>
        <ul class="depart-list">
          <li class="depart-item" v-for="hotdepart in hotDepartList" :key="hotdepart.key">
            <router-link :to="{name: 'famousDocs', query: { dId: hotdepart.id }}">
              <div class="icon-wrapper">
                <img :src="GET_IMG_URL(hotdepart.imgUrl,'b')" alt=""/>
              </div>
              <p class="title">{{hotdepart.name}}</p>
            </router-link>
            <!-- <a href="#">
              <div class="icon-wrapper">
                <img :src="GET_IMG_URL(hotdepart.imgUrl,'b')" alt=""/>
              </div>
              <p class="title">{{hotdepart.name}}</p>
            </a> -->
          </li>
        </ul>
      </section>
    </div>
    <div class="department-wrapper">
      <h2 class="c-title ta_l mt10">按科室查找</h2>
      <!-- <contentTitle title="按科室查找"></contentTitle> -->
      <section>
        <ul class="department-list">
          <li class="department-item bor_bottom_s" v-for="hotdepart in hotDepartList" :key="hotdepart.key">
            <router-link :to="{name: 'famousDocs', query: { dId: hotdepart.id }}">
              <div class="content">
                <p class="name">{{ hotdepart.name }}</p>
                <p class="desc ellipsis">{{hotdepart.id}}这里是科室介绍，内容详情分哈哈哈哈哈哈哈哈这里是科室介绍，内容详情分哈哈哈哈哈哈哈哈</p>
              </div>
              <span class="icon-go icon"></span>
            </router-link>
            <!-- <a href="#">
              <div class="content">
                <p class="name">五官科</p>
                <p class="desc ellipsis">这里是科室介绍，内容详情分哈哈哈哈哈哈哈哈这里是科室介绍，内容详情分哈哈哈哈哈哈哈哈</p>
              </div>
              <span class="icon-go icon"></span>
            </a> -->
          </li>
        </ul>
      </section>
    </div>
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
import {
  commonMixin,
  toTopMixin
} from "@/mixins";
import healthService from "@/services/healthService.js";
import searchHolder from "@/modules/health/components/search-holder/search-holder";
import loadingBtn from "@/components/loading-btn/loading-btn";
// import contentTitle from "@/components/content_title/content_title";
export default {
  name: "index",
  mixins: [commonMixin, toTopMixin],
  data() {
    return {
      // articleInfo: [],
      // article: {
      //   show_nums: 3,
      //   showLoadMore: true,
      //   loading_content: false,
      //   loading_text: "加载更多",
      //   show_noResult: false,
      //   nowPage: 1,
      // },
      bannerList: [],
      hotDepartList: [
        {
          imgUrl: "",
          name: "妇产科",
          id: "10800"
        },
        {
          imgUrl: "",
          name: "皮肤性病科",
          id: "11000"
        },
        {
          imgUrl: "",
          name: "儿科",
          id: "10400"
        },
        {
          imgUrl: "",
          name: "口腔科",
          id: "11600"
        },
        {
          imgUrl: "",
          name: "五官科",
          id: "10100"
        }
      ]
    };
  },
  components: {
    searchHolder,
    loadingBtn,
    // contentTitle
  },
  created() {
    this._initPage();
  },
  methods: {
    _initPage() {
      this.load_banners();
      // this.load_articleInfo();
    },
    load_banners() {
      let _this = this;
      healthService.heal_banner({})
        .then((res) => {
          if (res.code == 0) {
            _this.bannerList = res.data;
          }
        });
    },
    // load_articleInfo() {
    //   if (this.article.loading_content || !this.article.showLoadMore) return;
    //   this.article.loading_content = true;
    //   let _this = this;
    //   let data = {
    //     nowPage: _this.article.nowPage
    //   };
    //   healthService.kepuArticle(data).then((res) => {
    //     this.article.loading_content = false;
    //     if (res.code == 0 && res.data) {
    //       _this.articleInfo = _this.articleInfo.concat(res.data);
    //       _this.article.nowPage += 1;
    //       if (res.data.length < 10) {
    //         _this.article.showLoadMore = false;
    //         _this.article.loading_text = "没有更多内容了";
    //       }
    //     }
    //   }, function() {
    //     _this.article.loading_content = false;
    //     _this.article.loading_text = "加载失败";
    //   });
    // },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import './css.less';
</style>

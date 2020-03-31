<template>
  <layout class="user-center" :curTabIndex="4" :tabbarSwitch="false">
    <!-- page_header -->
    <m-header slot="page_header" title='我的收藏'>
      <span class="retrun" slot='left' @click="router_back">
        <b class="gray"></b>
      </span>
      <span class="retrun" slot='right'>
      </span>
    </m-header>
    <!-- page_header -->
    <!-- page_container -->
    <div slot="page_container" class="app_wrapper_inner">
      <!-- 文章列表 -->
      <loading-holder :loading="articles_pager.loading">
        <div v-if="articles.length>0">
          <ul class="favours_list clearfix">
            <li v-for="(item,index) in articles" :key="index">
              <!-- 收藏条目 -->
              <!-- 纯文本诊间日记 -->
              <textDairyCell v-if="item.artType==2" :article="item"></textDairyCell>
              <a v-else :href="item.artLinkUrl"  class="favours_item article" :key="item.artId">
                <div class="item-con-wrapper">
                  <div class="item_content">
                    <span v-html="item.artTitle"></span>
                  </div>
                  <div class="item_info">
                    <p class="item_name">
                      <img :src="GET_IMG_URL(item.drPhoto,'u')" alt="" />
                      {{item.authorName||'游客'}}
                    </p>
                    <p class="view_num">
                      <i class="icon-view disable"></i><span class="ml5">{{item.readCount}}</span>
                    </p>
                  </div>
                </div>
                <div class="item-article-img">
                  <img v-lazy="GET_IMG_URL(item.artImg,'u')" class="adapter" alt="" />
                </div>
              </a>
              <!-- /收藏条目 -->
            </li>
          </ul>
          <loading-btn v-if="articles_pager.totalPage>1" :loading="articles_pager.load_more_loading"
            :title="articles_pager.load_more_text" @loadFn="loadArticles">
          </loading-btn>
        </div>
        <no-result title="您没有收藏文章哇~" v-if="articles.length==0"></no-result>
      </loading-holder>
      <!-- 文章列表 -->
    </div>

    <!-- page_footer -->
    <div slot="page_footer">
      <loading-page v-show='initing_page' title="加载中..."></loading-page>
      <to-top></to-top>
    </div>
    <!-- /page_footer -->
  </layout>

</template>

<script>
  import Tab from "@/components/tab/tab";
  import {
    toTopMixin,
    commonMixin
  } from "@/mixins";
  import Header from "@/components/header/Header";
  import loadingBtn from "@/components/loading-btn/loading-btn";
  import loadingHolder from "@/components/loading-holder/loading-holder";
  import noResult from "@/components/no-result/no-result";
  import userService from "@/services/userService.js";
  import textDairyCell from "@/modules/health/components/text_dairy_cell";
  export default {
    name: "favours",
    mixins: [commonMixin, toTopMixin],
    data() {
      return {
        articles: [],
        loadServiceType: 1,
        articles_pager: {
          loading: false,
          load_more_loading: false,
          hasMore: true,
          load_more_text: "点击加载更多",
          totalCount: 0,
          totalPage: 1,
          nowPage: 0,
        }
      };
    },
    components: {
      mHeader: Header,
      noResult: noResult,
      loadingHolder: loadingHolder,
      loadingBtn: loadingBtn,
      Tab,
      textDairyCell
    },
    created() {
      this.u_id = this.VX_userInfo.id;
      this.loadArticles();
    },
    methods: {
      loadArticles() {
        if (!this.articles_pager.hasMore) return;
        let _this = this;
        let targetPageNum = this.articles_pager.nowPage + 1;
        if (targetPageNum == 1) {
          this.articles_pager.loading = true;
        } else {
          this.articles_pager.load_more_loading = true;
        }
        userService.my_favoriet_article({
          id: this.u_id,
          pageIndex: targetPageNum
        })
        .then((res) => {
          if (targetPageNum == 1) {
            _this.articles_pager.loading = false;
          }
          if (res.code == 0 && res.data) {
            _this.articles = _this.articles.concat(res.data);
            _this.articles_pager.nowPage = parseInt(res.page.pageIndex);
            _this.articles_pager.totalPage = parseInt(res.page.pageCount);
            if (targetPageNum != 1) {
              _this.articles_pager.load_more_loading = false;
            }
            //确定没有更多时
            if (_this.articles_pager.nowPage + 1 > _this.articles_pager.totalPage) {
              _this.articles_pager.load_more_text = "没有更多了";
              _this.articles_pager.hasMore = false;
            }
          }
        }, function () {
          _this.articles_pager.loading = false;
          _this.articles_pager.load_more_loading = false;
        });
      }
    },
    computed: {}
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' rel="stylesheet/less">
  @import './css.less';

</style>

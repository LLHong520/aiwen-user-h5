<template>
  <layout class="user-center" :curTabIndex="4" :tabbarSwitch="false">
    <!-- page_header -->
    <m-header slot="page_header" title='我的关注'>
      <span class="retrun" slot='left' @click="router_back">
        <b class="gray"></b>
      </span>
      <span class="retrun" slot='right'></span>
    </m-header>
    <!-- page_header -->
    <!-- page_container -->
    <div slot="page_container" class="app_wrapper_inner">
      <!-- tab切換 -->
      <Tab @changeCallBack="changeTab" :tabs="['内容','医生']" ref="tabRef"></Tab>
      <!-- /tab切換 -->
      <!-- 文章列表 -->
      <loading-holder v-if="loadServiceType==1" :loading="articles.holder_loading">
        <!-- 订阅内容条目 -->
        <section v-if="articles.list.length>0">
          <ul class="article-list">
            <li v-for="(article,s_index) in articles.list" :key="s_index">
            <!-- 纯文本诊间日记 -->
            <textDairyCell v-if="article.contentType==2" :article="article"></textDairyCell>
            <!-- 纯文本诊间日记 -->
            <!-- 普通文章 -->
              <a v-else :href="article.artLinkUrl">
                <article-cell :article="article"></article-cell>
              </a>
            <!-- 普通文章 -->
            </li>
          </ul>
          <loading-btn :loading="articles.loading" :title="articles.text" :scroll_load="true" @loadFn="loadArticles">
          </loading-btn>
          <no-result title="您没有收藏文章哇~" v-if="!articles.loading&&!articles.holder_loading&&articles.list.length==0">
          </no-result>
        </section>
        <!-- 订阅内容条目 -->
      </loading-holder>
      <!-- 文章列表 -->

      <!-- 订阅医生列表 -->
      <loading-holder v-if="loadServiceType==2" :loading="subDoc.holder_loading">
        <div v-if="subDoc.list.length>0">
          <ul>
            <li v-for="(infoItem,index) in subDoc.list" :key="index">
              <left-slider :info="infoItem" :current="index" @deleteFn="deleteItem"></left-slider>
            </li>
          </ul>
          <loading-btn :loading="subDoc.loading" :title="subDoc.text" :scroll_load="true" @loadFn="loadSubDocs">
          </loading-btn>
        </div>
        <no-result title="您没有收藏东东哇~" v-if="!subDoc.loading&&!subDoc.holder_loading&&subDoc.list.length==0"></no-result>
      </loading-holder>
      <!-- /订阅医生列表 -->
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
  import articleCell from "@/components/article_cell/article_cell";
  import leftSlider from "@/iwen/left-slider-del/left-slider-del";
  import loadingBtn from "@/components/loading-btn/loading-btn";
  import loadingHolder from "@/components/loading-holder/loading-holder";
  import noResult from "@/components/no-result/no-result";
  import textDairyCell from "@/modules/health/components/text_dairy_cell";
  import userService from "@/services/userService.js";
  export default {
    name: "subscribe",
    mixins: [commonMixin, toTopMixin],
    data() {
      return {
        articles: {
          list: [],
          loading: false,
          more: true,
          text: "点击加载更多",
          nowPage: 1,
          totalPage: 0,
          // holder_loading:false
        },
        subDoc: {
          list: [],
          loading: false,
          more: true,
          text: "点击加载更多",
          nowPage: 1,
          totalPage: 0,
          // holder_loading:false
        },
        loadServiceType: 1,
      };
    },
    components: {
      mHeader: Header,
      noResult: noResult,
      loadingBtn: loadingBtn,
      loadingHolder,
      Tab,
      textDairyCell,
      leftSlider,
      articleCell,
    },
    mounted() {},
    created() {
      this.u_id = this.VX_userInfo.id;
      this.loadArticles();
    },
    methods: {
      deleteItem(params) {
        //刪除
        let _this = this;
        let data = {
          type: "1",
          userId: _this.VX_userInfo.id,
          id: params.id
        };
        userService.my_delSub(data).then((res) => {
          if (res.code == 0) {
            _this.$toast.tip("取消订阅成功~");
            // _this.subDoc.list.splice(params.index,1);
            _this.subDoc = {
              list: [],
              loading: false,
              more: true,
              text: "点击加载更多",
              nowPage: 1,
              totalPage: 0,
              holder_loading: false
            };
            _this.loadSubDocs();
          } else {
            _this.$toast.tip("取消订阅失败了~");
          }
        });
      },
      changeTab(index) {
        let action_name = "1";
        switch (index) {
          case 1:
            action_name = "2";
            this.loadSubDocs();
            break;
        }
        this.loadServiceType = action_name;
      },
      loadArticles() {
        if (this.articles.loading || !this.articles.more) return;
        let _this = this;
        if (_this.articles.nowPage === 1) {
          _this.articles.holder_loading = true;
        } else {
          _this.articles.loading = true;
        }
        let data = {
          subscribeType: 0,
          userId: _this.u_id,
          pageSize: 10,
          pageIndex: _this.articles.nowPage
        };
        userService.my_sub(data).then((res) => {
          if (_this.articles.nowPage === 1) {
            _this.articles.holder_loading = false;
          } else {
            _this.articles.loading = false;
          }
          if (res.code == 0 && res.data) {
            _this.articles.list = _this.articles.list.concat(res.data);
            _this.articles.nowPage += 1;
            //确定没有更多时
            _this.articles.totalPage = parseInt(res.data.totalCount);
            let pageCount = Math.ceil(_this.articles.totalPage / data.pageSize);
            if (_this.articles.nowPage > pageCount) {
              _this.articles.text = "没有更多了";
              _this.articles.more = false;
            }
          } else {
            _this.articles.text = "没有更多了";
            _this.articles.more = false;
          }
        }, function () {
          _this.articles.loading = false;
          _this.articles.holder_loading = false;
        });
      },
      loadSubDocs() {
        if (this.subDoc.loading || !this.subDoc.more) return;
        let _this = this;
        if (_this.subDoc.nowPage === 1) {
          this.subDoc.holder_loading = true;
        } else {
          this.subDoc.loading = true;
        }
        let data = {
          subscribeType: 1,
          userId: _this.u_id,
          pageSize: 10,
          pageIndex: _this.subDoc.nowPage
        };
        userService.my_sub(data).then((res) => {
          if (_this.subDoc.nowPage === 1) {
            this.subDoc.holder_loading = false;
          } else {
            this.subDoc.loading = false;
          }
          if (res.code == 0 && res.data) {
            _this.subDoc.list = _this.subDoc.list.concat(res.data);
            _this.subDoc.nowPage += 1;
            //确定没有更多时
            let pageCount = Math.ceil(res.totalCount / data.pageSize);
            if (_this.subDoc.nowPage > pageCount) {
              _this.subDoc.text = "没有更多了";
              _this.subDoc.more = false;
            }
          } else {
            _this.subDoc.text = "没有更多了";
            _this.subDoc.more = false;
          }
        }, function () {
          _this.subDoc.loading = false;
          _this.subDoc.holder_loading = false;
        });
      },
    },
    computed: {}
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' rel="stylesheet/less">
  @import './css.less';

</style>

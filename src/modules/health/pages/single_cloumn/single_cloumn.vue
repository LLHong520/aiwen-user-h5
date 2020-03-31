<template>
<layout :curTabIndex="1">
  <!-- page_container -->
  <div slot="page_container" class="app_wrapper_inner">
    <tab-cloumn
    v-if="columnInfo.length"
    :showCloumnListArr = "cloumnTabList"
    :allCloumnListArr = "columnInfo"
    :cloumnId = "cloumnId"
    @changeCloumnFn = "change_cloumn"
    ></tab-cloumn>
    <section class="cloumn-article" v-if="artInfo.list.length>0">
      <ul>
        <li v-for="(art,index) in artInfo.list" :key="index">
          <a :href="GET_ARTICLE_URL(art.id, 1)">
            <articleCell :article="art"></articleCell>
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
  <!-- /page_container -->
  <!-- page_footer -->
  <div slot="page_footer">
    <to-top></to-top>
    <loading-page v-show='initing_page'></loading-page>
  </div>
</layout>
</template>
<script>
import { commonMixin, toTopMixin } from "@/mixins";
import healthService from "@/services/healthService.js";
import tabCloumn from "@/modules/health/components/tab_cloumn/tab_cloumn";
import articleCell from "@/modules/health/components/article_cell/article_cell";
import loadingBtn from "@/components/loading-btn/loading-btn";
import noResult from "@/components/no-result/no-result";

export default {
  name: "index",
  mixins: [commonMixin, toTopMixin],
  data() {
    return {
      artInfo: {
        list: [],
        more: true,
        loading: false,
        text: "加载更多",
        nowPage: 1,
        scroll_load: false
      },
      counter: 1,
      cloumnId: "",
      // nowColumn: "",
      cloumnTabList: [],
      cloumnMaskShow: false,
      columnInfo: [],
    };
  },

  components: {
    articleCell,
    tabCloumn,
    loadingBtn,
    noResult
  },

  created() {
    this.cloumnId = this.$route.params.id;
    this.load_article();
    this.load_cloumn();
  },

  methods: {
    load_article() {
      if (this.artInfo.loading || !this.artInfo.more) return;
      this.artInfo.loading = true;
      let pageIndex = this.artInfo.nowPage;
      this.render_article(pageIndex, this.cloumnId);
    },
    change_cloumn(id) {
      this.$router.replace({
        name: "heal.article.cloumn",
        params:{ id: id },
      });
    },
    render_article(pageIndex, cloumnid){
      let data = {
        pageIndex: pageIndex,
        limit: 10,
        columnId: cloumnid
      };
      healthService.scienceList(data).then(res => {
        let _this = this;
        this.artInfo.loading = false;
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
          _this.artInfo.more = false;
          _this.artInfo.scroll_load = false;
          _this.artInfo.text = "没有更多内容了";
        }
      });
    },
    load_cloumn(){
      let _this=this;
      healthService.cloumnInfoList({})
      .then((res) => {
        if(res.code == 0 && res.data){
          for(let i = 0 ; i < res.data.length ; i ++){
            _this.cloumnTabList = res.data.slice(0, 4);
          }
        }
      });
      healthService.moreCloumn({})
      .then((res) => {
        if(res.code == 0 && res.data){
          for(let i = 0 ; i < res.data.length ; i ++){
            _this.columnInfo = _this.columnInfo.concat(res.data[i].columnInfo);
          }
        }
      });
    },
  },

  beforeRouteUpdate (to, from, next) {
    this.cloumnId = to.params.id;
    this.artInfo.list = [];
    this.artInfo.loading = true;
    this.artInfo.nowPage = 1;
    let pageIndex = this.artInfo.nowPage;
    this.render_article(pageIndex, this.cloumnId);
    next();
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>

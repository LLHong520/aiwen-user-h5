<template>
<layout :curTabIndex="1">
  <!-- page_container -->
  <div slot="page_container" class="app_wrapper_inner">
    <!-- <depart-tab tab id="tab" :show.sync="show_menu" @menuFn="showLeftMenu"></depart-tab> -->
    <!-- 专栏 -->
    <section class="cloumn-tab">
      <ul>
        <router-link :to="{ name: 'heal.special'}" >
          <span class="shouye">专题首页</span>
        </router-link>
        <li v-for="(cloumnTab, index) in cloumnTabList" :key="index"
        :class="{'active' : cloumnId == cloumnTab.id}"
        @click="change_cloumn(cloumnTab.id)">
          <a><span>{{cloumnTab.columnName}}</span></a>
        </li>
        <router-link :to="{ name: 'heal.special.more', params: {id:cloumnId} }">
          <span class="filter"></span>
        </router-link>
      </ul>
    </section>
    <!-- 选定专栏 -->
    <section class="selected-column" v-if="selectedColumnTitle.length>0">
      <ul>
        <li v-for="(item,index) in selectedColumnTitle" :key="index">
          {{item}}
        </li>
      </ul>
      <div class="reorder">
        <span :class="{'active': flag==2}" @click="sortList(2)">热门</span>
        <span :class="{'active': flag==1}" @click="sortList(1)">最新</span>
      </div>
    </section>
    <loadingPlaceHolder v-if="init_loading" v-for="n in 2" :key="n.key"></loadingPlaceHolder>
    <!-- 专栏列表  -->
    <!-- <section v-if="selectedArray.length>0"> -->
    <section v-if="selectedArticle.length>0">
      <!-- <div v-for="(item,index) in selectedArray" :key="index"> -->
      <ul class="online-course clearfix">
        <li v-for="(elem,index) in selectedArticle" :key="index" class="online-course-item">
          <a :href="GET_SPECIAL_URL(elem.id,1)">
            <div class="item-avater">
              <img :src="GET_IMG_URL(elem.userCoverPicture)" alt="">
            </div>
            <div class="course-name card-shadow-s"><p>{{elem.title}}</p></div>
          </a>
        </li>
      </ul>
      <!-- </div> -->
      <loading-btn
        class="mt10"
        :loading="loading_articleInfo"
        :title="loading_text"
        @loadFn="load_article"
        :scroll_load="scroll_load">
      </loading-btn>
    </section>
    <!-- <no-result v-if="!loading_articleInfo && selectedArray.length == 0"> -->
    <no-result v-if="!loading_articleInfo && selectedArticle.length == 0">
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
import loadingPlaceHolder from "@/components/loading-place-holder/loading-place-holder";
import healthService from "@/services/healthService.js";
import loadingBtn from "@/components/loading-btn/loading-btn";
import noResult from "@/components/no-result/no-result";
export default {
  name: "index",
  mixins: [commonMixin, toTopMixin],
  data() {
    return {
      selectedArticle: [],
      selectedArray:[],
      articleList:[],
      showLoadMore:true,
      loading_articleInfo:false,
      loading_text:"加载更多",
      scroll_load: false,
      show_noResult:false,
      nowPage:1,
      flag:"1",
      cloumnId: [],
      cloumnTabList: [],
      paramsData:{},
      columnInfo: [],
      nowColumn: "",
      selectedColumnTitle:[],
      selectedColumn: [],
      fixedColumnArr: [],
      show: false,
      init_loading:false
    };
  },
  components: {
    loadingBtn,
    loadingPlaceHolder,
    noResult
  },
  created() {
    this.paramsData = this.$route.params;
    this.load_cloumn();
  },
  methods: {
    load_cloumn(){
      this.selectedColumnTitle = [];
      let _this=this;
      healthService.allColumn({}).then((res) => {
        if(res.code == 0 && res.data){
          _this.columnInfo = res.data;
          _this.cloumnTabList = _this.columnInfo.slice(0,3);
          _this.cloumnId =[];
          if(_this.paramsData.id == "all"){
            for(let i=0; i<_this.columnInfo.length; i++){
              _this.cloumnId.push(_this.columnInfo[i].id);
            }
            _this.selectedColumnTitle = ["全部专题"];
          }else{
            _this.cloumnId = _this.paramsData.id.split(",");
            for(let j = 0 ; j < _this.columnInfo.length ; j ++){
              for(let k = 0 ; k < _this.cloumnId.length ; k ++){
                if(_this.cloumnId[k] == _this.columnInfo[j].id){
                  _this.selectedColumnTitle.push(_this.columnInfo[j].columnName);
                }
              }
            }
          };
          for(let i = 0 ; i < res.data.length ; i ++){
            if(res.data[i].id != ""){
              if(_this.cloumnId[0] == res.data[i].columnId){
                _this.nowColumn = res.data[i].columnName;
              }
            }
          };
          this.load_article();
        };
      });
    },
    load_article() {
      if (this.loading_articleInfo || !this.showLoadMore) return;
      this.loading_articleInfo = true;
      this.fresh_article();
    },
    fresh_article(){
      let _this = this;
      let column_type = _this.cloumnId.length == _this.columnInfo.length ? 1:2 ;
      let data = {
        curpage: _this.nowPage,
        pageNum: "8",
        columnId: _this.cloumnId.join(","),
        selectType:_this.flag,
        columnType:column_type,
      };
      healthService.selectedArticle(data).then(res => {
        _this.loading_articleInfo = false;
        _this.init_loading = false;
        if (res.code == 0 && res.data.result) {
          _this.selectedArticle=_this.selectedArticle.concat(res.data.result);
          console.log(_this.selectedArticle);
          // _this.selectedArray = window.sliceArray(_this.selectedArticle,2);
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
    },
    sortList(params){
      this.flag = params;
      this.init_loading=true;
      this.init_data();
      this.fresh_article();
    },
    change_cloumn(id) {
      this.$router.replace({
        name: "heal.special.column",
        params:{ id: id },
      });
    },
    init_data(){
      this.selectedArticle = [];
      this.showLoadMore = true;
      this.loading_text ="加载更多";
      this.loading_articleInfo = true;
      this.nowPage = 1;
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.cloumnId = [];
    this.cloumnId.push(to.params.id);
    this.selectedColumnTitle = [];
    let title = "";
    for(let i=0 ; i < this.cloumnTabList.length;i++){
      if(this.cloumnTabList[i].id == this.cloumnId[0]){
        title = this.cloumnTabList[i].columnName;
      };
    };
    this.selectedColumnTitle.push(title);
    this.init_data();
    this.fresh_article();
    next();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>

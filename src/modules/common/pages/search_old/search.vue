<template>
<layout class="user-center">
  <!-- page_container -->
  <div slot="page_container" class="app_wrapper_inner">
  <div class="search-wrap">
  	<form class="search_form clearfix">
  	  <div class="input-pull">
  	  	<input type="search" autocomplete="off" @input="Input($event)" @keyup.enter="search(searchValue)" name="search" placeholder="搜医生/圈子/帖子" v-model="searchValue" class="search_input">
  	  	<span class="icon-search" @click.prevent="search(searchValue)"></span>
  	  </div>
  	  <input type="cancel" name="cancel" class="search_submit" value="取消" @click="goBack" />
  	</form>

  	<!--热门标签 -->
  	<div class="hot-tag" v-if="typeing">
  		<div class="tag-title">热门搜索</div>
  		<ul class="tag-list clearfix">
  			<li v-for="(item,index) in hot_keys" :key="index" @click="search_by_hotkey(item)">{{item}}</li>
  		</ul>
  	</div>

    <!-- 搜索结果 -->
    <section v-show="!typeing">
      <!-- tab -->
      <tab class="tab_navs" :tabs="tabs" @changeCallBack="changeCallBack"></tab>
      <!-- /tabs -->
      <!-- 医生列表 -->
      <search-docs v-show="currentTab==0" @changeSearching="changeSearching" @change_res_num="changeResNum" :keywords="keywords" ref="searchDocs"></search-docs>
      <!-- / -->
      <!-- 圈子列表 -->
      <search-moments v-show="currentTab==1" @changeSearching="changeSearching" @change_res_num="changeResNum" :keywords="keywords" ref="searchMoments"></search-moments>
      <!-- / -->
      <!-- 帖子列表 -->
      <search-topics v-show="currentTab==2" @changeSearching="changeSearching" @change_res_num="changeResNum" :keywords="keywords" ref="searchTopics"></search-topics>
      <!-- / -->
      <!-- 无搜索结果 -->
      <!-- <div class="user-no-focus user-none"  v-if="!searching&&total_search_num==0&&searchValue!=''">
        <div>
          <div class="circle_img"></div>
          <span class="find-text">木有搜到结果 T_T</span>
          <router-link to="/home/hot" class="circle_btn">去逛逛热门帖子</router-link>
        </div>
      </div> -->
      <!-- /无搜索结果 -->
    </section>
    <!-- 搜索结果 -->

  </div>
</div>
<!-- /page_container -->
  <!-- page_footer -->
  <div  slot="page_footer">
    <loading-page v-show='initing_page||searching'></loading-page>
  </div>
</layout>
</template>
<script>
import Header from "@/components/header/Header";
import tab from "@/components/tab/tab";
import searchTopics from "@/components/search_topics/search_topics";
import searchMoments from "@/components/search_moments/search_moments";
import searchDocs from "@/components/search_docs/search_docs";
import { commonMixin, toTopMixin} from "@/mixins";
import momentService from "@/services/momentService.js";
export default {
  name: "search",
  mixins:[commonMixin,toTopMixin],
  data () {
    return {
      tabs:["医生","圈子","帖子"],
      currentTab:0,
      hot_keys:[],
      searchValue: "", // 搜索内容
      keywords: "", // 最终的搜索关键字
      searchHistory: [], // 搜索历史记录
      showHistory: true, // 是否显示历史记录，只有在返回搜索结果后隐藏
      total_search_num:0, // 搜索结果条数
      searching:false, // 搜索中
      typeing:true, // 是否键入字符（正在填写关键字）
      currentView:"", // 是否键入字符（正在填写关键字）
    };
  },
  components:{
    mHeader:Header,
    tab:tab,
    searchTopics:searchTopics,
    searchDocs:searchDocs,
    searchMoments:searchMoments
  },
  created(){
    this.get_hot_keywords();
  },
  methods:{
    changeResNum(value){
      this.total_search_num+=value;
    },
    changeSearching(value){
      this.searching=value;
    },
    Input(){
      this.typeing=true;
    },
    //获取热门关键词
    get_hot_keywords(){
      let _this=this;
      _this.user_none=false;
      _this.initing_page=true;
      momentService.search_hotkeys({})
        .then((res)=>{
          _this.initing_page = false;
          if(res.code==0&&res.data){
            _this.hot_keys=res.data;
            _this.showMore=false;
          }
        })
        .catch(()=>{
          _this.initing_page=false;
        });
    },
    search_by_hotkey(hotValue){
      this.searchValue=hotValue;
      let This=this;
      setTimeout(function(){
        This.search(hotValue);
      },20);
    },
    //搜索查询
    search(searchValue){
      if(searchValue==""){
        this.$toast.tip("搜索词不能为空哦~");
        return;
      }
      let This=this;
      this.keywords="";
      setTimeout(function(){
        This.keywords=searchValue;
      },50);
      // this.keywords=searchValue;
      this.typeing=false;
      this.total_search_num=0;
      this.searching=true;
    },
    goBack(){
      this.$router.back(-1);
    },
    changeCallBack(index) {
      this.currentTab=index;
      // this.$refs.searchTopics.search();
      // this.$refs.searchMoments.search();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import './css.less';
</style>

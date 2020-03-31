<template>
  <layout :isAppView="true">
    <div slot="page_header">
      <div class="header">
        <a href="javascript:;" @click="router_back" class="back"></a>
        <input type="text" ref="search" autocomplete="off" name="search" v-model="searchValue" @input="Input($event)" @keyup.enter="search(searchValue)"  placeholder="搜索医生/医院/文章">
      </div>
    </div>
    <div slot="page_container">
      <div v-show="!typeing">
        <div class="navlist" >
          <ul>
            <li class="navli"  v-for="(item,index) in navList" :key="index" :class="{'active':activeIndex===index}" @click="tabClick(index)">{{item.name}}<i v-if="activeIndex===index"></i></li>
          </ul>
        </div>
        <div class="search_result">
          <!-- <swiper :options="searchOption" ref="searchSwiper">
            <swiper-slide>
              <search-doctor :keywords="keyword"  @changeSearching="changeSearching"></search-doctor>
            </swiper-slide>
            <swiper-slide>
              <search-hospital :keywords="keyword" @changeSearching="changeSearching"></search-hospital>
            </swiper-slide>
            <swiper-slide>
              <search-class :keywords="keyword" @changeSearching="changeSearching"></search-class>
            </swiper-slide>
            <swiper-slide>
              <search-article :keywords="keyword" @changeSearching="changeSearching"></search-article>
            </swiper-slide>
            <swiper-slide>
              <search-case :keywords="keyword" @changeSearching="changeSearching"></search-case>
            </swiper-slide>
          </swiper> -->
          <search-doctor :keywords="keyword"  @changeSearching="changeSearching" v-if="activeIndex==0"></search-doctor>
          <search-hospital :keywords="keyword" @changeSearching="changeSearching" v-if="activeIndex==1"></search-hospital>
          <search-class :keywords="keyword" @changeSearching="changeSearching" v-if="activeIndex==2"></search-class>
          <search-article :keywords="keyword" @changeSearching="changeSearching" v-if="activeIndex==3"></search-article>
          <search-case :keywords="keyword" @changeSearching="changeSearching" v-if="activeIndex==4"></search-case>
        </div>
      </div>
    </div>
    <div  slot="page_footer">
      <loading-page v-show='initing_page||searching'></loading-page>
    </div>
  </layout>
</template>
<script>
import {commonMixin,toTopMixin} from "@/mixins";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import searchArticle from "../../components/search_article/search_article";
import searchCase from "../../components/search_case/search_case";
import searchHospital from "../../components/search_hospital/search_hospital";
import searchDoctor from "../../components/search_doctor/search_doctor";
import searchClass from "../../components/search_class/search_class";
// import sysService from "@/services/sysService.js";
export default {
  name: "channel",
  mixins: [commonMixin, toTopMixin],
  components: {
    swiper,
    swiperSlide,
    searchArticle,
    searchCase,
    searchHospital,
    searchClass,
    searchDoctor
  },
  data() {
    return {
      channelId:"",
      searchValue:"",
      typeing:true,
      searching:false, // 搜索中
      navList:[
        {name:"医生"},
        {name:"医院"},
        {name:"课堂"},
        {name:"科普"},
        {name:"案例"},
      ],
      activeIndex:0,
      // searchOption:{
      //   observer:true,
      //   observeParents:true,
      //   autoplay:false,
      //   autoHeight:true,
      //   initialSlide:0,
      //   on:{
      //     // 使用es6的箭头函数，使this指向vue对象          
      //     slideChange: ()=>{            
      //     // 通过$refs获取对应的swiper对象            
      //       let swiper = this.$refs.searchSwiper.swiper;            
      //       let i = swiper.activeIndex;            
      //       this.activeIndex=i;
      //       swiper.update();
      //     }        
      //   },
      // },
      keyword:"",
    };
  },
  computed: {
    swiper() {
      return this.$refs.searchSwiper.swiper;
    }
  },
  created() {
    this.channelId=this.$route.params.id;
    if(this.$route.query.keywords){
      this.searchValue=this.$route.query.keywords;
      this.search(this.searchValue);
    }
    
  },
  methods: {
    changeSearching(value){
      this.searching=value;
    },
    tabClick(index){
      if(this.activeIndex != index){
        this.activeIndex = index;
        this.search(this.searchValue);
      }
      // this.swiper.slideTo(index,0,false);
    },
    Input(){
      this.typeing=true;
      this.activeIndex=0;
    },
    search(searchValue){
      if(searchValue==""){
        this.$toast.tip("搜索词不能为空哦~");
        return;
      }
      let This=this;
      this.keyword="";
      setTimeout(function(){
        This.keyword=searchValue;
        // this.swiper.updateSize();
      },50);
      this.typeing=false;
      this.searching=true;
    },
  },
  mounted(){
    if(!this.$route.query.keywords){
      this.$refs.search.focus();
    }
    // this.swiper.updateSize();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>

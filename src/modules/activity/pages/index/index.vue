<template>
<layout :curTabIndex="2" :tabbarSwitch="true">
  <!-- page_header -->
  <div slot="page_header">
   <m-header slot="page_header"  title='公益访谈'></m-header>
  </div>
 <!-- page_header -->
  <!-- page_container -->
  <div slot="page_container" class="app_wrapper_inner">
    <search-holder></search-holder>
    <!-- 最新活动-->
    <content-title  v-if="latestAct.length>0" :title="'最新活动'"></content-title>
    <cover-img :conInfo="latestAct" :urlLink="CW_ACT" :urlLink2="OUTER_LINKS.weiTalkDetail" :show_nums="show_list_nums"></cover-img>
    <!-- <cover-img v-if="latestAct.activityType==1" :conInfo="latestAct" :urlLink="YK_URL+'/weiTalkDetail/detail/'" :show_nums="show_list_nums"></cover-img> -->

   <!-- 公益活动-->
    <content-title v-if="commonwealAct.length>0" :title="'公益活动'" :t_right="'查看更多  >'">
      <a class="title_more" :href="OUTER_LINKS.activityIndex" slot="title-right">更多></a>
    </content-title>
    <cover-img :conInfo="commonwealAct" :urlLink="CW_ACT" :show_nums="show_list_nums"></cover-img>

    <!-- 微访谈-->
    <content-title v-if="interviewAct.length>0" :title="'微访谈'" :t_right="'查看更多  >'">
      <a class="title_more" :href="OUTER_LINKS.weiTalkIndex" slot="title-right">更多></a>
    </content-title>
    <cover-img :conInfo="interviewAct" :urlLink2="OUTER_LINKS.weiTalkDetail" :show_nums="show_list_nums" :footerInfo="true"></cover-img>

    <!-- 专题-->
    <content-title v-if="subjectAct.length>0" :title="'专题'">
      <!-- <a class="title_more" :href="OUTER_LINKS.subjectIndex" slot="title-right">更多></a> -->
      <router-link :to="{name:'heal.special'}" class="title_more" slot="title-right">更多></router-link>
    </content-title>
    <section v-if="subjectAct.length>0">
      <ul class="subjects clearfix" :class="{'two':subjectAct.length==2}">
        <li v-for="(elem,index) in subjectAct" :key="index" v-if="index<4" class="online-course-item">
          <a :href="GET_SPECIAL_URL(elem.id)">
            <div class="item-avater">
              <img v-lazy="GET_IMG_URL(elem.image,'b')" alt="">
            </div>
            <div class="course-name">{{elem.title}}</div>
          </a>
        </li>
      </ul>
    </section>
    <!-- <cover-img :conInfo="subjectAct" :urlLink="OUTER_LINKS.subjectDetail" :show_nums="show_list_nums" :stateInfo="false" :footerInfo="true" :timeInfo="false"></cover-img> -->
  </div>

<!-- /page_container -->
  <!-- page_footer -->
  <div  slot="page_footer">
    <loading-page v-show='initing_page'></loading-page>
  </div>
</layout>
</template>
<script>
import { YK_URL,CW_ACT } from "@/config";
import Header from "@/components/header/Header";
import searchHolder from "@/components/search-holder/search-holder";
import contentTitle from "@/components/content_title/content_title";
import coverImg from "../../components/cover_img/cover_img";
import { commonMixin, toTopMixin} from "@/mixins";
import activityService from "@/services/activityService.js";
export default {
  name: "index",
  mixins:[commonMixin,toTopMixin],
  data () {
    return {
      YK_URL,
      CW_ACT,
      show_list_nums:2,
      latestAct:[],//最新活动
      commonwealAct:[],//公益活动
      interviewAct:[],//微访谈
      subjectAct:[],//专题
    };
  },
  components:{
    mHeader:Header,
    searchHolder:searchHolder,
    contentTitle,
    coverImg
  },
  created(){
    if(this.VX_islogin){
      this.$store.dispatch("update_userinfo");
    }
    this._initpage();
  },
  methods:{
    _initpage(){
      this.load_content();
    },
    load_content(){
      let params={};
      if(this.$route.query.departId){
        params.departId=this.$route.query.departId;
      }
      activityService.home_activity(params).then((res)=>{
        if(res.code==0){
          this.latestAct=res.data.latest;
          this.commonwealAct=res.data.commonweal;
          this.interviewAct=res.data.interview;
          this.subjectAct=res.data.subject;
        }
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
  @import './css.less';
</style>

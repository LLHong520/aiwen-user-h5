<template>
<layout>
  <!-- page_header -->
  <div slot="page_header">
    <m-header slot="page_header"  title="健康 · 在线课堂">
      <span class="retrun" slot='left' @click="router_back">
       <b class="gray"></b>
      </span>
      <span class="retrun" slot='right'></span>
    </m-header>
  </div>
  <!-- page_header -->
  <!-- page_container -->
  <div slot="page_container" class="app_wrapper_inner">
    <div class="activitys_wrapper_inner activity_wrapper">
      <!-- 轮播广告banner -->
      <m-swiper :autoPlay="true" :showIndicator="true" interval="2000" duration="500" v-if="bannerList.length>0">
        <m-slide v-for="(item,index) in bannerList" :key="index">
          <a :href="item.linkURL?item.linkURL:'javascript:;'" class="banner-box">
            <img :src="GET_IMG_URL(item.picId,'b')" width="100%"/>
          </a>
        </m-slide>
      </m-swiper>
      <!-- 轮播广告banner -->
      <loading-holder :loading="courseInfo.initing">
        <section class="activity_list">
          <div v-for="(item,index) in courseInfo.list" :key="index" class="activity-item">
            <dl class="famous_doctor">
              <dt>
                <b></b>
                <a :href="OUTER_LINKS.courseDetails+item.id">
                  <img v-lazy="GET_IMG_URL(item.lessonsImageId)" alt="爱问医联"  :height="imgInfo.h" :width="imgInfo.w"/>
                </a>
                <span class="number" v-if="item.applyNumber != null">
                  {{item.applyNumber}}
                  <span v-if="item.lessonsStatus == 1">人已报名</span>
                  <span v-else>人在学习</span>
                </span>
                <span class="mask" v-if="item.lessonType==1">系列课</span>
              </dt>
              <dd>
                <a :href="OUTER_LINKS.courseDetails+item.id">
                  <div class="fam_doc_name"><span>{{item.lessonsName}}</span>
                    <!--<em v-if="item.lessonsPrice==0" class="price_mark">限时免费</em>-->
                  </div>
                  <div class="fam_doc_dep clearfix">
                    <template  v-if="item.lessonType==0">
                      <!-- <span v-if="item.lessonsStatus==0 || item.lessonsStatus==2">{{item.peopleNum}}人学习</span> -->
                      <!-- <span v-if="item.lessonsStatus==1">已报名{{item.payStatus? "|已支付":''}}</span> -->
                      <!-- <span class="courseStatue opening" v-if="item.lessonsStatus==0">已开课</span> -->
                      <span class="courseStatue opening" v-if="item.lessonsStatus==0">直播中</span>
                      <span class="courseStatue" v-else-if="item.lessonsStatus==1">开课时间：{{item.lessonsStartTime | dataFormat}}</span>
                      <span class="courseStatue" v-else-if="item.lessonsStatus==2||item.lessonsStatus==3">课程回顾</span>
                      <span class="courseStatue" v-else-if="item.lessonsStatus==4">课程异常{{item.lessonsPrice>0?"（已退款）":""}}</span>
                      <span class="courseStatue" v-else-if="item.lessonsStatus==5">已取消</span>
                      <span class="courseStatue" v-else-if="item.lessonsStatus==6">讲师缺课{{item.lessonsPrice>0?"（已退款）":""}}</span>
                      <span class="courseStatue" v-else-if="item.lessonsStatus==7">课程异常</span>
                    </template>
                    <template  v-if="item.lessonType==1">
                      <!-- <span v-if="item.lessonsStatus==0 || item.lessonsStatus==2">{{item.peopleNum}}人学习</span> -->
                      <!-- <span v-if="item.lessonsStatus==1">{{item.applyNumberStr}}已报名{{item.payStatus? "|已支付":''}}</span> -->
                      <span class="c_999">已更新{{item.serialUpdateNum}}节课 | 共{{item.serialNum}}节课</span>
                      <!-- <span class="courseStatue" v-if="item.lessonsStatus==0">已开课</span> -->
                      <span class="courseStatue" v-if="item.lessonsStatus==0">直播中</span>
                      <span class="courseStatue" v-else-if="item.lessonsStatus==1">已更新{{item.serialUpdateNum}}节课 | 共{{item.serialNum}}节课</span>
                      <span class="courseStatue" v-else-if="item.lessonsStatus==2||item.lessonsStatus==3">课程回顾</span>
                      <span class="courseStatue" v-else-if="item.lessonsStatus==4">课程异常{{item.lessonsPrice>0?"（已退款）":""}}</span>
                      <span class="courseStatue" v-else-if="item.lessonsStatus==5">已取消</span>
                      <span class="courseStatue" v-else-if="item.lessonsStatus==6">讲师缺课{{item.lessonsPrice>0?"（已退款）":""}}</span>
                      <span class="courseStatue" v-else-if="item.lessonsStatus==7">课程异常</span>
                      <!-- <a :href="'/serial/intro/'+serial.id}"><span>所属系列课：</span>${serial.serialName }</a> -->
                    </template>
                    <span v-if="!VX_isSinaHealthAppForceIng" class="position_price">
                      <i class="c_free" v-if="item.lessonType==0&&item.lessonsPrice==0||item.lessonType==1&&item.promotionPrice==0">免费</i>
                      <i v-if="item.lessonsPrice>0&&item.lessonType==0" class="c_f60">￥{{item.lessonsPrice}}</i>
                      <i v-if="item.lessonsPrice>0&&item.lessonType==1" class="c_f60">￥{{item.promotionPrice!=-1?item.promotionPrice:item.lessonsPrice}}</i>
                      <s v-if="item.lessonType==1&&(item.promotionPrice!=-1)" class="del-price">￥{{item.lessonsPrice}}</s>
                    </span>
                  </div>
                </a>
              </dd>
            </dl>
          </div>
        </section>
      </loading-holder>
      <loading-btn
        :loading="courseInfo.loading"
        :title="courseInfo.text"
        :scroll_load="true"
        @loadFn="load_course">
      </loading-btn>
      <no-result title="您还没有报名课堂哇~" v-if="!courseInfo.more&&courseInfo.list.length==0"></no-result>
    </div>
  </div>
  <!-- /page_container -->
  <!-- page_footer -->
  <div slot="page_footer">
    <!--<health-back-btn></health-back-btn>&lt;!&ndash; 回到健康 &ndash;&gt;-->
    <to-top></to-top>
    <loading-page v-show='initing_page'></loading-page>
  </div>
</layout>
</template>
<script>
import { commonMixin, toTopMixin} from "@/mixins";
import healthService from "@/services/healthService.js";
import { mSwiper, mSlide } from "@/iwen/swiper";
import Header from "@/components/header/Header";
import loadingHolder from "@/components/loading-holder/loading-holder";
import loadingBtn from "@/components/loading-btn/loading-btn";
import noResult from "@/components/no-result/no-result";
// import healthBackBtn from "@/modules/health/components/health_back_btn/health_back_btn";
export default {
  name: "Course",
  mixins:[commonMixin,toTopMixin],
  data () {
    return {
      bannerList:[],
      courseInfo:{
        list:[],
        more:true,
        loading:false,
        text:"加载更多",
        nowPage:1,
        initing: false
      },
    };
  },
  components:{
    mHeader: Header,
    mSwiper,
    mSlide,
    loadingHolder:loadingHolder,
    loadingBtn,
    noResult,
    // healthBackBtn
  },
  created(){
    this.load_banners();
    this.load_course();
    this.imgInfo = {
      w: lib.flexible.rem2px(80 / 64),
      h: lib.flexible.rem2px(80 / 64)
    };
  },
  methods:{
    load_banners(){
      let _this=this;
      healthService.Banners({
        moduleType:2,
        position:6
      }).then((res)=>{
        if(res.code==0&&res.data){
          _this.bannerList=res.data;
        }
      });
    },
    load_course(){
      if(this.courseInfo.initing||this.courseInfo.loading||!this.courseInfo.more) return;
      let _this=this;
      let data={
        curpage:_this.courseInfo.nowPage,
        pageNum:10,
      };
      if(data.curpage===1){
        this.courseInfo.initing=true;
      }else{
        this.courseInfo.loading=true;
      }
      healthService.course(data).then((res)=>{
        if(data.curpage===1){
          _this.courseInfo.initing=false;
        }else{
          _this.courseInfo.loading=false;
        }
        if(res.code==0&&res.data){
          //新浪健康App审核中去掉收费课程
          if(_this.VX_isSinaHealthAppForceIng){
            let resultList = res.data||[];
            resultList = resultList.filter((item)=>{
              return item.lessonsPrice <=0;
            });
            _this.courseInfo.list =_this.courseInfo.list.concat(resultList);
          }else{
            _this.courseInfo.list =_this.courseInfo.list.concat(res.data);
          }
          _this.courseInfo.nowPage+=1;
          let pageCount=Math.ceil(res.totalCount/data.pageNum);
          if(_this.courseInfo.nowPage>pageCount){
            _this.courseInfo.more=false;
            _this.courseInfo.text="没有更多内容了";
          }else{
            _this.courseInfo.more=true;
          }
        }
      });
    },

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
  @import './css.less';
</style>

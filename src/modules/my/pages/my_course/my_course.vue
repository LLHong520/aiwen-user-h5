<template>
<layout class="user-center" :curTabIndex="4" :tabbarSwitch="false">
  <!-- page_header -->
  <m-header slot="page_header" title='我的课堂'>
    <span class="retrun" slot='left' @click="router_back">
      <b class="gray"></b>
    </span>
    <span class="retrun" slot='right'></span>
  </m-header>
  <!-- page_header -->
  <!-- page_container -->
  <div slot="page_container" class="app_wrapper_inner activity_wrapper_inner">
    <div class="activitys_wrapper_inner activity_wrapper">
      <loading-holder :loading="initing">
        <section class="activity_list">
          <div v-for="(item,index) in video_list" :key="index" class="activity-item">
            <dl class="famous_doctor">
              <dt>
                <b></b>
                <a :href="getCourseUrl(item)">
                  <img v-lazy="GET_IMG_URL(item.image,'u')" alt="爱问医联"  :height="imgInfo.h" :width="imgInfo.w"/>
                </a>
               <span v-if="item.lessonType==1">系列课</span>
              </dt>
              <dd>
                <a :href="getCourseUrl(item)">
                  <div class="fam_doc_name"><span>{{item.title}}</span></div>
                  <div class="fam_doc_good">
                    <!-- <span v-if="item.lessonType==1">已更新{{item.updatedCount}}节课 | 共{{item.totalCount}}节课</span> -->
                    <!-- <span class="begin-time" v-else>{{item.startTime | dataFormat}}开课</span> -->
                  </div>
                  <div class="fam_doc_dep clearfix" v-if="item.lessonType==0">
                    <!-- <span>{{item.peopleNum}}人学习</span> -->
                    <!-- <span>已报名{{item.payStatus? "|已支付":''}}</span> -->
                    <span class="begin-time" v-if="item.lessonsStatus==0">已开课</span>
                    <span class="begin-time" v-else-if="item.lessonsStatus==1">开课时间：{{item.startTime | dataFormat}}</span>
                    <span class="begin-time" v-else-if="item.lessonsStatus==2||item.lessonsStatus==3">课程回顾</span>
                    <span class="begin-time" v-else-if="item.lessonsStatus==4">课程异常{{item.price>0?"（已退款）":""}}</span>
                    <span class="begin-time" v-else-if="item.lessonsStatus==5">已取消</span>
                    <span class="begin-time" v-else-if="item.lessonsStatus==6">讲师缺课{{item.price>0?"（已退款）":""}}</span>
                    <span class="begin-time" v-else-if="item.lessonsStatus==7">课程异常</span>
                    <template v-if="!VX_isSinaHealthAppForceIng">
                      <i class="c_free" v-if="item.price==0">免费</i>
                      <i class="c_f60" v-if="item.price>0">￥{{item.price}}</i>
                    </template>
                  </div>
                  <div class="fam_doc_dep clearfix" v-if="item.lessonType==1">
                    <!-- <span>{{item.peopleNum}}人学习</span> -->
                    <!-- <span>已报名{{item.payStatus? "|已支付":''}}</span> -->
                    <span class="begin-time" v-if="item.lessonsStatus==0">已开课</span>
                    <span class="begin-time" v-else-if="item.lessonsStatus==1">已更新{{item.updatedCount}}节课 | 共{{item.totalCount}}节课</span>
                    <span class="begin-time" v-else-if="item.lessonsStatus==2||item.lessonsStatus==3">课程回顾</span>
                    <span class="begin-time" v-else-if="item.lessonsStatus==4">课程异常{{item.price>0?"（已退款）":""}}</span>
                    <span class="begin-time" v-else-if="item.lessonsStatus==5">已取消</span>
                    <span class="begin-time" v-else-if="item.lessonsStatus==6">讲师缺课{{item.price>0?"（已退款）":""}}</span>
                    <span class="begin-time" v-else-if="item.lessonsStatus==7">课程异常</span>
                    <template v-if="!VX_isSinaHealthAppForceIng">
                      <i class="c_free" v-if="item.price==0">免费</i>
                      <i class="c_f60" v-if="item.price>0">￥{{item.price}}</i>
                    </template>
                  </div>
                  <!-- <div class="fam_doc_talk">
                    <i v-if="item.coursePrice==0">免费</i>
                    <i class="c_f60" v-if="item.coursePrice>0">￥{{item.coursePrice}}</i>
                  </div> -->
                </a>
                <!-- <div class="doc_del"><a href="javascript:;">删除</a></div> -->
              </dd>
            </dl>
          </div>
          <loading-btn v-if="video_list.length>9" :loading="load_more" :title="load_btn_text" @loadFn="getDocList"></loading-btn>
          <no-result title="您还没有报名课堂哇~" v-if="!load_more&&video_list.length==0"></no-result>
        </section>
      </loading-holder>
    </div>
  </div>
  <!-- /page_container -->
  <!-- page_footer -->
  <div slot="page_footer">
    <loading-page v-show='initing_page' title="加载中..."></loading-page>
    <!--/消息详情  -->
    <to-top></to-top>
  </div>
</layout>
</template>
<script>
import loadingHolder from "@/components/loading-holder/loading-holder";
import Header from "@/components/header/Header";
import userService from "@/services/userService.js";
import loadingBtn from "@/components/loading-btn/loading-btn";
import noResult from "@/components/no-result/no-result";
import {
  toTopMixin,
  commonMixin
} from "@/mixins";
export default {
  name: "my_doctor",
  mixins: [commonMixin, toTopMixin],
  data() {
    return {
      load_more: false,
      load_btn_text: "点击加载更多",
      video_list: [],
      initing: false,
      hasMore: true,
      preview_item: {},
      pager: {
        totalCount: 0,
        totalPage: 1,
        nowPage: 0,
      }
    };
  },
  computed: {},
  mounted() {
    let _this = this;
    _this._init_page();
    //计算图片宽高
    this.imgInfo = {
      w: lib.flexible.rem2px(80 / 64),
      h: lib.flexible.rem2px(80 / 64)
    };
  },
  methods: {
    getCourseUrl(item){
      if(item.lessonType==0){
        return this.COURSE_DETIALS_URL+item.id;
      }else{
        return this.SERAL_COURSE_DETIALS_URL+item.id;
      }
    },
    getDocList() {
      if (!this.hasMore) return;
      let This = this;
      let targetPageNum = this.pager.nowPage + 1;
      if (targetPageNum == 1) {
        this.initing = true;
      } else {
        this.load_more = true;
      }
      let queryParams = {
        pageIndex: targetPageNum,
        pageSize: 10,
      };
      userService.my_course(queryParams).then((res) => {
        if (targetPageNum == 1) {
          This.initing = false;
        }
        if (res.code == 0 && res.data) {
          //新浪健康App审核中去掉收费课程
          if(This.VX_isSinaHealthAppForceIng){
            let resultList = res.data;
            let type=Object.prototype.toString.call(res.data);
            if(type==="[object Array]"){
              resultList = res.data;
            }else{
              resultList = [res.data];
            }
            resultList = resultList.filter((item)=>{
              return item.price <=0;
            });
            This.video_list = This.video_list.concat(resultList);
          }else{
            let type=Object.prototype.toString.call(res.data);
            if(type==="[object Array]"){
              This.video_list = This.video_list.concat(res.data);
            }else{
              This.video_list = This.video_list.concat([res.data]);
            }
          }
          This.pager.nowPage = targetPageNum;
          if (targetPageNum != 1) {
            This.load_more = false;
          }
          //确定没有更多时
          if (res.data.length < 10) {
            This.load_btn_text = "没有更多了";
            This.hasMore = false;
          }
        }
      }, function() {
        This.initing = false;
        This.load_more = false;
      });
    },
    _init_page() {
      this.initing = true;
      this.getDocList();
    }
  },
  components: {
    mHeader: Header,
    loadingHolder: loadingHolder,
    loadingBtn,
    noResult
  }
};
</script>
<style  scoped lang="less" rel="stylesheet/less">
@import './css.less';
.activity_wrapper_inner {
    position: relative;
}
</style>

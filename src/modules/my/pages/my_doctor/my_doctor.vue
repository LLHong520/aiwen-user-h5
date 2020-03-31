<template>
<layout class="user-center" :curTabIndex="4" :tabbarSwitch="false">
  <!-- page_header -->
  <m-header slot="page_header" title='我的医生'>
    <span class="retrun" slot='left' @click="router_back">
          <b class="split"></b>
    </span>
    <span class="retrun" slot='right'></span>
  </m-header>
  <!-- page_header -->
  <!-- page_container -->
  <div slot="page_container" class="app_wrapper_inner activity_wrapper_inner">
    <div class="activitys_wrapper_inner activity_wrapper">
      <loading-holder :loading="initing">
        <section class="activity_list">
          <div v-for="(item,index) in doc_list" :key="index" class="activity-item" :class="{'active':item.isDropdown}">
            <dl class="famous_doctor">
              <dt>
                <a :href="DOC_BASE_URL+item.id">
                  <img v-lazy="GET_IMG_URL(item.expertUserPhoto,'u')" alt="爱问医联"  :height="imgInfo.h" :width="imgInfo.w"/>
                </a>
              </dt>
              <dd>
                <a :href="DOC_BASE_URL+item.id">
                  <div class="fam_doc_name"><span>{{item.expertUserName}}</span>{{item.titles}}</div>
                  <div class="fam_doc_dep"><span>{{item.medicalInstitutions}}</span></div>
                  <div class="fam_doc_good">擅长领域：{{item.areasOfExpertise}}</div>
                  <div class="fam_doc_talk"><i>问</i>
                  </div>
                </a>
                <!-- <div class="doc_del"><a href="javascript:;">删除</a></div> -->
              </dd>
            </dl>
          </div>
          <loading-btn v-if="doc_list.length>9" :loading="load_more" :title="load_btn_text" @loadFn="getDocList"></loading-btn>
          <no-result title="您还没有关注医生哇~" v-if="!load_more&&doc_list.length==0"></no-result>
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
      doc_list: [],
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
  created() {
    let _this = this;
    _this._init_page();
    //计算图片宽高
    this.imgInfo = {
      w: lib.flexible.rem2px(80 / 64),
      h: lib.flexible.rem2px(80 / 64)
    };
  },
  mounted() {},
  methods: {
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
        nowPage: targetPageNum
      };
      userService.my_doctor(queryParams).then((res) => {
        if (targetPageNum == 1) {
          This.initing = false;
        }
        if (res.code == 0 && res.data) {
          res.data.map(item => {
            item.isDropdown = false;
          });
          This.doc_list = This.doc_list.concat(res.data);
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

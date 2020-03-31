<template>
  <layout :isAppView="true">
    <div slot="page_header" class="header_wrapper">
      <m-header  title=" " :isShowInApp="true">
        <a href="javascript:;" slot="left" class="back" @click="router_back"></a>
        <div class="right" slot="right">
          <span class="share" @click="share(false)"></span>
        </div>
      </m-header>
    </div>
    <div slot="page_container">
      <!-- 医院banner start -->
      <div class="hospital_banner" v-if="(hospitalInfo.pictures||[]).length>0">
        <swiper :options="bannerSwiperOption" ref="bannerSwiper">
          <swiper-slide v-for="(item,index) in hospitalInfo.pictures" :key="index">
            <div class="banner_img">
              <a href="javascript:;">
                <img :src="item.url" preview="1">
              </a>
            </div>
          </swiper-slide>
          <!-- Add Pagination -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="hospital_banner" v-else>
        <div class="banner_img"><img src="../../../../assets/images/default/bg_hospital@2x.png" alt=""></div>
      </div>
      <!-- 医院banner end -->

      <!-- 医院信息 start -->
      <div class="hospital_detail">
        <div class="logo"><img v-if="hospitalInfo.headPic" v-lazy="GET_IMG_URL(hospitalInfo.headPic.url,'hos')" alt=""></div>
        <h3 class="name">{{hospitalInfo.name}}</h3>
        <div class="goodat" v-if="(hospitalInfo.adeptness||[]).length>0">{{hospitalInfo.adeptness.join(",")}}</div>
        <div class="contact">
          <div class="txt" @click="openMap">
            <div class="address" >{{hospitalInfo.address}}</div>
          </div>
          <!-- <span class="phone" @click="showPhone" v-if="(hospitalInfo.phone||[]).length>0"></span> -->
        </div>
      </div>
      <!-- 医院信息 end -->

      <!-- 医院简介 start-->
      <div class="box_wrapper top10" v-if="hospitalInfo.intro">
        <div class="common_hd">
          <h3>医院简介</h3>
        </div>
        <div class="common_bd">
          <div class="hospital_intro">
            <content-cell :content="hospitalInfo.intro"></content-cell>
          </div>
        </div>
      </div>
      <!-- 医院简介 end-->

      <!-- 医院医生 -->
      <div class="box_wrapper top10" v-if="(docList||[]).length>0">
        <div class="common_hd">
          <h3>医院医生 {{docNum}}</h3>
          <router-link :to="{name:'channelDoctorList',params:{id:channelId},query:{id:hospitalId,hospitalId:hospitalInfo.id,channelName:channelInfo.channelName}}"  class="toMore"></router-link>
        </div>
        <div class="common_bd">
          <div class="doctor_wrapper">
            <swiper :options="doctorSwiperOption" ref="mySwiper1">
              <swiper-slide v-for="(item,index) in docList" :key="index">
                <router-link :to="{name:'docIndex',params:{dId:item.userId},query:{'resource':'channel'}}">
                  <div class="doctor_card">
                    <div class="img"><img v-lazy="GET_IMG_URL(item.headPic,'doc')" alt=""></div>
                    <dl>
                      <dt>{{item.name}}</dt>
                      <dd>{{item.title}}</dd>
                    </dl>
                  </div>
                </router-link>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
      <!-- 医院医生 end -->

      <!-- 医院社区 -->
      <div class="box_wrapper top10 " v-if="(communityList||[]).length>0">
        <div class="common_hd">
          <h3>医院社区</h3>
        </div>
        <div class="common_bd">
          <template v-if="(communityList||[]).length==1"> 
            <ul class="comptyList">
              <li v-for="(item,index) in communityList" :key="index">
                <div class="img"><img v-lazy="GET_IMG_URL(item.logo.url,'comty')" alt=""></div>
                <dl>
                  <dt>{{item.comtyName}}</dt>
                  <dd>{{item.doctorCount+item.userCount}}成员</dd>
                </dl>
                <a :href="COMTY_BASE_URL+item.id" class="enter">进入社区</a>
              </li>
            </ul>
          </template>
          <template v-else-if="(communityList||[]).length>1">
            <div class="compty_wrapper">
              <ul class="clearfix comptyList">
                <li v-for="(item,index) in communityList" :key="index">
                  <div class="card_inner">
                    <div class="img"><img v-lazy="GET_IMG_URL(item.logo.url,'comty')" alt=""></div>
                    <dl>
                      <dt>{{item.comtyName}}</dt>
                      <dd>{{item.doctorCount+item.userCount}}成员</dd>
                    </dl>
                    <a :href="COMTY_BASE_URL+item.id" class="enter">进入社区</a>
                  </div>
                </li>
                <li></li>
              </ul>
            </div>
          </template>
        </div>
      </div>
      <!-- 医院社区 end-->

      <!-- 最新课堂 -->
      <div class="box_wrapper top10 " v-if="(classList||[]).length>0">
        <div class="common_hd">
          <h3>在线课堂</h3>
          <router-link :to="{name:'channelClassList',params:{id:channelId},query:{id:hospitalId,hospitalName:hospitalInfo.name,channelName:channelInfo.channelName}}"  class="toMore"></router-link>
        </div>
        <div class="common_bd">
          <div class="subject_box">
            <ul class="clearfix">
              <li v-for="(item,index) in classList" :key="index">
                <router-link :to="{name:'channelClassDetail',params:{id:channelId},query:{id:item.id}}">
                  <div class="img">
                    <img v-lazy="GET_IMG_URL(item.videoCover)" alt="">
                    <i class="icon_play"></i>
                    <p>
                      <span class="author">主讲人:{{item.publisher}}</span>
                      <span class="time">{{item.videoTime}}</span>
                    </p>
                  </div>
                  <dl>
                    <dt>{{item.title}}</dt>
                    <dd v-if="!IS_IWEN_COMTY(item.comtyId)">来自 {{item.comtyName}}</dd>
                  </dl>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 最新课堂 end-->

      <!-- 最新案例 start -->
      <div class="box_wrapper top10 " v-if="(caseList||[]).length>0">
        <div class="common_hd">
          <h3>最新案例</h3>
          <router-link :to="{name:'channelCaseList',params:{id:channelId},query:{id:hospitalId,hospitalName:hospitalInfo.name,channelName:channelInfo.channelName}}"  class="toMore"></router-link>
        </div>
        <div class="common_bd">
          <div class="case_wrapper">
            <ul class="case_list">
              <li v-for="(item,index) in caseList" :key="index">
                <case-cell :caseItem="item" ></case-cell>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 最新案例 end -->
    </div>
    <div slot="page_footer">
      <div class="bottom">- 这是我的底线 -</div>
    </div>
    <div slot="page_layer">
      <!-- <div class="phone_layer" v-if="isShowPhone&&(hospitalInfo.phone||[]).length>0">
        <ul>
          <li v-for="(item,index) in hospitalInfo.phone" :key="index"><a :href="`tel://${item}`">{{item}}</a></li>
        </ul>
      </div> -->
      <div class="shadow" v-if="isShowPhone" @click="closeLayer"></div>
      <back-btn></back-btn>
      <!-- 分享 -->
      <m-share :show.sync="isShare" :config="shareConfig"></m-share>
    </div>
  </layout>
</template>
<script>
import {commonMixin,toTopMixin,shareMixin} from "@/mixins";
import {
  DOC_CONSULT_URL,
  COMTY_BASE_URL
} from "@/config";
import Header from "@/components/header/Header";
import caseCell from "../../components/case_cell/case_cell";
import contentCell from "../../components/content_cell/content_cell";
import backBtn from "../../components/channelIndexBtn/channelIndexBtn";
import share from "@/iwen/share-all/share.vue"; //分享
import channelService from "@/services/channelService.js";

export default {
  name: "channel",
  mixins: [commonMixin, toTopMixin,shareMixin],
  components: {
    mHeader:Header,
    caseCell,
    backBtn,
    mShare: share,  //分享
    contentCell,
  },
  data() {
    return {
      DOC_CONSULT_URL,
      COMTY_BASE_URL,
      channelId:"",
      // channelName:"",
      hospitalId:"",
      loading:false,
      overHeight:false,
      bannerSwiperOption:{
        observer:true,
        observeParents:true,
        loop: false,
        autoplay: false,
        initialSlide:0,
        spaceBetween: 0,
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
      },
      doctorSwiperOption: {
        observer: true,
        observeParents: true,
        loop: false,
        slidesPerView: 3.8,
        spaceBetween: 10
      },
      isShowPhone:false,

      hospitalInfo: {},
      docList:[],
      classList:[],
      caseList:[],
      communityList:[],
      docNum:"",

      //分享
      isShare: false,
      shareConfig: {},
      shareImg:"",
      channelInfo:{}
    };
  },
  computed: {
  },
  created() {
    this.channelId = this.$route.params.id;
    // this.channelName = this.$route.query.channelName||"";
    this.hospitalId = this.$route.query.id;
    this.renderChannelInfo();
    this.renderDataInfo();
  },
  methods: {
    //分享
    share(isInit = false){
      console.log("点击了分享按钮");
      console.log(isInit);
      if (!isInit) {
        this.isShare = true;
      }
      this.shareConfig = {
        pid: this.channelId,
        id: this.hospitalId,
        type: "hospital",
        title: `${this.hospitalInfo.name} - 来自新浪健康`,
        // content: (this.hospitalInfo.intro||"").replace(/<[^>]+>/g, "").slice(0,100),
        content:"",
        imgUrl: this.shareImg,
      };
    },
    showPhone(){
      console.log("111111");
      this.isShowPhone=true;
    },
    closeLayer(){
      this.isShowPhone=false;
    },
    //查询频道信息
    renderChannelInfo() {
      let data = {
        "channelId": this.channelId,
      };
      channelService.getChannelInfo(data).then((res) => {
        if(res.status == 200 && res.data) {
          this.channelInfo = res.data;
        }
      }).catch(() => {});
    },
    renderDataInfo() {
      if(this.loading) return;
      this.loading = true;
      let data = {
        "hospitalId": this.hospitalId
      };
      channelService.findHospitalById(data).then((res) => {
        this.loading=false;
        if(res.status == 200 && res.data) {
          this.hospitalInfo = res.data;
          this.shareImg=res.data.headPic.url||"https://pic.wenwo.com/fimg/4436fb5953874148bbd8040b2fea67c5.jpg";
          this.share(true);//分享
        }
      })
      .catch(() => {})
      .finally(() => {
        this.renderDoctorList();
        this.renderCaseList();
        this.renderClassList();
        this.renderCommunityList();
        this.share(true);//分享
      });
    },
    //查询医生列表
    renderDoctorList() {
      let data = {
        "hospitalName": this.hospitalInfo.name,
      };
      channelService.getDoctorListByHospital(data).then((res) => {
        if(res.status == 200 && res.data) {
          this.docList = res.data;
          this.docNum=res.total;
        }
      }).catch(() => {});
    },
    //查询案例列表
    renderCaseList() {
      let data = {
        channelId:this.channelId,
        page: 1,
        size: 10,
        hospitalName: this.hospitalInfo.name,
      };
      channelService.getPageCaseList(data).then((res) => {
        if(res.status == 200 && res.data) {
          this.caseList = res.data.slice(0,3);
        }
      }).catch(() => {});
    },
    //查询课堂列表
    renderClassList() {
      let data = {
        channelId:this.channelId,
        page: 1,
        size: 10,
        hospitalName: this.hospitalInfo.name,
      };
      channelService.findVideoByPage(data).then((res) => {
        if(res.status == 200 && res.data) {
          this.classList = res.data.slice(0,2);
        }
      }).catch(() => {});
    },
    //查询社区列表
    renderCommunityList() {
      let data = {
        hospitalName: this.hospitalInfo.name,
      };
      channelService.findComtyList(data).then((res) => {
        if(res.status == 200 && res.data) {
          this.communityList = res.data;
        }
      }).catch(() => {});
    },
    openMap() {
      // 微信内打开微信内置地图
      // if (platformInfo.isWx && wx) {
      //   let vm = this;
      //   let lng = this.hospitalInfo.location.coordinates[0];// 经度
      //   let lat = this.hospitalInfo.location.coordinates[1];// 纬度
       
      //   // let [lng, lat] = gcoord.transform(vm.hospitalInfo.location.coordinates, gcoord.BMap, gcoord.GCJ02);
      //   // alert(this.hospitalInfo.location.coordinates); 
      //   lng = parseFloat(lng);
      //   lat = parseFloat(lat);
      //   wx.openLocation({
      //     latitude: lat, // 纬度，浮点数，范围为90 ~ -90
      //     longitude: lng, // 经度，浮点数，范围为180 ~ -180。
      //     name: vm.hospitalInfo.name, // 位置名
      //     address:  vm.hospitalInfo.address, // 地址详情说明
      //     scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
      //     infoUrl: "", // 在查看位置界面底部显示的超链接,可点击跳转
      //     fail: function (res) {
      //       alert(res.errMsg);
      //     }
      //   });
      // } else {
      this.$router.push({
        name: "channelHospitalMap",
        query: {
          hospitalId: this.hospitalId
        }
      });
      // }
    },
  },
  mounted(){

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
@import "./css.less";
</style>

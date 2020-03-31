<template>
  <layout :isAppView="true">
    <div slot="page_header" class="header_wrapper">
      <m-header  :title="`${channelName}-医生列表`" :border_on="false" :isShowInApp="true">
        <a href="javascript:;" slot="left" class="back" @click="router_back"></a>
        <div class="city" slot="right" @click="openDialogArea">
          <span class="city_name">
            <span>{{areaActiveName}}</span><i></i>
          </span>
        </div>
      </m-header>
    </div>
    <div slot="page_container">
      <div class="doctor_wrapper">
        <ul class="doctor_list" v-if="(list||[]).length>0">
          <li v-for="(item, index) in list" :key="index">
            <doctor-cell :doctor="item"></doctor-cell>
          </li>
        </ul>
        <div class="empty_box"  v-else-if="!loading">
          <empty title="暂无医生"></empty>
        </div>
        <loading-btn
          :loading="loading  || isRefresh"
          :title="loadingText"
          v-if="(!isEnd&&(list||[]).length>0)||(isEnd&&(list||[]).length>0)"
          :scroll_load="true"
          :isEnd="isEnd"
          @loadFn="renderData">
        </loading-btn>
      </div>
    </div>
    <div slot="page_layer">
      <div class="select_bar" :class="{'isInApp':isInApp&&!isShowInApp}">
        <ul>
          <!-- <li :class="{'active':sortActive,'selected':sortActiveIndex!=0}" @click="toggleSort">{{sortName}}<i></i></li> -->
          <li
            :class="{'selected':serviceActiveIndex != '' || departActiveIndex != '', 'active':conditionActive}"
            @click="toggleCondition"
          >
            筛选<i></i>
          </li>
        </ul>
      </div>
      <div class="sort_layer" :class="{'isInApp':isInApp&&!isShowInApp}" v-if="sortActive">
        <ul>
          <li v-for="(item,index) in sortItem" :key="index" @click="sortChange(index)" :class="{'current':sortActiveIndex==index}">{{item.name}}</li>
        </ul>
      </div>
      <div class="condition_layer" :class="{'isInApp':isInApp&&!isShowInApp}" v-if="conditionActive">
        <dl>
          <dt>服务类型</dt>
          <dd>
            <ul class="clearfix">
              <li v-for="(item,index) in seviceItem" :key="index" @click="conditionChange(item, 'serviceActiveIndex','type')" :class="{'current':serviceActiveIndex==item.type}"><span>{{item.name}}</span></li>
            </ul>
          </dd>
        </dl>
        <dl v-if="(departList||[]).length>0">
          <dt>科室</dt>
          <dd>
            <ul class="clearfix">
              <li v-for="(item,index) in departList" :key="index" @click="conditionChange(item, 'departActiveIndex','id')" :class="{'current':departActiveIndex==item.id}"><span>{{item.name}}</span></li>
            </ul>
          </dd>
        </dl>
      </div>
      <div class="shadow" v-if="sortActive||conditionActive" @click="hideLayer"></div>
    </div>

    <!-- dialog -->
    <div slot="page_footer">
      <loading-page v-show="loading&&(list||[]).length==0"></loading-page>
    </div>
    <div slot="page_layer">
      <dialog-area v-model="dialogAreaShow" :options="dialogAreaOptions" ref="dialogArea" @confirm="areaCallbck"></dialog-area>
    </div>

  </layout>
</template>
<script>
import {commonMixin, toTopMixin} from "@/mixins";
import Header from "@/components/header/Header";
import doctorCell from "../../components/doctor_cell/doctor_cell";
import dialogArea from "../../components/dialog_area";
import empty from "@/components/empty/empty";
import loadingBtn from "@/components/loading-btn/loading-btn";
import channelService from "@/services/channelService.js";
import {mapGetters, mapState} from "vuex";

export default {
  name: "channel",
  mixins: [commonMixin, toTopMixin],
  components: {
    mHeader:Header,
    doctorCell,
    empty,
    loadingBtn,
    dialogArea,
  },
  data() {
    return {
      channelId: "",
      seviceItem: [
        {
          name: "图文咨询",
          type: "advice",
        },
        // {
        //   name: "电话咨询",
        //   type: "phone",
        // },
        {
          name: "门诊预约",
          type: "register",
        }
      ],
      sortItem:[
        {
          name:"默认排序",
          value:0,
        },
        {
          name:"问诊量优先",
          value:1,
        },
        {
          name:"评价数优先",
          value:2,
        },
        {
          name:"低价优先",
          value:3,
        }
      ],
      sortActive:false,
      conditionActive:false,
      serviceActiveIndex: "",
      departActiveIndex: "",
      sortName:"默认排序",
      sortActiveIndex:0,

      loading:false,
      isEnd:false,
      loadingText:"加载更多",
      pageIndex:0,
      pageSize:10,
      pageCount:0,
      list:[],

      channelName:"...",
      hospitalId:"",
      departList:[],

      dialogAreaOptions: {},
      dialogAreaShow: false,

      areaActive:{},

      isRefresh: false,
      isShowInApp:true,
    };
  },
  computed: {
    ...mapGetters(["isInSinaHealthApp","isInIwenApp","isInHapHealApp"]),
    isInApp(){
      return platformInfo.isWeibo || platformInfo.isWx || this.isInSinaHealthApp || this.isInIwenApp || this.isInHapHealApp;
    },
    ...mapState({
      VX_location: "location",
    }),
    areaActiveName() {
      if(this.areaActive.cityId!=""){
        return this.areaActive.city || "全国";
      }else{
        return this.areaActive.province || "全国";
      }
    },
  },
  created() {
    this.channelId=this.$route.params.id;
    if(this.$route.query.channelName == undefined){
      this.$route.query.channelName = "";
    }
    this.channelName=this.$route.query.channelName.length>6?this.$route.query.channelName.slice(0,6)+"...":this.$route.query.channelName;
    this.hospitalId=this.$route.query.hospitalId||"";
    // this.renderData();
    this.getDepartList();
  },
  methods: {
    //筛选条件选择
    conditionChange(item, activeName,key){
      if(this.loading) return;
      if(this[activeName] == item[key]) {
        this[activeName] = "";
      }else {
        this[activeName] = item[key];
      };
      this.conditionActive = false;
      this.list=[];
      this.pageIndex=0;
      this.isEnd=false;
      this.renderData();
    },
    //排序
    sortChange(index){
      this.sortActiveIndex=index;
      this.sortName=this.sortItem[index].name;
      this.sortActive=false;
    },
    //打开关闭筛选弹框
    toggleCondition(){
      this.sortActive=false;
      this.conditionActive=!this.conditionActive;
    },
    // 打开关闭排序弹框
    toggleSort(){
      this.conditionActive=false;
      this.sortActive=!this.sortActive;
    },
    //点击遮罩关闭
    hideLayer(){
      this.sortActive=false;
      this.conditionActive=false;
    },
    renderData(){
      if(this.loading||this.isEnd) return;
      this.loading = true;
      let This = this;
      let params = {
        channelId: this.channelId,
        serviceType: this.serviceActiveIndex,
        departmentId: this.departActiveIndex,
        hospitalId: this.hospitalId,
        cityName:this.areaActive.cityId?this.areaActive.city:"",
        provinceName:this.areaActive.provinceId?this.areaActive.province:"",
        page: this.pageIndex + 1,
        size: this.pageSize,
      };
      channelService.getDoctorPageList(params).then(res => {
        This.loading = false;
        if (res.status == 200 && res.data) {
          This.pageIndex += 1;
          This.pageCount = Math.ceil(res.total/This.pageSize);
          This.list=this.list.concat(res.data);
          if(This.pageIndex>=This.pageCount){
            This.loadingText="没有更多了~";
            This.isEnd = true;
            return;
          }else{
            This.loadingText="加载更多";
            This.isEnd = false;
          }
        }
      });
    },
    getDepartList(){
      let data = {
        channelId: this.channelId,
      };
      channelService.getDepartmentByChId(data).then((res) => {
        if(res.status == 200&&res.data) {
          this.departList=res.data;
        };
      });
    },

    openDialogArea() {
      this.dialogAreaShow = true;
    },
    areaCallbck(params) {
      this.areaActive = params;
      console.log(this.areaActive.cityId);
      this.isRefresh = false;
      this.pageIndex=0;
      this.isEnd=false;
      this.list=[];
      this.renderData();
    },
  },
  mounted(){
    if (this.$refs.dialogArea && this.$refs.dialogArea.$refs.iwenArea) {
      this.isRefresh = this.$refs.dialogArea.$refs.iwenArea.isRefresh;
      console.log(this.isRefresh);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>

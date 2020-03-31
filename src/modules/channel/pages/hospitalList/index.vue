<template>
  <layout :isAppView="true">
    <div slot="page_header" class="header_wrapper">
      <m-header  :title="`${channelName}-医院列表`" :isShowInApp="true">
        <a href="javascript:;" slot="left" class="back" @click="router_back"></a>
        <div class="city" slot="right">
          <span class="city_name" @click="openDialogArea">
            <span>{{areaActiveName}}</span><i></i>
          </span>
        </div>
      </m-header>
    </div>
    <div slot="page_container">
      <div class="hospital_wrapper">
        <ul class="hospital_list" v-if="(list||[]).length>0">
          <li v-for="(item,index) in list" :key="index">
            <hospital-cell :hospital="item"></hospital-cell>
          </li>
        </ul>
        <div class="empty_box"  v-else-if="!loading">
          <empty title="暂无医院"></empty>
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
    <div slot="page_footer">
      <loading-page v-show="loading&&(list||[]).length==0"></loading-page>
    </div>
    <div slot="page_layer">
      <dialogArea v-model="dialogAreaShow" :options="dialogAreaOptions" ref="dialogArea" @confirm="areaCallbck"></dialogArea>
    </div>
  </layout>
</template>
<script>
import {commonMixin,toTopMixin} from "@/mixins";
import Header from "@/components/header/Header";
import loadingBtn from "@/components/loading-btn/loading-btn";
import empty from "@/components/empty/empty";
import hospitalCell from "../../components/hospital_cell/hospital_cell";
import dialogArea from "../../components/dialog_area";
import channelService from "@/services/channelService.js";
export default {
  name: "channel",
  mixins: [commonMixin, toTopMixin],
  components: {
    mHeader:Header,
    hospitalCell,
    loadingBtn,
    empty,
    dialogArea,
  },
  data() {
    return {
      channelId:"",
      loading:false,
      isEnd:false,
      loadingText:"加载更多",
      pageIndex:0,
      pageSize:10,
      pageCount:0,
      list:[],
      channelName:"...",
      dialogAreaShow:false,
      dialogAreaOptions: {},
      areaActive: {},
      isRefresh:false,
      isShowInApp:true,
    };
  },
  computed: {
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
    this.channelName=this.$route.query.channelName.length>6?this.$route.query.channelName.slice(0,6)+"...":this.$route.query.channelName;
    // this.renderData();
  },
  methods: {
    openDialogArea() {
      this.dialogAreaShow = true;
    },
    areaCallbck(params) {
      this.areaActive = params;
      console.log(this.areaActive);
      this.isRefresh = false;
      this.pageIndex=0;
      this.isEnd=false;
      this.list=[];
      this.renderData();
    },
    renderData(){
      if(this.loading||this.isEnd) return;
      this.loading = true;
      let This = this;
      let userLocation = JSON.parse(localStorage.getItem("userLocation"));
      let params = {
        channelId:this.channelId,
        cityId:this.areaActive.cityId,
        provinceId:this.areaActive.provinceId,
        latitude:userLocation.lat ? userLocation.lat : "", // 纬度
        longitude:userLocation.lat ? userLocation.lng : "", // 经度
        page: this.pageIndex+1,
        size: this.pageSize,
      };
      channelService.getPageChannelHospital(params).then(res => {
        This.loading = false;
        if (res.status == 200 && res.data) {
          This.pageIndex += 1;
          This.pageCount = Math.ceil(res.total/This.pageSize);
          if(!userLocation.lat||!userLocation.lng){
            res.data.map(item=>{
              item.distance="";
            });
          };
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
    }
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

<template>
  <layout :isAppView="true">
    <div slot="page_header" class="header_wrapper">
      <m-header  :title="`${columnInfo.columnName||''}-课堂列表`" :isShowInApp="true">
        <a href="javascript:;" slot="left" class="back" @click="router_back"></a>
        <div class="right" slot="right"></div>
      </m-header>
    </div>
    <div slot="page_container">
      <div class="class_wrapper">
        <ul class="class_list" v-if="(list||[]).length>0">
          <li v-for="(item,index) in list" :key="index">
            <class-cell :classItem="item"></class-cell>
          </li>
        </ul>
        <div class="empty_box"  v-else-if="!loading">
          <empty title="暂无课堂"></empty>
        </div>
        <loading-btn
          :loading="loading"
          :title="loadingText"
          v-if="(!isEnd&&(list||[]).length>0)||(isEnd&&(list||[]).length>0)"
          :scroll_load="true"
          :isEnd="isEnd"
          @loadFn="renderData">
        </loading-btn>
      </div>
    </div>
    <div  slot="page_footer">
      <loading-page v-show="loading&&(list||[]).length==0"></loading-page>
    </div>
  </layout>
</template>
<script>
import {commonMixin,toTopMixin} from "@/mixins";
import Header from "@/components/header/Header";
import classCell from "../../components/class_cell/class_cell";
import empty from "@/components/empty/empty";
import loadingBtn from "@/components/loading-btn/loading-btn";
import channelService from "@/services/channelService.js";
export default {
  name: "channel",
  mixins: [commonMixin, toTopMixin],
  components: {
    mHeader:Header,
    classCell,
    loadingBtn,
    empty
  },
  data() {
    return {
      columnId:"",
      loading:false,
      isEnd:false,
      loadingText:"加载更多",
      pageIndex:0,
      pageSize:10,
      pageCount:0,
      list:[],
      isShowInApp:true,
      columnInfo:{},
    };
  },
  computed: {
    
  },
  created() {
    this.columnId=this.$route.params.columnId;
    this.rendercolumnInfo();
    this.renderData();
  },
  methods: {
    //查询专栏信息
    rendercolumnInfo() {
      let data = {
        "columnId": this.columnId,
      };
      channelService.getColumnInfo(data).then((res) => {
        if(res.status == 200 && res.data) {
          res.data.columnName=res.data.columnName.length>6?res.data.columnName.slice(0,6)+"...":res.data.columnName;
          this.columnInfo = res.data;
        }
      }).catch(() => {});
    },

    renderData(){
      if(this.loading||this.isEnd) return;
      this.loading = true;
      let This = this;
      let params = {
        columnId:this.columnId,
        page: this.pageIndex+1,
        size: this.pageSize,
      };
      channelService.getColumnVideoList(params).then(res => {
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
    }
  },
  mounted(){
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>

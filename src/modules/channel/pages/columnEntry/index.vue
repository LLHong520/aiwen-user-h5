<template>
  <layout :isAppView="true">
    <div slot="page_header" class="header_wrapper">
      <m-header  title="分类百科" :isShowInApp="true">
        <a href="javascript:;" slot="left" class="back" @click="router_back"></a>
        <div class="right" slot="right"></div>
      </m-header>
    </div>
    <div slot="page_container">
      <div class="entry_wrapper">
        <ul class="entry_list" v-if="(list||[]).length>0">
          <li v-for="(item,index) in list" :key="index" >
            <dl>
              <dt>{{item.wentryTypeName}}</dt>
              <dd>
                <router-link :to="{name:'columnEntryIndex',params:{id:channelId,columnId:columnId,entryId:tag.id}}" v-for="(tag,index) in item.wentryList.slice(0,10)" :key="index">{{tag.wentryName}}</router-link>
                <template v-if="(item.wentryList||[]).length>10&&item.isShowAll">
                  <router-link :to="{name:'columnEntryIndex',params:{id:channelId,columnId:columnId,entryId:tag.id}}" v-for="(tag,index) in item.wentryList.slice(10)" :key="index+10">{{tag.wentryName}}</router-link>
                </template>
                <span v-else-if="(item.wentryList||[]).length>10" @click="showAllentry(item)">展开全部</span>
              </dd>
            </dl>
          </li>
        </ul>
        <div class="empty_box"  v-else>
          <empty title="暂无内容"></empty>
        </div>
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
    <div slot="page_footer">
      <loading-page v-show="loading&&(list||[]).length==0"></loading-page>
    </div>
  </layout>
</template>
<script>
import {commonMixin,toTopMixin} from "@/mixins";
import Header from "@/components/header/Header";
import loadingBtn from "@/components/loading-btn/loading-btn";
import empty from "@/components/empty/empty";
import channelService from "@/services/channelService.js";
export default {
  name: "channel",
  mixins: [commonMixin, toTopMixin],
  components: {
    mHeader:Header,
    loadingBtn,
    empty
  },
  data() {
    return {
      channelId:"",
      columnId:"",
      loading:false,
      isEnd:false,
      loadingText:"加载更多",
      pageIndex:0,
      pageSize:10,
      pageCount:0,
      list:[],
      channelName:"...",
      isShowInApp:true,
    };
  },
  computed: {
    
  },
  created() {
    this.channelId=this.$route.params.id;
    this.columnId=this.$route.params.columnId;
    
    
    this.renderData();
  },
  methods: {
    renderData(){
      if(this.loading||this.isEnd) return;
      this.loading = true;
      let This = this;
      let params = {
        columnId:this.columnId,
      };
      channelService.getColumnLWentryList(params).then(res => {
        This.loading = false;
        if (res.status == 200 && res.data) {
          // this.list=res.data;
          This.pageIndex += 1;
          console.log(This.pageIndex);
          This.pageCount = Math.ceil(res.total/This.pageSize);
          res.data=res.data.map( item => {
            return {
              ...item,
              isShowAll:false,
            };
          });
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
    showAllentry(item){
      console.log(item.wentryList.length);
      item.isShowAll=true;
      console.log(item.isShowAll);
    }
  },
  mounted(){},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>

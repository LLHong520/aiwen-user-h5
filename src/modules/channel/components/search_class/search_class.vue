<template>
  <div class="slide_item">
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
      v-if="(!isEnd&&(list||[]).length>0)||isEnd&&(list||[]).length>0"
      :scroll_load="true"
      :isEnd="isEnd"
      @loadFn="renderData">
    </loading-btn>
  </div>
</template>

<script >
import { commonMixin} from "@/mixins";
import classCell from "../class_cell/class_cell";
import empty from "@/components/empty/empty";
import loadingBtn from "@/components/loading-btn/loading-btn";
import channelService from "@/services/channelService.js";
export default {
  name: "searchDoctor",
  mixins:[commonMixin],
  components: {
    classCell,
    loadingBtn,
    empty
  },
  data(){
    return {
      loading:false,
      isEnd:false,
      loadingText:"加载更多",
      pageIndex:0,
      pageSize:10,
      pageCount:0,
      list:[],
      channelId:"",
    };
  },
  props:["keywords"],
  watch:{
    "keywords":function(newVal){
      if(newVal!=""){
        this.search();
      }
    }
  },
  created(){
    this.channelId=this.$route.params.id;
  },
  methods:{
    search(){
      this.pageIndex=0;
      this.list=[];
      this.isEnd=false;
      this.renderData();
    },
    renderData(){
      if(this.loading||this.isEnd) return;
      this.loading = true;
      let This = this;
      let params = {
        id:this.channelId,
        keywords:this.keywords,
        searchType:"channelClass",
        page: this.pageIndex+1,
        size: this.pageSize,
      };
      channelService.getSearchKeyWords(params).then(res => {
        This.loading = false;
        if (res.status == 200 && res.data) {
          This.pageIndex += 1;
          This.pageCount = res.total/This.pageSize;
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
      }).then(()=>{
        This.$emit("changeSearching",false);
      });
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
.class_list{
  li{
    border-bottom: 1px solid #EFEFEF;
  }
}
.empty_box {
  padding-top: 162/@r;
}
</style>

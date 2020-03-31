<template>
  <div class="slide_item">
    <ul class="articleList" v-if="(list||[]).length>0">
      <li v-for="(item,index) in list" :key="index">
        <article-cell :article="item"></article-cell>
      </li>
    </ul>
    <div class="empty_box"  v-else-if="!loading">
      <empty title="暂无科普"></empty>
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
import articleCell from "../article_cell/article_cell";
import empty from "@/components/empty/empty";
import loadingBtn from "@/components/loading-btn/loading-btn";
import channelService from "@/services/channelService.js";
export default {
  name: "searchDoctor",
  mixins:[commonMixin],
  components: {
    articleCell,
    loadingBtn,
    empty
  },
  props:["keywords"],
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
        searchType:"channelPaper",
        page: this.pageIndex+1,
        size: this.pageSize,
      };
      channelService.getSearchKeyWords(params).then(res => {
        This.loading = false;
        if (res.status == 200 && res.data) {
          This.pageIndex += 1;
          This.pageCount = res.total/This.pageSize;
          let articleList=[];
          res.data.map((item,index) => {
            let images = This.getArticleImages(item.content);
            articleList.push({
              ...item,
              art_images: images.slice(0,3)
            });
          });
          This.list = This.list.concat(articleList);
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
    },
    getArticleImages(htmlContent) {
      let dom = $("<div>"+htmlContent+"</div>");
      let images = dom.find("img");
      let imageUrls = [];
      images.map((index, el) => {
        if (el.src) {
          imageUrls.push(el.src);
        }
      });
      return imageUrls;
    },
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
.articleList{
  li{
    border-bottom: 1px solid #EFEFEF;
  }
}
.empty_box {
  padding-top: 162/@r;
}
</style>

<template>
<layout class="doc-info-page" :docSwitch="true" :isShowNav="isShowNav">
  <!-- page_header -->
  <div slot="page_header">
   <conHeader title='诊间日记' :isWhite="true">
      <span class="retrun" slot='left' @click="router_back">
        <b class="gray"></b>
        </span>
        <span class="placeholder" slot='right'>
          <i @click="share" class="icon icon-share_gray"></i>
        </span>
    </conHeader>
  </div>
 <!-- page_header -->
  <!-- page_container -->
  <div slot="page_container" class="app_wrapper_inner">
    <div class="kepu-list">
      <ul class="article-list">
        <li v-for="(article,index) in dairyParam.list" :key="index">
          <!-- 纯文本诊间日记 -->
          <textDairyCell v-if="article.contentType==2" :article="article"></textDairyCell>
          <!-- 纯文本诊间日记 -->
          <!-- 普通文章 -->
          <a v-else :href="GET_ARTICLE_URL(article.id,2)">
            <articleCell :article="article"></articleCell>
          </a>
        </li>
      </ul>
    </div>
    <loading-btn
      v-if="dairyParam.pager.totalPage>1"
      :loading="dairyParam.load_more_loading"
      :title="dairyParam.load_more_text"
      @loadFn="getDairyList">
    </loading-btn>
    <noResult v-if="!dairyParam.load_more_loading&&dairyParam.list.length==0" title="木有相关文章^_^"></noResult>

  </div>
<!-- /page_container -->
  <!-- page_footer -->
  <div  slot="page_footer">
    <!-- 分享弹窗 -->
     <share
    :show.sync="share_show"
    @cancel="cancelShare"
    @confirm="confirmShare"
    ></share>
    <!-- 分享弹窗 -->
    <!-- 微博分享 -->
     <share-sina
    :show.sync="share_con_show"
    @cancel="cancelShareCon"
    @confirm="confirmShareCon"
    :conInfo="shareSinaInfo"
    ></share-sina>
    <!-- 微博分享 -->
    <!-- 微信分享 -->
    <share-wechat :show.sync="show_wechatShare"></share-wechat>
    <!-- /微信分享 -->
    <loading-page v-show='initing_page'></loading-page>
  </div>
</layout>
</template>
<script>
import {LINK_CARD_BASE_URL} from "@/config";
import loadingBtn from "@/components/loading-btn-white/loading-btn";
import { commonMixin, toTopMixin,shareMixin} from "@/mixins";
import conHeader from "@/components/con-header-doctor/con-header-doctor";
import articleCell from "../../components/article-cell/article-cell";
import textDairyCell from "@/modules/health/components/text_dairy_cell";
import share from "@/iwen/share/share";
import shareSina from "@/iwen/share-sina/share-sina";
import shareWechat from "@/iwen/share-wechat/share-wechat";
import noResult from "@/components/empty/empty";
import sysService from "@/services/sysService.js";
import doctorService from "@/services/doctorService.js";

export default {
  name: "doc_comments",
  mixins:[commonMixin,toTopMixin,shareMixin],
  data () {
    return {
      isShowNav:true,
      dId:"",
      dairyParam:{
        list:[],
        pager:{
          totalCount:0,
          totalPage:2,
          nowPage:0
        },
        load_more_loading:false,
        hasMore:true,
        load_more_text:"点击加载更多",
      },
      share_show:false,
      share_con_show:false,
      showWxCode:false,
      show_wechatShare:false,
      shareSinaInfo:{
        sharedContent:"",
        sharedImg:"",
      },
      docInfo:{},
    };
  },
  components:{
    loadingBtn,
    textDairyCell,
    articleCell,
    noResult,
    conHeader,
    share,
    shareSina,
    shareWechat,
  },
  created(){

  },
  computed:{},
  methods:{
    initPage(){
      this.dId=this.$route.params.dId;
      this.getDairyList();
      this.getDocinfo();
    },
    getDocinfo(){
      let This=this;
      doctorService.doc_info({docId:This.dId})
      .then(res=>{
        if(res.code==0&&res.data){
          This.isGz=res.data.relation;
          This.docInfo=res.data;
        }
      });
    },
    getDairyList(){
      if(!this.dairyParam.hasMore||this.dairyParam.load_more_loading) return;
      this.dairyParam.load_more_loading=true;
      let This=this;
      let targetPageNum=this.dairyParam.pager.nowPage+1;
      sysService.getArticleByType({
        pageSize:10,
        pageIndex:targetPageNum,
        drUserId:this.dId,
        contentType:2
      }).then((res)=>{
        if(res.code==0&&res.data){
          This.dairyParam.list = This.dairyParam.list.concat(res.data);
          This.dairyParam.pager.nowPage=parseInt(res.page.pageIndex);
          This.dairyParam.pager.totalPage=parseInt(res.page.totalPages);
          This.dairyParam.load_more_loading=false;
          //确定没有更多时
          if(This.dairyParam.pager.nowPage+1>This.dairyParam.pager.totalPage){
            This.dairyParam.load_more_text="没有更多了";
            This.dairyParam.hasMore=false;
          }
        }
      },function(){
        This.dairyParam.load_more_loading=false;
      }).then(()=>{
        let isHasMark=window.location.href.indexOf("#doctor_papers")>0? true:false;
        if(isHasMark){
          This.changeCallBackArt(1);
          document.querySelector("#doctor_papers").scrollIntoView();
        }
      });
    },
    setShareInfo(){
      let This=this;
      var lineLink = location.href.split("#")[0];
      sysService.getWxConfig({shareURL:lineLink})
      .then(res=>{
        if(res.appId){
          shareFns.setConfig(res);
          return true;
        }else{
          //签名失败
          return false;
        }
      }).then((isConfig)=>{
        if(isConfig){
          let url=This.$route.fullPath;
          let momentUrl=This.$route.fullPath;
          if(url.indexOf("?")>=0){
            url+="&channel=02HZ00004100023000";
            momentUrl+="&channel=02HZ00004200023000";
          }else{
            url+="?channel=02HZ00004100023000";
            momentUrl+="?channel=02HZ00004200023000";
          }
          shareFns.setShareInfo({
            lineLink:This.APP_URL+url,
            momentLineLink:This.APP_URL+momentUrl,
            imgUrl:This.GET_IMG_URL(This.docInfo.photo),
            shareTitle:`【${This.docInfo.realName}】${This.docInfo.titles} ${This.docInfo.workUnit} ${This.docInfo.departments}`,
            descContent:`${This.docInfo.areasOfExpertise}`
          });
        }
      });
    },
    cancelShare(){
      this.share_show=false;
      this.isShowNav=true;
    },
    checkLogin(){
      if(!this.VX_islogin){
        this.goLogin(this.$route.fullPath);
        return false;
      }else{
        return true;
      }
    },
    checkNikeAndMobile(){
        //是否编辑昵称
      if(!this.VX_isNickEdited){
        this.$router.push("/nike_name?refer="+this.$route.fullPath);
        return false;
      }else if(!this.VX_isBindMobile){
        this.$router.push("/bind_mobile?refer="+this.$route.fullPath);
        return false;
      }else {
        return true;
      }
    },
    share(){
      // if(!this.checkLogin()) return;
      // if(!this.checkNikeAndMobile()) return;
      this.isShowNav=false;
      if(platformInfo.isWx){
        this.share_show=true;
      }else{
        if(!this.checkLogin()) return;
        this.share_con_show=true;
      }
      this.shareSinaInfo.sharedContent=`推荐新浪爱问医生-${this.docInfo.realName}-${this.docInfo.departments}-${this.docInfo.titles},擅长${this.docInfo.areasOfExpertise||""}`;
      this.shareSinaInfo.sharedImg=this.GET_IMG_URL(this.docInfo.photo);
    },
    confirmShare(params){
      if(params.type=="wx"){
        this.show_wechatShare=true;
        return;
      }else if(params.type=="wb"){
        if(!this.VX_islogin){
          this.goLogin(this.$route.fullPath);
          return;
        }
        this.share_show=false;
        this.share_con_show=true;
      }
    },
    cancelShareCon(){
      let _this=this;
      _this.share_con_show=false;
      _this.isShowNav=true;
    },
    confirmShareCon(sharedContent){
      let This=this;
      This.isShowNav=true;
      let url=LINK_CARD_BASE_URL+`/linkcard/awyh_doctorindex/${this.docInfo.id}.htm`;
      if(url.indexOf("?")>=0){
        url+="&channel=01HZ00000600023000&tag=pc&m=doctor_Index&n="+this.docInfo.id;
      }else{
        url+="?channel=01HZ00000600023000&tag=pc&m=doctor_Index&n="+this.docInfo.id;
      }
      sysService.wbShare({
        sharedContent:sharedContent,
        // sharedUrl:encodeURIComponent(url),
        sharedUrl:url,
        // sharedImg:this.shareSinaInfo.sharedImg
      })
      .then(res=>{
        if(res.code==0){
          This.$toast.tip("分享成功");
        }
      })
      .catch(()=>{
        This.$toast.tip("分享失败");
      });
    },
  },
  mounted(){
    this.initPage();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
.kepu-list{
  padding: 0 0px;
  border-top: 1px solid #EFEFEF;
  /deep/li:last-child .kepu-cell{
    border: 0;
  }
}
</style>

<template>
<layout class="doc-info-page" :isShowNav="isShowNav">
  <!-- page_header -->
  <div slot="page_header">
   <conHeader title='自述热榜' :isWhite="true">
      <span class="retrun" slot='left' @click="router_back">
        <b class="gray"></b>
        </span>
        <span class="retrun" slot='right'>
          <!-- <i v-if="VX_isInSinaHealthApp" @click="share" class="icon icon-share_gray"></i> -->
        </span>
    </conHeader>
  </div>
 <!-- page_header -->
  <!-- page_container -->
  <div slot="page_container" class="app_wrapper_inner">
    <div class="kepu-list">
      <ul class="article-list">
        <li v-for="(article,index) in dairyParam.list" :key="index">
          <a :href="GET_ARTICLE_URL(article.id,article.contentType)">
            <div class="kepu-cell">
              <div class="kepu-cell-con">
                <div class="cell-text">
                  <p class="cell-title"  v-disall="2">
                    <span v-if="article.icon" :class="article.icon" class="icon-rank"></span>
                    {{article.title}}
                  </p>
                  <div class="cell-doc-info">
                    <span>{{article.trueReadCountPv}}热度</span>
                  </div>
                </div>
                <div class="cell-img">
                  <img class="adapter" v-lazy="GET_IMG_URL(article.picName,'post')" alt="">
                </div>
              </div>
            </div>
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
import LOGOSINA_IMG from "@/assets/images/default/icon_sinahealth.png";
import {LINK_CARD_BASE_URL} from "@/config";
import loadingBtn from "@/components/loading-btn-white/loading-btn";
import { commonMixin, toTopMixin,shareMixin} from "@/mixins";
import { mapGetters } from "vuex";
import conHeader from "@/components/con-header-doctor/con-header-doctor";
import share from "@/iwen/share/share";
import shareSina from "@/iwen/share-sina/share-sina";
import shareWechat from "@/iwen/share-wechat/share-wechat";
import noResult from "@/components/empty/empty";
import sysService from "@/services/sysService.js";
export default {
  name: "selfDescriptionList",
  mixins:[commonMixin,toTopMixin,shareMixin],
  data () {
    return {
      id:"",
      isShowNav:true,
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
    noResult,
    conHeader,
    share,
    shareSina,
    shareWechat,
  },
  created(){

  },
  computed:{
    ...mapGetters({
      VX_isInSinaHealthApp: "isInSinaHealthApp"
    }),
  },
  methods:{
    initPage(){
      this.getDairyList();
      // this.setShareInfo();
      this.setSinaAPPShareInfo();
    },
    getDairyList(){
      if(!this.dairyParam.hasMore||this.dairyParam.load_more_loading) return;
      this.dairyParam.load_more_loading=true;
      let This=this;
      let targetPageNum=this.dairyParam.pager.nowPage+1;
      // let params = {
      //   pageIndex: targetPageNum,
      //   limit: 10,
      //   contentType: 3,
      // };
      // homeService.getPopSciencePaperByPage(params).then(res => {
      sysService.getArticleByType({
        pageSize:10,
        pageIndex:targetPageNum,
        contentType:3
      }).then((res)=>{
        if(res.code==0&&res.data){
          This.dairyParam.list = This.dairyParam.list.concat(res.data);
          let indexArticleList = This.dairyParam.list;
          indexArticleList.map((item,index) => {
            if(index<5){
              item.icon = "iconRank"+index;
            }
          });
          This.dairyParam.list = indexArticleList;
          // console.log(This.dairyParam.list);
          // console.log(This.dairyParam.list);
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
    getLinkcardUrl(){
      let feedId = `PT000${new Date().getTime()}`;
      let url = LINK_CARD_BASE_URL + `/linkcard/awyh_describelist.htm?isApp=${iwenJSNativeBridge.appParams.isApp}&m=awyh_describelist&tag=pc&feedid=${feedId}`;
      // if (url.indexOf("?") >= 0) {
      //   url +=
      //     "&channel=01HZ00000600004000&tag=pc&m=awyh_describelist&n=";
      // } else {
      //   url +=
      //     "?channel=01HZ00000600004000&tag=pc&m=awyh_describelist&n=";
      // }
      return url;
    },
    setSinaAPPShareInfo() {
      //如果在新浪健康App内部 则调起原生分享
      if (this.VX_isInSinaHealthApp) {
        iwenJSNativeBridge.hiddenShare({
          hidden: false,
          share: {
            sourceType:3,
            title: "患者自述热榜",
            url: this.getLinkcardUrl(),
            img: LOGOSINA_IMG,
            content: "患者自述热榜，一个医患个性化点评的交流地"
          }
        });
      }
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
            url+="&channel=02HZ00004100004000";
            momentUrl+="&channel=02HZ00004200004000";
          }else{
            url+="?channel=02HZ00004100004000";
            momentUrl+="?channel=02HZ00004200004000";
          }
          shareFns.setShareInfo({
            lineLink:This.APP_URL+url,
            momentLineLink:This.APP_URL+momentUrl,
            imgUrl:LOGOSINA_IMG,
            shareTitle:"患者自述热榜",
            descContent:"患者自述热榜，一个医患个性化点评的交流地"
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
      //如果在新浪健康App内部 则调起原生分享
      if (this.VX_isInSinaHealthApp) {
        // let url = this.$route.fullPath;
        iwenJSNativeBridge.appShare({
          sourceType:3,
          title: "患者自述热榜",
          url: this.getLinkcardUrl(),//this.APP_URL + url.split("?")[0],
          img: LOGOSINA_IMG,
          content: "患者自述热榜，一个医患个性化点评的交流地"
        });
        return;
      }
      // if(!this.checkLogin()) return;
      // if(!this.checkNikeAndMobile()) return;
      this.isShowNav=false;
      if(platformInfo.isWx){
        this.share_show=true;
      }else{
        if(!this.checkLogin()) return;
        this.share_con_show=true;
      }
      this.shareSinaInfo.sharedContent="患者自述热榜，一个医患个性化点评的交流地";
      this.shareSinaInfo.sharedImg=LOGOSINA_IMG;
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
      let url=LINK_CARD_BASE_URL+`/linkcard/article_describe/${this.id}.htm`;
      if(url.indexOf("?")>=0){
        url+="&channel=01HZ00000600004000&tag=pc&m=article_describe&n="+this.id;
      }else{
        url+="?channel=01HZ00000600004000&tag=pc&m=article_describe&n="+this.id;
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
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
.kepu-list{
  padding: 0 15px;
  border-top: 1px solid #EFEFEF;
  /deep/li:last-child .kepu-cell{
    border: 0;
  }
}
//icons
.icon{
  display: inline-block;
  vertical-align: middle;
}
.avater{
  display: inline-block;
  width: 46/@r;
  height: 46/@r;
  img{
    border-radius: 50%;
  }


}
//健康科普文章列表
  .kepu-cell{
    border-bottom: 1px solid #EFEFEF;
  }

  .kepu-cell-con{
    padding: 15px 0;
    cursor: pointer;
    .flexbox();
    .cell-text{
      .flexbox();
      .flex(1);
      .flexdirection(column);
      overflow: hidden;
      justify-content:space-between;
    }
    .cell-title{
      .font_2xl;
      color: #2D2D2D;
      line-height: 180%;
      line-height: 125%;
      .show_n_lines(2);
    }
    .cell-doc-info{
      .font_s;
      color: #AEB1B6;
      line-height: 46/@r;
      display:flex;
      div{
        flex:1;
        &:nth-of-type(2){
          text-align: right;
        }
      }
      .view-num{
        color: #cfcfcf;
      }
    }
    .cell-img{
      width: 242/@r;
      height: 152/@r;
      overflow: hidden;
      margin-left: 38/@r;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        max-width: 242/@r;
        height: auto;
        margin: 0 auto;
        display: block;
        border-radius: 4px;
      }
    }
  }
  .kepu-cell-footer{
    .flexbox();
    .font_l;
    color: #828888;
    padding:20/@r;

    div{
      .flex(1);
      &:nth-of-type(2){
        text-align: right;
      }
    }
  }
</style>

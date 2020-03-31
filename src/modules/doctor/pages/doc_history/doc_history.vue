<template>
<layout class="doc-info-page" :docSwitch="true" :isShowNav="isShowNav">
  <!-- page_header -->
  <div slot="page_header">
   <conHeader title='最近动态' :isWhite="true">
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
    <div class="history_list">
      <div class="history_item" v-for="item in newsParam.list"  :key="item.key">
        <div class="history_hd">
          <h3><a :href="item.url">{{item.action}}</a></h3>
          <span class="time">{{item.time}}</span>
        </div>
        <div class="history_card" >
          <a :href="item.url" v-if="item.type==0||item.type==1">
            <template>
              <dl>
                <dt v-if="item.title!=''">{{item.title}}</dt>
                <dd>{{(item.realContent||"")|removeHtmlTag}}</dd>
              </dl>
            </template>
          </a>
          <a :href="item.url" v-if="item.type==2">
            <div class="video_box">
              <div class="video_img"><img :src="item.realContent" alt=""><div class="mask"></div><span class="playbtn"></span></div>
              <div class="video_tit">{{item.title}}</div>
            </div>
          </a>
        </div>
      </div>
      <div class="history_item last" v-if="!newsParam.hasMore">
        <div class="history_hd">
          <h3>这是我的底线</h3>
        </div>
      </div>
    </div>
    <loading-btn
      v-if="newsParam.pager.totalPage>1&&newsParam.hasMore"
      :loading="newsParam.load_more_loading"
      :title="newsParam.load_more_text"
      @loadFn="geHistoryList">
    </loading-btn>
    <noResult v-if="!newsParam.load_more_loading&&newsParam.list.length==0" title="木有相关文章^_^"></noResult>
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
import noResult from "@/components/empty/empty";
import { commonMixin, toTopMixin,shareMixin} from "@/mixins";
import conHeader from "@/components/con-header-doctor/con-header-doctor";
import relativeMoments from "../../components/relative-moments/relative-moments";
import share from "@/iwen/share/share";
import shareSina from "@/iwen/share-sina/share-sina";
import shareWechat from "@/iwen/share-wechat/share-wechat";
import doctorService from "@/services/doctorService.js";
import sysService from "@/services/sysService.js";
export default {
  name: "doc_comments",
  mixins:[commonMixin,toTopMixin,shareMixin],
  data () {
    return {
      isShowNav:true,
      dId:"",
      newsParam:{
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
    conHeader,
    relativeMoments,
    loadingBtn,
    noResult,
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
      this.geHistoryList();
      this.getDocinfo();
    },
    geHistoryList(){
      if(!this.newsParam.hasMore||this.newsParam.load_more_loading) return;
      this.newsParam.load_more_loading=true;
      let This=this;
      let targetPageNum=this.newsParam.pager.nowPage+1;
      doctorService.doc_news({
        pageSize:10,
        nowPage:targetPageNum,
        docId:this.dId,
      }).then((res)=>{
        if(res.code==0&&res.result){
          This.newsParam.list = This.newsParam.list.concat(res.result);
          This.newsParam.pager.nowPage=parseInt(res.nowPage);
          This.newsParam.pager.totalPage=parseInt(res.totalPage);
          This.newsParam.load_more_loading=false;
          //确定没有更多时
          if(This.newsParam.pager.nowPage+1>This.newsParam.pager.totalPage){
            This.newsParam.load_more_text="没有更多了";
            This.newsParam.hasMore=false;
          }
        }
      },function(){
        This.newsParam.load_more_loading=false;
      }).then(()=>{
        let isHasMark=window.location.href.indexOf("#doctor_papers")>0? true:false;
        if(isHasMark){
          This.changeCallBackArt(1);
          document.querySelector("#doctor_papers").scrollIntoView();
        }
      });
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
@assets: "~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
.history_list{
  padding: 20px 15px 0;
  border-top: 1px solid #EFEFEF;
}
.history_item{
  padding-bottom: 20px;
  background: url(./images/line.png) repeat-y 16/@r 0;
  .history_hd{
    display: flex;
    font-size: 12px;
    line-height: 36/@r;
    color: #2D2D2D;
    padding-left: 58/@r;
    background: #ffffff url(./images/icon_trends_dot@2x.png) no-repeat 0 0;
    background-size:36/@r 36/@r;
    a{
      color: #2D2D2D;
    }
    h3{
      flex: 1;
      width: 0;
    }
    .time{
      color: #999;
    }
  }
  .history_card{
    box-sizing: border-box;
    background-color: #F8FAFD;
    border: 1px solid #F8FAFD;
    font-size: 11px;
    line-height: 16px;
    color: #666;
    border-radius: 4px;
    margin-top: 10px;
    margin-left: 58/@r;
    >a{
      padding: 12px;
      display: block;
    }
    dt{
      font-size: 14px;
      font-weight: bold;
      line-height: 20px;
      color: #2d2d2d;
    }
    dd{
      padding-top: 6px;
      display: -webkit-box;
      -webkit-box-pack: center;
      display: -moz-box;
      -moz-box-pack: center;
      display: -o-box;
      -o-box-pack: center;
      display: -ms-box;
      -ms-box-pack: center;
      box-pack: center;
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      -webkit-line-clamp: 2;
      box-orient: horizontal;
      box-pack: center;
      box-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .noTitle dd{
      -webkit-line-clamp: 3;
    }
    .video_box{
      display: flex;
      .video_img{
        width: 132/@r;
        height: 132/@r;
        margin-right: 12px;
        position: relative;
        border-radius: 4px;
        img{
          display: block;
          width: 132/@r;
          height: 132/@r;
        }
        .mask{
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 4px;
          left: 0;
          top: 0;
          background: rgba(0,0,0,.3);
        }
        .playbtn{
          width: 36/@r;
          height: 36/@r;
          background: url(./images/list_btn_video_play@2x.png) no-repeat;
          background-size: cover;
          left: 48/@r;
          top: 48/@r;
          position: absolute;
          display: block;
        }
      }
      .video_tit{
        font-size: 14px;
        line-height: 132/@r;
        flex: 1;
        width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #2D2D2D;
        font-weight: bold;
      }
    }
  }
  &.last,&:last-child{
    background-image: none;
  }
}
</style>

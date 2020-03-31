<template>
<layout class="doc-info-page" :docSwitch="true" :isShowNav="isShowNav">
  <!-- page_header -->
  <div slot="page_header">
   <conHeader title='Ta的活动' :isWhite="true">
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
    <div class="activity_list">
      <div class="activity_item" v-for="item in activityParam.list" :key="item.key">
        <div class="activity_hd">
          <span class="blue" v-if="item.activityType=='0'">公益咨询</span><span class="blue" v-if="item.activityType=='1'">在线访谈</span><span class="blue" v-if="item.activityType=='2'">在线课堂</span>：{{item.title}}
        </div>
        <div class="activity_img">
          <span class="state" v-if="item.activityStatus=='0'">火热进行中</span>
          <span class="state" v-if="item.activityStatus=='1'">报名中</span>
          <span class="state closed" v-if="item.activityStatus=='2'">已结束</span>
          <span class="state closed" v-if="item.activityStatus=='3'">已关闭</span>
          <a :href="OUTER_LINKS.courseDetails+item.id" v-if="item.activityType=='2'"><img :src="GET_IMG_URL(item.image)" alt=""></a>
          <a :href="OUTER_LINKS.weiTalkDetail+item.id" v-else-if="item.activityType=='1'"><img :src="GET_IMG_URL(item.image)" alt=""></a>
          <a :href="CW_ACT+item.id" v-else-if="item.activityType=='0'"><img :src="GET_IMG_URL(item.image)" alt=""></a>
          <p>活动时间：{{item.startTime|dataFormat}} — {{item.endTime|dataFormat}}</p>
        </div>
      </div>
      <loading-btn
        v-if="activityParam.pager.totalPage>1"
        :loading="activityParam.load_more_loading"
        :title="activityParam.load_more_text"
        @loadFn="getAllJoinActivity">
      </loading-btn>
      <noResult v-if="!activityParam.load_more_loading&&activityParam.list.length==0" title="暂无内容"></noResult>
    </div>
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
import {CW_ACT,LINK_CARD_BASE_URL,YK_URL,MOMENT_URL,FORUM_URL,APP_URL,DOC_CONSULT_URL} from "@/config";
import { commonMixin, toTopMixin,shareMixin} from "@/mixins";
import conHeader from "@/components/con-header-doctor/con-header-doctor";
import share from "@/iwen/share/share";
import shareSina from "@/iwen/share-sina/share-sina";
import noResult from "@/components/empty/empty";
import loadingBtn from "@/components/loading-btn-white/loading-btn";
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
      activityList:[],
      APP_URL,
      MOMENT_URL,
      FORUM_URL,
      DOC_CONSULT_URL,
      CW_ACT,
      YK_URL,
      share_show:false,
      share_con_show:false,
      showWxCode:false,
      show_wechatShare:false,
      shareSinaInfo:{
        sharedContent:"",
        sharedImg:"",
      },
      docInfo:{},
      activityParam:{
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

    };
  },
  components:{
    conHeader,
    share,
    shareSina,
    shareWechat,
    noResult,
    loadingBtn,
  },
  created(){

  },
  computed:{},
  methods:{
    initPage(){
      this.dId=this.$route.params.dId;
      this.getAllJoinActivity();
      this.getDocinfo();
    },
    // getAllJoinActivity(){
    //   let This=this;
    //   doctorService.getAllJoinActivity({docId:this.dId,isDocIndex:0}).then((res)=>{
    //     if(res.code==0&&res.data){
    //       This.activityList = res.data;
    //     }
    //   });
    // },
    getAllJoinActivity(){
      if(!this.activityParam.hasMore||this.activityParam.load_more_loading) return;
      this.activityParam.load_more_loading=true;
      let This=this;
      let targetPageNum=this.activityParam.pager.nowPage+1;
      doctorService.getAllJoinActivity({
        pageSize:10,
        nowPage:targetPageNum,
        docId:this.dId,
        isDocIndex:0
      }).then((res)=>{
        if(res.code==0&&res.data){
          This.activityParam.list = This.activityParam.list.concat(res.data);
          This.activityParam.pager.nowPage=parseInt(res.nowPage);
          This.activityParam.pager.totalPage=parseInt(res.totalPage);
          This.activityParam.load_more_loading=false;
          //确定没有更多时
          if(This.activityParam.pager.nowPage+1>This.activityParam.pager.totalPage){
            This.activityParam.load_more_text="没有更多了";
            This.activityParam.hasMore=false;
          }
        }
      },function(){
        This.activityParam.load_more_loading=false;
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
@import "@{assets}/css/fix.less"; //科室信息
.activity_list{
  padding:  0 15px;
  border-top: 1px solid #EFEFEF;
}
.activity_item{
  border-bottom: 1px solid #EFEFEF;
  padding: 14px 0;
  .activity_hd{
    font-size: 15px;
    color: #282828;
    line-height: 22px;
    .blue{
      color: #2688FC;
      font-weight: bold;
    }
  }
  .activity_img{
    position: relative;
    margin-top: 10px;
    img{
      display: block;
      width: 100%;
      border-radius: 5px;
    }
    p{
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      box-sizing: border-box;
      padding: 6px 10px;
      line-height: 16px;
      font-size: 12px;
      color: #fff;
      background: rgba(0,0,0,0.4);
      border-radius: 0 0 5px 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .state{
      position:inline-block;
      right: 10px;
      top: 10px;
      position: absolute;
      height: 34/@r;
      font-size: 20/@r;
      padding: 0 5px;
      line-height: 34/@r;
      color: #fff;
      border-radius: 4px;
      background: rgba(38,136,252,.85);
    }
    .state.closed{
      background-color: rgba(0,0,0,.85);
    }
  }
}
</style>

<template>
<layout>
  <!-- page_header -->
  <div slot="page_header">
    <m-header slot="page_header" title="视频集">
      <span class="retrun" slot="left" @click="router_back">
        <b class="gray"></b>
      </span>
      <span class="placeholder mr10" slot="right" @click="share">
        <i class="icon icon-share"></i>分享
      </span>
    </m-header>
  </div>
  <!-- page_header -->
  <!-- page_container -->
  <div slot="page_container" class="app_wrapper_inner">
    <div class="video_gather">
      <div class="top_module">
        <div class="video_statistics" v-if="videoStatistics">
          <div v-if="platformInfo.isWeibo||platformInfo.isWx" class="share" @click="share">
            <span class="i-share"></span>
            <span class="title">分享</span>
          </div>
          <div class="video_mask">
            <img :src="GET_IMG_URL(videoStatistics.coverImageUrl,'')" alt="" />
            <i v-if="!isShowplaceholderVideoImg" class="mask"></i>
          </div>
          <div class="statistics_num">
            <ul>
              <li>
                <p>{{videoStatistics.fileCount}}</p>
                <p>视频</p>
              </li>
              <li>
                <p>{{videoStatistics.readCount}}</p>
                <p>播放</p>
              </li>
              <li>
                <p>{{videoStatistics.favoriteCount}}</p>
                <p>赞</p>
              </li>
            </ul>
          </div>
          <i class="icon_video"></i>
        </div>
        <div class="video_introduce" v-if="videoStatistics">
          <h1>{{videoStatistics.name}}</h1>
          <h2>创建于：{{videoStatistics.createTime}}</h2>
          <p>{{videoStatistics.intro}}</p>
        </div>
      </div>
      <div class="middle_module">
        <h1 class="title">全部视频</h1>
        <div class="all_video" v-if="videoList.length > 0">
          <ul>
            <li v-for="(item, index) in videoList" :key="index">
              <router-link :to="{name:'Video',params:{'id':item.id},query:{'mediaId':mediaId}}">
                <div class="item">
                  <div class="item_img">
                    <div class="img_mask">
                      <img :src="item.coverImageUrl" alt="" />
                      <i class="mask"></i>
                    </div>
                    <span>{{item.playLength}}</span>
                  </div>
                  <div class="item_text">
                    <h1>
                      {{item.subject}}
                    </h1>
                    <div class="ifno">
                      <div>
                        <span class="view_num"><i class="view_num_icon"></i>{{item.readCount}}</span>
                        <span class="talk_num"><i class="talk_num_icon"></i>{{item.commentCount}}</span>
                      </div>
                      <div>
                        <span class="time">{{item.publishTime}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="load_more" v-if="videoPageLen >= 5">
          <a href="javascript:;" @click="renderVideoLiat">加载更多</a>
        </div>
      </div>
      <div class="other_module" v-if="otherVideoList.length > 0">
        <h1>TA的其他视频集（{{otherVideoList.length}}个）</h1>
        <div class="all_video">
          <ul>
            <li v-for="(item, index) in otherVideoList" :key="index">
              <!--<router-link :to="{name:'Video',params:{id:item.articleId},query:{'mediaId':mediaId}}">-->
              <router-link :to="{name:'videoMarket',params:{id:item.seriesId},query:{'mediaId':mediaId}}">
                <div class="item">
                  <div class="item_img">
                    <div class="img_mask">
                      <img :src="item.articleCoverImageUrl" alt="" />
                      <i class="border border01"></i>
                      <i class="border border02"></i>
                    </div>
                    <span>{{item.articlePlayLength}}</span>
                  </div>
                  <div class="item_text">
                    <h1>
                      {{item.seriesName}}
                    </h1>
                    <div class="ifno">
                      <div>
                        <span class="view_num"><i class="video_num_icon"></i>{{item.seriesFileCount}}</span>
                        <span class="talk_num"><i class="view_num_icon"></i>{{item.seriesReadCount}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom_module">
        <div v-if="!platformInfo.isWeibo">
          <img src="./images/code_991kang.jpg" alt="">
        </div>
        <div v-if="!platformInfo.isWx&&videoStatistics.sinaTlag" class="item_focus">
          <div class="left">
            <img src="./images/icon_video_sina@2x.png" alt="">
            <span>微博号：</span>
            <span class="name">新浪爱问医生</span>
          </div>
          <div class="right">
            <a v-if="isFollow" href="javascript:;" @click="focus">+ 关注</a>
            <a v-else href="javascript:;">已关注</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /page_container -->
  <!-- page_footer -->
  <div slot="page_footer">
    <loading-page v-show="initing_page"></loading-page>
    <!-- 分享菜单弹窗 -->
    <share
    :show.sync="show_menu_share"
    @cancel="cancelShare"
    @confirm="confirmShare"
    ></share>
    <!-- 微博分享 -->
    <share-sina
    :show.sync="show_wbShare"
    @cancel="cancelShareWb"
    @confirm="confirmShareWb"
    :conInfo="shareInfo"
    ></share-sina>
    <!-- 微信分享 -->
    <share-wechat :show.sync="show_wechatShare"></share-wechat>
  </div>
</layout>
</template>
<script>
import { commonMixin, toTopMixin } from "@/mixins";
import Header from "@/components/header/Header";
import mediaService from "@/services/mediaService";
import sysService from "@/services/sysService";

import { LINK_CARD_BASE_URL } from "@/config";

//分享
import platformInfo from "@/common/platformInfo.js";
import shareFns from "@/common/share";
import share from "@/iwen/share/share";
import shareSina from "@/iwen/share-sina/share-sina";
import shareWechat from "@/iwen/share-wechat/share-wechat";
//分享

export default {
  name: "index",
  mixins: [commonMixin, toTopMixin],
  data() {
    return {
      limit: 5,
      lastTime: "",
      seriesId: "",
      mediaId: "",
      videoStatistics: {},
      videoList: [],
      videoPageLen:0,
      otherVideoList: [],
      shareInfo:{//微博分享内容
        sharedContent:"",
        sharedImg:"",
      },
      isFollow:true,
      articleType:"",
      m_type:"awyh_mediavideoindex",//M端设备显示
      platformInfo,
      channel_wb:"01HZ000006Y1305005",//渠道号-微博
      channel_wx:"02HZ000041Y1305005",//渠道号-微信朋友
      channel_wx_moment:"02HZ000042Y1305005",//渠道号-微信朋友圈
      show_menu_share:false,//是否显示分享菜单
      show_wbShare:false,//是否显示微博分享
      show_wechatShare:false,//是否显示微信分享

      isShowplaceholderVideoImg: false,
    };
  },

  components: {
    mHeader: Header,
    share,
    shareSina,
    shareWechat,
  },
  watch:{
    "$route"(to, from){
      this.seriesId = this.$route.params.id;
      this.lastTime ="";
      this.videoList=[];
      this.isShowplaceholderVideoImg = false,
      this.renderVideoMarket();
      this.renderVideoLiat();
      this.renderOtherVideo();
    }
  },
  created() {
    let _this = this;
    _this.seriesId = _this.$route.params.id;
    _this.mediaId = _this.$route.query.mediaId;
    _this.renderVideoMarket();
    _this.renderVideoLiat();
    _this.renderOtherVideo();
  },
  mounted(){},
  methods: {
    renderVideoMarket() {
      let _this = this;
      let data = {
        seriesId: _this.seriesId
      };
      mediaService.getMediaVideoMapById(data).then(res => {
        if(res.code == 0 && res.data) {
          _this.videoStatistics = res.data;
          let coverImageUrl = res.data.coverImageUrl.split("/");
          if(coverImageUrl[4] == "") {
            _this.isShowplaceholderVideoImg = true;
          };
          _this.isFollow = res.data.sinaTlag;
          //微信内 设置分享内容
          if(platformInfo.isWx){
            _this.setShareInfo();
          }
        }
      }).catch(error => {
        console.log(error);
      });
    },
    renderVideoLiat() {
      let _this = this;
      let data = {
        seriesId: _this.seriesId,
        limit: _this.limit,
        lastTime: _this.lastTime,
      };
      mediaService.getMediaVideoList(data).then(res => {
        if(res.code == 0 && res.data) {
          _this.videoPageLen = res.data.length;
          _this.videoList = _this.videoList.concat(res.data);
          _this.lastTime = res.lastTime;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    renderOtherVideo() {
      let _this = this;
      let data = {
        seriesId: _this.seriesId,
        mediaId: _this.mediaId,
      };
      mediaService.getMediaOtherVideoList(data).then(res => {
        if(res.code == 0 && res.data) {
          _this.otherVideoList = res.data;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    focus(){
      //是否登录
      if (!this.checkLogin()) return;
      let This=this;
      if(!platformInfo.isWx){
        let data={
          // "addFanType":"media_video_share",
          "addFanType":"",
          "weiboId":"5076516542",//官V 新浪爱问医生
          "businessId":This.VX_userInfo.id,
          // "sourceType":This.topicinfo.sourceType,
          // "sourceBusinessId":This.topicinfo.sourceBusinessId,
          // "addFanActionType":"click",
        };
        sysService.actionFollowDoc(data).then(res => {
          clearTimeout(This.timer);
          if(res.code==0&&res.data.result){
          // if(res.code==0){
            // This.weiboId=res.data.weiboId;
            This.isFollow=false;
            This.$toast.tip("关注成功");
          }else {
            This.$toast.tip("关注失败");
          }
        });
      }
    },
    checkLogin(){
      if(!this.VX_islogin){
        this.goLogin(this.$route.fullPath);
        return false;
      }else{
        return true;
      }
    },
    /*分享*/
    cancelShare(){
      let _this=this;
      _this.show_menu_share=false;
    },
    share(){
      let _this=this;
      if(platformInfo.isWx){//微信分享
        _this.show_menu_share=true;
      }else{//微博分享
        //是否登录
        if (!this.checkLogin()) return;
        let sharedContent="";
        sharedContent="【"+_this.videoStatistics.name+"】"+"各位小伙伴，发现一个好视频集，快来围观。随手转发分享，可能会帮助更多有需要的人哦~";
        if(sharedContent.length>120){
          _this.shareInfo.sharedContent=sharedContent.slice(0,120)+"...";
        }else{
          _this.shareInfo.sharedContent=sharedContent;
        }
        if(_this.videoStatistics.coverImageUrl){
          _this.shareInfo.sharedImg=_this.videoStatistics.coverImageUrl;
        }
        _this.show_wbShare=true;
      }
    },
    confirmShare(params){
      if(params.type=="wx"){
        this.show_wechatShare=true;
        return;
      }else if(params.type=="wb"){
        //是否登录
        if (!this.checkLogin()) return;
      }
      let _this=this;
      _this.show_menu_share=false;
      let sharedContent="";
      sharedContent="【"+_this.videoStatistics.name+"】"+"各位小伙伴，发现一个好视频集，快来围观。随手转发分享，可能会帮助更多有需要的人哦~";
      if(sharedContent.length>120){
        _this.shareInfo.sharedContent=sharedContent.slice(0,120)+"...";
      }else{
        _this.shareInfo.sharedContent=sharedContent;
      }
      if(_this.videoStatistics.coverImageUrl){
        _this.shareInfo.sharedImg=_this.videoStatistics.coverImageUrl;
      }
      _this.show_wbShare=true;
    },
    cancelShareWb(){
      let _this=this;
      _this.show_wbShare=false;
    },
    confirmShareWb(sharedContent){
      let _this=this;
      // let s_url=window.location.href;
      // s_url=s_url.replace(/awyh/, "linkcard");
      // s_url=s_url.replace(/art/, _this.pageType);
      // s_url=s_url.replace(/html/, "htm");
      let s_url = `${LINK_CARD_BASE_URL}/linkcard/awyh_mediavideomapdetail/${_this.seriesId}/${_this.mediaId}.htm?contentType=${_this.articleType}`;
      if(s_url.indexOf("?")>=0){
        s_url+="&channel="+_this.channel_wb+"&n="+_this.seriesId+"/"+_this.mediaId;
      }else{
        s_url+="?channel="+_this.channel_wb+"&n="+_this.seriesId+"/"+_this.mediaId;
      }
      s_url+="&m="+_this.m_type;
      s_url+="&tag=pc";
      // s_url=encodeURI(s_url);
      // s_url=encodeURIComponent(s_url);
      let data={
        sharedContent:sharedContent,//_this.shareInfo.sharedContent,
        sharedUrl:s_url,
        // sharedImg:_this.shareInfo.sharedImg,
        businessId:_this.seriesId,
        businessType:_this.pageType
      };
      sysService.wbShare(data).then(res => {
        if(res.code==0){
          _this.$toast.tip("分享成功");
        }else if(res.code==-1){
          _this.$toast.tip(res.msg);
        }
      });

    },
    setShareInfo(){
      let _this=this;
      var lineLink = location.href.split("#")[0];
      sysService.getWxConfig({shareURL:lineLink}).then(res => {
        if(res){
          console.log("res=>");
          // res={
          //   "appId": "wxc9772e3fed88a7d2",
          //   "nonceStr": "68f24829469c4bc885c735da82a4d914",
          //   "signature": "ee118f938b84653d2d49627be97921533fc328f1",
          //   "timestamp": 1538012648,
          //   "url": "https://health.sina.cn/zt/media/market/5baaf9730cf2b519a3898cd7?mediaId=5b9f0ec7e4b060c57acfe4bc&channel=01HZ000006Y1305005"
          // };
          // res=JSON.parse(res);
          shareFns.setConfig(res);
          if(res.appId){
            let url=window.location.href;
            let momentUrl=window.location.href;
            if(url.indexOf("&channel")>=0){
              url = url.split("&channel")[0];
              momentUrl = url.split("&channel")[0];
            }
            if(url.indexOf("?")>=0){
              url+="&channel="+_this.channel_wx;
              momentUrl+="&channel="+_this.channel_wx_moment;
            }else{
              url+="?channel="+_this.channel_wx;
              momentUrl+="?channel="+_this.channel_wx_moment;
            }
            // let shareCon=window.utils.delHtmlTag(_this.articleInfo.content);
            let shareCon="各位小伙伴，发现一个好视频集，快来围观。随手转发分享，可能会帮助更多有需要的人哦~";
            if(shareCon.length>70){
              shareCon=shareCon.slice(0,70);
            }
            if(_this.videoStatistics.coverImageUrl){
              _this.shareInfo.sharedImg=_this.videoStatistics.coverImageUrl;
            }
            // console.log("去签名");
            shareFns.setShareInfo({
              lineLink:url,
              momentLineLink:momentUrl,
              imgUrl:_this.shareInfo.sharedImg,
              shareTitle:_this.videoStatistics.name,
              descContent:shareCon
            });
          }
        }else{
          //签名失败
          console.log("签名失败");
        }
      });
    },
    /**分享结束 */
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>

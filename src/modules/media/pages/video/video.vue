<template>
<layout>
  <!-- page_header -->
  <div slot="page_header">
   <m-header v-if="articleInfo.title" slot="page_header" :title="articleInfo.title">
    <span class="retrun" slot='left' @click="router_back">
      <b class="gray"></b>
    </span>
    <span class="placeholder mr10" slot='right' @click="share">
      <i class="icon icon-share"></i>分享
    </span>
   </m-header>
  </div>
  <!-- page_header -->

  <!-- page_container -->
  <div slot="page_container" class="app_wrapper_inner">
    <!-- 文章标题 -->
    <div class="content-wrapper">
      <div class ="artcle-top">
        <p class="title">{{articleInfo.title}}</p>
      </div>
      <!-- 加粉 -->
      <follow-mediatip
      v-if="is_show_follow&&platformInfo.isWeibo&&mediaInfo.weiboid&&VX_islogin"
      :mediaInfo="mediaInfo"
      :aid="pspId"
      :isFocus="media.isFocus"
      :isDestroy="media.isDestroy"
      :isBusiness="media.isBusiness"
      >
      </follow-mediatip>
      <!--:topicInfo="articleInfo"-->
      <!-- /加粉 -->
    </div>
    <!-- 文章内容 -->
    <div class="artcle_content-wrapper clearfix">
      <!-- 文章类型-视频播放 -->
      <section class="video-wrapper clearfix">
        <div class="video_content">
          <div class="video-content">
            <div class="video">
              <video :src="articleInfo.playUrl" class="video-play c-h5" controls autoplay="autoplay" x5-video-player-type='h5' x5-video-player-fullscreen="true" playsinline="true" webkit-playsinline="true">
                  您的浏览器不支持 video 标签。
              </video>
            </div>
            <p class="p10">{{articleInfo.content}}</p>
            <div class="desc-ctrls">
              <span class="text">
                <i class="icon-file"></i>视频集：
                <!-- <a class="to-science" :href="YK_URL+`/linkcard/video_map_detail/${articleInfo.seriesId}/${articleInfo.doctorId}.htm?tag=pc&m=video_map_detail`">{{articleInfo.seriesName}}</a> -->
                <router-link :to="{name:'videoMarket',params:{'id':articleInfo.seriesId},query:{'mediaId': mediaId}}" class="to-science">{{articleInfo.seriesName}}</router-link>
              </span>
              <span class="ctrls">
                <i class="icon-zan" :class="{'active':is_like}" @click="videoLike"></i>
              </span>
            </div>
            <p class="view-bar">
              <span class="reply"><i class="icon-video-view"></i>&nbsp;{{articleInfo.readCount}}</span>
              <span class="time"><i class="icon-time"></i>&nbsp;{{articleInfo.publishTime}}</span>
            </p>
          </div>
        </div>
      </section>
    </div>

    <!-- 精彩评论 -->
    <div class="title-text clearfix">
      <span class="t-title">精彩评论</span>
      <a v-if="comments.length>0" @click="replyView" class="t-right" href="javascript:;">查看更多 ></a>
    </div>
    <div class="comment">
      <ul v-if="comments.length>0">
        <li v-for="(item,index) in comments" :key="index" v-if="index<comment.show_nums">
          <div class="user">
            <div class="faceImg"><img :src="item.headPhoto"></div>
            <span class="name">{{item.nickName}}</span>
          </div>
          <p class="text">{{item.content}}</p>
        </li>
      </ul>
      <div v-if="comments.length==0" class="p10 ta_c" @click="showCommentForm('comment')"><p>暂无评论,快抢沙发~</p></div>
    </div>
  </div>
  <!-- /page_container -->

  <!-- page_footer -->
  <div slot="page_footer">
    <to-top></to-top>
    <loading-page v-show='initing_page'></loading-page>
    <!-- 工具栏 -->
    <transition name="drop">
      <div class="user_actions">
        <div class="fixed_bottom actions">
          <div class="say_some" @click="showCommentForm('comment')">
            <i class="icon icon-edit"></i>我来评论...
          </div>
          <div class="opreations">
            <span class="ml10 iconReply" @click="replyView"><i class="icon-reply"></i><em v-if="comment.totalCount" class="num_reply">{{comment.totalCount}}</em></span>
            <span class="ml20 share" @click="share"><i class="icon-share icon"></i></span>
            <span class="ml10 iconCom" @click="collection"><i class="icon-favours" :class="{'active':is_collection}"></i></span>
          </div>
        </div>
      </div>
    </transition>
    <!-- /工具栏 -->
    <!--发表评论  -->
    <pop-form :title="show_pop_comment?'评论':'评论回复'" ref="comment_form" @confirm="confirmPop('reply')">
      <section class="post_topic_wrapper">
        <div class="form">
          <div class="inp_text_wrapper">
            <textarea v-if="show_pop_comment" class="needsclick" name="" cols="" v-model="reply.content" placeholder="说点什么吧" rows="15"></textarea>
            <p v-if="show_pop_reply">回复:@{{replyPerson.nickName}}</p>
            <textarea v-if="show_pop_reply" class="needsclick" name="" cols="" v-model="reply.content" placeholder="说点什么吧" rows="15"></textarea>
          </div>
        </div>
      </section>
    </pop-form>
    <!--/发表评论  -->
    <!-- 查看评论 -->
    <pop-form title="查看评论" confirmBtnText="" ref="comment_list_form" class="comment-view">
      <section class="comment_list_wrapper">
        <ul>
          <li class="comment_list" v-for="(item,index) in comments" :key="index" @click="showCommentForm('reply',item)">
            <div class="faceImg">
              <img :src="item.headPhoto?item.headPhoto:'/awyh/static/init/images/bgpic@2x.png'">
            </div>
            <div class="content-text">
              <p class="public-info clearfix">
                <span class="fl name">{{item.nickName}}</span>
                <b v-if="item.toNickName">&nbsp;回复&nbsp;<span class="c_666">{{item.toNickName}}</span></b></p>
              <p class="text">{{item.content}}</p>
            </div>
          </li>
        </ul>
      </section>
      <loading-btn v-if="comment.showLoadMore" :loading="comment.loading_content" :title="comment.loading_text" @loadFn="loadPopComment">
      </loading-btn>
    </pop-form>
    <!--/查看评论-->
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
import Header from "@/components/header/Header";
import {APP_URL,YK_URL,LINK_CARD_BASE_URL} from "@/config";
import { commonMixin, toTopMixin } from "@/mixins";
import mediaService from "@/services/mediaService";
import sysService from "@/services/sysService";
import popForm from "@/components/pop-form/pop-form";
import loadingBtn from "@/components/loading-btn/loading-btn";
import followMediatip from "../../components/follow-media-tip/follow-media-tip";
//分享
import platformInfo from "@/common/platformInfo.js";
import shareFns from "@/common/share";
import share from "@/iwen/share/share";
import shareSina from "@/iwen/share-sina/share-sina";
import shareWechat from "@/iwen/share-wechat/share-wechat";
//分享

export default {
  name: "Video",
  mixins: [commonMixin, toTopMixin],
  data() {
    return {
      is_show_follow:false,
      articleType:10,//文章类型：1 健康科普；2 诊间日记； 3 患者自述 ；4 热点追踪； 5病例分析；6 文章资讯(医院);7集团资讯 8媒体文章  9药企  10视频
      bType:3,//评论类型: 1 科普评论 2患者自述点评 3 视频 4药企;默认1
      channel_wb:"01HZ000006Y0705005",//渠道号-微博
      channel_wx:"02HZ000041Y0705005",//渠道号-微信朋友
      channel_wx_moment:"02HZ000042Y0705005",//渠道号-微信朋友圈
      pageType:"awyh_videoindex",//微博分享-linkcard
      m_type:"awyh_mediavideoindex",//M端设备显示m_type:"awyh_mediavideoindex",//M端设备显示
      pspId:"",
      mediaId:"",//医媒?mediaId=59e95b9984ae25d92a569b35
      is_like:false,//是否点赞
      is_addDoc:false,//是否加医生
      is_collection:false,//是否收藏
      showWxCode:false,//是否显示微信code
      APP_URL,//医康主页
      YK_URL,//医康基础链
      platformInfo,
      reply:{
        content:"",//回复内容
      },
      userInfo:{},//用户信息
      articleInfo:{},//文章信息
      media:{},//医媒关注信息
      mediaInfo:{},//医媒信息
      comments:[],//评论列表
      comment:{//评论加载
        show_nums:1,//显示精彩评论数
        show_more:true,//精彩评论更多
        showLoadMore:true,
        loading_content:false,
        loading_text:"点击加载更多",
        show_noResult:false,
        nowPage:1,
        totalCount:0//总评论数
      },
      // articleType:2,//1 健康科普；2 诊间日记； 3 患者自述 ；4 热点追踪； 5病例分析；6 文章资讯(医院);7集团资讯 8媒体文章  9药企  10视频
      shareInfo:{//微博分享内容
        sharedContent:"",
        sharedImg:"",
      },
      textarea_focus:false,
      show_menu_share:false,//是否显示分享菜单
      show_wbShare:false,//是否显示微博分享
      show_wechatShare:false,//是否显示微信分享
      // isWeibo:platformInfo.isWeibo,//
      show_pop_comment:false,//展示评论
      show_pop_reply:false,//展示评论回复
      replyPerson:{},//回复人信息
      smallImg:"",//小图片url
      show_preImg:false,//展示预览图片
      artAdInfo:[]
    };
  },

  components: {
    mHeader: Header,
    popForm,
    loadingBtn,
    share,
    shareSina,
    shareWechat,
    followMediatip
  },
  created() {
    this.pspId = this.$route.params.id;
    this.mediaId = this.$route.query.mediaId;
    this.videoArticle();
    this.getMediaInfo();
    this.loadPopComment();
  },
  methods: {
    videoArticle(){
      let _this=this;
      mediaService.mediaVideo({
        videoId: _this.pspId,
        mediaId: _this.mediaId
      }).then(res => {
        if (res.code == 0 && res.data) {
          _this.articleInfo=res.data;
          _this.is_show_follow = true;
          _this.media.isFocus = _this.articleInfo.isFocus;//是否关注
          _this.media.isDestroy = _this.articleInfo.isDestroy;//是否取消关注
          _this.media.isBusiness = _this.articleInfo.isBusiness;//是否商业
          _this.is_like=res.data.like;//是否点赞
          _this.is_collection=_this.articleInfo.favorite;//是否收藏
          //微信内 设置分享内容
          if(platformInfo.isWx){
            _this.setShareInfo();
          }
        }
      });
    },
    getMediaInfo(){
      let _this=this;
      mediaService.mediaUserInfo({
        mediaId: _this.mediaId,
      }).then(res => {
        if (res.code == 0 && res.data) {
          _this.mediaInfo=res.data;
        }
      });
    },
    videoLike(){
      //是否登录
      if (!this.checkLogin()) return;
      if(this.is_like) return;
      let _this=this;
      mediaService.mediaLike({
        id:_this.pspId,
        bType: _this.bType
      }).then(res => {
        if(res.code==0){
          _this.is_like = true;
          _this.$toast.tip("点赞成功！");
        }
      });
    },
    loadPopComment(){
      if(this.comment.loading_text=="没有更多内容了") return;
      if(this.comment.loading_content||!this.comment.showLoadMore) return;
      this.comment.loading_content=true;
      let _this=this;
      let data={
        pspId:_this.pspId,
        commentId:"",//popCommentId
        bType:_this.bType,
        pageIndex:_this.comment.nowPage,
        pageSize:5,
      };
      mediaService.getComments(data).then(res => {
        _this.comment.loading_content=false;
        if(res.code==0&&res.data.length>0){
          // popCommentId=res.data[0].id;
          _this.comment.totalCount=res.page.totalCount;
          _this.comments=_this.comments.concat(res.data);
          if(res.data.length<5||res.page.totalPages==_this.comment.nowPage){
            _this.comment.loading_text="没有更多内容了";
            _this.comment.loading_content=false;
          }
          _this.comment.nowPage+=1;
        }
      },function(){
        _this.comment.loading_content=false;
        _this.comment.loading_text="加载失败";
      });
    },
    replyView(){
      if(this.comment.totalCount==0){
        return;
      }
      this.$refs.comment_list_form.show();
    },
    collection(){
      //是否登录
      if (!this.checkLogin()) return;
      let _this=this;
      if(!_this.is_collection){//收藏
        let data={
          id:_this.pspId,
          title:_this.articleInfo.title,
          contentType:_this.articleType
        };
        mediaService.add_favorites(data).then(res => {
          if(res.code==0){
            _this.is_collection=true;
            _this.$toast.tip("收藏成功！");
          }else{
            _this.$toast.tip("操作失败！");
          }
        });
      }else{//取消收藏
        let data={
          id:_this.pspId,
          contentType:_this.articleType,
        };
        mediaService.del_favorites(data).then(res => {
          if(res.code==0){
            _this.is_collection=false;
            _this.$toast.tip("取消收藏成功！");
          }else{
            _this.$toast.tip("操作失败！");
          }
        });
      }
    },
    showCommentForm(type,replyPer){//评论
      //是否登录
      if (!this.checkLogin()) return;
      let _this=this;
      if(type=="comment"){
        _this.show_pop_comment=true;
        _this.show_pop_reply=false;
      }else if(type=="reply"){
        //自己不能评论自己
        if(_this.VX_userInfo.id==replyPer.fromUserId){
          return;
        }
        _this.show_pop_comment=false;
        _this.show_pop_reply=true;
        _this.replyPerson=replyPer;
        this.$refs.comment_list_form.hide();
      }
      _this.$refs.comment_form.show();
    },
    confirmPop(){//确定评论
      if(this.reply.content==""){
        this.$toast.tip("评论内容不能为空哦！");
        return;
      }
      if(this.reply.content.length>500){
        this.$toast.tip("评论内容不能大于500个字哦！");
        return;
      }
      let _this=this;
      let data={
        pspId:_this.pspId,
        content:_this.reply.content,
        toUserId:"",//被评论/回复用户ID
        toNickName:"",//被评论/回复用户姓名
        bType:_this.bType,//评论类型
      };
      if(_this.show_pop_reply){//回复时
        data.toUserId=_this.replyPerson.id;
        data.toNickName=_this.replyPerson.nickName;
      }
      mediaService.saveComment(data).then(res => {
        _this.$refs.comment_form.hide();
        if(res.code==0){
          if(_this.show_pop_comment){
            _this.$toast.tip("评论成功！");
          }else if(_this.show_pop_reply){
            _this.$toast.tip("回复评论成功！");
          }
          // location.assign(location);
          _this.comment.totalCount+=1;
          _this.reply.content="";//清空评价内容
          _this.comment.loading_text="点击加载更多";
          _this.comment.loading_content=false;
          _this.comment.showLoadMore=true;
          _this.comment.nowPage=1;
          _this.comments=[];
          _this.loadPopComment();
        }else{
          _this.$toast.tip("评论失败！");
        }
      });
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
        sharedContent="【"+_this.articleInfo.title+"】"+"各位小伙伴，发现一个好视频，快来围观。随手转发分享，可能会帮助更多有需要的人哦~";
        if(sharedContent.length>120){
          _this.shareInfo.sharedContent=sharedContent.slice(0,120)+"...";
        }else{
          _this.shareInfo.sharedContent=sharedContent;
        }
        if(_this.articleInfo.picName){
          _this.shareInfo.sharedImg=_this.articleInfo.picName;
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
      sharedContent="【"+_this.articleInfo.title+"】"+"各位小伙伴，发现一个好视频，快来围观。随手转发分享，可能会帮助更多有需要的人哦~";
      if(sharedContent.length>120){
        _this.shareInfo.sharedContent=sharedContent.slice(0,120)+"...";
      }else{
        _this.shareInfo.sharedContent=sharedContent;
      }
      if(_this.articleInfo.picName){
        _this.shareInfo.sharedImg=_this.articleInfo.picName;
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
      let s_url = `${LINK_CARD_BASE_URL}/linkcard/awyh_mediavideoindex/${_this.pspId}/${_this.mediaId}.htm?contentType=`;
      if(s_url.indexOf("?")>=0){
        s_url+="&channel="+_this.channel_wb+"&n="+_this.pspId+"/"+_this.mediaId;
      }else{
        s_url+="?channel="+_this.channel_wb+"&n="+_this.pspId+"/"+_this.mediaId;
      }
      s_url+="&m="+_this.m_type;
      s_url+="&tag=pc";
      // s_url=encodeURI(s_url);
      // s_url=encodeURIComponent(s_url);
      let data={
        sharedContent:sharedContent,//_this.shareInfo.sharedContent,
        sharedUrl:s_url,
        // sharedImg:_this.shareInfo.sharedImg,
        businessId:_this.pspId,
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
          // res={
          //   "appId": "wxc9772e3fed88a7d2",
          //   "nonceStr": "17200b8b1e6f4ccbaf96cce55cf3c53f",
          //   "signature": "2acf872bb5ee2c3e48ab67b4c8d25e86103b0e4f",
          //   "timestamp": 1524123314,
          //   "url": "https://health.sina.cn/awyh/art/5ad833080cf29b386f19852a.html?contentType=2"
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
            let shareCon="各位小伙伴，发现一个好视频，快来围观。随手转发分享，可能会帮助更多有需要的人哦~";
            if(shareCon.length>70){
              shareCon=shareCon.slice(0,70);
            }
            if(_this.articleInfo.picName){
              _this.shareInfo.sharedImg=_this.articleInfo.picName;
            }
            shareFns.setShareInfo({
              lineLink:url,
              momentLineLink:momentUrl,
              imgUrl:_this.shareInfo.sharedImg,
              shareTitle:_this.articleInfo.title,
              descContent:shareCon
            });
          }
        }else{
          //签名失败
          // console.log("签名失败");
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

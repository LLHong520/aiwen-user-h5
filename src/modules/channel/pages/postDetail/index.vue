<template>
  <layout :isAppView="true">
    <div slot="page_header" class="header_wrapper">
      <m-header  title=" " :isShowInApp="true">
        <a href="javascript:;" slot="left" class="back" @click="router_back"></a>
        <div class="right" slot="right">
          <span class="share" @click="share(false)"></span>
        </div>
      </m-header>
    </div>
    <div slot="page_container">
      <div class="article_info">
        <h3 class="title">{{postInfo.title}}</h3>
        <div class="author">
          <div class="img"><a :href="`${COMTY_URL}users/${postInfo.iaskUserId}?comtyId=${postInfo.communityId}`"><img :src="GET_IMG_URL(postInfo.userPhoto,'doc')"></a></div>
          <div class="txt">
            <dl>
              <dt><a :href="`${COMTY_URL}users/${postInfo.iaskUserId}?comtyId=${postInfo.communityId}`" class="name">{{postInfo.userName}}</a></dt>
              <dd>{{postInfo.publishTime}}</dd>
            </dl>
          </div>
        </div>
        <div class="article_box" v-html="postInfo.content"></div>
        <div class="detail_footer">
          {{postInfo.comments}}评论<span v-if="!IS_IWEN_COMTY(postInfo.communityId)"> · 来自：<a :href="COMTY_BASE_URL+postInfo.communityId">{{postInfo.comtyName}}</a></span>
        </div>
        <div class="label_box" v-if="(postInfo.postTags||[]).length>0">
          <span class="label_item" v-for="(item,index) in postInfo.postTags" :key="index">{{item}}</span>
        </div>
      </div>
      <div class="class_tab_wrapper">
        <div class="navlist">
          <ul>
            <li class="navli" :class="{'active':activeIndex===0}" @click="tabClick(0)">全部评论&nbsp;&nbsp;{{commentNum}}<i v-if="activeIndex===0"></i></li>
            <li class="navli" :class="{'active':activeIndex===1}" @click="tabClick(1)">只看楼主<i v-if="activeIndex===1"></i></li>
          </ul>
        </div>
        <div class="point_list">
          <ul v-if="(pushList||[]).length>0">
            <li v-for="(item,index) in pushList" :key="index">
              <div class="img">
                <a :href="`${COMTY_URL}users/${item.iaskUserId}?comtyId=${postInfo.communityId}`" class=""><img v-lazy="GET_IMG_URL(item.userPhoto,'u')" width="40" height="40" alt=""></a>
              </div>
              <div class="info">
                <dl>
                  <dt>
                    <a :href="`${COMTY_URL}users/${item.iaskUserId}?comtyId=${postInfo.communityId}`" class="name">{{item.userName}}</a>
                  </dt>
                  <dd>{{item.floor}}楼 | {{item.createTime | dataFormat}}</dd>
                </dl>
                <div class="reply_card" v-if="item.postReply">
                  <p class="reply_desc">回复{{item.postReply.floor}}楼 <span class="blue">@{{item.postReply.userName}}</span>发表的</p>
                  <div class="reply_txt">
                    {{item.postReply.content}}
                  </div>
                </div>
                <div class="point_txt" @click="toReply('reply', item)">
                  <content-cell :content="item.content" :isTxtBtn="true" :lines="5"></content-cell>
                </div>
              </div>
            </li>
          </ul>
          <ul v-if="(list||[]).length>0">
            <li v-for="(item,index) in list" :key="index">
              <div class="img">
                <a :href="`${COMTY_URL}users/${item.iaskUserId}?comtyId=${postInfo.communityId}`" class=""><img v-lazy="GET_IMG_URL(item.userPhoto,'u')" width="40" height="40" alt=""></a>
              </div>
              <div class="info">
                <dl>
                  <dt>
                    <a :href="`${COMTY_URL}users/${item.iaskUserId}?comtyId=${postInfo.communityId}`" class="name">{{item.userName}}</a>
                  </dt>
                  <dd>{{item.floor}}楼 | {{item.createTime | dataFormat}}</dd>
                </dl>
                <div class="reply_card" v-if="item.postReply">
                  <p class="reply_desc">回复{{item.postReply.floor}}楼 <span class="blue">@{{item.postReply.userName}}</span>发表的</p>
                  <div class="reply_txt">
                    {{item.postReply.content}}
                  </div>
                </div>
                <div class="point_txt" @click="toReply('reply', item)">
                  <content-cell :content="item.content" :isTxtBtn="true" :lines="5"></content-cell>
                </div>
              </div>
            </li>
          </ul>
          <div class="empty_box"  v-else-if="!loading">
            <empty title="暂无评论"></empty>
          </div>
          <loading-btn
            :loading="loading"
            :title="loadingText"
            v-if="!isEnd&&(list||[]).length>0"
            :scroll_load="true"
            :isEnd="isEnd"
            @loadFn="renderCommentData">
          </loading-btn>
        </div>
      </div>
    </div>
    <div slot="page_footer">
      <div class="bottom" v-if="isEnd" ref="bottom">- 这是我的底线 -</div>
      <div  ref="bottom"></div>
    </div>
    <div slot="page_layer">
      <div class="shadow" v-show="isShowReply||isShowBind" @click="isShowReply=false,isShowBind=false"></div>
      <back-btn></back-btn>

      <!-- 分享 -->
      <m-share :show.sync="isShare" :config="shareConfig"></m-share>
      <!-- 绑定手机号码 start -->
      <div class="layer_bind" v-show="isShowBind">
        <a href="javascript:;" class="close" @click="closeBind"></a>
        <h4 class="tit">填写手机号可及时获得<br/>服务通知</h4>
        <div class="form_item">
          <input type="text" class="ipt_txt needsclick" @blur="validMobile" name="mobile" maxLength="11" v-model="mobile" placeholder="请输入您的手机号码">
        </div>
        <div class="form_item">
          <input type="text" class="ipt_txt needsclick" name="mobile" minLength="6" maxLength="6" v-model="valid_code" placeholder="请输入验证码"/>
          <count-down :class="{'sm-btn':true,'disable':sending}" :fn="getValidCode" :deftext="'获取验证码'" :isHideTxt="true" ref="btn" :second="60"></count-down>
        </div>
        <div class="tip">{{errorTxt}}</div>
        <div class="btn_box">
          <a href="javascript:;" @click="bind()" class="needsclick">{{binding? "绑定中...":"确定"}}</a>
        </div>
      </div>
      <!-- 绑定手机号码 end -->

      <!-- 评论 start-->
      <div class="layer_reply">
        <div class="reply_default animated fadeIn" @click="toReply" v-show="!isShowReply">
          <span>发表评论…</span>
        </div>
        <div class="reply_wrapper animated slideInUp" v-show="isShowReply">
          <div class="hd">
            <a href="javascript:;" class="cancel" @click="closeReply">取消</a>
            <h3>发表评论</h3>
            <a href="javascript:;" class="sent" :class="{ disabled: isSubmit||replyCont.length==0 }" @click="showReplyBox">{{isSubmit ? "发送中" : "发送"}}</a>
          </div>
          <div class="bd">
            <textarea @blur="inputBlur" v-model="replyCont" :placeholder="replyName!=''? '回复@' + replyName:''" maxlength="500"></textarea>
            <p class="num">{{500-replyCont.length}}</p>
          </div>
        </div>
      </div>
      <!-- 评论 end-->
    </div>
  </layout>
</template>
<script>
import {commonMixin,toTopMixin,shareMixin} from "@/mixins";
import {COMTY_BASE_URL,COMTY_URL} from "@/config";
import Header from "@/components/header/Header";
import loadingBtn from "@/components/loading-btn/loading-btn";
import backBtn from "../../components/channelIndexBtn/channelIndexBtn";
import empty from "@/components/empty/empty";
import contentCell from "../../components/content_cell/content_cell";
import share from "@/iwen/share-all/share.vue"; //分享
import countDown from "@/iwen/count-down/count-down";
import platformLogin from "@/common/platformFn";
import sysService from "@/services/sysService";
import channelService from "@/services/channelService.js";
// import share_cover from "@/assets/images/share_post.jpg";
export default {
  name: "channel",
  mixins: [commonMixin, toTopMixin,shareMixin],
  components: {
    mHeader:Header,
    loadingBtn,
    empty,
    backBtn,
    contentCell,
    mShare: share,  //分享
    countDown,
  },
  data() {
    return {
      COMTY_BASE_URL,
      COMTY_URL,
      channelId:"",
      postId:"",
      overHeight:false,
      activeIndex:0,
      postInfo:{},
      userId:"",

      loading:false,
      isEnd:false,
      loadingText:"加载更多",
      pageIndex:0,
      pageSize:10,
      pageCount:0,
      list:[],
      //分享
      isShare: false,
      shareConfig: {},
      isShowBind:false,
      isShowReply:false,

      mobile: "",
      valid_code: "",
      sending: false,
      binding: false,
      errorTxt:"",

      replyCont:"",
      isSubmit: false,
      isReply: false, //是否是对于当前评论的回复
      replyParentId: "",
      replyFloor:"",
      replyName: "", //回复当前评论的name
      commentNum:0,
      pushList:[],
      isChecking:false,//手机号码是否可用验证中
    };
  },
  computed: {
    enable() {
      return utils.isMobile(this.mobile) && !utils.isEmpty(this.valid_code);
    }
  },
  created() {
    this.channelId=this.$route.params.id;
    this.postId=this.$route.query.id;
    this.pushList=[];
    this.renderDataInfo();
    this.renderCommentData();
    
  },
  methods: {
    //分享
    share(isInit = false){
      console.log("点击了分享按钮");
      if (!isInit) {
        this.isShare = true;
      }
      this.shareConfig = {
        pid: this.channelId,
        id: this.postId,
        type: "post",
        title: `${this.postInfo.title} - 来自新浪健康`,
        // content: (this.postInfo.content||"").replace(/<[^>]+>/g, "").slice(0,100),
        content:"",
        imgUrl: "https://pic.wenwo.com/fimg/1507e64f82047a0dd99f696b6dffb82c.jpg",
      };
    },
    tabClick(index){
      this.activeIndex = index;
      if(index==1){
        console.log(this.postInfo.userId);
        this.userId=this.postInfo.userId;
      }else{
        console.log("222");
        this.userId="";
      }
      this.pageIndex=0;
      this.isEnd=false;
      this.list=[];
      this.renderCommentData();
    },
    //查询帖子详情
    renderDataInfo() {
      let data = {
        "postId": this.postId
      };
      channelService.getPostDetail(data).then((res) => {
        if(res.status == 200 && res.data) {
          this.postInfo = res.data;
          this.commentNum=res.data.comments;
          this.postInfo.content=this.getContentImages(res.data.content);
          this.$previewRefresh();
          this.share(true);//分享
        }
      }).catch(() => {})
      .finally(()=>{
        this.share(true);//分享
      });
    },
    //查询图片
    getContentImages(htmlContent) {
      let dom = $("<div>"+htmlContent+"</div>");
      dom.find("img").attr("preview","2");
      return dom.html();
    },
    //查询评论列表
    renderCommentData(){
      if(this.loading||this.isEnd) return;
      this.loading = true;
      let This = this;
      let params = {
        postId:this.postId,
        page: this.pageIndex+1,
        size: this.pageSize,
        userId:this.userId,
      };
      channelService.getCommentList(params).then(res => {
        This.loading = false;
        if (res.status == 200 && res.data) {
          This.pageIndex += 1;
          console.log(This.pageIndex);
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
      });
    },
    //验证手机号码是否可用
    isPhoneUsed(){
      if(this.isChecking) return;
      this.isChecking=true;
      sysService.checkPhoneBind({phone:this.mobile})
        .then(res=>{
          this.isChecking=false;
          if(res.status==200&&res.data){
            this.errorTxt="";
            this.getCode();
          }else if(res.status==20121){
            this.errorTxt="该手机号码已绑定，请更换其它手机号码！";
            return false;
          }else{
            this.errorTxt="";
            this.$toast.tip(res.message);
            return false;
          }
        });
    },
    getCode(){
      if(this.sending) return;
      let This = this;
      This.sending = true;
      sysService.sendCaptcha({
        phone: this.mobile
      })
        .then(res => {
          if(res.data){
            This.$refs.btn.run();
            setTimeout(This.sended, 60000);
          }else{
            This.sending=false;
            if(res.status==20134){
              This.errorTxt="手机号格式错误，请重新输入";
            }else if(res.status==20132){
              This.errorTxt=res.message;
            }else{
              This.$toast.tip(res.message);
            }
          }
        });
    },
    sended() {
      this.sending = false;
    },
    getValidCode:function(){
      if(!this.validMobile()||this.sending){
        return;
      }else{
        this.isPhoneUsed();
      }
    },
    bind() {
      if (this.binding) return;
      if (!this.validMobile()) return;
      if (utils.isEmpty(this.valid_code)) {
        // this.$toast.tip("请输入验证码！");
        this.errorTxt="请输入验证码";
        return;
      }else if (!utils.isNumber(this.valid_code) || utils.trim(this.valid_code).length != 6) {
        this.errorTxt="请输入正确的验证码";
        return;
      }
      this.binding = true;
      let This = this;
      sysService.phoneBind({
        phone: this.mobile,
        captcha: this.valid_code
      })
        .then(res => {
          this.binding = false;
          if (res.status == 200&&res.data) {
            This.$toast.tip("绑定成功");
            This.$store.dispatch("update_userinfo");
            // setTimeout(function () {
            //   This.goToRefer();
            // }, 1000);
            this.isShowBind=false;
          } else {
            // This.$toast.tip(res.msg);
            // this.errorTxt=res.message;
            if(res.status==20130||res.status==20131||res.status==20135){
              this.errorTxt=res.message;
            }else{
              this.$toast.tip("绑定失败");
            }
          }
        });
    },
    validMobile() {//校验要绑定的手机号
      let isPass;
      if (utils.isEmpty(this.mobile)) {
        this.errorTxt="请输入手机号";
        isPass = false;
      } else if (!utils.isMobile(this.mobile)) {
        this.errorTxt="请输入正确的手机号";
        isPass = false;
      } else {
        this.errorTxt="";
        isPass = true;
      }
      return isPass;
    },
    //评论
    closeReply(){
      this.isShowReply=false;
    },
    closeBind(){
      this.isShowBind=false;
    },
    getScrollEle() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      var scrollEle = null;
      if (isiOS && platformInfo.isWeibo) {
        scrollEle = "#wrapper__inner";
      } else {
        scrollEle = window;
      }
      return scrollEle;
    },
    scrollToBottom(){
      this.$nextTick(function () {
        let wrapper_inner = $(this.getScrollEle());
        wrapper_inner.scrollTop(this.$refs.bottom.offsetTop);
        // wrapper_inner.scrollTop = this.$refs.bottom.offsetTop;
      });
    },
    toReply(type, data){
      if (!this.VX_islogin) {
        if (this.VX_isInSinaHealthApp) {
          console.log("App登录");
          iwenJSNativeBridge.appLogin();
        } else {
          console.log("jsp登录");
          platformLogin(this.$route.fullPath);
        }
        return;
      }else if(!this.VX_isBindMobile){
        this.isShowBind=true;
      }else if (type == "reply") {
        this.isReply = true;
        this.replyName = data.userName || "";
        this.replyParentId = data.id;
        this.replyFloor=data.floor;
        this.replyCont = "";
        this.isShowReply=true;
        this.scrollToBottom();
      } else {
        this.isReply = false;
        this.replyName = "";
        this.replyParentId = "";
        this.replyFloor="";
        this.replyCont = "";
        this.isShowReply=true;
        this.scrollToBottom();
      }
    },
    //评论
    showReplyBox() {
      if (!this.VX_islogin) {
        if (this.VX_isInSinaHealthApp) {
          console.log("App登录");
          iwenJSNativeBridge.appLogin();
        } else {
          console.log("jsp登录");
          platformLogin(this.$route.fullPath);
        }
        return;
      }

      if(this.isSubmit) { return; }

      let content = utils.trim(this.replyCont);

      if (utils.isEmpty(content)) {
        this.$toast.tip("请输入内容…");
        return;
      }
      if (content.length > 500) {
        this.$toast.tip("内容不能超过500个字哦~");
        return;
      }

      this.isSubmit = true;
      channelService.addReply({
        postsId:this.postId,
        userId:this.VX_userInfo.id,
        userName:this.VX_userInfo.nickName,
        userPhoto:this.VX_userInfo.photoPicURL,
        userType:"0",
        content:this.replyCont,
        replyParentId: this.replyParentId,
        floor:this.replyFloor,
        communityId:this.postInfo.communityId,
        postTitle:this.postInfo.title,
      }).then((res) => {
        // this.dataPvUvcollect({
        //   businessType: "post",
        //   collectType: "cmty_h5_posts_comment",
        //   businessId: this.postsId,
        //   userId: this.VX_userInfo.id,
        // });
        if (res.status == 200) {
          this.$toast.tip("评论发表成功~");
          this.commentNum=res.data.comments;
          this.replyCont = "";
          let beRepliedItem = null;
          let replyList=this.list.concat(this.pushList);
          if (this.replyParentId != "") {
            beRepliedItem = replyList.filter((item) => {
              return item.id == this.replyParentId;
            })[0];
            res.data.postReply = beRepliedItem;
          }
          //如果当前tab是全部评论 插入新记录 不刷新
          if (this.activeIndex != 1) {
            // this.list.unshift(res.data);
            this.pushList.unshift(res.data);
            console.log(this.list);
            console.log(this.pushList);
          }
          console.log(res.data);

          this.isShowReply = false;
          //如果当前tab是只看楼主 切换到全部评论
          if (this.activeIndex == 1) {
            this.tabClick(0);
          }
          // postBarService.sendReplyMsg({
          //   beRepliedId: beRepliedItem ? beRepliedItem.userId : "",
          //   beRepliedPostsOwnerId: this.postInfo.userId,
          //   postReply: res.data,
          // });
        } else {
          this.$toast.tip("评论发表失败~");
        }
      }).finally( () => {
        this.isSubmit = false;
      });
    },
  },
  mounted(){
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>

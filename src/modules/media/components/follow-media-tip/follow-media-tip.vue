<template>
  <div>
    <div class="follow-us-tip">
      <div class="webo_info">
        <img :src="GET_IMG_URL(mediaInfo.logo,'')"/>
        {{mediaInfo.mediaName}}
      </div>
      <div class="foc_btns">
        <a class="disable" @click="cancelFollowDoc" v-if="isFollow" href="javascript:void(0);">已关注</a>
        <a v-else @click="focusDoc" href="javascript:void(0);">+ 关注</a>
      </div>
    </div>
    <!-- 确认取消 -->
    <confirm
    ref="confirm"
    title=""
    text="真的要残忍取消关注吗？"
    cancelBtnText="那算了"
    confirmBtnText="朕高兴"
    @confirm="confirm_cancel"
    ></confirm>
    <!-- /确认取消 -->
  </div>
</template>
<script>
import { commonMixin} from "@/mixins";
import sysService from "@/services/sysService.js";
import confirm from "@/iwen/confirm/confirm";
export default {
  name: "followUstip",
  mixins: [commonMixin],
  props: {
    // articleInfo:{
    //   type:Object,
    //   default:()=>{
    //     return {};
    //   }
    // },
    mediaInfo:{
      type:Object,
      default:()=>{
        return {};
      }
    },
    aid:{//视频id
      type:String,
      default:""
    },
    isFocus:{//是否关注
      type:Boolean,
      default:null
    },
    isDestroy:{//是否取消关注
      type:Boolean,
      default:null
    },
    isBusiness:{//是否商业
      type:Boolean,
      default:null
    }
  },
  data() {
    return {
      weiboId:"",
      isFollow:false,//是否加粉
      isbizDoc:false,//是否是商业医生（商业医生15s 普通医生40s）
      specific:"",//单篇文章加粉参数Y
    };
  },
  components:{
    confirm
  },
  created(){
    this.isFollow=this.isFocus&&!this.isDestroy;
    this.isbizDoc=this.isBusiness;
  },
  mounted() {
    let This=this;
    if(This.isbizDoc){//商业医生
      this.timer=setTimeout(function(){
        This.autofocusDoc();
      },15000);//15000
    }else{//普通医生
      this.timer=setTimeout(function(){
        This.autofocusDoc();
      },40000);//40000
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    autofocusDoc(){
      let This=this;
      let data={
        "addFanType":"media_video_read",
        "weibos":This.mediaInfo.weiboid,
        "pspId":This.aid + "##" + This.mediaInfo.id,
        "isSpecific":This.specific
        // "sourceType":This.articleInfo.sourceType,
        // "sourceBusinessId":This.articleInfo.sourceBusinessId,
      };
      sysService.autoFollowDoc(data).then(res => {
        if(res.code==0&&res.data.result){
          This.isFollow=true;
          // This.weiboId=res.data.weiboId;
        }else {
          // This.$toast.tip("关注失败");
          console.log("自动关注失败");
        }
      });
    },
    focusDoc(){
      let This=this;
      let data={
        "addFanType":"media_video_share",
        "weiboId":This.mediaInfo.weiboid,
        "businessId":This.aid,
        // "sourceType":This.articleInfo.sourceType,
        // "sourceBusinessId":This.articleInfo.sourceBusinessId,
        // "addFanActionType":"click",
      };
      sysService.actionFollowDoc(data).then(res => {
        clearTimeout(This.timer);
        if(res.code==0&&res.data.result){
        // if(res.code==0){
          // This.weiboId=res.data.weiboId;
          This.isFollow=true;
          This.$toast.tip("关注成功");
        }else {
          This.$toast.tip("关注失败");
        }
      });
    },
    confirm_cancel(){
      let This=this;
      sysService.cancelFollowDoc({weibos:This.mediaInfo.weiboid}).then(res => {
        if(res.code==0&&res.data.result){
        // if(res.code==0){
          This.isFollow=false;
          This.$toast.tip("取消关注成功");
        }else{
          This.$toast.tip("取消关注失败");
        }
      });
    },
    hide(){
      this.isFollow=false;
    },
    cancelFollowDoc(){
      this.$refs.confirm.show();
    }
  },
  computed:{}
};
</script>
<style  scoped lang="less" rel="stylesheet/less">
@import "./css.less";
</style>

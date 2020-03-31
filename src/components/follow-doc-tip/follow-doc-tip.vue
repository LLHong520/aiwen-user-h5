<template>
  <div>
    <div class="follow-us-tip">
      <div class="webo_info">
        <img src="./images/icon_01.png" />
        {{docinfo.weiboName}}
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
import sysService from "@/services/sysService.js";
import confirm from "@/iwen/confirm/confirm";
export default {
  name: "followUstip",
  props: {
    topicinfo:{
      type:Object,
      default:()=>{
        return {
          critique:{}
        };
      }
    },
    docinfo:{
      type:Object,
      default:()=>{
        return {
          critique:{}
        };
      }
    },
    name:{
      type:String,
      default:""
    },
    arttype:{
      type:Number,
      default:0
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
    this.isFollow=this.topicinfo.isFocus&&!this.topicinfo.isDestroy;
    this.isbizDoc=this.docinfo.bizDoc;
  },
  mounted() {
    let This=this;
    if(This.topicinfo.isSpecific){
      this.timer=setTimeout(function(){
        This.specific="Y";
        This.autofocusDoc();
      },5000);
      return;
    }
    if(This.isbizDoc){//商业医生
      this.timer=setTimeout(function(){
        This.autofocusDoc();
      },15000);
    }else{//普通医生
      this.timer=setTimeout(function(){
        This.autofocusDoc();
      },40000);
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    autofocusDoc(){
      let This=this;
      if(platformInfo.isWeibo){
        let data={
          "addFanType":"",
          "weibos":This.docinfo.weiboId,
          "pspId":This.topicinfo.id,
          "isSpecific":This.specific
          // "sourceType":This.topicinfo.sourceType,
          // "sourceBusinessId":This.topicinfo.sourceBusinessId,
        };
        if(This.arttype==1){
          data.addFanType="PSP_NORMER";//普通科普
        }else if(This.arttype==2){
          data.addFanType="diary";//诊间日记；
        }else if(This.arttype==3){
          data.addFanType="describe";//患者自述；
        }else if(This.arttype==5){
          data.addFanType="analysis"; //病例分析；
        }else if(This.arttype==10){
          data.addFanType="dr_video_share";
        }
        sysService.autoFollowDoc(data,function(res){
          if(res.code==0&&res.data.result){
            This.isFollow=true;
            // This.weiboId=res.data.weiboId;
          }else {
            // This.$toast.tip("关注失败");
            console.log("自动关注失败");
          }
        });
      }
    },
    focusDoc(){
      let This=this;
      if(!platformInfo.isWx){
        let data={
          "addFanType":"",
          "weiboId":This.docinfo.weiboId,
          "businessId":This.topicinfo.id,
          // "sourceType":This.topicinfo.sourceType,
          // "sourceBusinessId":This.topicinfo.sourceBusinessId,
          // "addFanActionType":"click",
        };
        if(This.arttype==1){
          data.addFanType="PSP_NORMER";//普通科普
        }else if(This.arttype==2){
          data.addFanType="diary";//诊间日记；
        }else if(This.arttype==3){
          data.addFanType="describe";//患者自述；
        }else if(This.arttype==5){
          data.addFanType="analysis"; //病例分析；
        }else if(This.arttype==10){
          data.addFanType="dr_video_share";
        }
        sysService.actionFollowDoc(data,function(res){
          clearTimeout(This.timer);
          if(res.code==0&&res.data.result){
            // This.weiboId=res.data.weiboId;
            This.isFollow=true;
            This.$toast.tip("关注成功");
          }else {
            This.$toast.tip("关注失败");
          }
        });
      }
    },
    confirm_cancel(){
      let This=this;
      sysService.cancelFollowDoc({weibos:This.docinfo.weiboId},function(res){
        if(res.code==0&&res.data.result){
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

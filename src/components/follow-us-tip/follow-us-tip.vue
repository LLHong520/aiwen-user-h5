<template>
  <div v-if="VX_islogin">
      <!-- <div class="follow-us-tip">
        <div class="webo_info">
          <img src="./images/icon_01.png" />
          新浪爱问医生愈言社区
        </div>
        <div class="foc_btns">
          <a class="disable" v-if="isFollow==1" @click="cancelFollowUs" href="javascript:void(0);">已关注</a>
          <a v-else @click="focusUs" href="javascript:void(0);">+ 关注</a>
        </div>
      </div> -->
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
import sysService from "@/api/sysService.js";
import confirm from "@/baseComp/confirm/confirm";
import {mapGetters,mapState} from "vuex";
export default {
  name: "followUstip",
  data() {
    return {
      weiboId:""
    };
  },
  components:{
    confirm
  },
  mounted() {
    let This=this;
    if(this.isFollow==0){
      this.timer=setTimeout(function(){
          // This.autofocusUs()
      },5000);
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    autofocusUs(){
      let This=this;
      if(this.VX_islogin&&!platformInfo.isWx){
        sysService.isFollowUs({})
          .then(res=>{
            if(res.code==0&&res.data){
              if (res.data.result) {
                This.$store.commit("SET_IS_FOLLOW",1);
                This.weiboId=res.data.weiboId;
              }
            }
          });
      }
    },
    focusUs(){
      let This=this;
      if(this.VX_islogin&&!platformInfo.isWx){
        sysService.actionFollowUs({})
          .then(res=>{
            if(res.code==0&&res.data){
              if (res.data.result) {
                This.$store.commit("SET_IS_FOLLOW",1);
                This.weiboId=res.data.weiboId;
              }else {
                This.$toast.tip("关注失败");
              }
            }
          });
      }
    },
    confirm_cancel(){
      let This=this;
      sysService.cancelFollowUs({weiboId:this.weiboId})
        .then(res=>{
          if(res.code==0&&res.data){
            if(res.data.result){
              This.$store.commit("SET_IS_FOLLOW",-1);
              This.$toast.tip("取消关注成功");
            }else{
              This.$toast.tip("取消关注失败");
            }
          }
        });
    },
    hide(){
      this.isFollow=false;
    },
    cancelFollowUs(){
      this.$refs.confirm.show();
    }
  },
  computed:{
    ...mapGetters({
      VX_islogin:"islogin"
    }),
    ...mapState({
      isFollow:"isFollowUs"
    })
  }
};
</script>
<style  scoped lang="less" rel="stylesheet/less">
@import './css.less';
</style>

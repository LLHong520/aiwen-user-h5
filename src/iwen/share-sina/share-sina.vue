<template>
<div>
<transition name="share">
  <div class="action_mask" v-show="show" @click="hideAction"></div>
</transition>
<transition name="bounce">
  <div class="action share" v-show="show">
    <div class="cont-top">
      <span @click="cancel" class="cancel">{{cancelBtnText}}</span>
      <span class="title">{{title}}</span>
      <span @click="confirm" class="confirm">{{confirmBtnText}}</span>
    </div>
    <div class="share-wrapper clearfix">
      <div class="share-content">
        <textarea ref="textarea" class="needsclick" name="name" v-model="textareaText" maxlength="120">
        </textarea>
      </div>
      <div class="share-img"><img :src="GET_IMG_URL(conInfo.sharedImg)" /></div>
      <p class="share-len">{{length}}/120</p>
    </div>
  </div>
</transition>
</div>

</template>
<script>
import { toTopMixin, commonMixin } from "@/mixins";
export default {
  mixins: [toTopMixin, commonMixin],
  props:{
    title:{
      type:String,
      default:"新浪微博",
    },
    confirmBtnText: {
      type: String,
      default: "确定"
    },
    cancelBtnText: {
      type: String,
      default: "取消"
    },
    show:{
      type:Boolean,
      default:false,
    },
    conInfo:{
      type: Object,
      default:{
        sharedContent:""
      }
    }
  },
  data(){
    return {
      platformInfo,
      textareaText:"",
    };
  },
  created() {
    // this.textareaText=this.conInfo.sharedContent;
  },
  computed:{
    length(){
      return this.textareaText.length;
    }
  },
  methods: {
    hideAction(){
      this.$emit("cancel");
      this.$emit("update:show",false);
    },
    cancel() {
      this.$emit("cancel");
    },
    confirm() {
      if(utils.isEmpty(this.$refs.textarea.value)){
        this.$toast.tip("分享内容不能为空哦~");
      }else{
        this.$emit("confirm",this.$refs.textarea.value);
        this.$emit("update:show",false);
      }
    },
  },
  watch:{
    "conInfo.sharedContent":{
      deep:true,
      handler:function(newVal){
        this.textareaText=newVal;
      }
    }
  }
};
</script>
<style scoped lang="less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
.contorl-skin{
  color:@main_c;
  b{
    width:30px;
    height:20px;
    line-height: 20px;
    font-size:36px;
    display: inline-block;
    position: relative;
    top:10/@r;
  }
}
.action{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    // height: 300px;
    background-color: #fff;
    z-index: 9999;
    .action_title{
        padding: 0 20px;
        color: #888;
        border-bottom: 1px solid #efefef;
        height: 40px;
        background-color: #fff;
        line-height: 40px;
        text-align: center;
        color:#4A90E2
    }
    .action_content{
        color: #666;
        .item{
            padding: 0 20px;
            .font_xl;
            border-bottom: 1px solid #efefef;
            line-height: 2.6;
            background-color: #fff;
            text-align: center;
        }
    }
    .action_btn{
      .font_xl;
      height: 40px;
      margin-top: 20px;
      background-color: #fff;
      line-height: 40px;
      text-align: center;
      color: #4A90E2;
    }
}

.action_mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
    z-index: 9999;
}

.cont-top{
    position: relative;
    height: 45px;
    line-height: 45px;
    padding:0 20px;
    border-bottom: 1px solid #EEEEEE ;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    .cancel{
      color: #999;
    }
    .confirm{
      color:#4B8CE7;
    }
    .title{
      color:#555;
    }
    span{
      display:inline-block;
    }
}
.share-wrapper{
  padding:10px 10px;
  position: relative;
  .share-content{
    float: left;
    width:70%;
    min-height: 80px;
    padding:5px 10px 5px 0;
    color:#555555;
    .font_l;
    line-height: 40/@r;
    a{
      color:#4B8CE7;
    }

    textarea{
      width: 100%;
      height: 100%;
      border: 1px solid #fff;
      font-size: 14px;
      min-height: 70px;
    }
  }
  .share-img{
    float: right;
    width: 140/@r;
    height: 140/@r;
    min-height: 100/@r;
    background-color: @bor_c;
    display: flex;
    align-items: center;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .share-len{
    float: right;
    width: 140/@r;
    text-align: center;
    padding: 10px 0 0px;
  }
}




.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
}
@keyframes bounce-in {
  0% {
    transform: translateY(300px);
  }

  100% {
    transform: translateY(0px);
  }
}
@keyframes bounce-out {
   0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(300px);
  }
}
</style>

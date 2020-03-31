<template>
  <!-- <transition enter-active-class='animated slideInUp'  leave-active-class='animated fadeOut' mode='out-in'> -->
<layout class="doc-info-page">
     <!-- page_header -->
     <m-header  slot="page_header"  class="header" title='设置昵称' :menu_on='false'></m-header>
     <!-- page_header -->
     <!-- page_container -->
     <div slot="page_container" class="app_wrapper_inner">
       <top-tip ref="topTip">
           <div class="tip-text">{{tipText}}</div>
       </top-tip>

      <!-- 修改昵称 -->
      <section class="post_topic_wrapper">
          <div class="form">
              <h2 class="block_label">
                  <span>设置昵称呗（3-15个字之间哦）</span>
              </h2>
              <div class="inp_text_wrapper">
                  <input class='inp_text needsclick' name="nike_name" v-model="nike_name" @input="inputName" placeholder="3~15个字之间" />
              </div>
              <div class="tip">
                <p v-if="show_error" class="error">提醒：昵称包含敏感词，请重新设置。</p>
                <p class="tip_text">昵称中不能包含以下关键词：医、大夫、诊所、护士、郎中、整</p>
              </div>
          </div>
          <div class="post_topic_action">
              <input type="button" class='block_btn needsclick' :class="{'enable':enable}" name="" :value="needBindPhone? '下一步':'完成'" @click="nike_change" />
          </div>
      </section>
      <!-- /修改昵称 -->
    </div>
    <!-- /page_container -->
    </layout>
  <!-- </transition> -->
</template>
<script>
import Header from "@/components/header/Header";
import TopTip from "@/components/top-tip/top-tip";
import userService from "@/services/userService";
import {commonMixin} from "@/mixins";
export default {
  name: "edit_nikename",
  mixins:[commonMixin],
  data() {
    return {
      posting:false,
      needBindPhone:false,
      nike_name:"",
      tipText:"昵称已存在",
      show_error:false
    };
  },
  created() {
    this.nike_name=this.VX_userInfo.nickName||"";
    // userService.nike_name().then(res=>{
    //   this.nike_name=res.data.nickName;
    // });
    if(!this.VX_isBindMobile){
      this.needBindPhone=true;
    }
  },
  methods: {
    nike_change(){
      if(!this.enable||this.posting){
        return;
      }
      if(this.wordsFilter(this.nike_name)){
        this.show_error=true;
        return;
      }
      // console.log("提交成功");
      // return;
      this.posting=true;
      let This=this;
      userService.nike_change({nickName:this.nike_name}).then((res)=>{
        This.posting = false;
        if(res.code==0){
          This.nike_name = "";
          This.$store.dispatch("update_userinfo");
          if(This.needBindPhone){
            This.$router.replace("/bind_mobile?refer="+this.$route.query.refer);
          }else{
            This.goToRefer();
          }
        }
      });
    },
    inputName(){
      if(this.nike_name==""){
        this.show_error=false;
      }
    },
    goToRefer(){
      if(this.$route.query.refer){
        this.$router.replace(this.$route.query.refer);
      }else{
        this.$router.replace("/home");
      }
    },
    wordsFilter(str){
      // var exp=^(?!.*'医生');
      let word=["医","大夫","诊所","护士","郎中","整"];
      let result=false;
      for(var i=0;i<word.length;i++){
        if(str.indexOf(word[i])>= 0){
          result=true;
        }
      }
      return result;
    }
  },
  computed:{
    enable(){
      let is=false;
      let nike_name=utils.trim(this.nike_name);
      if(utils.isEmpty(nike_name)||nike_name.length<3||nike_name.length>15||this.posting) {
        is = false;
      }else{
        is = true;
      }
      return is;
    }
  },
  components: {
    mHeader: Header,
    TopTip: TopTip,
  }
};
</script>
<style  scoped lang="less" rel="stylesheet/less">
@import './css.less';
</style>

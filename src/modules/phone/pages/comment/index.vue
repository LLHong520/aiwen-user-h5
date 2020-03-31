<template>
  <layout :isAppView="true">
    <div slot="page_container">
      <conHeader title="评价" :border_on="false" :bgGray="true">
        <span class="retrun" slot="left" @click="router_back">
          <b class="gray"></b>
        </span>
        <span class="retrun" slot="right"></span>
      </conHeader>
      <div class="order_content app_wrapper_inner">
        <div class="order_doctor">
          <div class="doctor_avatar">
            <img :src="GET_IMG_URL(doctorInfo.photo,'doc')" alt="" :title="doctorInfo.realName">
          </div>
          <div class="doctor_info">
            <p class="doctor_info_t">
              <span class="doctor_name">{{doctorInfo.realName || '--'}}</span>
              <span class="doctor_title">{{doctorInfo.titles}}</span>
            </p>
            <p class="doctor_info_b">
              <span class="doctor_depart">{{doctorInfo.departments}}</span>
              <span class="doctor_address">{{doctorInfo.workUnit}}</span>
            </p>
          </div>
        </div>
        <div class="comment_form">
          <div class="comment_form_rate">
            <div class="rate_wrapper" :class="{ 'active':commentForm.grade > 0}">
              <div class="rate_list">
                <div class="rate_item" v-for="v in 5" @click="callRate(v)" :class="{ 'rate_item_active': v<= commentForm.grade }"></div>
              </div>
              <div class="rate_tips">{{defaultTips}}</div>
            </div>
          </div>
          <div class="comment_form_tag">
            <div class="comment_tag_list">
              <div class="comment_tag_item" :key="k" @click="toggleTag(k)" v-for="(v,k) in tagList" :class="{'active':v.isActive}">{{v.tag}}</div>
            </div>
          </div>
          <div class="comment_form_con">
             <textarea name="" id="" placeholder="描述一下咨询过程中医生带给你的感受，医生的咨询方式和效果等。" class="needsclick" @tap="commentConFocus" v-model="commentForm.content"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div slot="page_footer">
      <div class="btn_fixed">
        <div class="btn_fixed_wrapper">
          <a
            href="javascript:;"
            class="btn_blue"
            :class="{'disabled':!isChecked || loading}"
            @click="onSubmit"
          >{{btnText}}</a>
        </div>
      </div>
    </div>
    <div slot="page_layer">
    </div>
  </layout>
</template>
<script>
import { commonMixin } from "@/mixins";
import conHeader from "@/components/header/Header";
import actionSheet from "@/iwen/actionSheet/actionSheet";
import phoneService from "@/services/phoneService.js";
import doctorService from "@/services/doctorService.js";

export default {
  mixins: [commonMixin],
  data() {
    return {
      btnText: "请评价对医生满意度",
      commentForm:{
        grade:0,
        content:""
      },
      tagList:[],
      rateList:{
        1:"非常不满意",
        2:"不满意",
        3:"一般",
        4:"满意",
        5:"非常满意"
      },
      loading:false,
      doctorInfo:{},
      dId:"",
      orderId:""
    };
  },
  components: {
    conHeader,
    actionSheet,
  },
  computed: {
    isChecked() {
      let is = false;
      if(this.commentForm.grade){
        is = true;
      }
      return is;
    },
    choosedTags(){
      return (this.tagList.filter(v => v.isActive) || []).map(v => v.id).join(",");
    },
    defaultTips(){
      return this.rateList[this.commentForm.grade] || "您的评价会让医生做得更好";
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.dId = this.$route.params.dId;
      this.orderId = this.$route.params.orderId;
      this.getDoctorDetail();
      this.getCommentTags();
    },
    getDoctorDetail(){
      let d = {
        docId: this.dId
      };
      doctorService.doc_info(d).then(res => {
        if (res.code == 0 && res.data) {
          this.doctorInfo = res.data;
        }
      });
    },
    getCommentTags(){
      phoneService.getAppraises().then(res => {
        if(res.status == 200){
          this.tagList = res.data;
        }else{
          toast.tip(res.message);
        }
      });
    },
    onSubmit(){
      if(!this.isChecked) return;
      let d = {
        ...this.commentForm,
        appraiseTagId:this.choosedTags,
        businessId:this.orderId,
        businessType:"dr_phone_consult",
        docId:this.dId,
        appraiserId:this.VX_userInfo.id,
      };
      this.commentSubmit(d);
    },
    commentSubmit(data){
      if(this.loading) return false;
      this.loading = true;
      _hmt.push(["_trackEvent", "ensureEvaluateDoctorButtonClick", "点击请评价对医生的满意度"]);
      phoneService.saveAppraise(data).then(res => {
        if(res.status == 200){
          toast.tip("评价成功~");
          this.$router.replace({
            name:"myDoc",
            params:{
              dId:this.dId
            }
          });
        }else{
          toast.tip(res.message);
        }
      }).finally(()=>{
        this.loading = false;
      });
    },
    commentConFocus(e){
      e.target.focus();
    },
    toggleTag(idx){
      this.$set(this.tagList[idx],"isActive",!this.tagList[idx].isActive);
    },
    callRate(v){
      this.commentForm.grade = v;
    }
  }
};
</script>

<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>

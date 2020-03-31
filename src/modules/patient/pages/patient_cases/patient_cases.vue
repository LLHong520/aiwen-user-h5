<template>
  <layout class="doc-info-page" :isAppView="true">
    <!-- page_header -->
    <div slot="page_header">
      <m-header slot="page_header" title='新建就诊记录'>
        <span class="retrun" slot='left' @click="isBackConfirm">
          <b class="gray"></b>
        </span>
        <span class="retrun" slot='right'></span>
      </m-header>
    </div>
    <!-- page_header -->
    <!-- page_container -->
    <div slot="page_container" class="app_wrapper_inner">
      <div class="process_bar">
        <span></span>
        <span></span>
      </div>
      <div class="notice_tip">
        此档案信息仅您和医生可见，请务必填写真实资料<br /> （医生病人较多，请填写就诊记录让医生知道你是谁^^）
      </div>
      <div class="cases_form">
        <div class="form_items">
          <div class="form_item">
            <label for="">本次就诊时间</label>
            <div class="item_cont">
              <input type="text" class="needsclick ipt_txt" readonly v-model="caseInfo.consultationTime" @click="showdatePicker"
                placeholder="请选择日期">
            </div>
          </div>
          <div class="form_item form_item_auto">
            <div class="item_cont">
              <textarea name="" id="" placeholder="请输入本次就诊疾病(或症状)…" maxlength="500" class="needsclick" @tap="iptFocus" @input="descInput('content')" @blur="pageFix"
                v-model="caseInfo.content"></textarea>
              <div class="word_limit">{{contentNum}}</div>
            </div>
          </div>
        </div>
        <div class="form_items form_items_up">
          <div class="tit">上传图片<span>(如病历本、检查报告、处方或药盒等)</span></div>
          <div class="upload_img">
            <div class="img_item" v-for="(item,index) in imgs" :key="index">
              <span><img :src="item" alt="" preview="1"></span>
              <i @click="isDel(index)"></i>
            </div><div class="up_btn" v-if="imgsNum<10">
              <input accept="image/*" name="avatar" ref="avatarInput" type="file" :id="inputId" class="needsclick"
                @change="changeImage($event)" />
              <span v-if="imgsNum>0">{{imgsNum}}/10</span>
              <span v-else>上传图片</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /page_container -->
    <!-- page_footer -->
    <div slot="page_footer">
      <div class="btn_fixed">
        <a href="javascript:;" class="btn_blue" :class="{'disabled':!isChecked || saveing}"
          @click="addMedicalRecord">{{saveing? "保存中...":"保存"}}</a>
      </div>
    </div>
    <!-- page_footer end-->
    <div slot="page_layer">
      <!-- 保存成功 -->
      <div class="success_tip" v-if="isSuccess">
        <em></em>保存成功
      </div>
      <!-- 保存成功end -->
      <!-- 保存失败 -->
      <div class="failed_tip" v-if="isFailed">
        <em></em>保存失败
      </div>
      <!-- 保存失败end -->

      <!--返回确认-->
      <div class="shadow" v-if="isBack"></div>
      <div class="layer_backConfirm" v-if="isBack">
        <p>放弃编辑就诊记录？</p>
        <div class="layer_btn">
          <a href="javascript:;" @click="router_back">放弃</a>
          <a href="javascript:;" @click="cancelBack">不了</a>
        </div>
      </div>
       <!--返回确认-->
      <!-- 日期选择器 -->
      <picker-date class="time-picker" title="本次就诊时间" @comfirm="getDate" :defaultDate="defaultDate"
        :visible.sync="show_picker"></picker-date>
      <!-- 日期选择器 -->
      <div class="date_layer">
        <awesome-picker
          ref="datePicker"
          :data="datePicker.data"
          :anchor="datePicker.anchor"
          :textTitle="datePicker.textTitle"
          :type="datePicker.type"
          :textConfirm="datePicker.textConfirm"
          :colorConfirm="datePicker.colorConfirm"
          :colorCancel="datePicker.colorCancel"
          :colorTitle="datePicker.colorTitle"
          @confirm="handledatePickerConfirm">
        </awesome-picker>
      </div>
      <div class="shadow" v-if="isDelConfirm" @click="cancelDel"></div>
      <div class="layer_confirm animated slideInUp" v-if="isDelConfirm">
        <div class="tit">要删除这张图片？</div>
        <div class="layer_btn">
          <a href="javascript:;" @click="delImg">删除</a>
          <a href="javascript:;" @click="cancelDel">取消</a>
        </div>
      </div>
    </div>
  </layout>
</template>
<script>
  import {
    commonMixin
  } from "@/mixins";
  import { dateData, dateAnchor } from "@/mixins/date.js";
  import Header from "@/components/header/Header";
  import pickerDate from "@/iwen/picker-date/picker-date";
  import userService from "@/services/userService.js";
  import sysService from "@/services/sysService.js";
  export default {
    name: "patients_list",
    mixins: [commonMixin],
    data() {
      return {
        dId: "",
        mid: "",
        show_picker: false, //日期选择器,
        defaultDate: "",
        contentNum: 500,
        saveing: false,
        isSuccess: false,
        isFailed: false,
        imgs: [],
        imgUrls: [],
        imgIds: [],
        imgFiles: [],
        avatar: "",
        isDelConfirm: false,
        isBack:false,
        isDelIndex: "",
        is_perview: false,
        delImgId: "",
        inputId: new Date().getTime(),
        imgsNum: 0,
        caseInfo: {
          consultationTime: "",
          content: "",
          picList: "",
        },
        datePicker: {
          data:dateData,
          anchor: dateAnchor,
          textTitle: "本次就诊时间",
          textConfirm: "完成",
          // type: "date",
          colorConfirm: "#2688FC",
          colorCancel: "#2d2d2d",
          colorTitle: "#AEB1B6"
        },
      };
    },
    components: {
      mHeader: Header,
      pickerDate
    },
    created() {
      this.dId = this.$route.params.dId;
      this.mid = this.$route.params.id;
      this.defaultDate = new Date().getFullYear().toString();
      this.getDate(this.formatTwoDigitInteger(new Date().getFullYear())+"-"+this.formatTwoDigitInteger(new Date().getMonth()+1)+"-"+this.formatTwoDigitInteger(new Date().getDate()));
      // this.handledatePickerConfirm([{value:this.formatTwoDigitInteger(new Date().getFullYear())},{value:this.formatTwoDigitInteger(new Date().getMonth()+1)},{value:this.formatTwoDigitInteger(new Date().getDate())}]);
    },
    computed: {
      isChecked() {
        let is = false;
        if (this.caseInfo.consultationTime != "" && this.caseInfo.content != "") {
          is = true;
        }
        return is;
      }
    },
    methods: {
      //输入法收回页面问题
      pageFix(){
        setTimeout(() => {
          const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
      },
      //输入框focus
      iptFocus(el){
        el.target.focus;
      },
      formatTwoDigitInteger (value)  {
        value = value.toString();
        return (value.length === 1 ? "0" : "") + value;
      },
      //打开日期选择器
      open() {
        let _this = this;
        _this.show_picker = true;
      },
      //选择年龄
      getDate(data) {
        console.log(data);
        let _this = this;
        _this.caseInfo.consultationTime = data;
      },
      //日期选择器
      showdatePicker () {
        this.$refs.datePicker.show();
      },
      handledatePickerConfirm (v) {
        this.datePicker.anchor = v;
        let y=parseInt(v[0].value);
        let m=parseInt(v[1].value);
        let d=parseInt(v[2].value);
        this.caseInfo.consultationTime=this.formatTwoDigitInteger(y)+"-"+this.formatTwoDigitInteger(m)+"-"+this.formatTwoDigitInteger(d);
        console.log(this.caseInfo.consultationTime);
      },
      //倒计数
      descInput(type) {
        let len = this.caseInfo[type].length;
        this[type + "Num"] = 500 - len;
      },
      //保存
      addMedicalRecord() {
        if (!this.isChecked || this.saveing) return;
        this.saveing = true;
        let _this = this;
        let queryParams = Object.assign(
          {
            mid: this.mid,
            drUserId: this.dId,
            userId: this.VX_userInfo.id,
            fromType: 0, //病历来源（0：患者；1：医生）
            businessType: 0, //0：患者报到；1：门诊预约
          },
          _this.caseInfo
        );
        userService.addMedicalRecord(queryParams)
          .then(res => {
            if (res.code == 0) {
              _this.isSuccess = true;
              setTimeout(function () {
                _this.saveing = false;
                _this.isSuccess = false;
                _this.$router.push({
                  name: "myDoc",
                  params: {
                    dId: _this.dId
                  },
                  query:{
                    isSuccess:"success"
                  }
                });
              }, 2000);
            } else {
              _this.saveing = false;
            }
          });
      },
      isDel(index) {
        this.isDelConfirm = true;
        this.delImgId = this.imgIds[index];
        this.isDelIndex = index;
        console.log(this.delImgId);
        console.log(this.isDelIndex);
      },
      cancelDel() {
        this.isDelConfirm = false;
        this.delImgId = "";
        this.isDelIndex = "";
        console.log(this.delImgId);
        console.log(this.isDelIndex);
      },
      delImg() {
        let _this = this;
        sysService.removeImg({
          picId: this.delImgId
        }).then(() => {
          console.log("删除成功");
          this.imgs.splice(this.isDelIndex, 1);
          this.imgIds.splice(this.isDelIndex, 1);
          this.imgUrls.splice(this.isDelIndex, 1);
          this.imgsNum = this.imgUrls.length;
          this.caseInfo.picList = this.imgUrls.join(",");
          this.isDelConfirm = false;
          this.delImgId = "";
          this.isDelIndex = "";
          console.log(this.caseInfo.picList);
          console.log(this.imgIds);
          console.log(this.delImgId);
          console.log(this.isDelIndex);
          this.$previewRefresh();
        }, function () {
          _this.$toast.tip("删除图片失败，请重试~");
        });

      },
      changeImage: function (e) {
        if (this.imgsNum == 10) {
          this.$toast.tip("只允许上传10张图片哦");
          return;
        }
        let file = e.target.files[0];
        if (file) {
          this.file = file;
          let reader = new FileReader();
          let that = this;
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            // 这里的this 指向reader
            that.avatar = this.result;
          };
          let size = (file.size / 1024 / 1024).toFixed(2);
          if (size > 8) {
            this.$toast.tip("请选择小于8M的图片哦~");
            return;
          }

        }


        let data = new FormData();
        data.append("fileName", "");
        data.append("fileData", file);
        e.target.value = "";
        sysService.uploadImg(data).then(res => {
          if (res.code == 0) {
            this.imgUrls.push(res.picUrl);
            this.imgIds.push(res.picId);
            this.imgsNum = this.imgUrls.length;
            this.imgs.push(this.avatar);
            this.caseInfo.picList = this.imgUrls.join(",");
            console.log(this.caseInfo.picList);
            this.$previewRefresh();
          } else {
            this.$toast.tip("上传失败");
          }
        });
      },
      isBackConfirm(){
        if(this.isChecked){
          this.isBack=true;
        }else{
          this.router_back();
        }
      },
      cancelBack(){
        this.isBack=false;
      }
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  @import './css.less';

</style>

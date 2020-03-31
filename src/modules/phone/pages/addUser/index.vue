<template>
  <layout class="consult_wrapper" :isAppView="true">
    <div slot="page_container">
      <conHeader title="添加问诊人" :border_on="false" :bgGray="true">
        <span class="retrun" slot="left" @click="router_back">
          <b class="gray"></b>
        </span>
        <span slot="right">
          <span class="retrun" slot="right"></span>
          <!-- <a href="javascript:;" class="btn_save" :class="{'disabled':!isChecked}" @click="saveFamilyMember">保存</a> -->
        </span>
      </conHeader>
      <div class="consult_items">
        <div class="consult_item">
          <div class="item_wrapper">
            <label for>
              <em class="red">*</em>姓名
            </label>
            <div class="info">
              <input type="text" placeholder="请输入真实姓名" class="ipt_txt" v-model="patientInfo.name" maxlength="50">
            </div>
          </div>
        </div>
        <div class="consult_item">
          <div class="item_wrapper">
            <label for>
              <em class="red">*</em>性别
            </label>
            <div class="info arrow">
              <input
                type="text"
                placeholder="未选择"
                class="ipt_txt"
                @click="newBuild"
                readonly
                v-model="patientInfo.sex"
              >
            </div>
          </div>
        </div>
        <div class="consult_item">
          <div class="item_wrapper">
            <label for>
              <em class="red">*</em>年龄
            </label>
            <div class="info arrow">
              <input
                type="text"
                placeholder="未选择"
                class="ipt_txt"
                @click="showdatePicker"
                readonly
                v-model="patientInfo.age"
              >
            </div>
          </div>
        </div>
        <!--<div class="consult_item">-->
          <!--<div class="item_wrapper">-->
            <!--<label for>-->
              <!--中国大陆-->
              <!--<span class="areaNum">-->
                <!--+86-->
                <!--<em></em>-->
              <!--</span>-->
            <!--</label>-->
            <!--<div class="info">-->
              <!--<input type="text" placeholder="请填写手机号码，选填" class="ipt_txt" v-model="patientInfo.phone">-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--v4.5.3 @author liuxuetao 2019/10/16 -->
        <div class="consult_item">
          <div class="item_wrapper">
            <label for>
              <em class="red">*</em>与患者关系
            </label>
            <div class="info arrow">
              <input
                type="text"
                placeholder="未选择"
                class="ipt_txt"
                @click="newBuildRelation"
                readonly
                v-model="patientInfo.relation"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="default_set">
        <label for>设置默认问诊人</label>
        <div class="set_info">
          <a href="javascript:;" class="btn_set" :class="{'btn_on':isDefault}" @click="toggleSet">
            <em class="circle"></em>
          </a>
        </div>
      </div>
    </div>
    <div slot="page_footer">
      <div class="btn_fixed">
        <a
          href="javascript:;"
          class="btn_blue"
          :class="{'disabled':!isChecked || saveing}" @click="saveFamilyMember"
        >{{saveing? "保存中...":"保存"}}</a>
      </div>
    </div>
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
      <!--选择性别 -->
      <action-sheet
        class="action_con"
        title="选择性别"
        :show.sync="action_show"
        @cancel="cancel"
        @confirm="confirmctrl"
        :items="arrGender"
      ></action-sheet>
      <!--/选择性别 -->
      <!-- 日期选择器 -->
      <!-- <picker-date class="time-picker" title="选择年龄" @comfirm="getBirth" :visible.sync="show_picker"></picker-date> -->
      <div class="date_layer">
        <!-- 日期选择器 -->
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
      <!-- 成员关系开始-->
      <action-sheet
        class="action_con"
        title="选择与患者关系"
        :show.sync="action_relation_show"
        @cancel="cancelRelation"
        @confirm="confirmctrlRelation"
        :items="relationList"
      ></action-sheet>
      <!---->
    </div>
  </layout>
</template>
<script>
import { commonMixin } from "@/mixins";
import { dateAnchor, renderWithEndDate } from "@/mixins/date.js";
import conHeader from "@/components/header/Header";
import actionSheet from "@/iwen/actionSheet/actionSheet";
// import pickerDate from "@/iwen/picker-date/picker-date";
import phoneService from "@/services/phoneService.js";
export default {
  mixins: [commonMixin],
  data() {
    return {
      isDefault: false,
      isSuccess: false,
      isFailed: false,
      show_picker: false, //日期选择器
      action_show: false,
      saveing: false,
      arrGender: [{ text: "男" }, { text: "女" }],
      patientInfo: {
        name: "",
        sex: "",
        birth: "",
        age: "",
        phone: "",
        relation:"本人"
      },
      datePicker: {
        data:renderWithEndDate().dateData,
        anchor: dateAnchor,
        textTitle: "选择年龄",
        // type: "date",
        textConfirm: "完成",
        colorConfirm: "#2688FC",
        colorCancel: "#2d2d2d",
        colorTitle: "#AEB1B6"
      },
      relationList:[
        {
          text:"家庭成员"
        },
        {
          text:"朋友"
        },
        {
          text:"亲戚"
        },
        {
          text:"本人"
        }
      ],
      action_relation_show:false,
    };
  },
  components: {
    conHeader,
    actionSheet,
    // pickerDate
  },
  computed: {
    isChecked() {
      let is = false;
      if(this.patientInfo.name!=""&&this.patientInfo.sex!=""&&parseInt(this.patientInfo.age)>=0){
        is=true;
      }
      return is;
    }
  },
  created() {
    let query = this.$route.query;
    this.isDefault = Boolean(query.isDefault) || false;
  },
  methods: {
    verify(){
      let flag = true;
      //校验用户名
      let validateName = (str = "") => {
        let pattern =  /[^a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D]/;
        return pattern.test(str);
      };
      flag = !validateName(this.patientInfo.name);
      if(!flag){
        toast.tip("姓名仅支持中英文输入");
      }
      return flag;
    },
    toggleSet() {
      this.isDefault = !this.isDefault;
    },
    newBuild() {
      let _this = this;
      _this.action_show = true;
    },
    confirmctrl(index) {
      let _this = this;
      if (index == 1) {
        _this.patientInfo.sex = _this.arrGender[0].text;
      } else if (index == 2) {
        _this.patientInfo.sex = _this.arrGender[1].text;
      }
    },
    cancel() {
      let _this = this;
      _this.action_show = false;
    },
    jsGetAge(val) {
      var returnAge;
      var strBirthdayArr = val.split("-");
      var birthYear = strBirthdayArr[0];
      var birthMonth = strBirthdayArr[1];
      var birthDay = strBirthdayArr[2];

      var d = new Date();
      var nowYear = d.getFullYear();
      var nowMonth = d.getMonth() + 1;
      var nowDay = d.getDate();

      if (nowYear == birthYear) {
        returnAge = 0; //同年 则为0岁
      } else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
          if (nowMonth == birthMonth) {
            var dayDiff = nowDay - birthDay; //日之差
            if (dayDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          } else {
            var monthDiff = nowMonth - birthMonth; //月之差
            if (monthDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          }
        } else {
          returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
        }
      }
      return returnAge; //返回周岁年龄
    },
    //日期选择器
    formatTwoDigitInteger  (value)  {
      value = value.toString();
      return (value.length === 1 ? "0" : "") + value;
    },
    showdatePicker () {
      this.$refs.datePicker.show();
    },
    handledatePickerConfirm (v) {
      this.datePicker.anchor = v;
      let y=parseInt(v[0].value);
      let m=parseInt(v[1].value);
      let d=parseInt(v[2].value);
      this.patientInfo.birth=this.formatTwoDigitInteger(y)+"-"+this.formatTwoDigitInteger(m)+"-"+this.formatTwoDigitInteger(d);
      this.patientInfo.age = this.jsGetAge(this.patientInfo.birth);
      console.log(this.patientInfo.age);
      console.log(this.patientInfo.birth);
    },
    // open() {
    //   let _this = this;
    //   _this.show_picker = true;
    // },
    // getBirth(data) {
    //   let _this = this;
    //   _this.patientInfo.birth = data;
    //   _this.patientInfo.age = _this.jsGetAge(data);
    // },
    saveFamilyMember() {
      if (!this.verify() || !this.isChecked || this.saveing) return;
      this.saveing = true;
      let _this = this;
      let queryParams = {
        trueName: _this.patientInfo.name,
        sex:_this.patientInfo.sex,
        birth:_this.patientInfo.birth,
        phone:_this.patientInfo.phone,
        isDefault:_this.isDefault,
        relation: _this.patientInfo.relation
      };
      phoneService.savefamilymembers(queryParams)
      .then(res => {
        if (res.status == 200) {
          _this.isSuccess=true;
          setTimeout(function(){
            _this.saveing = false;
            _this.isSuccess=false;
            // _this.router_back();
            _this.$router.replace({
              name:"consultInfo",
              params:{
                dId: _this.$route.query.dId
              },
              query:{
                timeRange: _this.$route.query.timeRange,
                patient: queryParams.trueName
              }
            });
          },2000);
        }else{
          _this.saveing = false;
          _this.isFailed = true;
          setTimeout(() => {
            _this.isFailed = false;
          }, 2000);
        }
      }).catch(()=>{
        this.saveing = false;
      });
    },
    newBuildRelation(){
      this.action_relation_show = true;
    },
    cancelRelation(){
      this.action_relation_show = false;
    },
    confirmctrlRelation(index){
      let idx = index - 1 || 0;
      this.patientInfo.relation = this.relationList[idx].text;
    }
  }
};
</script>

<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>

<template>
  <layout class="doc-info-page" :isAppView="true">
    <!-- page_header -->
    <div slot="page_header">
      <m-header slot="page_header" title="新建患者档案">
        <span class="retrun" slot="left" @click="router_back">
          <b class="gray"></b>
        </span>
        <span class="retrun" slot="right"></span>
      </m-header>
    </div>
    <div slot="page_container" class="app_wrapper_inner">
      <div class="process_bar">
        <span></span>
      </div>
      <div class="notice_tip">此档案信息仅您和医生可见，请务必填写真实资料</div>
      <div class="patients_form">
        <div class="form_items">
          <div class="form_item">
            <label for>
              <em class="red">*</em>姓名
            </label>
            <div class="item_cont">
              <input
                @blur="pageFix"
                @click="iptFocus"
                type="text"
               class="needsclick ipt_txt"
                maxlength="5"
                v-model="patientInfo.trueName"
                placeholder="请输入真实姓名"
              >
            </div>
          </div>
          <div class="form_item">
            <label for>
              <em class="red">*</em>生日
            </label>
            <div class="item_cont">
              <input
                type="text"
               class="needsclick ipt_txt"
                readonly
                v-model="patientInfo.birth"
                @click="showdatePicker"
                placeholder="请选择出生日期"
              >
            </div>
          </div>
          <div class="form_item">
            <label for>
              <em class="red">*</em>性别
            </label>
            <div class="item_cont">
              男
              <span class="radio" :class="{'checked':patientInfo.sex=='男'}" @click="getSex('男')"></span>
              &nbsp;&nbsp;&nbsp;&nbsp;女
              <span class="radio" :class="{'checked':patientInfo.sex=='女'}" @click="getSex('女')"></span>
            </div>
          </div>
          <div class="form_item">
            <label for>
              <em class="red">*</em>药物过敏
            </label>
            <div class="item_cont">
              无
              <span class="radio" :class="{'checked':isAllergic=='0'}" @click="changeAllergic(0)"></span>
              &nbsp;&nbsp;&nbsp;&nbsp;有
              <span class="radio" :class="{'checked':isAllergic=='1'}" @click="changeAllergic(1)"></span>
            </div>
          </div>
          <div class="form_sub" v-if="isAllergic=='1'">
            <div class="area">
              <textarea
                class="needsclick"
                placeholder="为您的安全着想，请描述您的过敏药物"
                maxlength="60"
                @input="descInput('allergic')"
                v-model="patientInfo.allergic"
                @click="iptFocus"
                @blur="pageFix"
              ></textarea>
              <div class="word_limit">{{allergicNum}}</div>
            </div>
          </div>
        </div>
        <div class="form_items">
          <div class="form_item">
            <label for>身高</label>
            <div class="item_cont">
              <input
                type="text"
                pattern="\d*"
                @click="iptFocus"
                @input="handleInput"
                @keyup="handleInput"
                @blur="pageFix"
               class="needsclick ipt_txt"
                v-model="patientInfo.height"
                placeholder="请输入身高，单位为cm，选填"
              >
            </div>
          </div>
          <div class="form_item">
            <label for>体重</label>
            <div class="item_cont">
              <input
                type="text"
                pattern="\d*"
                @click="iptFocus"
                @input="handleInput"
                @keyup="handleInput"
                @blur="pageFix"
               class="needsclick ipt_txt"
                v-model="patientInfo.weight"
                placeholder="请输入体重，单位为kg，选填"
              >
            </div>
          </div>
          <div class="form_item">
            <label for>血型</label>
            <div class="item_cont">
              <input
                type="text"
                class="ipt_txt arrow"
                readonly
                @click="toggleBloodSel"
                v-model="patientInfo.bloodType"
                placeholder="未选择"
              >
            </div>
          </div>
          <div class="form_item">
            <label for>患者关系</label>
            <div class="item_cont">
              <input
                type="text"
                class="ipt_txt arrow"
                readonly
                @click="toggleRelationSel"
                v-model="patientInfo.relation"
                placeholder="未选择"
              >
            </div>
          </div>
          <div class="form_item">
            <label for>所在地区</label>
            <div class="item_cont">
              <input
                type="text"
                class="ipt_txt arrow"
                readonly
                v-model="dist"
                @click="openDistPicker"
                placeholder="未选择"
              >
            </div>
          </div>
          <div class="form_item">
            <label for>病史</label>
            <div class="item_cont">
              无
              <span
                class="radio"
                :class="{'checked':isMedicalRecords=='0'}"
                @click="changeMedicalRecords(0)"
              ></span>
              &nbsp;&nbsp;&nbsp;&nbsp;有
              <span
                class="radio"
                :class="{'checked':isMedicalRecords=='1'}"
                @click="changeMedicalRecords(1)"
              ></span>
            </div>
          </div>
          <div class="form_sub" v-if="isMedicalRecords=='1'">
            <div class="area">
              <textarea
                class="needsclick"
                v-model="patientInfo.medicalRecords"
                maxlength="60"
                @click="iptFocus"
                @input="descInput('medicalRecords')"
                @blur="pageFix"
                placeholder="为让医生更好的分析病情，请描述您的以往病史"
              ></textarea>
              <div class="word_limit">{{medicalRecordsNum}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /page_container -->
    <!-- page_footer -->
    <div slot="page_footer">
      <div class="btn_fixed">
        <a
          href="javascript:;"
          class="btn_blue"
          :class="{'disabled':!isChecked || saveing}"
          @click="saveFamilyMember"
        >{{saveing? "保存中...":"保存"}}</a>
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
      <!--选择血型 -->
      <action-sheet
        class="action_con"
        title="血型"
        :show.sync="blood_show"
        @cancel="toggleBloodSel"
        @confirm="bloodConfirm"
        :items="arrBlood"
      ></action-sheet>
      <!--/选择血型 -->
      <!--选择血型 -->
      <action-sheet
        class="action_con"
        title="患者关系"
        :show.sync="relation_show"
        @cancel="toggleRelationSel"
        @confirm="relationConfirm"
        :items="arrRelation"
      ></action-sheet>
      <!--/选择血型 -->
      <div class="date_layer">
        <!-- 日期选择器 -->
        <awesome-picker
          ref="datePicker"
          :data="datePicker.data"
          :anchor="datePicker.anchor"
          :textTitle="datePicker.textTitle"
          :type="datePicker.type"
          :colorConfirm="datePicker.colorConfirm"
          :textConfirm="datePicker.textConfirm"
          :colorCancel="datePicker.colorCancel"
          :colorTitle="datePicker.colorTitle"
          @confirm="handledatePickerConfirm">
        </awesome-picker>
      </div>
      <div class="date_layer">
        <!-- 地区选择器 -->
        <awesome-picker
          ref="picker"
          :anchor="distPicker.anchor"
          :data="distPicker.data"
          :textTitle="distPicker.textTitle"
          :textConfirm="distPicker.textConfirm"
          :colorConfirm="distPicker.colorConfirm"
          :colorCancel="distPicker.colorCancel"
          :colorTitle="distPicker.colorTitle"
          @cancel="handlePickerCancel"
          @confirm="handlePickerConfirm"
        ></awesome-picker>
      </div>
    </div>
  </layout>
</template>
<script>
import { commonMixin } from "@/mixins";
import { dateData, dateAnchor } from "@/mixins/date.js";
import Header from "@/components/header/Header";
import actionSheet from "@/iwen/actionSheet/actionSheet";
import phoneService from "@/services/phoneService.js";
import sysService from "@/services/sysService.js";
export default {
  name: "patients_list",
  mixins: [commonMixin],
  data() {
    return {
      dId: "",
      isAllergic: "",
      isMedicalRecords: "",
      show_picker: false, //日期选择器,
      blood_show: false,
      relation_show: false,
      isSuccess: false,
      isFailed: false,
      arrBlood: [
        {
          text: "A型"
        },
        {
          text: "B型"
        },
        {
          text: "O型"
        },
        {
          text: "AB型"
        },
        {
          text: "不清楚"
        }
      ],
      arrRelation: [
        {
          text: "家庭成员"
        },
        {
          text: "亲戚"
        },
        {
          text: "朋友"
        }
      ],
      allergicNum: 60, //药物过敏倒计数
      medicalRecordsNum: 60, //病史倒计数
      saveing: false,
      dist: "",
      patientInfo: {
        trueName: "", //真实姓名
        birth: "", //出生日期
        medicalRecords: "", //病史
        allergic: "", //药物过敏
        sex: "",
        height: "",
        weight: "",
        bloodType: "",
        relation: "",
        provinceName: "",
        provinceId: "",
        cityName: "",
        cityId: ""
      },
      cityList: [],
      citys: [],
      distPicker: {
        data: [],
        anchor: [],
        textTitle: "选择地区",
        textConfirm:"完成",
        colorConfirm: "#2688FC",
        colorCancel: "#2d2d2d",
        colorTitle: "#AEB1B6"
      },
      datePicker: {
        data:dateData,
        anchor: dateAnchor,
        textTitle: "生日",
        textConfirm:"完成",
        // type: "date",
        colorConfirm: "#2688FC",
        colorCancel: "#2d2d2d",
        colorTitle: "#AEB1B6"
      },
    };
  },
  components: {
    mHeader: Header,
    actionSheet,
  },
  created() {
    this.dId = this.$route.params.dId;
    this.qryProvince();
  },
  computed: {
    isChecked() {
      let is = false;
      if (
        this.patientInfo.trueName != "" &&
        this.patientInfo.sex != "" &&
        this.patientInfo.birth != "" &&
        (this.isAllergic == "0" ||
          (this.isAllergic == "1" && this.patientInfo.allergic != ""))
      ) {
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
    qryProvince() {
      //获取省列表
      let This = this;
      sysService.qryProvince({}).then(res => {
        if (res.code == 0) {
          for (let i = 0; i < res.data.length; i++) {
            This.distPicker.data.push({
              value: res.data[i].provinceName,
              id: res.data[i].parent_id,
              children: []
            });
          }
          setTimeout(function() {
            for (let n = 0; n < This.distPicker.data.length; n++) {
              This.qryCityListByProvinceId(This.distPicker.data[n].id, n);
            }
          }, 200);
        }
      });
    },
    qryCityListByProvinceId(id, n) {
      //根据省id获取城市列表
      let This = this;
      sysService
        .qryCityListByProvinceId({
          provinceId: id
        })
        .then(res => {
          if (res.code == 0) {
            // This.cityList=res.data;
            // let citys;
            This.cityList = [];
            if (res.data.length > 0) {
              for (let i = 0; i < res.data.length; i++) {
                This.cityList.push({
                  value: res.data[i].cityName || "",
                  id: res.data[i].cityId || ""
                });
              }
            } else {
              This.cityList.push({
                value: "",
                id: ""
              });
            }
            This.distPicker.data[n].children = This.cityList;
          }
        });
    },

    handlePickerConfirm(v) {
      this.distPicker.anchor = v;
      this.dist = v[0].value + " " + v[1].value;
      this.patientInfo.provinceName = v[0].value;
      this.patientInfo.provinceId = this.distPicker.data[v[0].index].id; //provinceId
      this.patientInfo.cityName = v[1].value;
      this.patientInfo.cityId = this.distPicker.data[v[0].index].children[
        v[1].index
      ].id; //cityId
    },
    handlePickerCancel() {
      // this.$refs.picker.hide();
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
      console.log(this.patientInfo.birth);
    },
    //药物过敏
    changeAllergic(value) {
      switch (value) {
        case 0:
          this.isAllergic = "0";
          this.patientInfo.allergic = "";
          this.allergicNum = 60;
          break;
        case 1:
          this.isAllergic = "1";
          break;
      }
    },
    //病史
    changeMedicalRecords(value) {
      switch (value) {
        case 0:
          this.isMedicalRecords = "0";
          this.patientInfo.medicalRecords = "";
          this.medicalRecordsNum = 60;
          break;
        case 1:
          this.isMedicalRecords = "1";
          break;
      }
    },
    //打开地区选择器
    openDistPicker() {
      // let _this = this;
      // _this.show_dist_picker = true;
      this.$refs.picker.show();
    },
    //选择地区
    getDist(data) {
      let _this = this;
      _this.dist = data;
    },
    //单选按钮
    getSex(val) {
      this.patientInfo.sex = val;
    },
    //选择血型
    toggleBloodSel() {
      let _this = this;
      _this.blood_show = !_this.blood_show;
    },
    bloodConfirm(index) {
      let _this = this;
      _this.patientInfo.bloodType = _this.arrBlood[index - 1].text;
      console.log(_this.patientInfo.bloodType);
    },
    //选择患者关系
    toggleRelationSel() {
      let _this = this;
      _this.relation_show = !_this.relation_show;
    },
    relationConfirm(index) {
      let _this = this;
      _this.patientInfo.relation = _this.arrRelation[index - 1].text;
      console.log(_this.patientInfo.relation);
    },
    //倒计数
    descInput(type) {
      let len = this.patientInfo[type].length;
      this[type + "Num"] = 60 - len;
    },
    //只能输入数字
    handleInput(e) {
      this.patientInfo.height=this.patientInfo.height.replace(/\D+/, "");
      this.patientInfo.weight=this.patientInfo.weight.replace(/\D+/, "");
    },

    //保存
    saveFamilyMember() {
      if (!this.isChecked || this.saveing) return;
      if (isNaN(this.patientInfo.height) && this.patientInfo.height != "") {
        this.$toast.tip("身高只能输入数字");
        return;
      }
      if (isNaN(this.patientInfo.weight) && this.patientInfo.weight != "") {
        this.$toast.tip("体重只能输入数字");
        return;
      }
      this.saveing = true;
      let _this = this;
      let queryParams = _this.patientInfo;
      phoneService.saveFamilyMember(queryParams).then(res => {
        if (res.code == 0) {
          _this.isSuccess = true;
          setTimeout(function() {
            _this.saveing = false;
            _this.isSuccess = false;
            _this.$router.push({
              name: "patientCases",
              params: {
                dId: _this.dId,
                id: res.mid
              }
            });
          }, 500);
        } else {
          _this.saveing = false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
@import "./css.less";
</style>

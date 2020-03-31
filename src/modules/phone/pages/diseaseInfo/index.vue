<template>
  <div class="consult_wrapper">
    <div slot="page_container">
      <conHeader title="填写病情信息" :border_on="false" :bgGray="true">
        <span class="retrun" slot="left" @click="router_back">
          <b class="gray"></b>
        </span>
        <span class="retrun" slot="right"></span>
      </conHeader>
      <div class="app_wrapper_inner">
        <div class="consult_items">
          <div class="consult_item">
            <div class="item_wrapper">
              <label for>
                患病时长<em class="red">*</em>
              </label>
              <div class="info arrow">
                <input @click="openPicker" type="text" class="needsclick ipt_txt selresult" placeholder="未选择" v-model="diseaseInfo.sickTime" readonly>
                <!-- <select name id autocomplete="false" class="needsclick" v-model="diseaseInfo.sickTime"
                  @change="getTimeRange(timeRange)">
                  <option :value="item" v-for="(item,index) in timeList" :key="index">{{item}}</option>
                </select> -->
                <awesome-picker
                  ref="timePicker"
                  :data="picker.data"
                  :textTitle="'患病时长'"
                  :textConfirm="'完成'"
                  :textCancel="'取消'"
                  :colorTitle="picker.colorTitle"
                  :colorConfirm="picker.colorConfirm"
                  :colorCancel="picker.colorCancel"
                  @confirm="getTimeRange">
                </awesome-picker>
              </div>
            </div>
          </div>
          <div class="consult_item disease_item">
            <div class="item_wrapper">
              <label for>
                病情描述<em class="red">*</em>
              </label>
              <div class="info">
              </div>
            </div>
            <div class="item_cont">
              <textarea id="edit" placeholder="详细描述您的病情症状，曾经做过的检查、用药情况，目前病情是加重还是缓解，想要获得医生的什么帮助"
                maxlength="500" class="needsclick" @tap="diseaseConFocus" v-model="diseaseInfo.illnessDescription"
                minlength="10">
              </textarea>
              <div class="word_limit">
                <span v-if="diseaseInfo.illnessDescription.length<10">最少输入10个字</span>
                <span v-else>{{500 - diseaseInfo.illnessDescription.length}}</span>
              </div>
            </div>
          </div>
          <div class="consult_upload">
            <div class="consult_item">
              <div class="item_wrapper">
                <label for>
                  病情图片
                </label>
                <div class="info"></div>
              </div>
              <div class="consult_upload_wrapper">
                <upload :size="20" v-model="diseaseInfo.illnessImages" :fileList="fileList" :limit="9"></upload>
              </div>
            </div>
          </div>
        </div>
        <div class="consult_tip">
          <p>
            请上传病情照片，若是皮肤或整形问题，建议对准患处拍摄。照片仅自己和医生可见
          </p>
        </div>
      </div>
    </div>
    <div slot="page_footer">
      <div class="btn_fixed">
        <div class="btn_fixed_wrapper">
          <a href="javascript:;" class="btn_blue" :class="{'disabled':!isChecked||isPaying}"
            @click="addTelephoneOrder">{{payBtnText}}</a>
        </div>
      </div>
    </div>
    <div slot="page_layer">
    </div>
  </div>
</template>
<script>
  import {
    commonMixin
  } from "@/mixins";
  import conHeader from "@/components/header/Header";
  import actionSheet from "@/iwen/actionSheet/actionSheet";
  import phoneService from "@/services/phoneService.js";
  import upload from "@/components/upload/index";
  import storage from "good-storage";

  // import { setTimeout } from "timers";
  export default {
    mixins: [commonMixin],
    data() {
      return {
        payBtnText: "立即支付",
        isPaying: false,
        dId: "",
        orderId: "",
        action_show: false, //显示管理操作
        show_picker: false,
        patientList: [], //患者列表
        diseaseInfo: {
          sickTime: "",
          illnessDescription: "",
          illnessImages: []
        },
        patientSave: {
          show: false, //是否显示就诊人信息
          name: "",
          sex: "",
          birth: ""
        },
        timeRange: "",
        timeList: {
          1: "一周",
          2: "半个月",
          3: "半年",
          4: "大于半年"
        },
        phone: "",
        startTime: "",
        endTime: "",
        fileList: [],
        picker:{
          data:[["一周","半个月","半年","大于半年"]],
          colorTitle:"#AEB1B6",
          colorConfirm:"#2688FC",
          colorCancel:"#2D2D2D",
        }
      };
    },
    components: {
      conHeader,
      actionSheet,
      upload
    },
    created() {
      this.init();
    },
    beforeDestroy() {
      //清除相关session
      // let hashKey = this.$route.query.hashKey;
      // storage.session.remove(`PHONE_INFO_${hashKey}`);
    },
    mounted() {
      let This = this;
      if(This.diseaseInfo.sickTime==""){
        setTimeout(function(){
          This.openPicker();
        },300);
      }
    },
    computed: {
      isChecked() {
        let is = false;
        if (
          this.diseaseInfo.sickTime != "" &&
          this.diseaseInfo.illnessDescription != "" &&
          this.diseaseInfo.illnessDescription.length >= 10
          // && this.diseaseInfo.illnessImages.length
        ) {
          is = true;
        }
        return is;
      }
    },
    methods: {
      init() {
        this.dId = this.$route.params.dId;
        this.orderId = this.$route.query.orderId;
        // setTimeout(this.qryOrderDetail(), 100);
      },
      newBuild() {
        let _this = this;
        _this.action_show = true;
      },
      patientDetail(key) {
        let _this = this;
        _this.questionInfo.patient = _this.patientList[key].trueName;
        _this.questionInfo.sex = _this.patientList[key].sex;
        _this.questionInfo.age = _this.patientList[key].age;
        _this.questionInfo.patientId = _this.patientList[key].id;
        _this.phone = _this.patientList[key].phone ? _this.patientList[key].phone : "";
      },
      confirmctrl(index) {

      },
      cancel() {
        this.action_show = false;
      },
      diseaseConFocus(e) {
        e.target.focus();
      },
      getFamilyMemberList() {
        let _this = this;
        phoneService.getFamilyMemberList().then(res => {
          if (res.code == 0) {
            _this.patientList = res.data;
            _this.setDefaultFamilyMember();
            if (_this.orderId) {
              console.log(_this.orderId);
              this.qryOrderDetail();
            }
          }
        });
      },
      /*
       *设置默认就诊人
       */
      setDefaultFamilyMember() {
        let defaultMember = this.patientList.find((item) => {
          return item.isDefault;
        });
        console.log(defaultMember);
        if (defaultMember) {
          this.questionInfo.patient = defaultMember.trueName;
          this.questionInfo.sex = defaultMember.sex;
          this.questionInfo.age = defaultMember.age;
          this.questionInfo.patientId = defaultMember.id;
          this.phone = defaultMember.phone ? defaultMember.phone : "";
        }
      },
      qryOrderDetail() {
        let _this = this;
        let queryParams = {
          orderId: _this.orderId
        };
        phoneService.qryOrderDetail(queryParams).then(res => {
          if (res.code == 0) {
            let startTime = _this.hourFormat(res.data.telephone_order.callBeginTime_stamp);
            let endTime = _this.hourFormat(res.data.telephone_order.callEndTime_stamp);
            _this.timeRange = startTime + " — " + endTime + " 今天";
            let patientId = res.data.telephone_order.inquiry_patient_id;
            for (let i = 0; i < _this.patientList.length; i++) {
              if (patientId == _this.patientList[i].id) {
                _this.patientDetail(i);
              }
            }
            _this.phone = res.data.telephone_order.inquiry_patient_phone;
          }
        });
      },
      fix(num) {
        return num >= 10 ? num : "0" + num;
      },
      getDateArray(endDate, splitTime, count) {
        if (!endDate) {
          endDate = new Date();
        }
        if (!splitTime) {
          splitTime = 20 * 60 * 1000;
        }
        if (!count) {
          count = 12;
        }
        var endTime = endDate.getTime();
        var mod = endTime % splitTime;
        if (mod > 0) {
          endTime -= mod;
        }
        var dateArray = [];
        while (count-- > 0) {
          var d = new Date();
          d = endTime - count * splitTime;
          dateArray.push(new Date(d));
        }
        return dateArray;
      },
      openPicker(){
        this.$refs.timePicker.show();
      },
      getTimeRange(data) {
        console.log(data);
        this.diseaseInfo.sickTime = data[0].value;

        //下一步聚焦
        $("#edit").focus();
      },
      addTelephoneOrder() {
        if (!this.isChecked) return;
        if (this.isPaying) return;
        this.payBtnText = "生成订单中...";
        this.isPaying = true;
        let _this = this;
        //解析sessiongStorage获取上一步信息
        let hashKey = this.$route.query.hashKey || "";
        let baseInfo = storage.session.get(`PHONE_INFO_${hashKey}`).queryParams || {};
        console.log(baseInfo);
        if (!baseInfo.hashKey || baseInfo.patientId=="" ||baseInfo.inquiryPatientId=="") {
          toast.tip("订单参数异常，请重新下单");
          this.payBtnText = "立即支付";
          this.isPaying = false;

          let This = this;
          setTimeout(function(){
            This.$router.push({
              name: "consultInfo",
              params: {
                dId: This.dId
              }
            });
          },1000);
          return false;
        }
        let queryParams = {
          ...baseInfo,
          ...this.diseaseInfo,
          orderStatus: "10001"
        };
        //处理图片
        queryParams.illnessImages = queryParams.illnessImages.map(v => v.url).join(",");

        phoneService.createOrder(queryParams).then(res => {
          if (res.status == "200" && res.data) {
            console.log("生成订单成功");
            try {
              //爱问统计脚本
              if(window._iwDataer && window._iwDataer!=undefined) {
                window._iwDataer.sendCustomData({
                  id:"createdPhoneOrderSuccess",
                  desc:"电话咨询成功提交",
                  ext:{
                    doctorId:this.dId,
                    orderId: res.data.id
                  }
                });
              }
            } catch (error) {
              console.log(error);
            }

            let price = res.data.servicePrice;
            if (price == 0) {
              _this.$router.push({
                name: "phone_orderDetail",
                params: {
                  orderId: res.data.id
                },
                query: {
                  dId: this.dId
                }
              });
            } else {
              _this.$router.push({
                name: "phone.Payment",
                params: {
                  businessId: res.data.id
                },
                query: {
                  dId: this.dId
                }
              });
            }
          } else {
            toast.tip(res.message);
            this.isPaying = false;
            this.payBtnText = "立即支付";
          }
        }).catch(() => {
          this.payBtnText = "立即支付";
          this.isPaying = false;
        });
      }
    }
  };

</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "./css.less";

</style>

<template>
  <layout class="consult_wrapper app_wrapper_inner" :isAppView="true">
    <div slot="page_container">
      <conHeader title="电话咨询" :border_on="false" :bgGray="true">
        <span class="retrun" slot="left" @click="back">
          <b class="gray"></b>
        </span>
        <span class="header-avater-wrapper" slot="right">
          <router-link :to="{name:'dialogueList',param:{dId:docInfo.id}}">
            <img :src="GET_IMG_URL(docInfo.photo,'doc')" />
          </router-link>
        </span>
      </conHeader>
      <div>
        <div class="consult_items">
          <div class="consult_item">
            <div class="item_wrapper">
              <label for>
                <em class="red">*</em>意向通话时间
              </label>
              <div class="info timeRange arrow">
                <!-- <span class="ordertime selresult disabled">未填写</span> -->
                <input type="text" class="needsclick ipt_txt selresult" placeholder="未选择" v-model="timeRange" readonly
                  @click="openPicker">
                <!-- <select name ref="timeRange" autocomplete="false" class="needsclick" v-model="timeRange"
                  @change="getTimeRange(timeRange)">
                  <option :value="item.startTime+' — '+item.endTime + ' ' + item.time" v-for="(item,index) in timeList" :key="index">
                    {{item.startTime}} — {{item.endTime}} {{item.time}}</option>
                </select> -->
                <awesome-picker ref="timePicker" :data="picker.data" :textTitle="'意向通话时间'" :textConfirm="'完成'"
                  :textCancel="'取消'" :colorTitle="picker.colorTitle" :colorConfirm="picker.colorConfirm"
                  :colorCancel="picker.colorCancel" @confirm="getTimeRange">
                </awesome-picker>
              </div>
            </div>
            <div class="item_tip">由于医生工作的特殊性，实际通话时间会以平台发起的时间为准。如你的病情紧急，建议直接去医院就诊。</div>
          </div>
          <div class="consult_item">
            <div class="item_wrapper">
              <label for>
                <em class="red">*</em>为谁咨询
              </label>
              <div class="info arrow">
                <input type="text" placeholder="未填写" class="needsclick ipt_txt iosEdit" @click="newBuild" readonly
                  v-model="questionInfo.patient">
              </div>
            </div>
          </div>
          <div class="consult_item">
            <div class="item_wrapper">
              <label for>
                <em class="red">*</em>手机号
              </label>
              <div class="info">
                <input type="tel" id="phone" placeholder="请输入手机号码" class="needsclick ipt_txt" @blur="inputBlur" v-model="phone">
              </div>
            </div>
            <div class="item_tip">请确认手机号可以接听电话，并请留意0571开头的来电</div>
          </div>
        </div>
        <div class="consult_tip">
          <h3>电话咨询说明</h3>
          <p>
            1.如果医生较忙，3小时内未确认预约，系统默认继续等待，等待时间最长为24小时，期间你可以取消订单，你也可以联系医生沟通咨询时间或直接联系客服。<br />
            2.医生确认预约后，医生将在预约时间段内拨打你的电话，请保持电话畅通，注意接听来自<span class="consult_tip_weight">0571</span>的电话。<br />
            3.由于医生工作的特殊性，可能无法及时拨打电话，预约时间段内未接通电话，你可以继续等待，等待时间最长为 24 小时，期间你可以取消订单，你也可以联系医生沟通咨询时间或直接联系客服。<br />
            4.一次电话服务时间为医生设置的服务时间，时间到了，将自动挂断，请注意沟通时间。
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
      <!--选择就就诊人 -->
      <action-sheet class="action_con" title="为谁咨询" :show.sync="action_show" @cancel="cancel" @confirm="confirmctrl"
        :items="actionSheets"></action-sheet>
      <!--/选择就就诊人 -->
    </div>
  </layout>
</template>
<script>
  import {
    commonMixin
  } from "@/mixins";
  import conHeader from "@/components/header/Header";
  import actionSheet from "@/iwen/actionSheet/actionSheet";
  import phoneService from "@/services/phoneService.js";
  import doctorService from "@/services/doctorService.js";
  import storage from "good-storage";

  // import { setTimeout } from "timers";
  export default {
    mixins: [commonMixin],
    data() {
      return {
        payBtnText: "下一步",
        isPaying: false,
        dId: "",
        docInfo: {},
        orderId: "",
        action_show: false, //显示管理操作
        show_picker: false,
        patientList: [], //患者列表
        questionInfo: {
          patient: "", //就诊人
          sex: "",
          age: 0,
          patientId: "" //就诊人id
        },
        patientSave: {
          show: false, //是否显示就诊人信息
          name: "",
          sex: "",
          birth: ""
        },
        actionItems: [{
          iconCtrl: "icon-css",
          textCtrl: "text-css",
          text: "添加就诊人"
        }],
        timeRange: "",
        timeList: [],
        phone: "",
        startTime: "",
        endTime: "",
        hashKey: "",
        picker: {
          data: [],
          // anchor:[{
          //   index: 0,
          //   value: "a"
          // }]
          colorTitle: "#AEB1B6",
          colorConfirm: "#2688FC",
          colorCancel: "#2D2D2D",
        },
        sessionParams:{
          timeRange: "",
          patient: "",
          queryParams:{}
        }
      };
    },
    components: {
      conHeader,
      actionSheet
    },
    computed: {
      actionSheets() {
        let items = [];
        this.patientList.map(item => {
          items.push({
            text: item.trueName,
            textCtrl: "c_gray"
          });
        });
        // if(items.length>5){
        //   items=items.slice(0,5);
        // }
        //咨询人达到7人隐藏新增按钮
        if (items.length < 7) {
          items.push(this.actionItems[0]);
        }
        return items;
      },
      isChecked() {
        let is = false;
        if (
          this.timeRange != "" &&
          this.questionInfo.patient != "" &&
          this.phone != ""
        ) {
          is = true;
        }
        return is;
      }
    },
    created() {
      this.init();
    },
    mounted() {
      if(this.$route.query.timeRange){
        this.timeRange = decodeURIComponent(this.$route.query.timeRange);
        let obj = [{value:this.timeRange}];
        this.getTimeRange(obj);
      }
      if(this.timeRange==""){
        let This = this;
        setTimeout(function(){
          This.openPicker();
        },300); 
      }

      //兼容ipone6键盘弹起空白
      // document.body.addEventListener("focusout",()=>{
      //   setTimeout(()=>{
      //     const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
      //     window.scroll(0, Math.max(scrollHeight - 1 , 0));
      //   },100);
      // });
    },
    methods: {
      back(){
        storage.session.remove(`PHONE_INFO_${this.hashKey}`);
        this.router_back();
      },
      tellAppShowDoctorHead() {
        let This = this;
        try {
          var params = {
            doctorHeadUrl: This.docInfo.photo,
            callback: function (params) {
              _hmt.push(["_trackEvent", "doctorAvatarButtonClick", "点击填写预约信息页面医生头像"]);
              This.$router.push({
                name: "dialogueList",
                param: {
                  dId: This.docInfo.id
                }
              });
            },
          };
          iwenJSNativeBridge.showDoctorHead(params);
        } catch (error) {
          console.log(error);
        }
      },
      init() {
        this.dId = this.$route.params.dId;
        this.orderId = this.$route.query.orderId;

        //存在则获取本地回填
        if (this.$route.query.hashKey && this.$route.query.timeRange) {
          this.hashKey = this.$route.query.hashKey;
          this.sessionParams = storage.session.get(`PHONE_INFO_${this.hashKey}`);
          console.log(this.sessionParams);

          //回显详情
          this.timeRange = this.sessionParams.timeRange;
          this.questionInfo.patient = this.sessionParams.patient;
          this.phone = this.sessionParams.queryParams.inquiryPatientPhone;
          this.startTime = this.sessionParams.queryParams.callBeginTime;
          this.endTime = this.sessionParams.queryParams.callEndTime;
        }
        this.getDocinfo();
        this.getFamilyMemberList();
        this.getTimeList();
        // setTimeout(this.qryOrderDetail(), 100);
      },
      getDocinfo() {
        let This = this;
        doctorService.doc_info(
          {
            docId: this.dId
          })
          .then(res => {
            if (res.code == 0 && res.data) {
              This.docInfo = res.data;
              This.tellAppShowDoctorHead();
            }
          });
      },
      newBuild() {
        this.action_show = true;
      },
      patientDetail(key) {
        this.questionInfo.patient = this.patientList[key].trueName;
        this.questionInfo.sex = this.patientList[key].sex;
        this.questionInfo.age = this.patientList[key].age;
        this.questionInfo.patientId = this.patientList[key].id;
        this.phone = this.patientList[key].phone ? this.patientList[key].phone : "";
      },
      confirmctrl(index) {
        let _this = this;
        // console.log(index);
        if (index == _this.patientList.length + 1) {
          _this.$router.push({
            name: "phone.addUser",
            query: {
              //首次新增咨询人，默认就诊人按钮开启
              isDefault: this.patientList.length==0 ? true : false,
              dId: this.dId,
              timeRange: encodeURIComponent(this.timeRange)
            }
          });
        } else {
          _this.patientDetail(index - 1);
          _this.action_show = false;
        }

        //下一步聚焦
        $("#phone").focus();
      },
      cancel() {
        let _this = this;
        _this.action_show = false;
      },
      getFamilyMemberList() {
        let _this = this;
        phoneService.getfamilymembers().then(res => {
          if (res.status == 200 && res.data) {
            _this.patientList = res.data;

            if(_this.$route.query.patient){
              _this.patientList.map((item,index)=>{
                if(item.trueName == _this.$route.query.patient){
                  _this.patientDetail(index);
                }
              });
            }else {
              _this.setDefaultFamilyMember();
            }
            if (_this.orderId) {
              this.qryOrderDetail();
            }

          }
        });
      },
      /*
       *设置默认就诊人
       */
      hasDefaultMember(){
        let defaultMember = this.patientList.find((item) => {
          if(item.isDefault){
            return item;
          }
        });
        return defaultMember;
      },
      setDefaultFamilyMember() {
        console.log(this.hasDefaultMember());
        let defaultMember = this.hasDefaultMember();
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
        phoneService.qryOrderDetail({orderId: _this.orderId}).then(res => {
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
      /**
       * minutes 时间间隔
       * **/
      getDateArray(minutes) {
        let dateArray = [];
        let step = minutes * 60 * 1000;
        //开始时间
        let startDate = new Date();
        let startDateMark = startDate.getTime();
        //结束时间
        let endDateMark = startDateMark + 24 * 60 * 60 * 1000;

        let minutesPassed = startDate.getMinutes();
        if (minutesPassed > 0) {
          startDateMark -= minutesPassed * 60 * 1000;
        }

        let nowDateMark = startDateMark;
        //生成指定间隔的时间列表
        while (nowDateMark <= endDateMark) {
          let nowDate = new Date(nowDateMark);
          let minutes = nowDate.getMinutes();
          let hour = nowDate.getHours() + 1;
          let endDate = new Date(nowDate.getTime() + step);
          dateArray.push({
            startTime: this.fix(hour) + ":" + this.fix(minutes),
            endTime: this.fix(endDate.getHours() + 1) + ":" + this.fix(endDate.getMinutes()),
            time: this.isToday(nowDateMark) ? "今天" : "明天",
          });
          nowDateMark += step;
        }
        // console.table(dateArray);
        return dateArray;
      },
      isToday(targetDateMark) {
        let nowDate = new Date();
        let targetDate = new Date(targetDateMark);
        let is = true;
        if (targetDate.getFullYear() > nowDate.getFullYear()) {
          is = false;
        } else if (targetDate.getMonth() + 1 > nowDate.getMonth() + 1) {
          is = false;
        } else if (targetDate.getDate() > nowDate.getDate()) {
          is = false;
        }
        return is;
      },
      getTimeList() {
        this.timeList = this.getDateArray(60);
        let pickerData = this.timeList.map((item) => {
          return item.startTime + " — " + item.endTime + " " + item.time;
        });
        this.picker.data = [pickerData];
      },
      openPicker() {
        this.$refs.timePicker.show();
      },
      getTimeRange(data) {
        let timeRange = data[0].value;
        this.timeRange = timeRange;
        let date = new Date();
        let year = date.getFullYear();
        let month = this.fix(date.getMonth() + 1);
        let day = this.fix(date.getDate());
        let timeArr = timeRange.split(/\s+/);
        let time = timeArr[3];
        if (time == "明天") {
          day = Number(day) + 1;
        }
        this.startTime = year + "-" + month + "-" + day + " " + timeArr[0] + ":00";
        this.endTime = year + "-" + month + "-" + day + " " + timeArr[2] + ":00";

        //弹起下一步
        if(!this.hasDefaultMember() && this.questionInfo.patient==""){
          this.newBuild();
        }
      },
      addTelephoneOrder() {
        if (!this.isChecked) return;
        this.phone = utils.trim(this.phone);
        if (!/^1\d{10}$/.test(this.phone)) {
          toast.tip("请输入正确的手机号");
          return;
        }
        if (this.isPaying) return;
        _hmt.push(["_trackEvent", "nextStepButtonClick", "点击下一步"]);
        let _this = this;
        if(this.hashKey==""){
          // this.hashKey =Date.now();
          this.hashKey ="1573096703952";
        }
        let hashKey = this.hashKey;
        this.sessionParams = {
          timeRange: _this.timeRange,
          patient: _this.questionInfo.patient,
          queryParams:{
            callBeginTime: _this.startTime,
            callEndTime: _this.endTime,
            doctorId: _this.dId,
            patientId: this.VX_userInfo.id,
            inquiryPatientPhone: _this.phone,
            inquiryPatientId: _this.questionInfo.patientId,
            hashKey
          }
        };
        console.log(this.sessionParams);
        //修改当前路由参数
        this.$router.replace({
          name: this.$route.name,
          params: {
            ...this.$route.params
          },
          query: {
            ...this.$route.query,
            hashKey,
            timeRange: encodeURIComponent(this.timeRange)
          }
        });
        //第一步不提交接口，默认保存本地
        storage.session.set(`PHONE_INFO_${hashKey}`, this.sessionParams);
        this.$router.push({
          name: "phone.diseaseInfo",
          params: {
            bId: this.dId,
          },
          query: {
            hashKey
          }
        });
      }
    }
  };

</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "./css.less";

</style>

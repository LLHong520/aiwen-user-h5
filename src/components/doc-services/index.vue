<template>
  <!-- 医生图文咨询  门诊预约 电话咨询等信息 -->
  <div class="service_list clearfix">
    <!-- 图文咨询 -->
    <div class="service_item" :iw="`{desc:'图文咨询按钮',id:'tuwenZxun',ext:{doctorId:'${docId}'}}`">
      <a href="javascript:;" @click="zxFn">
        <template v-if="!docInfo.advice">
          <img src="./images/clinic_icon_consult_gray@2x.png" width="34" alt="">
          <dl>
            <dt>图文咨询</dt>
            <dd><span class="gray">未开通</span></dd>
          </dl>
        </template>
        <template v-else>
          <template v-if="!docInfo.nowsuspendService">
            <!--没有名额-->
            <template v-if="!this.docInfo.qCaps > 0">
              <img src="./images/clinic_icon_consult_gray@2x.png" width="34" alt="">
              <dl>
                <dt>图文咨询</dt>
                <dd><span class="gray">今日名额已用完</span></dd>
              </dl>
            </template>
            <!--有名额-->
            <template v-else>
              <img src="./images/clinic_icon_consult@2x.png" width="34" alt="">
              <dl>
                <dt>图文咨询</dt>
                <dd><span class="blue">¥{{(VX_isSinaHealthAppForceIng && docInfo.qPrice>0)? 6:docInfo.qPrice}}</span>
                </dd>
              </dl>
            </template>
          </template>
          <!-- 图文咨询暂停 -->
          <template v-else>
            <img src="./images/clinic_icon_consult_gray@2x.png" width="34" alt="">
            <dl>
              <dt>图文咨询</dt>
              <dd><span class="gray">暂停服务</span></dd>
            </dl>
          </template>
        </template>
      </a>
    </div>
    <!-- 图文咨询end -->
    <!-- 电话咨询 -->
    <div class="service_item" :iw="`{desc:'电话咨询按钮',id:'dianhuaZxun',ext:{doctorId:'${docId}'}}`">
      <div>
        <a href="javascript:;" @click="phoneFn">
          <img src="./images/clinic_icon_phone@2x.png" width="34" alt=""
            v-if="phoneSetting.status=='10001'&&phoneSetting.remainSource>0">
          <img src="./images/clinic_icon_phone_gray@2x.png" width="34" alt="" v-else>
          <dl>
            <dt>电话咨询</dt>
            <dd>
              <span class="blue"
                v-if="phoneSetting.status=='10001'&&phoneSetting.remainSource>0">¥{{phoneSetting.charge}}/{{phoneSetting.serviceTime}}分钟</span>
              <span class="gray" v-else-if="phoneSetting.status=='10001'&&phoneSetting.remainSource<=0">今日名额已满</span>
              <span class="gray" v-else>未开通</span>
            </dd>
          </dl>
        </a>
      </div>
    </div>
    <!-- 电话咨询 end-->
    <!-- 门诊预约 -->
    <div class="service_item" :iw="`{desc:'门诊预约按钮',id:'menzhenyuyue',ext:{doctorId:'${docId}'}}`">
      <router-link :to="{name:'serviceMonth'}" v-if="docId=='589314d70cf2c92fa475e2c7'">
        <img src="./images/clinic_icon_order@2x.png" width="34" alt="">
        <dl>
          <dt>包月服务</dt>
          <dd>
            <span class="blue">￥199</span>
          </dd>
        </dl>
      </router-link>
      <a href="javascript:;" @click="yyFn" v-else>
        <img src="./images/clinic_icon_order_gray@2x.png" width="34" alt="" v-if="!docInfo.register==1">
        <img src="./images/clinic_icon_order@2x.png" width="34" alt="" v-else>
        <dl>
          <dt>门诊预约</dt>
          <dd>
            <div v-if="!docInfo.register==1">
              <span class="gray">未开通</span>
            </div>
          </dd>
        </dl>
      </a>
    </div>
    <!-- 门诊预约end -->

    <!-- 绑定收集弹框 -->
    <bindphone-dailog ref="bindPhoneDialog" />
  </div>
  <!-- 医生图文咨询  门诊预约 电话咨询等信息 end-->
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import {
    commonMixin,
  } from "@/mixins";
  import bindphoneDailog from "@/components/bindphone-dailog";
  import platformLogin from "@/common/platformFn";
  import doctorService from "@/services/doctorService.js";
  import phoneService from "@/services/phoneService.js";
  export default {
    name: "doc-service-panel",
    mixins: [commonMixin],
    components: {
      bindphoneDailog,
    },
    props: {
      docId: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        docInfo: {
          id: "",
          relation: 0,
          photo: "",
          realName: "...",
          departments: "...",
          titles: "...",
          answerNum: 0,
          workUnit: "...",
          sicknessExpertise: "",
          departId: "",
          illnessTags: [],
        },
        phoneSetting: {
          status: "", //应用是否开通状态：10001:开启,90001:关闭
          remainSource: 0 //剩余名额
        }
      };
    },
    computed: {
      ...mapGetters({
        VX_isInSinaHealthApp: "isInSinaHealthApp",
        VX_isInIwenApp: "isInIwenApp",
        VX_isInHapHealApp: "isInHapHealApp",
      })
    },
    mounted() {
      this.$nextTick(() => {
        this.getDocinfo();
        this.qryDocTelConfig();
      });
    },
    methods: {
      getDocinfo() {
        let This = this;
        doctorService.doc_info({
          docId: this.docId
        })
          .then(res => {
            if (res.code == 0 && res.data) {
              This.docInfo = res.data;
            }
          });
      },
      qryDocTelConfig() {
        //电话咨询配置
        let This = this;
        phoneService
          .getPhoneConsultSetting({
            doctorId: This.docId,
            departmentId: "",
          })
          .then(res => {
            if (res.status == 200 && res.data) {
              This.phoneSetting = res.data;
            }
          });
      },
      zxFn() {
        let This = this;
        if (!This.docInfo.advice) {
          This.$toast.tip("该医生暂未开通图文咨询服务");
        } else {
          if (!this.docInfo.nowsuspendService) {
            if (!this.docInfo.qCaps > 0) {
              This.$toast.tip("今日无名额");
            } else {
              if (!this.VX_islogin) {
                if (this.VX_isInSinaHealthApp) {
                  console.log("App登录");
                  iwenJSNativeBridge.appLogin();
                } else {
                  console.log("jsp登录");
                  platformLogin(this.$route.fullPath);
                }
                return;
              }
              console.log("已经登录");
              window.location.href = this.OUTER_LINKS.docConsult + this.docInfo.id + "&bizType=NOR";
            }
          } else {
            This.$toast.tip("暂停服务");
          }
        }
      },
      phoneFn() {
        if (!this.VX_islogin) {
          if (this.VX_isInSinaHealthApp) {
            iwenJSNativeBridge.appLogin();
          } else {
            platformLogin(this.$route.fullPath);
          }
          return;
        }
        if (!this.VX_isBindMobile) {
          this.$refs.bindPhoneDialog.show();
          return;
        }
        _hmt.push(["_trackEvent", "callButtonClick", "点击电话咨询"]);
        let This = this;
        if (This.phoneSetting.status == "10001" && This.phoneSetting.remainSource > 0) {
          if (!this.VX_islogin) {
            if (this.VX_isInSinaHealthApp) {
              iwenJSNativeBridge.appLogin();
            } else {
              platformLogin(this.$route.fullPath);
            }
            return;
          }
          This.$router.push({
            name: "consultInfo",
            params: {
              dId: This.docId
            }
          });
        } else if (This.phoneSetting.remainSource <= 0 && This.phoneSetting.status == "10001") {
          This.$toast.tip("今日名额已满");
        }
      },
      yyFn() {
        if (this.docInfo.register == 1) {
          window.location.href = this.OUTER_LINKS.docOrder + this.docInfo.id;
        }
      }
    }
  };

</script>
<style scoped lang="less" rel="stylesheet/less">
  @assets: "~@/assets";
  @import "@{assets}/css/flex.less";
  @import "@{assets}/css/fix.less";

  .service_list {
    // overflow-x: auto;
    // overflow-y: hidden;
    padding-top: 42/@r;
    display: flex;

    .service_item {
      flex: 1;
      overflow: hidden;
      width: 0;
      box-sizing: border-box;
      padding-right: 16/@r;

      &:last-child {
        padding-right: 0;
      }

      a {
        display: block;
        text-align: center;
        font-size: 24/@r;
        color: #2D2D2D;
        background-color: #F9FAFD;
        border-radius: 8/@r;
        padding: 12/@r;

        dl {
          padding: 0;
          line-height: 34/@r;
        }

        dd {
          font-size: 22/@r;
          height: 34/@r;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          .blue {
            color: #2688FC;
          }

          .gray {
            color: #AEB1B6;
          }
        }
      }

      &:nth-last-child(1):first-child {
        padding-right: 16/@r;
        background-color: #F9FAFD;
        border-radius: 8/@r;

        a {
          display: flex;
          height: 76/@r;
          line-height: 64/@r;
          padding: 6/@r 40/@r 6/@r 12/@r;
          box-sizing: border-box;
          background: url(./images/btn_enter@2x.png) no-repeat right center;
          background-size: 40/@r 40/@r;

          img {
            display: block;
            width: 64/@r;
            height: 64/@r;
          }

          dl {
            flex: 1;
            overflow: hidden;
            display: flex;
            line-height: 64/@r;

            dt {
              flex: 1;
              overflow: hidden;
              text-align: left;
            }

            dd {
              padding-top: 15/@r;
              height: 64/@r;
              box-sizing: border-box;

              span {
                line-height: 34/@r;
                border-radius: 34/@r;
                font-size: 24/@r;
                display: inline-block;
                vertical-align: top;
                padding: 0 16/@r;

                &.gray {
                  color: #AEB1B6;
                  background-color: #F1F3F8;
                }

                &.blue {
                  color: #2688FC;
                  background-color: #E9F3FF;
                }
              }
            }
          }
        }
      }
    }
  }

</style>

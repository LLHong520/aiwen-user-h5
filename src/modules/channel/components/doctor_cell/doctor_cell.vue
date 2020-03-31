<template>
  <div class="doctor_cell" @click.prevent="toDocRoom(doctor.id)">
    <div class="img"><img  v-lazy="GET_IMG_URL(doctor.doctorInfo?doctor.doctorInfo.doctorPhoto:'','doc')" alt=""></div>
    <div class="doctor_info">
      <div class="doc_info">
        <div class="txt"><span class="name">{{doctor.realName}}</span>&nbsp;&nbsp;&nbsp;{{doctor.title}}</div>
        <div class="btn_box">
          <a v-if="doctor.service.advice && doctor.service.advice.isAdvice" href="javascript:;" @click.stop="toConsult(doctor.id)">
            <i></i>
            问医生 ¥{{doctor.service.advice.price}}
          </a>
        </div>
      </div>
      <p class="hospital_info">{{doctor.department}}&nbsp;&nbsp;&nbsp;{{doctor.medicalInstitutions}}</p>
      <p class="doc_pj">
        <span v-if="doctor.interrogationCount">问诊量 <span class="blue">{{doctor.interrogationCount}}</span>&nbsp;&nbsp;&nbsp;</span>
        <span v-if="doctor.ratingRate&&doctor.ratingRate!='0.00%'">好评率 <span class="blue">{{doctor.ratingRate}}</span></span>
      </p>
      <p class="goodat" v-if="doctor.sicknessExpertise || doctor.areasOfExpertise">擅长：{{doctor.sicknessExpertise || doctor.areasOfExpertise}}</p>
      <div class="service_btn">
        <a href="javascript:;" v-if="doctor.service.register && doctor.service.register.isRegister">门诊预约</a>
        <a href="javascript:;" v-if="doctor.service.phone && doctor.service.phone.isPhone">电话咨询</a>
      </div>
    </div>
  </div>
</template>

<script >
import { commonMixin} from "@/mixins";
// import platformLogin from "@/common/platformFn";
export default {
  name: "doctorCell",
  mixins:[commonMixin],
  data(){
    return {
    };
  },
  props:{
    doctor: {
      type: Object,
      default: () => {
        return {};
      }
    },
  },
  methods:{
    toConsult(id){
      console.log("点击了咨询按钮");
      // if (!this.VX_islogin) {
      //   if (this.VX_isInSinaHealthApp) {
      //     console.log("App登录");
      //     iwenJSNativeBridge.appLogin();
      //   } else {
      //     console.log("jsp登录");
      //     platformLogin(this.$route.fullPath);
      //   }
      //   return;
      // }
      window.location.href = this.OUTER_LINKS.docConsult + id + "&bizType=NOR";
    },
    toDocRoom(id){
      this.$router.push({
        name: "docIndex",
        params: {
          "dId": id,
        },
        query:{
          "resource":"channel"
        },
      });
    },
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
.doctor_cell{
  display: flex;
  padding: 30/@r 0;
  .img{
    margin-right: 22/@r;
    width: 96/@r;
    height: 96/@r;
    border-radius: 96/@r;
  }
  .img img{
    display: block;
    width: 96/@r;
    height: 96/@r;
    border-radius: 96/@r;
    border: 1px solid #f3f3f3;
    box-sizing: border-box;
  }
  .doctor_info{
    flex: 1;
    width: 0;
    .doc_info{
      display: flex;
      .txt{
        flex: 1;
        width: 0;
        line-height: 48/@r;
        font-size: 24/@r;
        color: #282828;
        .name{
          font-size: 32/@r;
          font-weight: bold;
        }
      }
      .btn_box{
        a{
          display: inline-block;
          height: 48/@r;
          border:2/@r solid #2688FC;
          line-height: 48/@r;
          padding: 0 16/@r;
          border-radius: 48/@r;
          color: #2688FC;
          font-size: 24/@r;
          font-weight: bold;
          i{
            display: inline-block;
            width: 8/@r;
            height: 8/@r;
            border-radius: 8/@r;
            background-color: #2688FC;
            vertical-align: middle;
            margin-right: 14/@r;
          }
        }
      }
    }
    .hospital_info{
      font-size: 24/@r;
      color: #666;
      line-height: 34/@r;
      margin-top: 10/@r;
    }
    .doc_pj{
      font-size: 22/@r;
      color: #CFCFCF;
      line-height: 32/@r;
      margin-top: 30/@r;
      .blue{
        font-size: 22/@r;
        color: #2688FC;
      }
    }
    .goodat{
      font-size: 22/@r;
      color: #999;
      line-height: 32/@r;
      margin-top: 12/@r;
      .show_n_lines(1);
    }
    .service_btn{
      margin-top: 16/@r;
      a{
        display: inline-block;
        height: 42/@r;
        line-height: 40/@r;
        border: 1px solid #EFF2F7;
        border-radius: 42/@r;
        box-sizing: border-box;
        font-size: 20/@r;
        color: #999;
        margin-right: 16/@r;
        padding: 0 15/@r;
        background-color: #F6F8FB;
      }
    }
  }
}
</style>

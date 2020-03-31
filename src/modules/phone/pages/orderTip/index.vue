<template>
  <layout :isAppView="true">
    <div slot="page_container">
      <conHeader title="支付成功" :border_on="false">
        <span class="retrun" slot="left" @click="router_back">
          <b class="gray"></b>
        </span>
        <span class="retrun" slot="right"></span>
      </conHeader>
      <div class="main_wrapper">
        <div class="order_tip_status">
          <div class="order_tip_img">
            <img src="./images/img_succeed_wait@2x.png">
            <p class="text">支付成功</p>
          </div>
          <p class="desc">
            如果医生较忙，3 小时内未接单，系统默认继续等待；接单后，如医生未及时回电，等待时间最长为 24 小时，期间你可以取消订单，也可联系医生或客服重新预约时间
          </p>
          <div class="btn_wrapper">
            <router-link :to="{name:'dialogueList',params:{dId:doctorId}}" class="btn_blue">进入咨询</router-link>
            <router-link :to="{name:'homeIndex'}">返回首页</router-link>
          </div>
        </div>
      </div>
    </div>
    <div slot="page_footer">
    </div>
  </layout>
</template>
<script>
import { commonMixin } from "@/mixins";
import conHeader from "@/components/header/Header";

export default {
  mixins: [commonMixin],
  data() {
    return {
      doctorId:""
    };
  },
  components: {
    conHeader
  },
  computed: {},
  created() {
    this.doctorId = this.$route.query.doctorId||"";
  },
  methods: {
  }
};
</script>

<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>

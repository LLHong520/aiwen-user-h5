<template>
  <layout class="doc-info-page" :isAppView="true">
    <!-- page_header -->
    <div slot="page_header">
      <m-header slot="page_header" title='选择服务'>
        <span class="retrun" slot='left' @click="router_back">
          <b class="gray"></b>
        </span>
        <span class="retrun" slot='right'></span>
      </m-header>
    </div>
    <!-- page_header -->
    <!-- page_container -->
    <div slot="page_container" class="app_wrapper_inner">
      <div class="service_wrapper">
        <div class="service_items">
          <a href="javascript:;" @click="singIn">
            <dl class="singIn">
              <dt>报个到</dt>
              <dd>我刚看了医生的门诊</dd>
            </dl>
          </a>
          <router-link :to="{ name: 'myDoc', params:{ id: '' }}">
            <dl class="look">
              <dt>看一看</dt>
              <dd>我是医生的关注者</dd>
            </dl>
          </router-link>
        </div>
      </div>
    </div>
    <!-- /page_container -->
  </layout>
</template>
<script>
  import {
    commonMixin
  } from "@/mixins";
  import Header from "@/components/header/Header";
  // import doctorService from "@/services/doctorService.js";
  import phoneService from "@/services/phoneService.js";
  export default {
    name: "patients_list",
    mixins: [commonMixin],
    data() {
      return {
        dId: "",
        patientList: [],
      };
    },
    components: {
      mHeader: Header,
    },
    created() {
      this.init();
    },
    computed: {},
    methods: {
      init() {
        this.dId = this.$route.params.dId;
        this.getFamilyMemberList();
      },
      singIn() {
        if ((this.patientList || []).length > 0) {
          console.log("111");
          this.$router.push({
            name: "patientsList",
            params: {
              dId: this.dId
            }
          });
        } else {
          console.log("222");
          this.$router.push({
            name: "patientAdd",
            params: {
              dId: this.dId
            }
          });
        }
      },
      //查询家庭成员列表
      getFamilyMemberList() {
        let _this = this;
        phoneService.getFamilyMemberList().then(res => {
          if (res.code == 0) {
            _this.patientList = res.data;
          }
        });
      },
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  @import './css.less';
</style>

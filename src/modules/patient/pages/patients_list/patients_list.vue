<template>
  <layout class="doc-info-page" :isAppView="true">
    <!-- page_header -->
    <div slot="page_header">
      <m-header slot="page_header" title='选择患者'>
        <span class="retrun" slot='left' @click="router_back">
          <b class="gray"></b>
        </span>
        <span class="retrun" slot='right'></span>
      </m-header>
    </div>
    <!-- page_header -->
    <!-- page_container -->
    <div slot="page_container" class="app_wrapper_inner">
      <div class="patients_list_wrapper">
        <div class="add_btn" v-if="(patientList||[]).length<7">
          <router-link :to="{ name: 'patientAdd',params:{dId:dId}}"><em></em>添加患者</router-link>
        </div>
        <ul class="patients_list" v-if="(patientList||[]).length>0">
          <li v-for="(item,index) in patientList" :key="index">
            <router-link :to="{ name: 'patientCases', params:{ id: item.id,dId:dId }}"><span
                class="name">{{item.trueName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;{{item.sex}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.birth}}岁</router-link>
          </li>
        </ul>
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
  // import userService from "@/services/userService.js";
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

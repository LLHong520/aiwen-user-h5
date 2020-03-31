<template>
<layout>
  <!-- page_header -->
  <div slot="page_header">
   <m-header slot="page_header"  title="患者自述-详情">
     <span @click="router_back" class="retrun" slot='left'><b class="gray"></b></span>
     <span class="retrun" slot='right'></span>
   </m-header>
  </div>
 <!-- page_header -->
  <!-- page_container -->
  <div slot="page_container" class="app_wrapper_inner">

    <div>患者自述</div>
  </div>
<!-- /page_container -->
  <!-- page_footer -->
  <div  slot="page_footer">
    <to-top></to-top>
    <loading-page v-show='initing_page'></loading-page>
  </div>
</layout>
</template>
<script>
import Header from "@/components/header/Header";
import loadingBtn from "@/components/loading-btn/loading-btn";
import { commonMixin, toTopMixin} from "@/mixins";
// import healthService from "@/services/healthService.js";
export default {
  name: "index",
  mixins:[commonMixin,toTopMixin],
  data () {
    return {
    };
  },
  components:{
    mHeader:Header,
    loadingBtn
  },
  created(){
  	this._initpage();
  },
  methods:{
  	_initpage(){
  	  this.load_articleInfo();
  	},
  	load_articleInfo(){
  },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
  @import './css.less';
</style>

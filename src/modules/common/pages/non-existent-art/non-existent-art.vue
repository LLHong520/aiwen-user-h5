<template>
<layout class="doc-info-page">
       <!-- page_header -->
        <m-header  slot="page_header" :title="`${txt}详情`">
          <span class="retrun" slot='left' @click="router_back">
            <b class="gray"></b>
           </span>
           <span class="retrun" slot='right'></span>
        </m-header>
        <!-- page_header -->
        <!-- page_container -->
        <div slot="page_container" class="app_wrapper_inner">
          <div class="page404">
            <div class="img_404">
              <img src="./images/Group 5@2x.png" />
            </div>
            <h1 class="errText">你访问的{{txt}}失效或已删除</h1>
            <div class="btn-box">
                <input type="button" class='btn btn-xl btn-shadow-color' name="" value="返回" @click="router_back" />
            </div>
          </div>
        </div>
        <!-- /page_container -->

        <!-- page_footer -->
  </layout>
</template>

<script>
import {commonMixin} from "@/mixins";
import Header from "@/components/header/Header";
export default {
  name: "fans",
  mixins:[commonMixin],
  data () {
    return {
      type: "",
      txt:"...",
      toogle_memu:false,
    };
  },
  components:{
    mHeader:Header
  },
  created(){
    this.type=this.$route.params.type;
    this.init();
  },
  methods:{
    init(){
      let _this = this;
      if(_this.type == "article"){
        _this.txt = "文章";
      }else if(_this.type == "special"){
        _this.txt = "专题";
      }
    },
    do_toogle_memu(){
      this.toogle_memu=!this.toogle_memu;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' rel="stylesheet/less">
@import './css.less';
</style>

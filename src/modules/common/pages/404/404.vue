<template>
<layout class="doc-info-page" >
       <!-- page_header -->
        <m-header  slot="page_header" title='提示'>
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
              <img src="./images/404@3x.png" />
            </div>
            <h1 class="errText">啊哦，页面出错了耶~</h1>
            <div class="c_999">
            可能是因为您的链接地址有误，该页面已经被作者删除或转为私密状态。
            </div>
            <div class="post_topic_action">
                <input type="button" class='back_btn' name="" value="返回" @click="go_back" />
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
      toogle_memu:false,
    };
  },
  components:{
    mHeader:Header
  },
  methods:{
    do_toogle_memu(){
      this.toogle_memu=!this.toogle_memu;
    },
    go_back(){
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less' rel="stylesheet/less">
@import './css.less';
</style>

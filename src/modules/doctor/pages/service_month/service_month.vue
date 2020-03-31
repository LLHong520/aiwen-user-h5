<template>
<layout class="doc-info-page" :isAppView="true">
  <!-- page_header -->
  <div slot="page_header">
   <m-header slot="page_header" title='包月服务'>
      <span class="retrun" slot='left' @click="router_back">
        <b class="gray"></b>
      </span>
      <span class="retrun" slot='right'></span>
    </m-header>
  </div>
 <!-- page_header -->
  <!-- page_container -->
  <div slot="page_container" class="app_wrapper_inner">
    <div class="img"><img src="./service.png" width="100%" alt=""></div>
  </div>
</layout>
</template>
<script>
import { commonMixin} from "@/mixins";
import Header from "@/components/header/Header";

export default {
  name: "doc_comments",
  mixins:[commonMixin],
  data () {
    return {
      
    };
  },
  components:{
    mHeader: Header,
  },
  created(){},
  computed:{},
  methods:{},
  mounted(){}
};
</script>


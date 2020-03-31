<template>
<layout class="user-center">
  <!-- page_header -->
  <div slot="page_header">
   <m-header slot="page_header"  title='所有科室'>
     <span class="retrun" slot='left' @click="router_back">
       <b class="gray"></b>
      </span>
      <span class="retrun" slot='right'></span>
   </m-header>
  </div>
 <!-- page_header -->
  <!-- page_container -->
  <div slot="page_container" class="app_wrapper_inner">
    <div class="hot-departments clearfix">
      <div v-for="(elem,index) in departments" :key="index" class="department-item">
        <router-link :to="{ name: 'departInfo', params: { dId: elem.id}}">
          <div class="item-avater">
            <img :src="GET_IMG_URL(elem.icon,'u')" alt="">
          </div>
          <p class="dep-name">{{elem.name}}</p>
        </router-link>
      </div>
      <div v-if="loadingDeparts" v-for="n in 20" :key="n" class="department-item holder">
          <div class="item-avater">
            <img src="" alt="">
          </div>
          <p class="dep-name">&nbsp;</p>
      </div>
    </div>
  </div>
<!-- /page_container -->
  <!-- page_footer -->
  <div  slot="page_footer">
    <loading-page v-show='initing_page'></loading-page>
  </div>
</layout>
</template>
<script>
import Header from "@/components/header/Header";
import { commonMixin, toTopMixin} from "@/mixins";
import departService from "@/services/departService.js";
export default {
  name: "departs",
  mixins:[commonMixin,toTopMixin],
  data () {
    return {
      departments:[],
      loadingDeparts:true
    };
  },
  components:{
    mHeader:Header
  },
  created(){
    this.allDepartments();
  },
  computed:{},
  methods:{
    allDepartments(){
      let This=this;
      departService.allDepartments({
        parentId:0
      })
      .then((res)=>{
        This.loadingDeparts=false;
        if(res.code==0){
          This.departments=res.data;
        }
      })
      .catch(res=>{
        This.loadingDeparts=false;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
  @import './css.less';
</style>

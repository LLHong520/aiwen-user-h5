<template>
  <layout class="user-center" :curTabIndex="4" :tabbarSwitch="false">
      <!-- page_header -->
      <m-header slot="page_header" title='账号管理'>
        <span class="retrun" slot='left' @click="router_back">
         <b class="split"></b>
        </span>
        <span class="retrun" slot='right'>
        </span>
      </m-header>
      <!-- page_header -->
      <!-- page_container -->
      <div slot="page_container" class="app_wrapper_inner">
         <div class="majia_users" ref="message_scroll" v-if="majia_infos.hasMajias">
           <ul>
             <li
               v-for="(elem,index) in majia_infos.majia_users"
               :class="{'current':majia_infos.currentMajia==index}"
               :key="elem.index"
               @click="change_majia(index)">
               <div class="avater"><img v-lazy="GET_IMG_URL(elem.faceImage,'u')" :width="imgInfo.w"  :height="imgInfo.h" /></div>
               <div class="">
                 <p class="pb10">{{elem.nickName}}</p>
                 <p v-if="elem.memberType==2" class="c_999">主账号</p>
                 <p v-else-if="elem.memberType==3" class="c_999">{{elem.remark}}</p>
               </div>
             </li>
           </ul>
         </div>
         <noResult v-if="!loading&&!majia_infos.hasMajias" title="您当前还没有账号哇~"></noResult>
         <loading v-if='loading'></loading>
        </div>

      <!-- page_footer -->
      <div slot="page_footer">
        <!-- 页面加载 -->
        <loading-page v-show='initing_page' title="切换中..."></loading-page>
        <confirm :title="'切换至'" :text="change_to_avater_item.nickName" ref="change_confirm" @confirm="confirm_change_avater">
        </confirm>
        <to-top></to-top>
      </div>
      <!-- /page_footer -->
  </layout>
</template>
<script>
import storage from "good-storage";
import loadingHolder from "@/components/loading-holder/loading-holder";
import confirm from "@/iwen/confirm/confirm";
import Header from "@/components/header/Header";
import userService from "@/services/userService.js";
import noResult from "@/components/no-result/no-result";
import {toTopMixin,commonMixin} from "@/mixins";
export default {
  name: "my_avaters",
  mixins: [commonMixin,toTopMixin],
  data() {
    return {
      initing:false,
      loading:false,
      majia_infos:{
        hasMajias:false,//是否有马甲
        currentMajia:0,//当前选中马甲
        majia_users:[]
      },
      change_to_avater:0
    };
  },
  created() {
    let _this=this;
    setTimeout(function(){
      _this._init_page();
    },500);
    //计算图片宽高
    this.imgInfo={
      w:lib.flexible.rem2px(97/64),
      h:lib.flexible.rem2px(97/64)
    };
  },
  computed:{
    change_to_avater_item(){
      let item ={
        remark:"",
        nickName:""
      };
      if(this.majia_infos.majia_users.length>0){
        item=this.majia_infos.majia_users[this.change_to_avater];
      }
      return item;
    }
  },
  methods: {
    change_majia(index) {
      //清除公益咨询病情描述缓存
      if(storage.session.get("conditionStorage")){
        storage.session.remove("conditionStorage");
      };
      if(this.majia_infos.majia_users[index].bindFlag) return;
      this.change_to_avater = index;
      this.$refs.change_confirm.show();
    },
    confirm_change_avater() {
      // this.$store.commit('SET_TOKEN','6f1d60e4d632c98f7055314edfe904eb===');
      this.initing_page = true;
      let _this=this;
      let targetUserId=this.majia_infos.majia_users[_this.change_to_avater].id;
      userService.change_account({targetUserId:targetUserId}).then(res=>{
        if(res.code==0){
          _this.initing_page = false;
          _this.$toast.tip("切换成功");
          _this.$store.dispatch("update_userinfo");
          _this.$store.commit("USER_LOGIN",true);
          _this.majia_infos.currentMajia = _this.change_to_avater;
          _this.majia_infos.majia_users.map((item)=>{
            item.bindFlag=false;
          });
          _this.majia_infos.majia_users[_this.change_to_avater].bindFlag=true;
        }
      },()=>{
        _this.$toast.tip("切换失败，请稍后重试~");
        _this.initing_page = false;
      });
    },
    get_majias(){
      let This=this;
      This.loading = true;
      userService.get_majias({}).then((res)=>{
        This.loading = false;
        if(res.code==0&&res.data){
          This.majia_infos.majia_users= This.majia_infos.majia_users.concat(res.data);
          if(res.data.length>0) This.majia_infos.hasMajias=true;
          let currentMajia=res.data.filter(function(item,index){
            item.index=index;
            return item.bindFlag;
          });
          This.majia_infos.currentMajia=currentMajia[0].index;
        }
      },()=>{
        This.loading = false;
      });
    },
    _init_page(){
      let _this=this;
      this.initing = true;
      //判断是否是运营账号
      if(this.VX_isBindAccount){
        this.get_majias();
      }else {
        this.$toast.tip("您无权访问该页面");
        setTimeout(function(){
          _this.$router.go(-1);
        },1000);
      }
    }
  },
  components: {
    mHeader: Header,
    loadingHolder: loadingHolder,
    noResult,
    confirm
  }
};
</script>
<style  scoped lang="less" rel="stylesheet/less">
@import './css.less';
</style>

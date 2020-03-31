<template>
  <layout  class="user-center" :curTabIndex="4" :tabbarSwitch="false">
   <!-- page_header -->
   <!-- <m-header  slot="page_header" :title='userinfo.nickName'>
    <span class="retrun" slot='left' @click="router_back">
     <b class="split"></b>
    </span>
    <span class="retrun" slot='right'></span>
  </m-header> -->


    <!-- page_header -->
    <!-- page_container -->
    <div slot="page_container" class="app_wrapper_inner">
       <!-- 用户信息 -->
       <div class="user-info-wrapper">
         <conHeader :title='userinfo.nickName'>
           <span class="retrun" slot='left' @click="router_back">
             <b class="white"></b>
           </span>
           <span class="place_holder" slot='right'></span>
         </conHeader>
         <div class="user-info clearfix">
           <div class="avater">
             <router-link to="/u_integral">
               <img  :src="GET_IMG_URL(userinfo.faceImage,'u')" alt="用户头像" />
               <span class="lv">Lv.{{userinfo.level}}</span>
             </router-link>
           </div>
           <div class="other-wrapper">
             <div class="u-other clearfix">
               <span class="mr10"><i class="icon icon-sex mr10" :class="{'boy':userinfo.gender=='男'}"></i>{{userinfo.gender||"保密"}}</span>
               <span class="ml10"><i class="icon icon-local mr10"></i>{{userinfo.province||"无城市信息"}}{{userinfo.city}}</span>
               <router-link tag='span' class="ml10 integral_link" to="/u_integral">
                 <span class="score"><i class="icon icon-coin"></i>{{userinfo.credit}}积分</span>
               </router-link>
             </div>
           </div>
        </div>
       </div>
       <!-- /用户信息 -->
        <nav class="u-c-nav">
           <router-link  tag="div" class="nav-item" :to="{path:'/u/'+u_id}" exact>
             <div class="item_wrapper">
             <p class="num" v-text='userinfo.posts||0'>0</p>
             <p class="tabname">帖子</p>
             </div>
           </router-link>
           <router-link  tag="div" class="nav-item" :to="{path:'/u/'+u_id+'/moments'}" replace>
             <div class="item_wrapper">
             <p class="num" v-text='userinfo.circles||0'>0</p>
             <p class="tabname">圈子</p>
             </div>
           </router-link>
           <router-link  tag="div" class="nav-item" :to="{path:'/u/'+u_id+'/focus'}" replace>
             <div class="item_wrapper">
             <p class="num" v-text='userinfo.followUsers||0'>0</p>
             <p class="tabname">关注</p>
             </div>
           </router-link>
           <router-link  tag="div" class="nav-item" :to="{path:'/u/'+u_id+'/fans'}" replace>
             <div class="item_wrapper">
             <p class="num" v-text='userinfo.fansUsers||0'>0</p>
             <p class="tabname">粉丝</p>
             </div>
           </router-link>
        </nav>
          <!-- <keep-alive>   -->
          <router-view></router-view>
          <!-- </keep-alive>   -->
    </div>

    <!-- page_footer -->
    <div  slot="page_footer">
      <div class="fixed_bottom">
        <div @click="smsHim">
          私信TA
        </div>
        <div class="focus-btn" @click="focusHim" :class="{'disable':userinfo.isFollow==1}"  v-if="showFoucs">{{focusText}}</div>
      </div>
      <to-top></to-top>
      <!-- 关注发私信提示 -->
      <confirm
      ref="confirm"
      text="关注TA才能发送私信哦！"
      confirmBtnText="关注TA"
      cancelBtnText="取消"
      @confirm="confirm_focus_sms"
       ></confirm>
      <!-- /关注发私信提示 -->
    </div>
    <!-- /page_footer -->
  </layout>
</template>
<script>
  import {mapState} from "vuex";
  import confirm from "@/iwen/confirm/confirm";
  import Header from "@/components/header/Header";
  import conHeader from "@/components/con-header/con-header";
  import userService from "@/services/userService.js";
  import { toTopMixin , commonMixin} from "@/mixins";
  export default {
    name:"user_center",
    mixins: [toTopMixin, commonMixin],
    props:["u_id"],
    components:{
      conHeader:conHeader,
      mHeader:Header,
      confirm:confirm
    },
    data(){
      return {
        userinfo:{
          nickName:"...",
          gender:"...",
          province:"...",
          city:"...",
          faceImage:"",
          favorites:0,
          posts:0,
          circles:0,
          followUsers:0,
          fansUsers:0
        },
        toogle_memu:false,
        showFavours:false,
        showFoucs:false
      };
    },
    created(){
      let _this=this;
      _this._initPage();
    },
    methods:{
      _initPage(){
        this.getUserInfo();
      },
      getUserInfo(){
        var This=this;
        if(this.VX_userInfo.id==this.u_id){
          userService.myinfo({}).then(res=>{
            if(res.code==0){
              This.userinfo=res.data;
              This.$store.commit("SET_USERINFO", This.userinfo);
              if(This.userinfo.id== this.VX_userInfo.id){
                This.showFavours=true;
                This.showFoucs = false;
              }else{
                This.showFoucs=true;
                This.showFavours = false;
              }
            }
          });
        }else{
          userService.userinfo({ id:this.u_id}).then((res)=>{
            if(res.code==0){
              This.userinfo=res.data;
              if(This.userinfo.id== this.VX_userInfo.id){
                This.showFavours=true;
                This.showFoucs = false;
              }else{
                This.showFoucs=true;
                This.showFavours = false;
              }
            }
          });
        }
      },
      focusHim(){
        //是否编辑昵称
        if(!this.VX_isNickEdited){
          this.$router.push("/nike_name?refer="+this.$route.fullPath);
          return;
        }
        //是否绑定手机
        if(!this.VX_isBindMobile){
          this.$router.push("/bind_mobile?refer="+this.$route.fullPath);
          return;
        }
        let This=this;
        let action_name=this.userinfo.isFollow==1? "cancel_focus":"focus";
        userService[action_name]({ id:this.u_id}).then((res)=>{
          if(res.code==0){
            This.userinfo.isFollow =This.userinfo.isFollow==1? 0:1;
          }
        });
      },
      smsHim(){
        //是否编辑昵称
        if(!this.VX_isNickEdited){
          this.$router.push("/nike_name?refer="+this.$route.fullPath);
          return;
        }
        //是否绑定手机
        if(!this.VX_isBindMobile){
          this.$router.push("/bind_mobile?refer="+this.$route.fullPath);
          return;
        }
        //未关注用户且当前用户不是小助手则提示关注才能发私信
        if(this.userinfo.isFollow!=1&&!this.isHelper){
          this.$refs.confirm.show();
          return;
        }
        if(!this.isHelper){
          if(this.VX_userInfo.level<1){
            this.$toast.tip("您的等级小于1级，不能发送私信哦~");
            return;
          }
        }
        this.$router.push("/sms_info/"+this.userinfo.id);
      },
      confirm_focus_sms(){
        let This=this;
        userService.focus({ id:this.u_id}).then((res)=>{
          if(res.code==0){
            This.userinfo.isFollow =This.userinfo.isFollow==1? 0:1;
            This.$refs.confirm.hide();
            This.$router.push("/sms_info/"+This.userinfo.id);
          }
        });
      },
      do_toogle_memu(){
        this.toogle_memu=!this.toogle_memu;
      }
    },
    computed:{
      focusText(){
        return this.userinfo.isFollow==1? "已关注":"关注";
      },
      ...mapState(["smsNum"]),
      isHelper(){
        let _this=this;
        var helperIDs=this.VX_helperIDs;
        return helperIDs.some(item=>{
          return item==_this.u_id||item==_this.VX_userInfo.id;
        });
      }
    },
    watch:{
      "u_id":function(newVal){
        //如果要看的用户是当前登录用户 转到用户的个人中心
        if(newVal==this.VX_userInfo.id){
          this.$router.replace("/mine");
        }
        this.userinfo = {
          nickName:"...",
          gender:"...",
          province:"...",
          city:"...",
          faceImage:"",
          favorites:0,
          posts:0,
          circles:0,
          followUsers:0,
          fansUsers:0
        };
        this._initPage();
      }
    }
};
</script>
<style  scoped lang="less" rel="stylesheet/less">
@import './css.less';
</style>

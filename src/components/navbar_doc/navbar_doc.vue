<template>
  <div class="nav_container">
    <div class="nav_wrapper" v-show="isShowNav">
      <ul>
        <li  class="nav_btn">
          <router-link v-if="!isInSinaHealthApp && !isInIwenApp && !isInHapHealApp" class="toIndex" :to="{ name: 'homeIndex'}"><img src="./images/toolbar_btn_home@2x.png" width="30" height="30">首页</router-link>
          <a
          :iw="`{desc:'tab菜单-关注医生按钮',id:'followDocButton',ext:{doctorId:'${dId}'}}`"
          href="javascript:;" class="btn_gz" @click="gzFn"><img :src="isGz ? gzImg.selected : gzImg.normal"  width="30" height="30">{{isGz?"已关注":"关注"}}</a>
        </li>
        <li>
          <label :iw="`{desc:'tab菜单-科普知识按钮',id:'kepuZhishiButton',ext:{doctorId:'${dId}'}}`" for="" @click="changeMenu(1)"><em></em>科普知识</label>
          <div class="sub_menu  animated fadeInUp" v-show="this.activeIndex==1">
            <dl>
              <!-- <dd><router-link :to="{ name: 'docSelfDescription', params: { docId: dId}}">患者自述</router-link></dd> -->
              <dd :iw="`{desc:'tab菜单-诊间日记',id:'zhenjianRijiButton',ext:{doctorId:'${dId}'}}`">
                <router-link :to="{ name: 'docDiary', params: { docId: dId}}">诊间日记</router-link>
              </dd>
              <dd :iw="`{desc:'tab菜单-健康科普',id:'jiankangkepuButton',ext:{doctorId:'${dId}'}}`">
                <router-link :to="{ name: 'docScience', params: { docId: dId}}">健康科普</router-link>
              </dd>
              <dd :iw="`{desc:'tab菜单-病例分析',id:'binglifenxiButton',ext:{doctorId:'${dId}'}}`">
                <router-link :to="{ name: 'docIllCase', params: { docId: dId}}">病例分析</router-link>
              </dd>
              <dd :iw="`{desc:'tab菜单-科普视频',id:'kepushipinButton',ext:{doctorId:'${dId}'}}`">
                <router-link :to="{ name: 'docVideo', params: { docId: dId}}">科普视频</router-link>
              </dd>
            </dl>
          </div>
        </li>
        <li>
          <label  :iw="`{desc:'tab菜单-Ta的服务',id:'taSerivideButton',ext:{doctorId:'${dId}'}}`" for="" @click="changeMenu(2)"><em></em>Ta的服务</label>
          <div class="sub_menu animated fadeInUp" v-show="this.activeIndex==2">
            <dl>
              <template>
                <dd :iw="`{desc:'tab菜单-图文咨询',id:'tabTuwenZixunButton',ext:{doctorId:'${dId}'}}`" v-if="docInfo.advice">
                  <div v-if="!docInfo.nowsuspendService">
                    <a href="javascript:;" @click="toZixun" v-if="docInfo.qCaps>0">图文咨询</a>
                    <a href="javascript:;" @click="zxFn" v-else>图文咨询</a>
                  </div>
                  <div v-else>
                    <a href="javascript:;" @click="zxFn">图文咨询</a>
                  </div>
                </dd>
                <dd v-else><a href="javascript:;"  @click="zxFn">图文咨询</a></dd>
              </template>
              <dd :iw="`{desc:'tab菜单-门诊预约',id:'tabMenzhenyuyueButton',ext:{doctorId:'${dId}'}}`">
                <a :href="OUTER_LINKS.docOrder+docInfo.id" v-if="docInfo.register==1">门诊预约</a>
                <a href="javascript:;" v-else @click="yyFn">门诊预约</a>
              </dd>
            </dl>
          </div>
        </li>
        <li>
          <label :iw="`{desc:'tab菜单-Ta的足迹',id:'tabTaZujiButton',ext:{doctorId:'${dId}'}}`" for="" @click="changeMenu(3)"><em></em>Ta的足迹</label>
          <div class="sub_menu animated fadeInUp" v-show="this.activeIndex==3">
            <dl>
              <dd :iw="`{desc:'tab菜单-Ta的活动',id:'tabTaHuodongButton',ext:{doctorId:'${dId}'}}`" >
                <router-link :to="{ name: 'docActivity', params: { docId: dId}}">Ta的活动</router-link>
              </dd>
              <!-- <dd><router-link :to="{ name: 'docMoments', params: { docId: dId}}">Ta的社区</router-link></dd> -->
            </dl>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {OUTER_LINKS} from "@/config";
import platformLogin from "@/common/platformFn";
import { mapGetters } from "vuex";
import doctorService from "@/services/doctorService.js";
export default {
  name: "navBar",
  props:{
    isShowNav:{
      type: Boolean,
      default: true,
    }
  },
  data(){
    return {
      gzImg:{normal: require("./images/toolbar_btn_follow@2x.png"), selected: require("./images/btn_share_wht@2x.png")},
      isGz:false,
      activeIndex:-1,
      dId:"",
      docInfo:{},
      OUTER_LINKS,
    };
  },
  computed: {
    ...mapGetters({
      isInSinaHealthApp:"isInSinaHealthApp",
      isInIwenApp:"isInIwenApp",
      isInHapHealApp:"isInHapHealApp",
      VX_isSinaHealthAppForceIng:"isSinaHealthAppForceIng",
      islogin:"islogin",
    })
  },
  created(){
    this.dId=this.$route.params.dId;
    this.getDocinfo();
  },
  methods: {
    gzFn(){
      let This=this;
      if(This.isGz){
        doctorService.delMyDoctor({id:This.dId}).then((res)=>{
          if(res.code==0){
            console.log("取消关注成功");
            This.isGz=false;
          }
        });
      }else{
        doctorService.addAsMyDoctor({docId:This.dId}).then((res)=>{
          if(res.code==0){
            console.log("关注成功");
            This.isGz=true;
          }
        });
      }
    },
    getDocinfo(){
      let This=this;
      doctorService.doc_info({docId:This.dId})
      .then(res=>{
        if(res.code==0&&res.data){
          This.isGz=res.data.relation;
          This.docInfo=res.data;
          console.log(This.docInfo.advice);
        }
      });
    },
    changeMenu(index){

      if(this.activeIndex==index){
        this.activeIndex=-1;
      }else{
        this.activeIndex=index;
      }
    },
    toZixun(){
      // if(this.VX_isSinaHealthAppForceIng && this.docInfo.qPrice > 0) {
      //   this.$toast.tip("图文咨询服务未开通");
      //   return;
      // };

      if(!this.islogin){
        if(this.isInSinaHealthApp)
        {
          iwenJSNativeBridge.appLogin();
        }else{
          platformLogin(this.$route.fullPath);
        }
        return;
      }
      window.location.href = this.OUTER_LINKS.docConsult+this.docInfo.id+"&bizType=NOR";
    },
    zxFn(){
      let This=this;
      // if(this.VX_isSinaHealthAppForceIng && this.docInfo.qPrice > 0) {
      //   this.$toast.tip("图文咨询服务未开通");
      //   return;
      // };

      if(!This.docInfo.advice){
        This.$toast.tip("图文咨询服务未开通");
      }else{
        if(!this.docInfo.nowsuspendService){
          if(!this.docInfo.qCaps>0){
            This.$toast.tip("今日无名额");
          }
        }else{
          This.$toast.tip("暂停服务");
        }
      }
    },
    yyFn(){
      let This=this;
      This.$toast.tip("门诊预约服务未开通");
    }
  },
  components:{},
  mounted(){
    $("#wrapper__inner").append("<div id='navBar-shim' style='height:55px'></div>");
  },
  destoryed(){
    $("#navBar-shim").remove();
  }
};
</script>

<style lang="less" scoped>
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
@import "@{assets}/css/animate.less";

.nav_wrapper{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 47px;
  box-sizing: border-box;
  border-top:1px solid #EFEFEF;
  border-bottom:1px solid #EFEFEF;
  background-color: #fff;
  z-index: 1;
  padding-bottom: env(safe-area-inset-bottom);
  >ul{
    display: flex;
    > li{
      flex: 1;
      position: relative;
      text-align: center;
      font-size: 12px;
      color: #2D2D2D;
      position: relative;
      border-right: 1px solid #EFEFEF;
      background-color: #fff;
      .toIndex,.btn_gz{
        flex: 1;
        text-align: center;
        line-height: 10px;
        font-size: 16/@r;
        white-space: nowrap;
        img{
          display: block;
          margin: 0 auto;
        }
      }
      label{
        display: block;
        height: 46px;
        line-height: 46px;
        text-align: center;
        background-color: #fff;
        position: relative;
        z-index: 2;
      }
      em{
        display: inline-block;
        width: 4px;
        height: 7px;
        background: url(./images/toolbar_btn_more@2x.png) no-repeat;
        background-size: cover;
        vertical-align: middle;
        margin-right: 7px;
      }
      .sub_menu{
        position: absolute;
        width: 94%;
        box-sizing: border-box;
        left: 3%;
        bottom:50px;
        background:rgba(246,248,251,1);
        border:1px solid rgba(0,85,157,.02);
        box-shadow: 0 0 8px rgba(0,85,157,.12);
        border-radius: 3px;
        -webkit-animation-duration: .4s;
        animation-duration: .4s;
        z-index: 1;
        dd{
          text-align: center;
          line-height: 42px;
          border-bottom: 1px solid #EFEFEF;
        }
      }
    }
    li.nav_btn{
      display: flex;
      padding: 0 5px;
    }
    li:last-child{
      border:0;
    }
  }
}
</style>

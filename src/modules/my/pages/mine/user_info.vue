<template>
  <layout :tabbarSwitch="true" :curTabIndex="4" class="user-center">
    <!-- page_header -->
    <!-- <m-header  slot="page_header"  :title='userinfo.nickName'>
     <span class="place_holder" slot='right'></span>
   </m-header> -->
    <!-- page_header -->
    <!-- page_container -->
    <div slot="page_container" class="app_wrapper_inner">
      <!-- 用户信息 -->
      <div class="user-info-wrapper">
        <div class="user-info clearfix">
          <div class="avater">
            <a href="javascript:;">
              <img :src="GET_IMG_URL(userinfo.photoPicURL,'u')" alt="用户头像" />
            </a>
            <router-link tag='span' class=" integral_link" to="/u_integral">
              <!-- <span class="lv">Lv.{{userinfo.level}}</span> -->
            </router-link>
          </div>
          <div class="nick-name">
            {{userinfo.nickName}}
            <!-- <a :href="MY_LINKS.editUserInfo">
             <b><img src="./images/icon-bianj@3x.png"></b>
           </a> -->
          </div>
          <div class="other-wrapper">
            <div class="u-other clearfix">
              <span class="mr10">
                <i class="icon icon-sex mr10" :class="{'boy':userinfo.gender=='M'}"></i>{{userinfo.gender=="M" ? "男":"女"}}
              </span>
              <span class="ml10">
                <i class="icon icon-local mr10"></i>{{userinfo.province||"无城市信息"}}{{userinfo.city}}
              </span>
              <!-- <router-link tag='span' class="ml10 integral_link" to="/u_integral">
                 <span class="score"><i class="icon icon-coin"></i>{{userinfo.credit}}积分</span>
               </router-link> -->
            </div>
          </div>
        </div>
      </div>
      <!-- /用户信息 -->
      <!-- links -->
      <ul class="me_list2">
        <li>
          <a :href="MY_LINKS.editUserInfo">
            <span><em class="edit"></em>编辑个人信息</span><b></b>
            <!-- <span><em class="doc"></em>我的医生<i>(0)</i></span><b></b> -->
          </a>
        </li>
        <li>
          <router-link :to="{ name: 'MyMessage'}">
            <span><em class="message"></em>我的消息</span>
            <i v-if="messageNum > 0" class="bread">{{messageNum}}</i>
            <b></b>
          </router-link>
        </li>
        <li>
          <router-link to="/my/favours">
            <span><em class="col"></em>我的收藏</span><b></b>
          </router-link>
        </li>
        <li>
          <a :href="MY_LINKS.doctor">
            <span><em class="doc"></em>我的医生</span><b></b>
            <!-- <span><em class="doc"></em>我的医生<i>(0)</i></span><b></b> -->
          </a>
        </li>
        <li>
          <a :href="MY_LINKS.service">
            <span><em class="service"></em>我的服务</span><b></b>
          </a>
        </li>
        <li>
          <router-link to="/my/course">
            <span><em class="sub"></em>我的课堂</span><b></b>
          </router-link>
        </li>
        <li>
          <router-link to="/my/subscribe">
            <span><em class="scribe"></em>我的关注</span><b></b>
          </router-link>
        </li>
        <!-- <li>
              <router-link to="/my/activity">
                <span><em class="service"></em>我的活动</span><b></b>
              </router-link>
            </li> -->
        <!-- <li><a href="/personal/subscribe"><span><em class="sub"></em>我的订阅</span><b></b></a></li> -->
        <li v-if="VX_isBindAccount">
          <router-link to="/u_avaters">
            <span><em class="account"></em>账号管理</span><b></b>
          </router-link>
        </li>
        <li><a href="https://health.sina.cn/eye/assessCode.html"><span><em class="record"></em>评估记录</span><b></b></a>
        </li>
        <!-- <li><a href="/personal/about"><span><em class="about"></em>关于</span><b></b></a></li> -->
        <li>
          <a :href="MY_LINKS.feedback">
            <span><em class="feedback"></em>反馈</span><b></b>
          </a>
        </li>
        <li>
          <router-link :to="{name:'rules'}">
            <span><em class="xieyi"></em>用户协议</span><b></b>
          </router-link>
        </li>
        <li>
          <router-link to="/agreement/patient">
            <span><em class="privaterule"></em>隐私协议</span><b></b>
          </router-link>
        </li>
      </ul>
      <!-- /links -->
      <div v-if="!isWeibo" class="download-app">
        <a :href="MY_LINKS.download">我是医生</a>
      </div>
    </div>

    <!-- page_footer -->
    <div slot="page_footer"></div>
    <!-- /page_footer -->
  </layout>
</template>
<script>
  import {
    mapState
  } from "vuex";
  import {
    MY_LINKS
  } from "@/config";
  import confirm from "@/iwen/confirm/confirm";
  import Header from "@/components/header/Header";
  import userService from "@/services/userService.js";
  import {
    toTopMixin,
    commonMixin
  } from "@/mixins";
  export default {
    name: "user_center",
    mixins: [toTopMixin, commonMixin],
    props: ["u_id"],
    data() {
      return {
        isWeibo: platformInfo.isWeibo,
        userinfo: {
          nickName: "...",
          gender: "...",
          province: "...",
          city: "...",
          faceImage: "",
          favorites: 0,
          posts: 0,
          circles: 0,
          followUsers: 0,
          fansUsers: 0
        },
        toogle_memu: false,
        MY_LINKS,
      };
    },
    created() {
      let _this = this;
      _this._initPage();
    },
    methods: {
      _initPage() {
        this.getUserInfo();
      },
      getUserInfo() {
        var This = this;
        userService.myinfo({}).then(res => {
          if (res.code == 0) {
            This.userinfo = res.data;
            This.$store.commit("SET_USERINFO", This.userinfo);
          }
        });
      },
      do_toogle_memu() {
        this.toogle_memu = !this.toogle_memu;
      }
    },
    components: {
      mHeader: Header,
      confirm: confirm
    },
    computed: {
      ...mapState(["smsNum", "messageNum"])
    },
    watch: {
      "u_id": function () {
        if (this.showFavours) {
          this.showFavours = false;
        }
        this.userinfo = {
          nickName: "...",
          gender: "...",
          province: "...",
          city: "...",
          faceImage: "",
          favorites: 0,
          posts: 0,
          circles: 0,
          followUsers: 0,
          fansUsers: 0
        };
        this._initPage();
      }
    }
  };

</script>
<style scoped lang="less" rel="stylesheet/less">
  @import './css.less';

</style>

<template>
<div>
  <!-- 标题导航 -->
<transition name='slide'>
<nav class="header_menu" v-show="showMenu" @click="toggle()" ref="nav">
  <div class="mineHome">
  	<div class="mine-home-content">
  	  <img class="min-home-head" :src="GET_IMG_URL(userinfo.photoPicURL,'u')" alt="用户头像" />
      <div class="min-home-info">
        <p>{{userinfo.nickName}}</p>
        <div class="info-describe">
          <!-- <router-link to="/u_integral"> -->
            <div @click="path">
           <span class="integral"><i class="icon-coin"></i>{{userinfo.credit}}积分</span>
           <span class="gade">Lv.{{userinfo.level}}</span></div>
         <!-- </router-link> -->
          </div>
      </div>
  	</div>
  </div>
  <ul class="menu-list">
  	<router-link tag='li' to="/home/focus">
  		<i class="icon icon_focus"></i>我的关注
  	</router-link>
  	<router-link tag='li' to="/home">
  		<i class="icon icon_hot"></i>热门
  	</router-link>
  	<router-link tag='li' to="/home/guang">
  		<i class="icon icon_guang"></i>逛圈
  	</router-link>
  	<li @click="toUserCenter()">
  		<i class="icon icon_home"></i>我的主页
  	</li>
  	<router-link tag='li' to="/u_msg">
  		<i class="icon icon_news"></i>我的消息<span v-show="messageNum>0" class="msg_num">{{messageNum>99?"99+":messageNum}}</span>
  	</router-link>
    <router-link tag='li' to="/my/sms">
      <i class="icon icon_smes"></i>我的私信<span v-show="smsNum>0" class="msg_num">{{smsNum>99?"99+":smsNum}}</span>
    </router-link>
    <router-link tag='li' to="/my/activity">
      <i class="icon icon_star"></i>我的活动
    </router-link>
  	<router-link tag='li' v-if="VX_isBindAccount" to="/u_avaters">
  		<i class="icon icon_moment"></i>账号管理
  	</router-link>
  </ul>
</nav>
</transition>
<transition enter-active-class='animated fadeIn'  leave-active-class='animated fadeOut' mode='out-in' v-if='show'>
  <div class="modal" @click='toggle()'></div>
</transition>
<!-- /标题导航 -->
</div>
</template>

<script>
import {commonMixin} from "@/mixins";
import {mapState} from "vuex";

export default {
  name: "header_memu",
  props:["show"],
  mixins:[commonMixin],
  data () {
    return {
      showMenu:false
    };
  },
  watch:{
    show(){
      let This=this;
      // setTimeout(function(){
      This.showMenu=This.show;
      // },100)
    }
  },
  created(){},
  methods:{
    toggle(){
      this.$emit("update:show", false);
    },
    path(){
      this.$router.push("/u_integral");
    },
    toUserCenter(){
      if(!this.VX_islogin){
        this.goLogin(this.$route.fullPath);
      }else{
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
        this.$router.push("/u/"+ this.VX_userInfo.id);
      }
    }
  },
  computed:{
    userinfo(){
      if(this.VX_islogin){
        return this.VX_userInfo;
      }else{
        return {
          faceImage:"",
          nickName:"",
          credit:0,
          level:0
        };
      }
    },
    ...mapState(["messageNum","smsNum"]),
  },
  mounted(){
    let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.$refs.nav.style.height = h +"px";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'  rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
/**标题右侧 点击显示导航蓝鸟**/
.modal{
  position:fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-color: rgba(0,0,0,0.4);
  z-index:93;
}
.header_menu{
  position: fixed;
  top: 0px;
  right: 0px;
  border-bottom: none;
  z-index: 999;
  width: 450/@r;
  min-height:600/@r;
  .font_xl;
  .box-sizeing(border-box);
  background-color:#fff;
  .transform-origin(top right);
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
 }
.mineHome{
	width:100%;
	height:350/@r;
	background:url('../../assets/images/default/bgpic@2x.png') no-repeat center;
	.background-size(100% auto);
	.flexbox(@dir:column, @justifycontent:center);

	.mine-home-content{
    height:128/@r;
	  position:relative;
	  padding:0 15px 0 20px;
	  .min-home-head{
	    width:128/@r;
	    height:128/@r;
  	    border-radius:50%;
  	    display:line-block;
  	    margin-right:15/@r;
	  }
	  .min-home-info{
	  	float:right;
	  	width:60%;
	  	padding:10px 0;
	  	p{
	  	  .font_4xl;
	  	  color: #444444;
	  	  white-space: nowrap;
	  	  -o-text-overflow: ellipsis;
	  	  text-overflow: ellipsis;
	  	  overflow: hidden;
	  	}
	  	.info-describe{
	  		margin-top:10px;
	  		span{
	  		  .font_l;
	  		  display:inline-block;
	  		}
	  		.integral{
	  		  color: #555555;
	  		  .icon-coin{
	  		  	display: inline-block;
	  		  	background:url('../../assets/images/icon-coin@3x.png') no-repeat;
	  		  	.background-size(30/@r auto);
	  		  	width: 30/@r;
	  		  	height: 30/@r;
	  		  	margin-right:5px;
	  		  	vertical-align: baseline;
	  		  	position: relative;
	  		  	top: 4px;
	  		  }
	  		}
	  		.gade{
	  			color: #569976;
	  			border:1px solid #579877;
	  			padding:0 10/@r;
	  			text-align:center;
	  			.border-radius(27px);
	  			margin-left:10px;
	  		}
	  	}
	  }
	}
}
.menu-list{
  padding:0 70/@r;

  .msg_num{
    margin-left: 10px;
    background-color: #F5A623;
    color: #fff;
    display: inline-block;
    padding: 0px 10px;
    .border-radius(10px);
    .font_3xl;
    vertical-align: center;
    position: relative;
  }
  li{
    line-height: normal;
    width:100%;
    padding: 15px 0 10px 0;
    color: #555;
    .flexbox();
    .align-items(center);
    text-align: left;
    .font_4xl;
    .box-sizeing(border-box);
    &:last-child{
      border-bottom: none;
    }
    .icon{
    	width:34/@r;
    	height:42/@r;
    	vertical-align: baseline;
    	position: relative;
    	margin-right:12/@r;
    }
    .icon_focus{
      background:url('images/icon-concern@2x.png') no-repeat center;
	  .background-size(100% auto);
    }
    .icon_hot{
      background:url('images/icon-hot@2x.png') no-repeat center;
	  .background-size(100% auto);
    }
    .icon_guang{
      background:url('images/icon-guangquan@2x.png') no-repeat center;
	  .background-size(100% auto);
    }
    .icon_home{
      background:url('images/icon-person@2x.png') no-repeat center;
	  .background-size(100% auto);
    }
    .icon_news{
      background:url('images/icon-mes@2x.png') no-repeat center;
	  .background-size(100% auto);
    }
    .icon_moment{
      background:url('images/icon-person@2x.png') no-repeat center;
	  .background-size(100% auto);
    }
    .icon_smes{
      background:url('images/icon-smes@2x.png') no-repeat center;
    .background-size(100% auto);
    }
    .icon_star{
      background:url('images/icon-star@2x.png') no-repeat center;
    .background-size(100% auto);
    }
  }
}


&.slide-enter-active{
  .animation(slide-right 0.5s);
  .transform-origin(left right);
}
.keyframes(slide-right,{
  0%
    {
      .transform(translateX(100%))
    }
  100%
    {
      .transform(translateX(0))
    }
});


@media screen and(min-device-width:760px){
  .header_menu{
    li{
      margin-left: 0px
    }
  }
}
</style>

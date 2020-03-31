<template>
  <div class="d-box">
    <a :href="`${COMTY_BASE_URL}${hospital.id}`" class="list-item">
      <div class="content">
        <div class="title isTop">
          <span class="name">{{ hospital.comtyName }}</span>
        </div>  
        <div class="score">
          <div class="rate_con"><rate v-model="hospital.doctorScore"></rate></div><span v-if="hospital.appointmentCount>0">{{hospital.appointmentCount||0}}次预约</span>
        </div>
        <div class="info">
          <div class="left">
            <span class="info-item">{{ hospital.address }}</span>
          </div>
          <!-- <span class="right">{{ hospital.distance | filtersDistance }}</span> -->
        </div>
      </div>
    </a>
    <a :href="`${COMTY_BASE_URL}${hospital.id}`" class="link_block">
      <div v-if="hospital.introductImages && hospital.introductImages.length >= 3"  class="introductImages2 introductImages3">
        <div class="introductImages_con">
          <div class="base_img"></div>
          <div class="image_cut_con" :style="{'background-image':'url('+hospital.introductImages[0].url+')'}">
            <!-- <img v-if="hospital.introductImages[0].url" v-lazy="hospital.introductImages[0].url">
            <img v-else :src="defaultImg">  -->
          </div>
        </div>
        <div class="introductImages_con" >
          <div class="base_img"></div>
          <div class="image_cut_con" :style="{'background-image':'url('+hospital.introductImages[1].url+')'}">
            <!-- <img v-if="hospital.introductImages[1].url" v-lazy="hospital.introductImages[1].url">
            <img v-else :src="defaultImg">  -->
          </div>
        </div>
        <div class="introductImages_con" >
          <div class="base_img"></div>
          <div class="image_cut_con" :style="{'background-image':'url('+hospital.introductImages[2].url+')'}" >
            <!-- <img v-if="hospital.introductImages[2].url" v-lazy="hospital.introductImages[2].url">
            <img v-else :src="defaultImg">  -->
          </div>
        </div>
      </div>
      <div v-if="hospital.introductImages && hospital.introductImages.length == 2"  class="introductImages2">
        <div class="introductImages_con">
          <div class="base_img"></div>
          <div class="image_cut_con" :style="{'background-image':'url('+hospital.introductImages[0].url+')'}">
            <!-- <img v-if="hospital.introductImages[0].url" v-lazy="hospital.introductImages[0].url">
            <img v-else :src="defaultImg">  -->
          </div>
        </div>
        <div class="introductImages_con" >
          <div class="base_img"></div>
          <div class="image_cut_con" :style="{'background-image':'url('+hospital.introductImages[1].url+')'}">
            <!-- <img v-if="hospital.introductImages[1].url" v-lazy="hospital.introductImages[1].url">
            <img v-else :src="defaultImg">  -->
          </div>
        </div>
      </div>
      <div v-if="hospital.introductImages && hospital.introductImages.length == 1" class="introductImages1">
        <div class="introductImages_con" >
          <!-- <img v-if="hospital.introductImages[0].url" v-lazy="hospital.introductImages[0].url">
          <img v-else :src="defaultImg"> -->
          <div class="base_img"></div>
          <div class="image_cut_con" :style="{'background-image':'url('+hospital.introductImages[0].url+')'}">
            <!-- <img v-if="hospital.introductImages[1].url" v-lazy="hospital.introductImages[1].url">
            <img v-else :src="defaultImg">  -->
          </div>
        </div>
      </div>
    </a>
    <div class="doc_con" v-if="hospital.doctorCount>0">
      <div class="doc_inner" >
        <div class="doctor" v-for="(doc,docidx) in hospital.doctorList.slice(0,2)" :key="docidx">
          <div class="img"><img v-lazy="GET_IMG_URL(doc.headPicUrl,'doc')" alt=""></div>
          <a class="toMore info" @click="doctorLink(doc, hospital.id)">  
            <span class="customerName">{{doc.customerName}}</span>
            <span class="depName">{{doc.depName}}</span>
            <span class="title">{{doc.title}}</span>
          </a>
        </div>
      </div>
      <div class="go_doctor_list" v-if="hospital.doctorCount>2">
        <a :href="`${COMTY_URL}doctors?comtyId=${hospital.id}`" class="toMore"> <span>查看全部{{ hospital.doctorCount }}名医生</span></a>
      </div>
    </div>
  </div>
</template>

<script >
import { commonMixin, toTopMixin} from "@/mixins";
import {COMTY_BASE_URL,COMTY_URL} from "@/config";
import rate from "@/components/rate";
export default {
  name: "hospitalCell",
  mixins:[commonMixin,toTopMixin],
  components: {
    rate
  },
  data(){
    return {
      channelId:"",
      channelName:"",
      COMTY_BASE_URL,
      COMTY_URL,
    };
  },
  props:{
    hospital:{
      type:Object,
      default:()=>{
        return {};
      }
    },
    cName:{
      type:String,
      default:""
    }
  },
  created() {
    this.channelId=this.$route.params.id;
    this.channelName=this.$route.query.channelName||this.cName;
  },
  methods:{
    doctorLink(item, id) {
      if (item.customerSource && item.customerSource == "famousDoctorOnline") {
        return;
      }
      window.location.href=`${COMTY_URL}doctors/${ item.customerId }?comtyId=${id}`;
    },
  }
};
</script>
<style lang="less" scoped>
  @assets:"~@/assets";
  @import "@{assets}/css/flex.less";
  @import "@{assets}/css/fix.less";
  @p: 15*2/@r;
  @color: #2d2d2d;
  @borderColor: #efefef;
  @filterH: 40*2/@r;
  @color3: #282828;
  @color6: #666;
  @color9: #999;
  @borderC: #E6E6E6;
  @active: #2688FC;
  @borderC-light: #EFEFEF;

  .text-overFlow-single {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .text-overFlow(@n: 2) {
    display: -webkit-box;
    /* autoprefixer: ignore next */
    -webkit-box-orient: vertical;
    -webkit-line-clamp: @n;
    overflow: hidden;
    text-overflow: ellipsis;
  }

.d-box {
  margin-bottom: 24/@r ;
  border-radius: 5*2/@r;
  background-color: #F6F8FB;

  .top {
    position: absolute;
    top: 0;
    right: 0;
    padding-right: 5*2/@r;
    width: 40*2/@r;
    height: 25*2/@r;
    line-height: 23*2/@r;
    color: #fff;
    background: url(images/list_tag_bg@2x.png) no-repeat;
    background-size: 100%;
    text-align: right;
    font-size: 12*2/@r;
  }
  .introductImages1{
    padding:0 12*2/@r 12*2/@r;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    flex: 1;
    overflow: hidden;
    
    .introductImages_con{
      position: relative;
      display: inline-block;   
      border: 1*2/@r solid #f3f3f3;
      width: 100%;
      overflow: hidden;
      .base_img{
        position: absolute;
        z-index: 0;
        height:0;
        padding-bottom:40%; 
        width: 100%;
        background-color: rgba(232,236,239,1);
        background-repeat: no-repeat;
        background-position:center;
        background-size: 50%;
        border: 1*2/@r solid #f3f3f3;
        background-image: url(images/img_loading.png);
        border-radius:2*2/@r;
      }
      .image_cut_con{
        position: relative;
        border-radius:2*2/@r;
        width: 100%;
        box-sizing: border-box;
        border: 1*2/@r solid #f3f3f3;
        height:0;
        background-repeat: no-repeat;
        background-size: cover;
        background-position:center;
        padding-bottom:40%; 
      }

    }

  }
  .introductImages3{
    .introductImages_con{
      &:nth-child(2){
        margin-right:3*2/@r;
      }
    }
  }
  .introductImages2{
    padding:0 12*2/@r 12*2/@r;
    display: flex;
    .introductImages_con{
      position: relative;
      display: inline-block;
      flex: 1;
      overflow: hidden;
      .base_img{
        position: absolute;
        z-index: 0;
        height:0;
        padding-bottom:62.5%; 
        width: 100%;
        background-color: rgba(232,236,239,1);
        background-repeat: no-repeat;
        background-position:center;
        background-size: 50%;
        border: 1*2/@r solid #f3f3f3;
        background-image: url(images/img_loading.png);
        border-radius:2*2/@r;
      }
      &:nth-child(1){
        // padding-right: 2*2/@r;
          margin-right:3*2/@r;
      }
      .image_cut_con{
        position: relative;
        border-radius:2*2/@r;
        width: 100%;
        box-sizing: border-box;
        border: 1*2/@r solid #f3f3f3;
        height:0;
        background-repeat: no-repeat;
        background-size: cover;
        background-position:center;
        padding-bottom:62.5%; 
      }
    }
  }
  .doc_con{
    padding:0 12*2/@r 12*2/@r;
    .doc_inner{
      border-top: 1*2/@r solid #EFEFEF;
      line-height: 45*2/@r;
      .doctor{
        display: flex;
        .toMore{
          background: url(images/btn_enter@2x.png) no-repeat center center;
          background-size: 16*2/@r 16*2/@r;
          background-position: 100%;
        }
        .info{

          font-size:12*2/@r;
          color:#282828;
          flex: 1;
          span{
            margin-right: 10*2/@r
          }
          .customerName{
            font-weight: bold;
          }
          .depName{
            font-size:10*2/@r;
          }
          .title{
            font-size:10*2/@r;
          }
        }
      }
      
    }
    .go_doctor_list{
      text-align: center;
      padding-top:12*2/@r; 
      border-top: 1*2/@r solid #EFEFEF;
      font-size: 12*2/@r;
      .toMore{
        background: url(images/btn_enter@2x.png) no-repeat center center;
        padding-bottom: 2*2/@r;
        background-size: 18*2/@r 18*2/@r;
        background-position: 100%;
        padding-right:24*2/@r; 
        color:#999999;
        vertical-align: top;
      }
    }
  }
}
.link_block{
  display:block;
}
.list-item {
  display: flex;
  padding: 12*2/@r;
  color: @color3;

  .img {
    position: relative;
    flex: none;
    width: 48*2/@r;
    height: 48*2/@r;

    .identification {
      position: relative;
      display: inline-block;
      flex: none;
      width: 54*2/@r;
      height: 16*2/@r;
      background: url(images/list_tag_vip@2x.png) no-repeat;
      background-size: 100%;
      left: -5*2/@r;
      top: -6*2/@r;
    }

    img {
      border-radius: 50%;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
  }

  .content {
    flex: 1;
    .title {
      display: flex;
      align-items: center;
      font-size: 16*2/@r;
      font-weight: bold;

      &.isTop {
        padding-right: 35*2/@r;
      }

      span {
        &.name {
          padding-right: @p/2;

          // .text-overFlow(1);
          label {
            font-size: 12*2/@r;
            font-weight: normal;
            color: @color6;
          }
        }
      }
    }
    .score{
      margin-top:7*2/@r;
      .rate_con{
        display: inline-block;
        width: 90*2/@r;
        vertical-align: text-bottom;
      }
      font-size: 10*2/@r;
      color:rgba(153,153,153,1);
      line-height: 1;
    }
    .label {
      .text-overFlow(1);
      margin-top: 5*2/@r;

      label {
        .text-overFlow-single();
        display: inline-flex;
        padding: 1*2/@r 4*2/@r;
        color: @color9;
        font-size: 12*2/@r;
        line-height: normal;
        border: 1*2/@r solid @borderC;
        border-radius: 1*2/@r;

        &.active {
          color: @active;
          border: 1*2/@r solid @active;
        }

        +label {
          margin-left: 5*2/@r;
        }
      }
    }

    .info {
      display: flex;
      align-items: flex-start;
      margin-top: 7*2/@r;
      color: @color9;
      font-size: 20/@r;
      line-height: normal;

      .left {
        flex: 1;
        display: flex;
        align-items: center;
        width: 0;
        .info-item {
          flex: initial;
          // .text-overFlow(1);
          // .show_n_lines(1);
          line-height: 28/@r;
          font-size: 20/@r;
        }

        em {
          margin-right: 2*2/@r;
        }
      }

      .right {
        flex: none;
        color: @color9;
        text-align: right;
      }
    }
  }
  
}

.list-item-doctor {
  padding: @p @p 20*2/@r @p;
}
.doc_con{
  .img {
    width: 24*2/@r;
    height: 24*2/@r;
    background-color: #f2f2f2;
    border: 1*2/@r solid #f3f3f3;
    border-radius: 22*2/@r;
    margin-right: 10*2/@r;
    margin-top: 12*2/@r;
  }
  .img img {
    display: block;
    width: 22*2/@r;
    height: 22*2/@r;
    border-radius: 22*2/@r;
  }
}
 </style>
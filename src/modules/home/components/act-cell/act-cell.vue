<template>
  <div class="new-act">
    <div class="act-info" v-if="actInfo.activityType==0">
      <a :href="CW_ACT+actInfo.id">
        <div class="act-name">{{actInfo.title}}</div>
        <div class="ac-banner-wrapper">
          <span class="status-text starting" v-if="actInfo.activityStatus==0">进行中</span>
          <span class="status-text nostart" v-if="actInfo.activityStatus==1">未开始</span>
          <span class="status-text end" v-if="actInfo.activityStatus==2">已结束</span>
          <img :src="GET_IMG_URL(actInfo.image,'b')" alt=""/>
          <div class="time-info">
            <p class="time">活动时间：{{actInfo.startTime}}</p>
            <p v-if="actInfo.activityStatus==0" class="member-text">{{actInfo.enrolment}}人正在参与</p>
            <p v-if="actInfo.activityStatus==1" class="member-text">{{actInfo.enrolment}}人已预定</p>
            <p v-if="actInfo.activityStatus==2" class="member-text">{{actInfo.enrolment}}人已参加</p>
          </div>
        </div>
      </a>
    </div>
    <div class="act-info fangtan" v-else>
      <a :href="OUTER_LINKS.weiTalkDetail+actInfo.id">
        <div class="act-name">{{actInfo.title}}</div>
        <div class="ac-banner-wrapper">
          <span class="status-text starting" v-if="actInfo.activityStatus==0">进行中</span>
          <span class="status-text nostart" v-if="actInfo.activityStatus==1">可提问</span>
          <span class="status-text end" v-if="actInfo.activityStatus==2">已结束</span>
          <img :src="GET_IMG_URL(actInfo.image,'b')" alt=""/>
          <div class="time-info">
            <p class="time">嘉宾解答时间：{{actInfo.startTime}}--{{actInfo.endTime}}</p>
          </div>
        </div>
        <div class="invest-list">
          <p class="invest-label">本期嘉宾：</p>
          <ul class="invest-info">
            <li
            v-for="(elem,index) in actInfo.invitedGuest" :key="index">
            {{elem.name}} <span>{{elem.departments}}</span> <span>{{elem.medicalInstitutions}}</span>
            </li>
          </ul>

        </div>
      </a>
    </div>
  </div>
</template>

<script >
import { commonMixin, toTopMixin} from "@/mixins";
import {CW_ACT} from "@/config";
export default {
  name: "act-cell",
  mixins:[commonMixin,toTopMixin],
  data(){
    return {
      CW_ACT
    };
  },
  props:{
    actInfo:{
      type:Object,
      default:()=>{
        return {};
      }
    }
  }
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
//最新活动
.new-act{
  border-bottom: 10px solid @bor_c;
  .act-info{
    padding: 10px;
  }
  .act-name{
    padding: 10px 0;
  }
  .ac-banner-wrapper{
    position: relative;

    img{
      width: 100%;
      height: 274/@r;
    }
    .status-text{
      position: absolute;
      top: 0;
      right: 0;
      .font_m;
      color: #fff;
      display: inline-block;
      padding: 0 5px;
      &.nostart{
        background: -webkit-linear-gradient(#FEB070, #FF8703);
      }
      &.starting{
        background: -webkit-linear-gradient(#62D580, #34C147)!important;
      }
      &.end{
        background-color: #ccc!important;
      }
    }

    .time-info{
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      .font_s;
      padding:5px 10px;
      background-color: rgba(0,0,0,.3);
      p{
        flex: 6;
        color: #fff;
        &:nth-of-type(2){
          flex: 4;
          text-align: right;
        }
      }

    }
  }

  //访谈样式
  .act-info.fangtan{
    .status-text{
      background-color: #FF8703;
    }

    .invest-list{
      padding: 10px 10px 0;
      display: flex;
      .font_xl;
      .invest-info{
        li{
          padding-bottom: 5px;
        }
      }
      span{
        color: #a9a9a9;
      }
    }
  }
}
</style>

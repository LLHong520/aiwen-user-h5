<template>
  <div class="content_wrapper">
      <ul class="act-news">
        <li class="list-cover act-news-list" v-for="(item,index) in conInfo" :key="index" v-if="index<show_nums">
          <a :href="item.activityType==1?urlLink2+item.id:urlLink+item.id">
            <div class="title"><p>{{item.title}}</p></div>
            <div class="cover-img">
              <img v-lazy="GET_IMG_URL(item.image,'u')" alt="爱问医联">
              <span v-if="item.activityStatus==0" class="info_status starting">进行中</span>
              <span v-if="item.activityStatus==1" class="info_status nostart">{{item.activityType==0?'未开始':'可提问'}}</span>
              <span v-if="item.activityStatus==2" class="info_status end">已结束</span>
              <p v-if="item.startTime" class="info_time">
                <span class="time">活动时间：{{item.startTime}}{{item.activityType==1?" - "+item.endTime:""}}</span>
                <span v-if="item.enrolment&&item.activityStatus==0" class="number">{{item.enrolment}} 人正在参与</span>
                <span v-if="item.enrolment&&item.activityStatus==1" class="number">{{item.enrolment}} 人已预定</span>
                <span v-if="item.enrolment&&item.activityStatus==2" class="number">{{item.enrolment}} 人已参加</span>
              </p>
            </div>
            <!-- <p v-if="item.invitedGuest" class="info_person">本期嘉宾：{{item.invitedGuest}}</p> -->
            <!-- <span class="desc">{{item.department}}&nbsp;&nbsp;{{item.hospital}}</span> -->
            <div class="invest-list" v-if="item.activityType==1">
              <p class="invest-label">本期嘉宾：</p>
              <ul class="invest-info">
                <li
                v-for="(elem,index) in item.invitedGuest" :key="index">
                {{elem.name}} <span>{{elem.departments}}</span> <span>{{elem.medicalInstitutions}}</span>
                </li>
              </ul>

            </div>
          </a>
        </li>
      </ul>
    </div>
</template>

<script>
import { commonMixin} from "@/mixins";
export default {
  mixins:[commonMixin],
  props:{
    conInfo:{
      type: Array,
      default:()=>[],
    },
    show_nums:{
      type:Number,
      default:0
    },
    stateInfo:{
      type:Boolean,
      default:true
    },
    timeInfo:{
      type:Boolean,
      default:true
    },
    footerInfo:{
      type:Boolean,
      default:false
    },
    urlLink:{
      type:String,
      default:""
    },
    urlLink2:{
      type:String,
      default:""
    },
  },
  data(){
    return {};
  },
  computed:{
  },
  created(){},
  methods: {}
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
.content_wrapper{border-bottom:10/@r solid @bor_co;padding:0 15px;}
.list-cover{
  margin-bottom:60/@r;
  .title{
    color:#222222;
    .font_xl;
    .show_n_lines(1);
    margin:20/@r 0;
  }
  .cover-img{
    position: relative;
    width:100%;
    height:276/@r;
    overflow: hidden;
    img{
      width:100%;
    }
  }
  .info_status{
    position: absolute;
    top:0;
    right:0;
    display: inline-block;
    padding:2/@r 8/@r;
    color:#fff;
    .font_s;
    &.nostart{
      background: -webkit-linear-gradient(#FEB070, #FF8703);
    }
    &.starting{
      background: rgba(38, 136, 252, 0.85);
    }
    &.end{
      background-color: #ccc!important;
    }
  }

  .info_time{
    position: absolute;
    bottom:0;
    left:0;
    width:100%;
    color:#fff;
    .font_s;
    .flexbox();
    .flexjustify(space-between);
    background: -webkit-linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)); /* Firefox 3.6 - 15 */
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)); /* 标准的语法 */
    span{
      display: inline-block;
      padding:27/@r 10px 10/@r;
    }
  }
  .info_person{
    height:60/@r;
    line-height: 60/@r;
    padding:0 10px;
    background:#F6F6F6;
    color:#222;
    .font_s;
  }
  .desc{
    padding-left:20/@r;
    color:#878787;
  }
}

.invest-list{
  padding: 10px 10px 0;
  display: flex;
  .font_xl;
  .invest-info{
    flex: 1;
    overflow: hidden;
    li{
      padding-bottom: 5px;
    }
  }
  span{
    color: #a9a9a9;
  }
}
@media screen and (min-width: @m){
  .act-news{
    display: flex;
    li{
      flex: 1;
      overflow: hidden;
      margin-right: 20/@r;
      &:last-child{
        margin: 0;
      }
      .invest-list{
        display: none;
      }
    }
  }
}
</style>

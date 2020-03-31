<template>
  <router-link :to="{name:'channelHospitalDetail',params:{id:channelId},query:{id:hospital.id}}">
    <div class="hospital_cell">
      <div class="img"><img  v-lazy="GET_IMG_URL(hospital.pictures.length>0?hospital.pictures[0].url:'','hos_cover')" alt=""></div>
      <div class="hospital_info">
        <p class="name">{{hospital.name}}</p>
        <p class="address">
          <span class="city">{{hospital.province}}<span v-if="hospital.city.indexOf(hospital.province)<0">&nbsp;&nbsp;{{hospital.city}}</span></span>
          <span class="distance" v-if="hospital.distance">{{hospital.distance.toFixed(1)}}km</span>
        </p>
        <p v-if="(hospital.adeptness||[]).length>0">擅长：{{(hospital.adeptness||[]).join(",")}}</p>
      </div>
    </div>
  </router-link>
</template>

<script >
import { commonMixin, toTopMixin} from "@/mixins";
export default {
  name: "hospitalCell",
  mixins:[commonMixin,toTopMixin],
  data(){
    return {
      channelId:"",
      channelName:"",
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
};
</script>
<style scoped lang="less" rel="stylesheet/less">
@assets:"~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
a{
  display: block;
}
.hospital_cell{
  padding: 30/@r 0;
  display: flex;
  align-items: center;
  .img{
    width: 242/@r;
    height: 153/@r;
    border-radius: 8/@r;
    margin-right: 24/@r;
    img{
      width: 242/@r;
      height: 152/@r;
      object-fit: cover;
      border-radius: 8/@r;
      border: 1px solid #f3f3f3;
      box-sizing: border-box;
      display: block;
    }
  }
  .hospital_info{
    font-size: 24/@r;
    line-height: 50/@r;
    color: #999;
    flex:1;
    width: 0;
    p{
      .show_n_lines(1);
    }
    .name{
      font-size: 28/@r;
      color: #282828;
      font-weight: bold;
      font-size: 28/@r;
    }
    .address{
      color: #666;
      display: flex;
      .distance{
        color: #999;
      }
      .city{
        flex: 1;
        .show_n_lines(1);
        width: 0;
      }
    }
  }
}
</style>

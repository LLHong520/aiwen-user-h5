<template>
  <div class="operationTopic-reservation">
    <div class="operationTopic-container" @click="handleClick">
      <div class="avatar-wrapper">
        <img :src="dataSource.doctorImage" alt="">
      </div>
      <div class="doctor-content">
        <div class="doctor-info">
          <h4 class="doctor-name">{{dataSource.realName}}</h4>
          <span class="doctor-title">{{dataSource.titles}}</span>
          <button class="doctor-btn" :style="{color:(color || '#1E82F8'), borderColor: (color || '#1E82F8')}">{{dataSource.content}}
            <span v-if="dataSource.userPrice">¥{{dataSource.userPrice}}</span>
          </button>
        </div>
        <div class="doctor-local">
          <span class="doctor-subject">{{dataSource.departments}}</span>
          <span class="doctor-hospital">{{dataSource.medicalInstitutions}}</span>
        </div>
        <div class="doctor-excel">{{dataSource.areasOfExpertise}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { commonMixin } from "@/mixins";
export default {
  name: "topicReservation",
  mixins: [commonMixin],
  props: {
    dataSource: {
      type: Object,
      default: () => ({
        type: "",
        doctorId: "",
        doctorImage: "",
        realName: "",
        titles: "",
        content: "",
        departments: "",
        medicalInstitutions: "",
        areasOfExpertise: "",
        userPrice: 0
      })
    },
    color: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleClick() {
      switch(this.dataSource.type) {
        case "8":
          this.$router.push({name: "consultInfo", params: {dId: this.dataSource.doctorId}});
          break;
        case "9":
          window.location = this.OUTER_LINKS.docConsult + this.dataSource.doctorId + "&bizType=NOR";
          break;
        case "7":
          window.location.href = this.OUTER_LINKS.docOrder + this.dataSource.doctorId;
          break;
        case "10":
          this.$router.push({name: "docIndex", params: {dId: this.dataSource.doctorId}});
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
  .operationTopic-reservation{
    font-family:PingFangSC-Semibold,PingFang SC;
    letter-spacing: 1px;
    width: 100%;
    padding: 8px 15px;
    box-sizing: border-box;
    .operationTopic-container{
      overflow: hidden;
      height:98px;
      background:rgba(255,255,255,1);
      border-radius:5px;
      padding: 15px 10px;
      box-sizing: border-box;
      display: flex;
      .avatar-wrapper{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #f8f8f8;
        flex-shrink: 0;
        margin: 0 11px 0 0;
        box-sizing: border-box;
        border:1px solid rgba(243,243,243,1);
        overflow: hidden;
        img{
          border-radius: 50%;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .doctor-content{
        width: 60%;
        flex-grow: 1;
      }
    }
    .doctor-content{
      display: flex;
      flex-direction: column;
      .doctor-info{
        margin: 0 0 5px 0;
        display: flex;
        align-items: flex-end;
        .doctor-name{
          font-size:16px;
          font-weight:600;
          color:#282828;
          line-height:22px;
          flex-shrink: 0;
          margin: 0 8px 0 0;
        }
        .doctor-title{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size:12px;
          flex-grow: 1;
          color: #282828;
        }
        .doctor-btn{
          flex-shrink: 0;
          border:1px solid #2688FC;
          outline: none;
          padding: 4px 12px 3px;
          font-size:12px;
          line-height:17px;
          font-weight:600;
          color: #2688FC;
          border-radius:12px;
          height:24px;
          box-sizing: border-box;
          background: #fff;
          white-space: nowrap;
          margin: 0 0 0 10px;
          &:active{
            opacity: 0.8;
          }
        }
      }
      .doctor-local{
        margin: 0 0 8px 0;
        font-size:12px;
        font-weight:400;
        color:#666666;
        line-height:17px;
        display: flex;
        .doctor-subject{
          margin:0 8px 0 0;
          flex-shrink: 0;
        }
        .doctor-hospital{
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .doctor-excel{
        color: #999999;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
</style>
<template>
  <div class="operationTopic-live">
    <div class="operationTopic-live-container" @click="handleClick">
      <div class="live-cover">
        <img v-if="dataSource.liveImage" :src="dataSource.liveImage" alt="cover">
      </div>
      <div class="live-content">
        <h4 class="live-title">
          {{dataSource.lessonsName}}
        </h4>
        <div class="live-menu">
          <span class="live-price">
            <span class="live-price-word">¥</span>{{dataSource.lessonsPrice}}
          </span>
          <button :style="{background:color || '#1E82F8'}" class="live-btn">
            {{dataSource.content}}
            <i class="live-icon-arrow" :style="{borderColor: color || '#1E82F8' }"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { commonMixin } from "@/mixins";
export default {
  name: "topicSpace",
  mixins: [commonMixin],
  props: {
    dataSource: {
      type: Object,
      default: () => ({
        contentId: "",
        liveImage: "",
        lessonsName: "",
        lessonsPrice: 0,
        content: ""
      })
    },
    color: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleClick() {
      window.location = this.OUTER_LINKS.courseDetails+this.dataSource.contentId;
    }
  }
};
</script>

<style lang="less" scoped>
  .operationTopic-live{
    font-family:PingFangSC-Regular,PingFang SC;
    width: 100%;
    padding: 8px 15px;
    box-sizing: border-box;
    .operationTopic-live-container{
      height: 110px;
      box-sizing: border-box;
      padding: 15px 10px;
      background: #fff;
      border-radius:5px;
      display: flex;
      .live-cover{
        width: 38%;
        height: 80px;
        margin: 0 8px 0 0;
        overflow: hidden;
        background: #f8f8f8;
        flex-shrink: 0;
        box-sizing: border-box;
        border:1px solid rgba(243,243,243,1);
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .live-content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 40%;
        flex-grow: 1;
      }
    }
    .live-content{
      .live-title{
        font-size:14px;
        font-weight:500;
        color:#2D2D2D;
        line-height:20px;
        margin: 0 0 17px 0;
        overflow: hidden;   
        text-overflow: ellipsis;
        display: -webkit-box;
        white-space:normal;
        -webkit-line-clamp: 2;
        /*! autoprefixer: ignore next */
        -webkit-box-orient: vertical;
      }
      .live-menu{
        display: flex;
        max-width: 100%;
        justify-content: space-between;
        .live-price{
          color: #EB1C1D;
          font-size:18px;
          line-height:25px;
          font-weight: 600;
          flex-shrink: 1;
          word-break: break-word;
          margin: 0 5px 0 0;
          .live-price-word{
            font-size: 14px;
          }
        }
        .live-btn{
          flex-shrink: 0;
          padding: 4px 9px 3px;
          box-sizing: border-box;
          height: 24px;
          white-space: nowrap;
          background: #1E82F8;
          color: #fff;
          border-radius:12px;
          line-height:17px;
          border: none;
          outline: none;
          &:active{
            opacity: 0.8;
          }
        }
      }
    }
    .live-icon-arrow{
      width: 12px;
      height: 12px;
      background: #fff;
      display: inline-block;
      border-radius: 50%;
      text-align: center;
      position: relative;
      vertical-align: middle;
      margin: 2px 0 3px;
      &::before{
        content: "";
        width: 4px;
        height: 4px;
        border:2px solid transparent;
        border-color: inherit;
        border-width: 2px 2px 0 0;
        display: inline-block;
        position: absolute;
        left: -2px;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        transform: rotateZ(45deg);
      }
    }
  }
</style>
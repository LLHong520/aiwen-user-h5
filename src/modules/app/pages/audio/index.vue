<template>
  <div class="wrapper">
    <ul>
      <li v-for="(item ,index ) in audioList" :key="index">
        <div @click="play($event,index)" class="audio-block" :class="{'playing':item.isplaying}"></div>
        <audio controls class="audio" preload="auto">
          <source :src="item.src"  type="audio/mpeg"/>
        </audio>
        长度：{{item.duration}}s
      </li>
      <!-- <li>
        <div @click="play" class="audio-block" :class="{'playing':isplaying}"></div>
        <span @click="play" id="playBtn" class="play">播放</span>
        长度：{{duration}}s
        <audio controls class="audio" preload="auto">
          <source src="https://wenwo-file-bucket-test.oss-cn-beijing.aliyuncs.com/a0220a922faa423c63bba4a139eb4938"  type="audio/mpeg"/>
        </audio>
        <audio controls src="https://wenwo-file-bucket-test.oss-cn-beijing.aliyuncs.com/82bea0909a572d7ac07c42588194b0f3"></audio>
        <audio class="audio" preload="auto" hidden="false">
          <source src="./33.aac" type="audio/aac">
        </audio>
        <audio class="audio" preload="auto" hidden="false">
          <source src="./22.mp3" type="audio/mpeg">
        </audio>
        <audio class="audio" preload="auto" hidden="false">
          <source src="https://wenwo-file-bucket-test.oss-cn-beijing.aliyuncs.com/82bea0909a572d7ac07c42588194b0f3" type="audio/aac">
        </audio>
        <audio class="audio" preload="auto" hidden="false">
          <source src="http://116.77.72.162/mp3.9ku.com/m4a/637791.m4a" type="audio/mpeg">
        </audio>
      </li> -->
    </ul>
  </div>
</template>
<script>
import loadingBtn from "@/components/loading-btn/loading-btn";
import loadingPlaceHolder from "@/components/loading-place-holder/loading-place-holder";
import noResult from "@/components/empty/empty";
import { commonMixin, toTopMixin } from "@/mixins";
import userService from "@/services/userService.js";
export default {
  mixins: [commonMixin, toTopMixin],
  data() {
    return {
      duration:"",
      audioList:[
        {
          isplaying:false,
          duration:10,
          src:"https://wenwo-file-bucket-test.oss-cn-beijing.aliyuncs.com/a0220a922faa423c63bba4a139eb4938",
        }
      ],
      isplaying:false
    };
  },
  components: {
    loadingBtn,
    loadingPlaceHolder: loadingPlaceHolder,
    noResult,
  },
  created() {
    this.myService();
  },
  mounted(){},
  methods: {
    play(event,index){
      let el = this.audioList[index];
      console.log(event);
      console.log(el);
      let target = event.target;
      let audio = target.nextElementSibling;
      console.log(audio.duration);
      if(audio.paused)                     {
        el.isplaying = true;
        audio.play();//audio.play();// 这个就是播放
      }else{
        el.isplaying = false;
        audio.pause();// 这个就是暂停
      }
    },
    getJumpUrl(item){
      let url = `${this.YK_URL}/consult/detail/${item.contentId}`;
      if(item.contentHref == 1){
        url = `${this.YK_URL}/consult/index?qid=${item.contentId}&drId=${item.drUserId}&mid=${item.mid}`;
      }
      return url;
    },
    myService() {
      if (this.listLoading || this.listIsEnd) return;
      this.listLoading = true;
      let This = this;
      let params = {
        pageIndex: this.curPage + 1,
        pageSize: 10,
        contentType: "1,2"
      };
      userService.myService(params).then(res => {
        This.listLoading = false;
        if (res.code == 0 && res.data) {
          This.curPage += 1;
          This.pageCount = res.page.pageCount;
          This.askList = This.askList.concat(res.data);
          console.log(This.pageCount);
          console.log(res.page.pageCount);
          if (This.curPage >= This.pageCount) {
            This.listIsEnd = true;
            This.listLoadingText = "没有更多了";
          } else {
            This.listIsEnd = false;
          }
        }
      });
    }
  }
};
</script>


<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>

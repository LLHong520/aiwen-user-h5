<template>
  <section class="container">
    <div class="doc_banner">
      <a href="javascript:;" @click="router_back" class="return"></a>
      <img src="./images/bg_doctor_big@2x.png" width="100%" alt>
    </div>
    <div class="box_wrapper">
      <div class="doc_card">
        <div class="doc_img">
          <img :src="GET_IMG_URL(docInfo.photo,'doc')" alt>
        </div>
        <dl>
          <dt>{{docInfo.realName}} {{docInfo.titles}}</dt>
          <dd>{{docInfo.departments}} {{docInfo.workUnit}}</dd>
          <dd class="goodat">擅长领域：{{docInfo.areasOfExpertise}}</dd>
          <dd v-if="docInfo.illnessTags.length>0" class="goodat">擅长疾病：{{illnessTagsText}}</dd>
        </dl>
      </div>
      <div class="info_item" v-if="(doctorMedals||[]).length>0">
        <h3>荣誉勋章</h3>
        <div class="info_txt">
          <ul class="xz_list">
            <li v-for="(item,index) in doctorMedals" :key="index">
              <em class="honor_icon honor_icon1" v-if="item.medalType=='10100'"></em>
              <!--年度全站-->
              <em class="honor_icon honor_icon2" v-else-if="item.medalType=='10101'"></em>
              <!--年度科室-->
              <em class="honor_icon honor_icon3" v-else-if="item.medalType=='10300'"></em>
              <!--月度全站-->
              <em class="honor_icon honor_icon4" v-else-if="item.medalType=='10301'"></em>
              <!--月度科室-->
              <em class="honor_icon" v-else></em>
              <!--其他-->
              {{item.medalName}}
            </li>
          </ul>
        </div>
      </div>
      <div class="info_item" v-if="docInfo.introduce!=''">
        <h3>个人简介</h3>
        <div class="info_txt">{{docInfo.introduce}}</div>
      </div>
      <div
        v-if="(docIntro.eduExperienceList||[]).length>0||(docIntro.workExperienceList||[]).length>0"
        class="info_item"
      >
        <h3>专业经历</h3>
        <div class="info_txt">
          <dl v-if="(docIntro.eduExperienceList||[]).length>0">
            <dt>教育经历</dt>
            <dd
              v-for="(item,index) in docIntro.eduExperienceList"
              :key="index"
            >{{item.startTime}} 到 {{item.endTime||"至今"}}——{{item.schoolName}} {{item.eduexperience}}</dd>
          </dl>
          <dl v-if="docIntro.workExperienceList&&(docIntro.workExperienceList||[]).length>0">
            <dt>工作经历</dt>
            <dd
              v-for="(item,index) in docIntro.workExperienceList"
              :key="index"
            >{{item.startTime}} 到 {{item.endTime||"至今"}} {{item.cpyName}} {{item.title}}</dd>
          </dl>
        </div>
      </div>
      <div
        v-if="docIntro.honor!=''||(docIntro.prizeList&&(docIntro.prizeList||[]).length>0)||(docIntro.scientificList&&(docIntro.scientificList||[]).length>0)||(docIntro.worksList&&(docIntro.worksList||[]).length>0)"
        class="info_item"
      >
        <h3>个人成就</h3>
        <div class="info_txt">
          <dl v-if="docIntro.honor!=''">
            <dt>荣誉头衔</dt>
            <dd>{{docIntro.honor}}</dd>
          </dl>
          <dl v-if="docIntro.prizeList&&(docIntro.prizeList||[]).length>0">
            <dt>获得奖项</dt>
            <dd v-for="(item,index) in docIntro.prizeList" :key="index">{{item.date}}——{{item.name}}</dd>
          </dl>
          <dl v-if="docIntro.scientificList&&(docIntro.scientificList||[]).length>0">
            <dt>科研成果</dt>
            <dd v-for="(item,index) in docIntro.scientificList" :key="index">
              <h4>{{item.name}}</h4>
              <p v-if="item.memo!=''">{{item.memo}}</p>
            </dd>
          </dl>
          <dl v-if="docIntro.worksList&&(docIntro.worksList||[]).length>0">
            <dt>发表作品</dt>
            <dd v-for="(item,index) in docIntro.worksList" :key="index">{{item.date}}——{{item.name}}</dd>
          </dl>
        </div>
      </div>
      <div
        v-if="docIntro.personalHornorList&&(docIntro.personalHornorList||[]).length>0"
        class="info_item"
      >
        <h3>个人荣誉</h3>
        <ul class="honor_list">
          <li v-for="(item,index) in docIntro.personalHornorList" :key="index">
            <div class="img_box">
              <img :src="GET_IMG_URL(item.picture[0])" alt>
            </div>
            <div class="tit vMiddle">{{item.memo}}</div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { commonMixin } from "@/mixins";
import doctorService from "@/services/doctorService.js";
export default {
  components: {},
  mixins: [commonMixin],
  data() {
    return {
      dId: "",
      doctorMedals:[],
      docInfo: {
        id: "",
        relation: 0,
        photo: "",
        realName: "...",
        departments: "...",
        titles: "...",
        answerNum: 0,
        workUnit: "...",
        sicknessExpertise: "",
        illnessTags: []
      },
      docIntro: {},
    };
  },
  created() {
    this.dId = this.$route.params.dId;
    this.getDocinfo();
    this.getDocIntro();
  },
  computed:{
    illnessTagsText(){
      let illnessTags = this.docInfo.illnessTags;
      let text = illnessTags.map((item)=>{
        return item.labelName;
      });
      return text.join("、");
    }
  },
  mounted() {},
  methods: {
    getDocinfo() {
      let This = this;
      doctorService.doc_info({ docId: this.dId }).then(res => {
        if (res.code == 0 && res.data) {
          This.docInfo = res.data;
          // This.SET_PAGE_TITLE(This.docInfo.realName + "的个人诊室");
          return true;
        } else if (res.code == "-2") {
          This.show_alert_tip = true;
        }
      });
    },
    getDocIntro() {
      let This = this;
      doctorService.doctorIntroduce({ docId: this.dId }).then(res => {
        if (res.code == 0 && res.druser) {
          This.docIntro = res.druser;
          res.druser.doctorMedals.map(item => {
            //荣誉勋章
            if(item!=null){
              This.doctorMedals.push({
                ...item,
              });
            }
          });
        }
      });
      // console.log(This.$refs.priseList);
    }
  }
};
</script>

<style lang="less" scoped>
@assets: "~@/assets";
@import "@{assets}/css/flex.less";
@import "@{assets}/css/fix.less";
.box_wrapper {
  overflow: visible;
}

.doc_banner {
  background-color: #4ebdfe;
  position: relative;
  .return {
    position: absolute;
    width: 80 / @r;
    height: 80 / @r;
    background: url(./images/nav_back.png) no-repeat;
    background-size: contain;
    left: 10 / @r;
    top: 4 / @r;
    z-index: 1;
  }
  img {
    display: block;
    width: 100%;
  }
}

.doc_card {
  text-align: center;
  font-size: 12px;
  color: #323232;
  line-height: 20px;
  padding: 0 25px 25px;
  position: relative;
  dl {
    padding-top: 5px;
  }

  dt {
    font-size: 16px;
    font-weight: bold;
  }

  dt,
  dd {
    padding-top: 7px;
  }

  .doc_img,
  .doc_img img {
    width: 68px;
    height: 68px;
    border-radius: 68px;
    display: block;
  }

  .doc_img img {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .doc_img {
    margin: -34px auto 0;
    border-radius: 0;
  }

  .goodat {
    color: #999;
  }
}

.info_item {
  border-top: 1px solid #efefef;
  padding: 0 15px 25px;

  h3 {
    font-size: 15px;
    color: #2688fc;
    line-height: 21px;
    padding: 24px 0 15px 0;
    font-weight: normal;
    text-align: center;
  }

  .info_txt {
    font-size: 13px;
    line-height: 24px;
    color: #424242;
    word-wrap: break-word;
    word-break: break-all;
    
    * {
      word-wrap: break-word;
      word-break: break-all;
    }

    dl {
      padding-bottom: 25px;
    }

    dl:last-child {
      padding-bottom: 0;
    }

    dt {
      color: #999;
    }

    dd {
      color: #323232;
      h4{
        color: #323232;
      }
      p{
        color: #666;
      }
    }
  }

  .honor_list {
    li {
      display: flex;
      padding-bottom: 10px;
    }

    .img_box {
      width: 64px;
      height: 64px;
      border-radius: 4px;
      margin-right: 12px;
    }

    .img_box img {
      display: block;
      width: 64px;
      height: 64px;
      border-radius: 4px;
    }
  }
}
/*预览层*/
.seven_del {
  // background: url(./images/del_icon.png) no-repeat;
  // background-size: 18px 20px;
  width: 18px;
  height: 20px;
  margin-top: 12px;
  margin-left: 45px;
  display: block;
}
.blackpre {
  background-color: #000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.bal_head {
  background-color: #333;
  height: 44px;
  padding: 0 10px;
  display: flex;
}

.bal_head .green_back {
  width: 45px;
  color: #fff;
  line-height: 45px;
}

.bal_head h2 {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  box-flex: 1;
  flex: 1;
  color: #fff;
  line-height: 44px;
  text-align: center;
  font-weight: normal;
  font-size: 14px;
}

.black_img {
  position: fixed;
  top: 45px;
  left: 0;
  bottom: 0;
  width: 100%; // height:100%;
  z-index: 11;
  /*display:table;*/
  overflow-y: auto;
}

.black_img span {
  display: block;
}

.black_img img {
  width: 100%;
  height: auto;
  cursor: pointer;
}

.xz_list li {
  line-height: 44 / @r;
  padding: 16 / @r 0;
  font-size: 26 / @r;
  color: #424242;
  .honor_icon {
    display: inline-block;
    width: 36 / @r;
    height: 44 / @r;
    vertical-align: middle;
    margin-right: 14 / @r;
    background: url(./images/doctor_box_medal_normal_s@2x.png) no-repeat;
    background-size: contain;
    &.honor_icon1 {
      background-image: url(./images/doctor_box_medal_year_all_s@2x.png);
    }
    &.honor_icon2 {
      background-image: url(./images/doctor_box_medal_year_sort_s@2x.png);
    }
    &.honor_icon3 {
      background-image: url(./images/doctor_box_medal_monthly_all_s@2x.png);
    }
    &.honor_icon4 {
      background-image: url(./images/doctor_box_medal_monthly_sort_s@2x.png);
    }
  }
}
</style>

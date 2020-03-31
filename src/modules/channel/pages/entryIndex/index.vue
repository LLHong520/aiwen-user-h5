<template>
  <layout :isAppView="true">
    <div slot="page_header" class="header_wrapper" >
      <m-header  :title="entryInfo.wentryName" :isShowInApp="true">
        <a href="javascript:;" slot="left" class="back" @click="router_back"></a>
        <div class="right" slot="right"></div>
      </m-header>
    </div>
    <div slot="page_container">
      <div class="entry_wrapper">
        <div class="entry_hd">
          <i></i><span>词条编辑医生</span>
        </div>
        <!-- @doc_card start -->
        <div class="doc_card">
          <div class="doc_info">
            <div class="doc_img">
              <img :src="GET_IMG_URL(docInfo.photo,'doc')">
            </div>
            <dl>
              <dt>
                <a href="javascript:;" class="name">{{docInfo.realName}}</a>
                &nbsp;&nbsp;&nbsp;&nbsp;{{docInfo.titles}}
              </dt>
              <dd>{{docInfo.workUnit}}&nbsp;&nbsp;&nbsp;&nbsp;{{docInfo.departments}}</dd>
            </dl>
          </div>
          <!-- 擅长领域 start -->
          <a href="javascript:;" v-if="docInfo.areasOfExpertise||(docInfo.illnessTagszzz||[]).length>0">
            <div v-if="(docInfo.illnessTags||[]).length>0" class="good_at">擅长疾病：{{illnessTagsText}}</div>
            <div class="good_at" v-else-if="docInfo.areasOfExpertise">擅长领域：{{docInfo.areasOfExpertise}}</div>
          </a>
          <!-- 擅长领域 end -->
          <!-- 医生图文咨询  门诊预约 电话咨询等信息 -->
          <div v-if="entryInfo.wentryAuthorId">
            <docServicespanel  :docId="entryInfo.wentryAuthorId" />
          </div>
          
          <!-- 医生图文咨询  门诊预约 电话咨询等信息 end-->

          <!-- 背书机构 start-->
          <div class="endorsement"><i></i>词条内容经 <a :href="columnInfo.endorsementTeamLink" target="_blank" v-if="columnInfo.endorsementTeamLink">{{columnInfo.endorsementTeam}}</a><span v-else>{{columnInfo.endorsementTeam}}</span>  审核</div>
          <!-- 背书机构 end-->
        </div>
        <!-- @doc_card end -->
        <div class="entry_hd">
          <i></i><span>{{entryInfo.wentryName}}</span>
        </div>
        <!-- 富文本内容 -->
        <div class="entry_content">
          <rich-text :richHtml="entryInfo.wentryContent"></rich-text>
        </div>
        <!-- 富文本内容 -->
      </div>
    </div>
    <div slot="page_footer">
      <div class="bottom">- 这是我的底线 -</div>
    </div>
  </layout>
</template>
<script>
import {commonMixin,toTopMixin} from "@/mixins";
import Header from "@/components/header/Header";
import doctorService from "@/services/doctorService.js";
import channelService from "@/services/channelService.js";
import richText from "@/iwen/rich_text.vue"; //分享
import docServicespanel from "@/components/doc-services/";//医生服务
export default {
  name: "channel",
  mixins: [commonMixin, toTopMixin],
  components: {
    mHeader:Header,
    richText,
    docServicespanel,
  },
  data() {
    return {
      columnId:"",
      wentryId:"",
      entryInfo:{},
      docInfo:{},

      phoneSetting: {
        is_switch: ""
      },
      columnInfo:{},
      dId:""
    };
  },
  
  created() {
    this.init();
  },
  computed: {
    illnessTagsText(){
      let illnessTags = this.docInfo.illnessTags;
      let text = illnessTags.map((item)=>{
        return item.labelName;
      });
      return text.join("、");
    },
  },
  methods: {
    init(){
      this.columnId=this.$route.params.columnId;
      this.wentryId=this.$route.params.entryId;
      this.getColumnWentryInfo();
      this.getColumnInfo();
    },
    getDocinfo(){
      let This=this;
      doctorService.doc_info({docId:This.dId})
      .then(res=>{
        if(res.code==0&&res.data){
          This.docInfo=res.data;
        }
      });
    },
    getColumnInfo(){
      let This=this;
      channelService.getColumnInfo({columnId:This.columnId})
      .then(res=>{
        if(res.status==200&&res.data){
          This.columnInfo=res.data;
        }
      });
    },
    //查询词条详情
    getColumnWentryInfo() {
      let data = {
        "wentryId": this.wentryId
      };
      console.log(data);
      channelService.getColumnWentryInfo(data).then((res) => {
        if(res.status == 200 && res.data) {
          this.entryInfo = res.data;
          this.dId=res.data.wentryAuthorId;
          this.getDocinfo();//获取医生详情
          this.qryDocTelConfig();
        }
      })
      .catch(() => {})
      .finally(() => {
      });
    },
  },
  mounted(){
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"  rel="stylesheet/less">
@import "./css.less";
</style>

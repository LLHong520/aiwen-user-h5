<template>
  <layout class="user-center" >
    <!-- page_header -->
    <div slot="page_header">
      <m-header slot="page_header" title='科室-推荐医生'>
        <span class="retrun" slot='left' @click="router_back">
          <b class="gray"></b>
        </span>
        <span class="retrun" slot='right'></span>
      </m-header>
    </div>
    <!-- page_header -->
    <!-- page_container -->
    <div slot="page_container" class="app_wrapper_inner">
      <!-- 微信微博下显示 浏览器隐藏 -->
      <search-holder :display="true"></search-holder>
      <!--end doc_search_bar-->
      <div class="screening_bar">
        <!--默认排序-->
        <div class="screening_item" id="sex">
          <div class="screening_result" id="sex_result">默认排序</div>
          <div class="screening_list">
            <ul class="sex_list">
              <li value="onlineIntegral" @click="changeQuery('sortName','onlineIntegral')" class="current">默认排序
              </li>
              <li value="historyCount" @click="changeQuery('sortName','historyCount')" class="">服务次数从高到低
              </li>
              <li value="popTotal" @click="changeQuery('sortName','popTotalAsc')" class="">价格从低到高</li>
            </ul>
          </div>
        </div>
        <!--默认排序 end-->
        <!--职称-->
        <div class="screening_item" id="teach">
          <div class="screening_result" id="teach_result">医生类型</div>
          <div class="screening_list">
            <ul class="teach_list" id="teach_tab">
              <li class="current" @click="changeQuery('title','-')">不限</li>
              <li v-for="(elem,index) in teach_list" :key="index">{{elem.titleName}}</li>
            </ul>
            <div class="teach2_list" id="teach_content">
              <ul></ul>
              <ul v-for="(elem,index) in teach_list" :key="index">
                <li v-for="(s_elem,s_index) in elem.titles" :value="elem.value" :key="s_index" @click="changeQuery('title',s_elem.titleLevel+'-'+elem.titleType)">{{s_elem.titleName}}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--职称 end-->
        <!-- 科室-->
        <div class="screening_item" id="depart">
          <div class="screening_result" ref="depart" id="depart_result"><span v-if="hasDId">{{departName}}</span><span v-else>科室分类</span></div>
          <div class="screening_list">

            <ul class="sub1_list" id="depart_tab">
              <li class="current" @click="changeQuery('department','-')">不限</li>
              <li v-for="(elem,index) in department" :key="index" @click="checkDepartQuery(elem)">
                {{elem.name}}
              </li>
            </ul>
            <div class="sub2_list" id="depart_content">
              <ul></ul>
              <ul v-for="(elem,index) in department" :key="index">
                <li @click="changeQuery('department',elem.id+'-B')" :dname="elem.name">不限</li>
                <li v-for="(s_elem,s_index) in elem.dropList" :parentId="elem.id" :value="s_elem.id" :key="s_index" @click="changeQuery('department',s_elem.parentId+'-'+s_elem.id)">{{s_elem.name}}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--科室 end -->
        <!--城市-->
        <div class="screening_item" id="city">
          <div class="screening_result" id="city_result">所在城市</div>
          <div class="screening_list">
            <ul class="sub1_list province_list" id="city_tab">
              <li class="current" @click="changeQuery('city','-')">不限</li>
              <li v-for="(elem,index) in cityList" :key="index">{{elem.name}}</li>
            </ul>
            <div class="sub2_list" id="city_content">
              <ul></ul>
              <ul v-for="(elem,index) in cityList" :key="index">
                <li v-for="(s_elem,s_index) in elem.childs" :parentId="elem.id" :value="s_elem.id" :key="s_index" @click="changeQuery('city',elem.parentId+'-'+s_elem.id)">{{s_elem.name}}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--城市 end-->
      </div>
      <!--end screening_bar-->
      <!-- start    Added Depart message     start -->
      <div class="depart-msg" v-if="departMsgId != '' && departMsgId != undefined">
        <div class="msg-icon">
          <img v-lazy="GET_IMG_URL(departMsg.picture, 'u')" />
        </div>
        <div class="msg-content">
          <p>{{ departMsg.name }}</p>
          <p>{{ departMsg.introduction }}</p>
        </div>
      </div>
      <div class="depart-bg-placeholder"></div>
      <!-- end    Added Depart message      end -->
      <div class="famous_list">
        <div class="shadow1"></div>
        <dl v-for="elem in docList" :key="elem.key" class="famous_doctor">
          <dt>
            <router-link :to="{ name: 'docIndex', params: { dId: elem.id}}">
              <img v-lazy="GET_IMG_URL(elem.photo,'doc')" />
              <span>V</span>
            </router-link>
          </dt>
          <dd>
            <router-link :to="{ name: 'docIndex', params: { dId: elem.id}}">
              <div class="fam_doc_name">
                <b>{{elem.realName}}</b>{{elem.titles}}</div>
              <div class="fam_doc_dep">{{elem.departments}}
                <span>{{elem.workUnit}}</span>
              </div>
              <div class="fam_doc_good">擅长：{{elem.areasOfExpertise}}</div>
              <div class="fam_doc_tj" v-if="!VX_isSinaHealthAppForceIng">
                <!--<p>-->
                <!--服务数：<span class="deepgray">{{elem.answerNum}}</span>&nbsp;&nbsp;&nbsp;&nbsp;-->
                <!--文章数：<span class="deepgray">{{elem.popNum}}</span>-->
                <!--</p>-->
                  <!-- 审核完成之后 -->
                  <template>
                    <p>
                      <template v-if="elem.advice">
                        <span>
                          <a class="deepgray" href="javascript:;">图文咨询</a>
                        </span>
                      </template>
                      <a v-if="elem.advice&&elem.register" class="deepgray" href="javascript:;">、</a>
                      <template v-if="elem.register">
                        <span>
                          <a class="deepgray" href="javascript:;">门诊预约</a>
                        </span>
                      </template>
                    </p>
                  </template>
                  <!-- 审核完成之后 -->
                  <!-- 正在审核中 -->
                  <!-- <template v-else>
                    <p>
                      <template v-if="elem.advice && elem.qPrice <= 0">
                        <span>
                          <a class="deepgray" href="javascript:;">图文咨询</a>
                        </span>
                      </template>
                      <a v-if="elem.advice&&elem.register&& elem.qPrice <= 0" class="deepgray" href="javascript:;">、</a>
                      <template v-if="elem.register">
                        <span>
                          <a class="deepgray" href="javascript:;">门诊预约</a>
                        </span>
                      </template>
                    </p>
                  </template> -->
                  <!-- 正在审核中 -->
              </div>
              <div v-if="!VX_isSinaHealthAppForceIng && elem.advice" class="fam_doc_price">￥{{elem.qPrice}}</div>
            </router-link>
          </dd>
        </dl>
        <no-result title="没有找到医生~" v-if="!initing_page&&docList.length==0"></no-result>
      </div>
      <loading-btn v-if="showLoadMore&&docList.length>=10" :scroll_load="true" :loading="load_dynamics_loading" :title="load_dynamics_text"
        @loadFn="depart_docs"></loading-btn>
    </div>
    <!-- /page_container -->
    <!-- page_footer -->
    <div slot="page_footer">
      <loading-page v-show='initing_page'></loading-page>
    </div>
  </layout>
</template>
<script>
  import searchHolder from "@/components/search-holder/search-holder";
  import noResult from "@/components/no-result/no-result";
  import loadingBtn from "@/components/loading-btn/loading-btn";
  import Header from "@/components/header/Header";
  import {
    commonMixin,
    toTopMixin
  } from "@/mixins";
  import doctorService from "@/services/doctorService.js";
  import departService from "@/services/departService.js";
  import {
    departmentList
  } from "./queryParams";

  export default {
    name: "index",
    mixins: [commonMixin, toTopMixin],
    data() {
      return {
        queryParams: {
          deptId: "",
          titleLevel: "",
          cityId: "",
          sortName: "onlineIntegral",
          pageIndex: 1,
          titleType: ""
        },
        docList: [],
        teach_list: [],
        department: departmentList,
        cityList: [],
        load_dynamics_loading: false,
        load_dynamics_text: "点击加载更多",
        nowPage: 0,
        pageCount: 1,
        showLoadMore: true,
        hasMore: true,
        departMsgId: "",
        departMsg: {},
        hasDId: false,
        departName: "",
      };
    },
    components: {
      mHeader: Header,
      noResult: noResult,
      searchHolder: searchHolder,
      loadingBtn: loadingBtn
    },
    created() {
      this.dId = this.$route.query.dId;
      console.log(this.dId);
      if(this.dId != null) {
        this.hasDId = true;
      }

      this.queryParams.deptId = this.$route.query.dId;
      this.departMsgId = this.$route.query.dId;
      this.depart_docs();
      this.get_citys();
      this.titles_list();
      this.render_depart_msg();
      this.getDepartment();
    },
    computed: {},
    methods: {
      getDepartment(){
        departService.allDepartments({parentId: 1}).then(
          res => {
            if (res.code == 0 && res.data) {
              this.department = res.data;
            }
          });
      },
      checkDepartQuery(elem) {
        console.log(elem);
        if(elem.dropList.length==0){
          this.changeQuery("department",elem.id+"-B");
        }
      },
      changeQuery(action, param) {
        //默认排序
        console.log("##############");
        if (action == "sortName") {
          this.queryParams[action] = param;
        }
        if (action == "title") {
          param = param.split("-");
          this.queryParams["titleLevel"] = param[0];
          this.queryParams["titleType"] = param[1];
        }
        if (action == "department") {
          param = param.split("-");
          this.departMsgId = param[0];
          // this.queryParams['department']=param[0];
          if (param[1] === "B") {
            this.queryParams["deptId"] = param[0];
          } else {
            this.queryParams["deptId"] = param[1];
          }
          this.$router.replace({
            name:"famousDocs",
            query:{dId:this.queryParams["deptId"]}
          });
        }
        if (action == "city") {
          param = param.split("-");
          // this.queryParams['department']=param[0];
          this.queryParams["cityId"] = param[1];
        }
        this.nowPage = 0;
        this.docList = [];
        this.hasMore = true;
        this.load_dynamics_loading = false;
        this.load_dynamics_text = "点击加载更多";
        this.depart_docs();
        this.render_depart_msg();
      },
      depart_docs() {
        if (this.load_dynamics_loading || !this.hasMore) return;
        if (this.nowPage == 0) this.initing_page = true;
        this.load_dynamics_loading = true;
        let This = this;
        this.queryParams.pageIndex = this.nowPage + 1;
        doctorService.query_docs(this.queryParams).then(
          res => {
            if (this.nowPage == 0) this.initing_page = false;
            This.load_dynamics_loading = false;
            if (res.code == 0 && res.data) {
              This.docList = This.docList.concat(res.data);
              // This.nowPage=parseInt(res.page.pageIndex);
              This.nowPage += 1;
              This.pageCount = parseInt(res.page.pageCount);
              //确定没有更多时
              if (This.nowPage + 1 > This.pageCount) {
                This.load_dynamics_text = "没有更多了";
                This.hasMore = false;
              }
            } else {
              This.showLoadMore = false;
            }
          },
          function () {
            This.load_dynamics_loading = false;
            This.load_dynamics_text = "加载失败，点击重试";
          }
        );
      },
      get_citys() {
        let This = this;
        doctorService.regiont_list({}).then(res => {
          if (res.code == 0) {
            This.cityList = res.data;
          }
        });
      },
      titles_list() {
        let This = this;
        doctorService.titles_list({}).then(res => {
          if (res.code == 0) {
            This.teach_list = res.data;
          }
        });
      },
      render_depart_msg() {
        let _this = this;
        let data = {
          deptId: _this.departMsgId
        };
        doctorService.departMsg(data).then(res => {
          if (res.code == 0 && res.data) {
            _this.departMsg = res.data[0];
            _this.departName = _this.departMsg.name;
          }
        });
      },
    },
    mounted() {
      let screeningItems=$(".screening_item");
      let shadow1=$(".shadow1");
      let odepart=$("#depart");
      // let depart_tab_lis=$("#depart_tab li");
      let depart_content=$("#depart_content");
      let depart_result=$("#depart_result");
      let depart_content_uls=depart_content.find("ul");
      // let depart_content_lis=depart_content.find("li");
      let oBody=$("body");
      let oTeach_tab=$("#teach_tab");
      let teach_result=$("#teach_result");
      // let oTeach_tabLis=oTeach_tab.find("li");
      let teach_content=$("#teach_content");
      // let teach_contentLis=teach_content.find("li");
      shadow1.bind("click", function () {
        console.log("11111111111");
        $(this).hide();
        screeningItems.removeClass("screening_item_curent");
      });
      //点击切换下拉框的显示与隐藏状态
      $(".screening_result").bind("click", function () {
        if ($(this).parent().hasClass("disable")) return;
        if ($(this).parent().hasClass("screening_item_curent")) {
          $(this).parent().removeClass("screening_item_curent");
          console.log("22222222222");
          shadow1.hide();
        } else {
          screeningItems.removeClass("screening_item_curent");
          shadow1.show();
          $(this).parent().addClass("screening_item_curent");
        }
      });

      //科室
      $("#depart").on("click","li",function (event) {
        console.log("aaaaaaaaaaaaaaaaa");
        var i = $(this).index();
        // console.log(i);
        // console.log(depart_content_uls.eq(i).children());
        $("#depart li").removeClass("current");
        $(this).addClass("current");
        depart_content.show();
        console.log("333333333");
        depart_content_uls.hide();
        $("#depart_content ul").hide().eq(i).show();
        // depart_content_uls.eq(i).show();
        if ($("#depart_content ul").eq(i).children().length == 0||$("#depart_content ul").eq(i).children().length == 1) {
          if ($(this).html() == "不限") {
            depart_result.html("科室");
            oBody.removeClass("pg160");
            console.log("44444444");
            $(".depart-msg").hide();
          } else {
            depart_result.html($(this).html());
            oBody.removeClass("pg160");
          }
          odepart.removeClass("screening_item_curent");
          console.log("55555555");
          shadow1.hide();
        }
        event.stopPropagation();
      });
      $("#depart_content").on("click","li", function (event) {
        $("#depart_content li").removeClass("current");
        $(this).addClass("current");
        if ($(this).html() == "不限") {
          depart_result.html($(this).attr("dname"));
        }else{
          depart_result.html($(this).html());
        }
        odepart.removeClass("screening_item_curent");
        console.log("666666666666");
        shadow1.hide();
        oBody.removeClass("pg160");
        event.stopPropagation();
      });

      //职称
      oTeach_tab.on("click", "li", function (event) {
        var i = $(this).index();
        $("#teach_tab li").removeClass("current");
        var teach_content_uls=teach_content.find("ul");
        $(this).addClass("current");
        teach_content.show();
        teach_content_uls.hide();
        teach_content_uls.eq(i).show();
        if (teach_content_uls.eq(i).children().length == 0) {
          if ($(this).html() == "不限") {
            teach_result.html("职称");
            oBody.removeClass("pg160");
          } else {
            teach_result.html($(this).html());
            oBody.removeClass("pg160");
          }
          $("#teach").removeClass("screening_item_curent");
          shadow1.hide();
          //$('#teach_tab li').css('background-color','#f0f0f0');
          //$(this).css('background-color','#fff');
        }
        //如果选择的不是医师或不限  把科室选择变为灰色
        if (i > 1) {
          odepart
            .css("color", "#f0f0f0")
            .addClass("disable");
        } else {
          odepart
            .css("color", "#80888C")
            .removeClass("disable");
        }
        event.stopPropagation();
      });
      teach_content.on("click", "li", function (event) {
        $("#teach_content li").removeClass("current");
        $(this).addClass("current");
        if ($(this).html() == "不限") {
          teach_result.html("医师");
          oBody.removeClass("pg160");
        } else {
          teach_result.html($(this).html());
          $("#teach").removeClass("screening_item_curent");
          shadow1.hide();
          oBody.removeClass("pg160");
          event.stopPropagation();
        }
      });

      let sexMapObj = {
        onlineIntegral:"默认排序",
        historyCount:"服务次数从高到低",
        popTotal:"价格从低到高",
      };
      //性别
      $(".sex_list li").bind("click", function (event) {
        $(".sex_list li").removeClass("current");
        $(this).addClass("current");
        var mapValue = $(this).attr("value");
        $("#sex_result").html(sexMapObj[mapValue]);
        $("#sex").removeClass("screening_item_curent");
        shadow1.hide();
        oBody.removeClass("pg160");
        event.stopPropagation();
      });

      //城市
      $("#city_tab").on("click", "li", function (event) {
        var i = $(this).index();
        $("#city_tab li").removeClass("current");
        //$('#city_tab li').css('background-color','#f0f0f0');
        //$(this).css('background-color','#fff');
        $(this).addClass("current");
        $(".sub2_list").show();
        $("#city_content ul").hide();
        $("#city_content ul")
          .eq(i)
          .show();
        if ($(this).html() == "不限") {
          $("#city_result").html("所在地");
          $("#city").removeClass("screening_item_curent");
          shadow1.hide();
          oBody.removeClass("pg160");
          $("#city_tab li").css("background-color", "#f0f0f0");
          $(this).css("background-color", "#fff");
          $("#city_content").hide();
        }
        event.stopPropagation();
      });
      $("#city_content").on("click", "li", function (event) {
        $("#city_content li").removeClass("current");
        $(this).addClass("current");
        $("#city_result").html($(this).html());
        $("#city").removeClass("screening_item_curent");
        shadow1.hide();
        oBody.removeClass("pg160");
        event.stopPropagation();
      });
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  @import "./css.less";

</style>

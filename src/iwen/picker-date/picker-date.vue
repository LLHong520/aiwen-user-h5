<template>
  <div id="firstcomponent">
    <!-- <touch tag="h1" v-on:tap="open">{{focusDate}}</touch> -->
    <transition name="contrl">
      <div v-if="visible" class="contrls-wrapper">
        <div class="contrls"><span @click="close" class="cancel" >取消</span><h2>{{title}}</h2><span @click="comfirm" class="comfirm">完成</span></div>
      </div>
    </transition>
    <picker class="date-position" v-model="visible" :data-items="dateItems" @change="onDateValuesChange"></picker>
  </div>
</template>

<script type="text/javascript">
import Vue from "vue";
import picker from "vue-3d-picker";
Vue.component(picker.name, picker);
export default {
  props:{
    visible:{
      type:Boolean,
      default:false
    },
    title:{
      type:String,
      default:""
    },
    defaultDate:{
      type:String,
      default:"1980"
    }
  },
  data () {

    let formatTwoDigitInteger = (value) => {
      value = value.toString();
      return (value.length === 1 ? "0" : "") + value;
    };

    let generateYearData = (thisYear) => {
      var result = [],
        i = 1900,
        end = thisYear+1;
      for(; i < end; i++) {
        result.push({
          value: formatTwoDigitInteger(i) /*+ '年'*/
        });
      }
      return result;
    };

    let generateMonthData = () => {
      var result = [], i = 1;
      for (; i < 13; ++i) {
        result.push({
          name: formatTwoDigitInteger(i) /*+ '月'*/
        });
      }
      return result;
    };

    let generateDateData = () => {
      var result = [], i = 1;
      for (; i < 32; ++i) {
        result.push({
          name: formatTwoDigitInteger(i) /*+ '日'*/
        });
      }
      return result;
    };

    let today = new Date,
      thisYear = today.getFullYear(),
      thisMonth = today.getMonth() + 1,
      thisDate = today.getDate(),
      // thisHour = today.getHours(),
      months = generateMonthData(),
      dates = generateDateData();
      // dayDesc = ['上午', '下午'],
      // lastYear = thisYear,
      // lastMonth = thisMonth,
      // lastDate = thisDate;
      // lastDesc = dayDesc[thisHour < 12 ? 0 : 1];

    this.thisYear = thisYear;
    let defaultDate=this.defaultDate;
    return {
      dateItems: [{
        name: "value",
        index: (function(){
          var years=generateYearData(thisYear);
          // console.log(years);
          return years.findIndex((item)=>{
            return item.value==defaultDate;
          });
        })(),
        values: generateYearData(thisYear),
      },{
        name: "name",
        index: thisMonth - 1,
        values: months,
      },{
        name: "name",
        index: thisDate - 1,
        values: dates,
      }
            // ,{
            //     index: thisHour < 12 ? 0 : 1,
            //     values: dayDesc,
            // }
      ],
            // visible: false,
      focusDate:"",
      y:"",
      m:"",
      d:""
    };
  },
  mounted () {
  },
  methods : {
    close(){
      this.$emit("update:visible",false);
    },
    getMaxDate (year, month) {
      return (new Date(new Date(year, month, 1) - 1)).getDate();
    },
    onDateValuesChange (year, month, date) {/*desc */
      console.log(this.dateItems);
      year = year.value;
      month = month.name;
      date = date.name;
      this.y = year;
      this.m = month;
      this.d = date;
      var maxDate = this.getMaxDate(parseInt(year), parseInt(month));

      this.dateItems[2].maxScrollValue = maxDate;
            // console.log('user ----->', year, month, date);/*desc */
    },
    comfirm(){
      this.focusDate=this.y+"-"+this.m+"-"+ this.d;
      this.$emit("update:visible",false);
      let data=this.focusDate;
      this.$emit("comfirm",data);
    },
  },
};

</script>

<style scoped lang="less" rel="stylesheet/less">
.date-position{
  position: fixed;
  z-index: 99;
  left: 0;
  bottom: 228px;
  width: 100%;
}
.contrls-wrapper{
    // position: absolute;
    position: fixed;
    left: 0;
    bottom: 228px;
    width: 100%;
    background: transparent;
    -webkit-transform: translate3d(0px, 0px, 0px);
    transform: translate3d(0px, 0px, 0px);
    z-index: 999;
}
.contrls{
    // position: relative;
    // width: 100%;
    display: flex;
    height: 38px;
    line-height: 38px;
    padding:0 20px;
    border-radius: 6px 6px 0 0;
    background: #F9FAFD;
    font-size: 13px;
    h2{
        flex: 1;
        width: 0;
        text-align: center;
        color: #AEB1B6;
        font-size: 12px;
    }
    .cancel{
        color: #2d2d2d;
    }
    .comfirm{
        color: #2688FC;
    }
}

.contrl-enter-active {
  animation: contrl-in .4s;
}
.contrl-leave-active {
  animation: contrl-out .3s;
}
@keyframes contrl-in {
  0% {
    transform: translateY(228px);
  }

  100% {
    transform: translateY(0px);
  }
}
@keyframes contrl-out {
   0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(228px);
  }
}
</style>

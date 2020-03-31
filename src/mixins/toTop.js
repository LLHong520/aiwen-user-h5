import toTop from "@/components/to-top/to-top";

const toTopMixin = {
  created(){
    this.$nextTick(function () {
      //返回顶部
      var This=this;
      let wrapper_inner = $(this.getScrollEle());
      $(".go_top").click(function () {
        let wrapper_inner = $(This.getScrollEle());
        wrapper_inner.scrollTop(0);
      });
      wrapper_inner.on("scroll", function () {
        if ($(this).scrollTop() >= "600") {
          $(".go_top").show();
        } else {
          $(".go_top").hide();
        }
      });
    });
  },
  components:{
    toTop
  },methods: {
    //获取添加滚动事件的元素
    getScrollEle() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      var scrollEle=null;

      if(isiOS&&platformInfo.isWeibo){
        scrollEle="#wrapper__inner";
      }else{
        scrollEle=window;
      }

      return scrollEle;
    }
  }
};

export default toTopMixin;

import request from "@/request";
let momentInterfaces = {
  // hot_moments:"/community/circle/qryHotCircleNew",//热门圈子信息
  hot_moments: "/awyh/recommend/getRecommendManages", //新热门圈子信息
  moment_topics: "/community/posts/findByCircle",
  search_circle: "/community/circle/qryCircleBySearchWord", //全局查询圈子
  search_topic: "/community/posts/findPostsBySearchWord", //全局查询帖子
  land_info: "/community/visitUser/circlePage", //圈子的访问信息
};
export default {
  //热门圈子
  hot_moments: function (data) {
    let url = momentInterfaces.hot_moments;
    return request.post(url, data);
  },
  //根据搜索词查询圈子信息
  search_circle: function (data) {
    let url = momentInterfaces.search_circle;
    return request.post(url, data);
  },
  //根据搜索词查询帖子信息
  search_topic: function (data) {
    let url = momentInterfaces.search_topic;
    return request.post(url, data);
  },
  //多少人访问过该圈子
  land_info: function (data) {
    let url = momentInterfaces.land_info;
    return request.post(url, data);
  }
};

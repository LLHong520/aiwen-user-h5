import request from "@/request";
let activityInterfaces={
  // mediaVideo: "/awyh/media/getMediaVideoInfoById",
  mediaVideo: "/awyh/media/getMediaVedioDetail",
  mediaLike: "/awyh/media/addMediaVideoLike",
  getComments: "/awyh/media/getMediaVideoCommentByPspId",
  add_favorites: "/awyh/media/addMediaVideoFavorites",
  del_favorites: "/awyh/media/delMediaVideoFavorites",
  saveComment: "/awyh/media/saveMediaVideoCommen",
  mediaUserInfo: "/awyh/media/mediaUserInfo",

  //视频集
  getMediaVideoMapById: "/awyh/media/getMediaVideoMapById",
  getMediaVideoList: "/awyh/media/getMediaVideoList",
  getMediaOtherVideoList: "/awyh/media/getMediaOtherVideoList",
};
export default {
  //医媒视频-详情
  mediaVideo: function (data) {
    let url = activityInterfaces.mediaVideo;
    return request.post(url,data);
  },
  //医媒视频-点赞
  mediaLike: function (data) {
    let url = activityInterfaces.mediaLike;
    return request.post(url,data);
  },
  //医媒视频-精彩评论
  getComments: function (data) {
    let url = activityInterfaces.getComments;
    return request.post(url,data);
  },
  //医媒视频-收藏
  add_favorites: function (data) {
    let url = activityInterfaces.add_favorites;
    return request.post(url,data);
  },
  //医媒视频-取消收藏
  del_favorites: function (data) {
    let url = activityInterfaces.del_favorites;
    return request.post(url,data);
  },
  //医媒视频-保存评论
  saveComment: function (data) {
    let url = activityInterfaces.saveComment;
    return request.post(url,data);
  },
  //医媒视频-获取医媒信息
  mediaUserInfo: function (data) {
    let url = activityInterfaces.mediaUserInfo;
    return request.post(url,data);
  },

  //视频集--获取视频集信息
  getMediaVideoMapById: function (data) {
    let url = activityInterfaces.getMediaVideoMapById;
    return request.post(url, data);
  },
  //视频集--获取视频集全部视频
  getMediaVideoList: function (data) {
    let url = activityInterfaces.getMediaVideoList;
    return request.post(url, data);
  },
  //视频集--获取视频集信息其他视频集
  getMediaOtherVideoList: function (data) {
    let url = activityInterfaces.getMediaOtherVideoList;
    return request.post(url, data);
  },
};

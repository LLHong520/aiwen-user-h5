//主页模块
const videoMarket = resolve => require(["../pages/video_market/video_market"], resolve);
const Video = resolve => require(["../pages/video/video"], resolve);

export default [
  {
    path: "/media/market/:id",
    name: "videoMarket",
    component: videoMarket,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"视频集"
    }
  },
  {
    path: "/media/video/:id",
    name: "Video",
    component: Video,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"视频"
    }
  },
];


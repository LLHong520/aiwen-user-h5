//个人中心
const UserCenter = resolve => require(["../pages/user/user_center/user_center"], resolve);
const UserTopics = resolve => require(["../pages/user/user_topics/topics"], resolve);
const UserMoments = resolve => require(["../pages/user/user_moments/moments"], resolve);

// const Login = resolve => require(["../pages/login/login"], resolve);
const EditNikename = resolve => require(["../pages/edit_nikename/edit_nikename"], resolve);
const bindMobile = resolve => require(["../pages/bind_mobile/bind_mobile"], resolve);

const Mine = resolve => require(["../pages/mine/mine"], resolve);
const MyFavours = resolve => require(["../pages/my_favour/my_favours"], resolve);
const MyMessage = resolve => require(["../pages/my_message/my_message"], resolve);
const Myavatars = resolve => require(["../pages/my_avatars/my_avatars"], resolve);
const MyActivity = resolve => require(["../pages/my_activity/my_activity"], resolve);
const MyService = resolve => require(["../pages/my_service/my_service"], resolve);
const MyCourse = resolve => require(["../pages/my_course/my_course"], resolve);
const MySubscribe = resolve => require(["../pages/my_subscribe/my_subscribe"], resolve);


export default [
  {
    path: "/u/:id",
    component: UserCenter,
    meta: {
      needLogin: true,
      messageOn: true,
      title: "个人资料"
    },
    children: [
      {
        path: "",
        name: "User.topics",
        component: UserTopics,
        meta: {
          needLogin: true,
          messageOn: true,
          title: "个人帖子"
        }
      },
      {
        path: "moments",
        name: "User.moments",
        component: UserMoments,
        meta: {
          needLogin: true,
          messageOn: true,
          title: "个人圈子"
        }
      }
    ]
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   component: Login,
  //   meta: {
  //     needLogin: false,
  //     messageOn: false,
  //     title: "用户登录"
  //   }
  // },
  {
    path: "/nike_name",
    name: "EditNikename",
    component: EditNikename,
    meta: {
      needLogin: true,
      messageOn: false,
      title: "修改昵称"
    }
  },
  {
    path: "/bind_mobile",
    name: "bindMobile",
    component: bindMobile,
    meta: {
      needLogin: true,
      messageOn: false,
      title: "绑定手机"
    }
  },
  {
    path: "/mine",
    name: "Mine",
    component: Mine,
    meta: {
      needLogin: true,
      messageOn: false,
      title: "个人中心"
    }
  }, {
    path: "/u_msg",
    name: "MyMessage",
    component: MyMessage,
    meta: {
      needLogin: true,
      messageOn: false,
      title: "我的消息"
    }
  },
  {
    path: "/my/activity",
    name: "MyActivity",
    component: MyActivity,
    meta: {
      needLogin: true,
      messageOn: false,
      title: "我的活动"
    }
  },
  {
    path: "/u_avaters",
    name: "Myavatars",
    component: Myavatars,
    meta: {
      needLogin: true,
      messageOn: false,
      title: "账号管理"
    }
  },
  {
    path: "/my/favours",
    name: "Mine.favours",
    component: MyFavours,
    meta: {
      needLogin: true,
      messageOn: true,
      title: "我的收藏"
    }
  },
  {
    path: "/my/service",
    name: "Mine.service",
    component: MyService,
    meta: {
      needLogin: true,
      messageOn: true,
      title: "我的服务"
    }
  }, {
    path: "/my/course",
    name: "Mine.course",
    component: MyCourse,
    meta: {
      needLogin: true,
      messageOn: true,
      title: "我的课堂"
    }
  }, 
  {
    path: "/my/subscribe",
    name: "Mine.subscribe",
    component: MySubscribe,
    meta: {
      needLogin: true,
      messageOn: true,
      title: "我的订阅"
    }
  }
];

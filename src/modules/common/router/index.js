//公用模块
import Search from "../pages/search/search";
import Callback from "../pages/callback/callback";
const page404 = resolve => require(["../pages/404/404"], resolve);
const nonExistentArt = resolve => require(["../pages/non-existent-art/non-existent-art"], resolve);
const Login = resolve => require(["../pages/login/login"], resolve);
const nikeName = resolve => require(["../pages/edit_nikename/edit_nikename"], resolve);
const logout = resolve => require(["../pages/logout/logout"], resolve);
const Redirect = resolve => require(["../pages/redirect"], resolve);
export default [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      needLogin: false,
      messageOn:false,
      title:"用户登录"
    }
  },
  {
    path: "/logout",
    name: "logout",
    component: logout,
    meta: {
      needLogin: false,
      messageOn:false,
      title:"退出登录"
    }
  },
  {
    path: "/nike_name",
    name: "nikeName",
    component: nikeName,
    meta: {
      needLogin: false,
      messageOn:false,
      title:"编辑昵称"
    }
  },
  {
    path: "/search",
    name: "search",
    component: Search,
    meta: {
      needLogin: false,
      messageOn:true,
      title:"搜索"
    }
  },
  {
    path: "/callback",
    name: "Callback",
    component: Callback,
    meta: {
      needLogin: false
    }
  },
  {
    path: "/404",
    name: "404",
    component: page404,
    meta: {
      needLogin: false,
      messageOn:false,
      title:"提示信息"
    }
  },
  {
    path: "/non/existent/:type",
    name: "nonExistentArt",
    component: nonExistentArt,
    meta: {
      needLogin: false,
      messageOn:false,
      title:"文章详情"
    }
  },
  {
    path: "/redirect/:index",
    name: "Redirect",
    component: Redirect,
    meta: {
      needLogin: false,
      messageOn:false,
      title:"跳转中..."
    }
  },
];

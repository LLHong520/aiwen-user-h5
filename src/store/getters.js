//是否昵称编辑过
export const isNickEdited = state => {
  if(state.userInfo){
    //如果是马甲 不检测
    if(state.userInfo.memberType==3){
      return true;
    }else if (state.userInfo.isNickEdited&&state.userInfo.isNickEdited==1) {
      //已经编辑昵称
      return true;
    }else{
      //没编辑昵称
      return false;
    }
  }else{
    return false;
  }
};

//是否已经绑定手机
export const isBindMobile = state => {
  let is = false;
  if(state.userInfo){
    //如果是马甲 不检测
    if(state.userInfo.memberType==3){
      is = true;
    }else{
      let phoneNumber = state.userInfo.phoneNumber || "";
      let phoneNum = state.userInfo.phoneNum || "";
      if (phoneNum != "") {
        is = true;
      }
      if (phoneNumber != "") {
        is = true;
      }
    }
  }
  return is;
};


//是否是马甲账号
export const isBindAccount = state => {
  if(state.userInfo){
    if((state.userInfo.memberType==2||state.userInfo.memberType==3)&&state.userInfo.status=="normal"){
      return true;
    }else{
      return false;
    }
  }else{
    return false;
  }
};

//是否登录
export const islogin = state => {
  if (state.userInfo && state.userInfo!=null) {
    return true;
  }else{
    return false;
  }
};
//是否当前应用运行在新浪健康App内
export const isInSinaHealthApp = state => {
  let is = false;
  if (state.sinaAppQueryString){
    if (state.sinaAppQueryString.isApp == 2 || state.sinaAppQueryString.isApp == "20190123"){
      is= true;
    }
    if (state.sinaAppQueryString.isApp == "20140123") {
      is= true;
    }
  }
  return is;
};

//是否当前应用运行在爱问健康App内
export const isInIwenApp = state => {
  let is = false;
  if (state.sinaAppQueryString){
    if (state.sinaAppQueryString.isApp == "20140123") {
      is= true;
    }
  }
  return is;
};


export const healAppInfo = state => {
  let infos = {
    iaskpatient: {
      name: "爱问健康",
    },
    sinahealth: {
      name: "新浪健康",
    }
  };
  return infos[state.appScheme];
};
//新浪健康App是否在审核中
export const isSinaHealthAppForceIng = state => {
  // return false;
  return state.sinaAppQueryString && state.sinaAppQueryString.forceIng && state.sinaAppQueryString.forceIng == "true" ? true : false;
};
//是否在新浪健康快应用内
export const isInHapHealApp = state => {
  return window.iwenJSNativeBridge.platformInfo.isHapApp;
};

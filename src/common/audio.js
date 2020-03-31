(function () {
  function audioMsg(options) {
    this.allAudiosLi = this.findAll();
    this.allAudios = [];
    this.options = options || {
      reverse: false
    };
    this.initAll();
  }

  //找到所有的消息条目
  audioMsg.prototype.findAll = function () {
    var allAudiosLi = document.querySelectorAll(".audio-msg");
    return allAudiosLi;
  };
  //刷新方法
  audioMsg.prototype.refresh = function () {
    this.allAudiosLi = this.findAll();
    this.initAll();
  };

  //初始化所有语音条目
  audioMsg.prototype.initAll = function () {
    var allAudiosLi = this.allAudiosLi;
    for (var i = 0; i < allAudiosLi.length; i++) {
      // console.log(allAudiosLi);
      this.initItem(allAudiosLi[i]);
    }
  };
  //暂停其他的语音
  audioMsg.prototype.setOtherStop = function () {
    var allAudios = this.allAudios;
    for (var i = 0; i < allAudios.length; i++) {
      var item = allAudios[i];
      // if(!item.msgPlaying){
      item.pause();
      // }
    }
  };
  //判断是否有某个样式
  audioMsg.prototype.hasClass = function (item, className) {
    return item.classList.contains(className);
  };


  audioMsg.prototype.getPlayBtn = function () {
    var playbtn = document.createElement("span");
    playbtn.className = "audio-block";
    if (this.options.reverse) {
      playbtn.className += " reverse";

    }
    return playbtn;
  };

  audioMsg.prototype.getPlayDuration = function (item) {
    var duration = document.createElement("span");
    duration.className = "audio-duration";
    duration.innerHTML = item.getAttribute("duration") + "''";
    return duration;
  };

  audioMsg.prototype.getDurationStr = function (item) {
    let duration = item.getAttribute("duration");
    return duration;
  };

  //初始化音频播放器
  audioMsg.prototype.initItem = function (item) {
    if (this.hasClass(item, "inited")) return;
    var This = this;
    var audioWrapper = document.createElement("div");
    audioWrapper.className = "audio-wrapper";
    var audio = document.createElement("audio");
    var src = item.getAttribute("src");
    var duration = item.getAttribute("duration");
    audio.src = src;
    this.allAudios.push(audio);

    var playBtn = This.getPlayBtn();
    var durationNum = This.getPlayDuration(item);
    // console.dir(audio);
    audio.playBtn = playBtn;
    var childArr = [playBtn, durationNum, audio];
    if (this.options.reverse) {
      childArr.reverse();
      item.style.textAlign = "right";
    }
    for (var i = 0; i < childArr.length; i++) {
      audioWrapper.appendChild(childArr[i]);
    }
    item.appendChild(audioWrapper);
    item.classList.add("inited");
    var msgWidth = duration * 350 / 60 > 60 ? duration * 350 / 60 : 60;
    console.log(msgWidth);
    audioWrapper.style.width = msgWidth + "px";
    item.onclick = function () {
      if (audio.paused) {
        This.setOtherStop();
        audio.currentTime = 0;
        //   setTimeout(() => {
        //      audio.currentTime = 222;
        //   }, 2000);
        audio.play();
      } else {
        audio.pause();
      }
    };

    audio.onpause = function () {
      audio.parentNode.parentNode.classList.remove("playing");
    };
    audio.onplay = function () {
      audio.parentNode.parentNode.classList.add("playing");
    };

    audio.onended = function () {
      audio.parentNode.parentNode.classList.remove("playing");
    };
  };

  window.IWENAudioMsg = audioMsg;

})();
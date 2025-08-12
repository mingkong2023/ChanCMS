
const demoVideo = () => {
    //创建一个语音合成对象
    const createUtterance = () => {
      // 创建合成对象
      const utterance = new SpeechSynthesisUtterance();
      // 设置要朗读的文本
      utterance.text = "今天星期六！明天也不用上班！";
      utterance.lang = "zh-CN";
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.onend = () => {
        console.log("语音已经阅读完毕");
      };
      utterance.onboundary = () => {
        console.log("当前句子、词已经朗读完毕");
      };
      utterance.onerror = () => {
        console.log("播报错误");
      };
      utterance.onmark = () => {
        console.log("检测到mark标签");
      };
      utterance.onpause = () => {
        console.log("语音被暂停了");
      };
      utterance.onresume = () => {
        console.log("语音重新播放了");
      };
      utterance.onstart = () => {
        console.log("开始播放语音");
      };
      return utterance;
    };
  
  
   window.speechSynthesis.speak(createUtterance());
  }
  
  demoVideo();
  
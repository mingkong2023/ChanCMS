function toSearch() {
    var keywords = document.querySelectorAll('.search-input')[0].value || document.querySelectorAll('.search-input')[1].value;
    if (keywords) {
        location.href = location.origin + '/search/' + keywords + '/words.html'
    }
}



document.querySelectorAll('.search-input').forEach((item) => {
    item.addEventListener('keyup', function (event) {
        console.log(event)
        event.stopPropagation()
        if (event.keyCode == 13) {
            event.preventDefault();
            toSearch()
        }
    })
});


document.querySelectorAll('.search-wrap').forEach((item) => {
    item.addEventListener('click',function(event){
        event.stopPropagation()
    })
});


(function audio() {
    let ele = document.querySelector('#audio');
    let article = document.querySelector('#article');
    if (article && ele) {
        if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
            ele.style.display = 'none';
        } else {
            let speech = new SpeechSynthesisUtterance();
            let voices = window.speechSynthesis.getVoices(); // 获取语言包
            let progressText = document.querySelector('#article');
            speech.voice = voices[1]; // 18：普通话
            speech.pitch = 0.1; //获取并设置话语的音调 (值越大越尖锐，range:0-2, default:1, float)
            speech.rate = 1;// 获取并设置说话的速度 (值越大语速越快, range:0.1-10, default:1, float)
            speech.volume = 1; // 获取并设置说话的音量 (range: 0-1, default:1, float)
            speech.lang = "zh-CN"; // 设置播放语言，测试没效果
            speech.voiceURI = 'Google 普通话（中国大陆）';
            speech.text = document.querySelector('#article').innerHTML

            // 语音播报边界事件处理程序
            speech.onboundary = (e) => {
                // 获取边界索引或其它标识
            };

            // 错误语音播报事件
            speech.onerror = () => {
                // console.log("错误语音播报事件")
            }
            // 标记语音播报事件
            speech.onmark = () => {
                console.log("onmark", e)
            }
            // 语音开始播报
            speech.onstart = (a, b, c) => {
                console.log(a, b, c, "a,b,c")
                // console.log("语音开始播报")
            }
            // 语音暂停播报
            speech.onpause = () => {
                // console.log("语音暂停播报")
            }
            // 语音恢复播报
            speech.onresume = () => {
                // console.log("语音恢复播报")
            }
            // 语音结束播报
            speech.onend = () => {
                // console.log("语音播报结束")
                document.querySelector('#audio').classList.remove('on');
            }

            // speechSynthesis.pause(); 暂停
            // speechSynthesis.resume();继续

            document.querySelector('#audio').addEventListener('click', function () {
                var hasOnClass = this.classList.contains('on');
                if (hasOnClass) {
                    this.classList.remove('on');
                } else {
                    this.classList.add('on');
                }
                if (speechSynthesis.speaking) {
                    speechSynthesis.cancel();
                } else {
                    speechSynthesis.speak(speech)
                }
            })

            window.onbeforeunload = function () {
                speechSynthesis.cancel();
            }
        }
    }
}());




; (function backToTop() {
    // 获取返回顶部按钮元素
    const btn = document.querySelector('.backtop');

    document.addEventListener("scroll", (e) => {
        // 获取当前页面的scrollTop值
        const scrollTop = document.documentElement.scrollTop;
        if (scrollTop > 670) {
            btn.classList.remove("none")
        } else {
            btn.classList.add("none")
        }
    })



    // 监听按钮的点击事件
    btn?.addEventListener('click', () => {
        // 将页面滚动到顶部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    })
}());

var swiper = new Swiper(".mySwiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
});

document.querySelector('.ico-open').addEventListener('click', function () {
    document.querySelector('.m-mask').classList.remove("none")
})

document.querySelector('.m-mask').addEventListener('click', function () {
    this.classList.add("none")
})



;(// 获取所有的 <pre> 元素并添加 line-numbers 类
document.querySelectorAll("pre").forEach(function (preElement) {
    preElement.classList.add("line-numbers");

    // 设置复制提示属性
    preElement.dataset.prismjsCopy = "复制代码";
    preElement.dataset.prismjsCopyError = "按Ctrl+C复制";
    preElement.dataset.prismjsCopySuccess = "代码已复制！";
}));


//显示api
;(
   function(){
    if(location.search.includes('debug') && location.search.includes('true')){
        document.querySelector('.api').classList.remove("api")
    }
   }()
);


// 导航加active 高亮
;(function () {
    function buildUrlsFromArray(fileName = "index.html") {
      let url = location.pathname.split("/");
      let filterUrl = url.filter((item) => item != "" && !item.endsWith(".html"));
      const urls = [];
      for (let i = 0; i < filterUrl.length; i++) {
        let finalPath = "/" + filterUrl.slice(0, i + 1).join("/");
        urls.push(finalPath + "/" + fileName);
      }
      return urls;
    }
  
    function setActiveNav(paths) {
      paths.forEach(function (path) {
        var element = document.querySelector('a[href="' + path + '"]');
        if (element) {
          element.parentNode.classList.add("active");
        }
      });
    }
  
    var url =
      location.pathname == "/"
        ? [...buildUrlsFromArray(), ...buildUrlsFromArray("page.html"), "/"]
        : [...buildUrlsFromArray(), ...buildUrlsFromArray("page.html")];
    setActiveNav(url);
  })();
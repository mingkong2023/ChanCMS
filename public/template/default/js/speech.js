
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

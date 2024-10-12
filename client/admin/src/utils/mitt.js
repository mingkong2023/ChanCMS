/**
 * mitt使用文档
 * 使用场景：组件嵌套过深入或者与其它非vue框架嵌套使用时候，进行数据监听传递。比如 点击canvas界面某个按钮，通知vue组件更新接口。
 *  on('change',fn) 监听事件，接受入参，调用其它方法
 *  emit('change',{name:'明空'}) 发送事件，传递入参
 *  off('change',fn) 解除监听，比如组件销毁场景使用
 *
 *  import mitt from '@/utils/mitt.js'
 * 
 *  // 定义一个打招呼的方法
    const sayHi = (msg)=> {
      console.log(msg);
    }

    // 启用监听
    mitt.on('sayHi', sayHi);

    // 在组件卸载之前移除监听
    onBeforeUnmount( () => {
      mitt.off('sayHi', sayHi);
    })

    // 调用打招呼事件，传入消息内容
    mitt.emit('sayHi', '哈哈哈哈哈哈哈哈哈哈哈哈哈哈');
 */

import mitt from "mitt";
export default mitt();

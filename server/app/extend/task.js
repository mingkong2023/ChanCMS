
const schedule = require('node-schedule');
/**
 * @description 定时任务管理
 * @example 
 *
 */

// new TaskList().addTask('test', '*/1 * * * *', () => { console.log('test') })
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

// const taskList = new TaskList();
// taskList.add({ id: 'dailyReminder', job: () => console.log('Good morning!'), cron: '0 8 * * *' });

class TaskList {

    static instance = null;
    tasks = {};// 任务列表

    constructor() {
        if (TaskList.instance) {
            return TaskList.instance;
        }
        TaskList.instance = this;
    }

    /**
     * @description 添加任务
     * @param {job} 执行方法
     * @param {ID} 任务ID 
     * @param {cron} 定时任务表达式
     */
    add({id,job,cron}){
        if(this.tasks.hasOwnProperty(id)){
            console.log('任务ID已存在');
            return;
        }else{
            this.tasks[id] = schedule.scheduleJob(cron, ()=>{
                job();
            });

            //start 
            this.tasks[id].on("scheduled",()=>{
                console.log(`任务已启动: ${id}`);
            });

            //run
            this.tasks[id].on("run",()=>{
                console.log(`任务执行中: ${id}`);
            });

            //success
            this.tasks[id].on("success",(data)=>{
                console.log(`任务ID: ${id} 执行结果：${data}`);
            });

            //异常
            this.tasks[id].on("error",(err)=>{
                console.log(`[error][${new Date().toLocaleString()}]${err.message}`);
            });

            //计划被取消
            this.tasks[id].on("canceled",()=>{
                console.log(`任务ID: ${id} 已被取消`);
            })
        }
    }

    /**
     * @description 停止任务
     * @param {*} id 任务ID
     */
    remove(id) {
        if (this.tasks.hasOwnProperty(id)) {
          this.tasks[id].cancel();
          delete this.tasks[id];
        } else {
          console.log('定时任务已经停止');
        }
      }
    
     /**
      * @description 清除所有任务
      */ 
    clearAll() {
        Object.keys(this.tasks).forEach(id => {
            this.remove(id);
        });
        schedule.gracefulShutdown();
    }

}

module.exports = TaskList;
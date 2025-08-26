import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');


/**
 * @description 格式化时间
 * @param {Array} data 数组
 * @param {Boolean} time 是否开启具体时间
 * @param {String} format YYYY-MM-DD HH:mm:ss
 * @returns 返回处理过的数组
 */
export function formatDay(data, time = true, format = "YYYY-MM-DD") {
  data.forEach((item) => {
    if (item.createdAt) {
      item.createdAt = time
        ? dayjs(item.createdAt).format(format)
        : dayjs(item.createdAt).fromNow().replace(" ", "");
    }
  });
  return data;
}
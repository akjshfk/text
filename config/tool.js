/**
 *  工具函数封装
 *  author: LiuShunLi
 *  date: 2018-6-23
 *  version: v0.1
 **/

/**
 * 倒计时 
 **/
export const countDown = (func, time = 60) => {
    const total = time;
    const timer = setInterval(() => {
      console.log(78999)
        if (time >= 0) {
            time --;
            typeof func == 'function' && func();
        } else {
            time = total;
            clearInterval(timer);
        }
    }, 1000)
}

/* @description 正则验证
 * @param {String} val 要验证的值
 * @param {String} type 要验证的类型
 * [type可能的值为：notEmpty值不为空、phone手机号、sixFigures六位数字]
 * 根据需求继续扩展
 **/
export const u_Reg = (val, type) => {
  switch (type) {
    // 值不为空
    case 'notEmpty':
      return val && val.length > 0 && !/^\s/.test(val);
      break;
    // 验证手机号
    case 'phone':
      return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(val);
      break;
    // 六位数字  
    case 'sixFigures':
      return /^\d{6}$/.test(val);
      break;
    // 登录密码  
    case 'loginPass':
      return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z~!@&%$^\\(\\)#_.]{6,16}$/.test(val);
      break;
    default:
      alert('函数type参数不匹配');
      break;
  }
}

/* @description 格式化剩余时间
 * @param {String} endTime 结束日期
 * @return {Object} d:剩余天数、h:小时数、m:分钟数、s:秒数
 **/
export const u_formatRemainTime = (endTime) => {
  const startDate = new Date(), //开始时间
    endDate = new Date(endTime), //结束时间
    t = endDate.getTime() - startDate.getTime(); //时间差
  let d = 0,
    h = 0,
    m = 0,
    s = 0;
  if (t >= 0) {
    d = formatNumber(Math.floor(t / 1000 / 60 / 60 / 24));
    h = formatNumber(Math.floor(t / 1000 / 60 / 60 % 24));
    m = formatNumber(Math.floor(t / 1000 / 60 % 60));
    s = formatNumber(Math.floor(t / 1000 % 60));
  }
  return {
    d, h, m, s
  }
}

/* @description 时间戳转换
 * @param {String} time 要转换的时间戳
 * @param {String} conf 配置参数
 * @return {Object} "all"返回年月日时分秒，"ymd"返回年月日，"ymdhm"返回年月日时分
 **/
export const u_formatTimestamp = (time, conf) => {
  let config = Object.assign({
    type: 'all', // 转换类型，"all"、"ymd"、"md"、"ymdhm"、"hm"
    markFrot: ".", // 年月日的连接符，默认“-”
    markBack: ":" // 时分秒的连接符，默认“:”
  }, conf);
  let date = new Date(time),
    year = date.getFullYear(),
    month = formatNumber(date.getMonth() + 1),
    day = formatNumber(date.getDate()),
    hour = formatNumber(date.getHours()),
    minute = formatNumber(date.getMinutes()),
    second = formatNumber(date.getSeconds());
  switch (config.type) {
    case "ymd":
      return `${year}${config.markFrot}${month}${config.markFrot}${day}`;
      break;
    case "md":
      return `${month}月${day}日`;
      break;
    case "ymdhm":
      return `${year}${config.markFrot}${month}${config.markFrot}${day} ${hour}${config.markBack}${minute}`;
      break;
    case "hm":
      return `${hour}${config.markBack}${minute}`;
      break;
    default:
      return `${year}${config.markFrot}${month}${config.markFrot}${day} ${hour}${config.markBack}${minute}${config.markBack}${second}`;
      break;
  }
}

// 将一位数转换成0开头，例如： 1->01，0->09
export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


/**
 * 将数字保留n位小数
*/
export const u_fixed = (val, n = 2) => {
  return (val - 0).toFixed(n);
}

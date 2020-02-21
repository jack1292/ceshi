import Vue from 'vue'
import vue from '../main'
import md5 from 'js-md5';
import wx from 'weixin-js-sdk'

const jsApiList = ['updateAppMessageShareData', 'updateTimelineShareData', 'chooseWXPay']

function getJSSDK(url, title, img, share, name) {
  let link = share && name ? share : location.href.split('#')[0]
  let desc = share && name ? '您的好友' + name + '给您推荐了一个优秀职位:'+title+'，请点击查看。' : '诚邀请您查看' + title + '介绍'
  console.log(title)
  if (title === '诚邀您浏览择贤招聘网') {
    desc = title
  }
  vue.$api.apiContent.wxConfig({
    url: url
  })
    .then(res => {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.appId, // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名
        jsApiList: jsApiList // 必填，需要使用的JS接口列表
      })
      wx.ready(function () {
        wx.updateAppMessageShareData({
          title: '择贤招聘', // 分享标题
          desc: desc, // 分享描述
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://zexian.org.cn/logo.png', // 分享图标
          success: function () {
            // 设置成功
          }
        })
        wx.updateTimelineShareData({
          title: '择贤招聘', // 分享标题
          link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://zexian.org.cn/logo.png', // 分享图标
          success: function () {
            // 设置成功
          }
        })
      })
      wx.error(function (res) {
        console.log(res)
      });
    })
}

// 时间戳转时间 now：当前时间  type:1 年月日时分秒  else
function ZHDate(now, type) {
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  if (type === 1) {
    return year + "-" + getzf(month) + "-" + getzf(date) + "  " + getzf(hour) + ":" + getzf(minute)
  } else if (type === 2) {
    return getzf(hour) + ":" + getzf(minute)
  } else if (type === 6) {
    return year + "-" + getzf(month) + "-" + getzf(date) + "  " + getzf(hour) + ":" + getzf(minute) + ":" + getzf(second)
  } else if (type === 7) {
    return year + "-" + getzf(month) + "-" + getzf(date) + "  " + getzf(hour) + ":" + getzf(minute)
  } else if (type === 8) {
    return month + "月" + getzf(date) + '日'
  } else if (type === 9) {
    return year + "-" + getzf(month)
  } else {
    return year + "-" + getzf(month) + "-" + getzf(date)
  }
}

function getzf(num) {
  if (parseInt(num) < 10) {
    num = '0' + num;
  }
  return num;
}

//时间转为刚刚，几分钟前，几小时前，几天前
function setDate(dateTimeStamp) {  // dateTimeStamp 时间戳
  let minute = 1000 * 60
  let hour = minute * 60
  let day = hour * 24
  // let halfamonth = day * 15
  let month = day * 30

  if (dateTimeStamp == undefined) {

    return false
  } else {

    let sTime = dateTimeStamp

    let now = new Date().getTime()//获取当前时间的时间戳

    let diffValue = now - sTime

    if (diffValue < 0) {
      console.log("结束日期不能小于开始日期！")
    }

    let monthC = diffValue / month;
    let weekC = diffValue / (7 * day);
    let dayC = diffValue / day;
    let hourC = diffValue / hour;
    let minC = diffValue / minute;

    if (monthC >= 1) {
      return ZHDate(new Date(sTime))
    } else if (weekC >= 1) {
      return parseInt(weekC) + "周前"
    } else if (dayC >= 1) {
      return parseInt(dayC) + "天前"
    } else if (hourC >= 1) {
      return parseInt(hourC) + "个小时前"
    } else if (minC >= 1) {
      return parseInt(minC) + "分钟前"
    } else {
      return "刚刚"
    }
  }

}

function checkRequired(text) {   //验证手机号
  if (text === '' || text === undefined || text === null) {
    return true
  } else {
    return false
  }
}

function checkTel(tel) {   //验证手机号
  if (!(/^1[3456789]\d{9}$/.test(tel))) {
    return true
  } else {
    return false
  }
}

function checkCode(code) { //验证验证码
  if (code.toString().length === 6) {
    return false
  } else {
    return true
  }
}

function checkEmail(email) { //验证邮箱
  var regEmail = /^[A-Za-z0-9._-\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (!regEmail.test(email)) {
    return true
  } else {
    return false
  }
}

function showToast(txt) {
  vue.$notify({
    message: txt,
  });
}



const tools = {
  ZHDate, // 时间戳转转化时间
  setDate, //  时间戳转刚刚 一天前
  checkTel, //  验证手机号
  checkEmail, //  邮箱验证
  checkCode,  //  验证验证码
  checkRequired,  //  验证必填
  showToast,
  getJSSDK
}


Vue.prototype.$md5 = md5;
Vue.prototype.$tools = tools;


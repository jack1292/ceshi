import vue from 'vue'
import axios from './axios'


// 全局接口
const apiContent = {
  // 获取首页轮播
  listAdPhone: (data) => {
    return axios('/Home/Index/getFocus', data)
  },
  //  首页风采
  getFengcai: (data) => {
    return axios('/Home/Index/getFengcai', data)
  },
  //  风格体验吧列表
  FengeList: (data) => {
    return axios('/Home/Style/getList', data)
  },
  //  风格体验吧详情
  fgDetail: (data) => {
    return axios('/Home/Style/detail', data)
  },
  //  登录
  login: (data) => {
    return axios('/Home/User/login', data)
  },
  //  注册
  regiser: (data) => {
    return axios('/Home/User/signup', data)
  },
  //  获取验证码
  getCode: (data) => {
    return axios('/Home/Index/sms_send', data)
  },
  //  获取个人信息
  getUserInfo: (data) => {
    return axios('/Home/User/getInfo', data)
  },
  //  上传头像
  upload: (data) => {
    return axios('/Home/Img/upload', data,'post', false)
  },
  //  设置个人信息
  setInfo: (data) => {
    return axios('/Home/User/setInfo', data)
  },
  //  修改手机号
  setPhone: (data) => {
    return axios('/Home/User/setPhone', data)
  },
  //  解绑微信
  unbindWx: (data) => {
    return axios('/Home/User/unbindWx', data)
  },
  //  我的账单
  money_log: (data) => {
    return axios('/Home/User/money_log', data)
  },
  //  我的预约单
  myOrder: (data) => {
    return axios('/Home/Order/myOrder', data)
  },
  //  评价
  pingjia: (data) => {
    return axios('/Home/Order/pingjia', data)
  },
  //  超市列表
  supermarkeList: (data) => {
    return axios('/Home/Company/getList', data)
  },
  //  机构详情
  orgDetail: (data) => {
    return axios('/Home/Company/detail', data)
  },
  //  公司案例
  anli: (data) => {
    return axios('/Home/Company/anli', data)
  },
  //  设计师列表
  sheji: (data) => {
    return axios('/Home/Company/sheji', data)
  },
  //  用户评价
  getPingjia: (data) => {
    return axios('/Home/Company/getPingjia', data)
  },
  //  加入预约
  addCart: (data) => {
    return axios('/Home/Order/addCart', data)
  },
  //  案例详情
  anli_detail: (data) => {
    return axios('/Home/Company/anli_detail', data)
  },
  // 设计师详情
  sheji_detial: (data) => {
    return axios('/Home/Company/sheji_detial', data)
  },
  //  设计师案例
  sheji_anli: (data) => {
    return axios('/Home/Company/sheji_anli', data)
  },
  //  购物车列表
  OrderList: (data) => {
    return axios('/Home/Order/getList', data)
  },
  //  获取价钱
  preOrder: (data) => {
    return axios('/Home/Order/preOrder', data)
  },
  //  添加订单
  addOrder: (data) => {
    return axios('/Home/Order/addOrder', data)
  },
  //  进入超市判断
  isVisit: (data) => {
    return axios('/Home/User/isVisit', data)
  },
}
const api = {
  apiContent,

}
vue.prototype.$api = api
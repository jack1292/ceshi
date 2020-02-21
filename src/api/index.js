import vue from 'vue'
import axios from './axios'
import apiOrg from './org'
import apiMember from './member'
import apiLogin from './login'

// 全局接口
const apiContent = {
  // 获取可选择的地区
  region: (data) => {
    return axios('/phone/index/getCheckedCategoryDistrict', data)
  },
  //  获取类型
  classification: (data) => {
    return axios('/phone/index/classification', data)
  },
  //  获取轮播图
  //  获取首页职位列表
  listJob: (data) => {
    return axios('/phone/index/listJob', data)
  },
  //  新闻资讯列表
  getNewList: (data) => {
    return axios('/phone/Index/listNews', data)
  },
  //  新闻资讯详情
  newsDetail: (data) => {
    return axios('/phone/Index/showNews', data)
  },
  // 职位详情
  showJob: (data) => {
    return axios('/phone/index/showJob', data)
  },
  // 机构详情
  showOrg: (data) => {
    return axios('/phone/Organization/jigousel', data)
  },
  organizationInfo: (data) => {
    return axios('/phone/index/organizationInfo', data)
  },
  // 机构在招职位
  orgPosition: (data) => {
    return axios('/phone/Organization/zhiweilist', data)
  },
  //  动态列表
  listDynamicNews: (data) => {
    return axios('/phone/index/listDynamicNews', data)
  },
  //  发布动态
  addDynamicNews: (data) => {
    return axios('/phone/index/addDynamicNews', data)
  },
  // 动态点赞、或者踩
  zanORCaiDynamicNews: (data) => {
    return axios('/phone/index/zanORCaiDynamicNews', data)
  },
  // 动态新闻详情
  showDynamicNews: (data) => {
    return axios('/phone/index/showDynamicNews', data)
  },
  // 站内信列表
  inside: (data) => {
    return axios('/phone/index/inside', data)
  },
  // 站内信详情
  insidecont: (data) => {
    return axios('/phone/index/insidecont', data)
  },
  // 站内信详情2
  insidecont2: (data) => {
    return axios('/phone/index/insideSendContent', data)
  },
  // 站内信回复
  replyinside: (data) => {
    return axios('/phone/index/replyinside', data)
  },
  //  我发的站内信
  mypostZnx: (data) => {
    return axios('/phone/index/insideSend', data)
  },
  //  分享
  wxConfig: (data) => {
    return axios('/phone/Common/shareContent', data)
  },
  // 轮播
  listAdPhone: (data) => {
    return axios('/phone/index/listAdPhone', data)
  },
  getInsideLettersNoReadCount: (data) => {
    return axios('/phone/index/getInsideLettersNoReadCount', data)
  },
  //  获取用户openid
  getUserOpenId: (data) => {
    return axios('/phone/Account/getUserOpenId', data)
  },
  //  获取推荐的人
  recommendCandidateList: (data) => {
    return axios('/phone/Connectpeople/recommendCandidateList', data)
  },
  recommendOrgList: (data) => {
    return axios('/phone/Connectpeople/recommendOrgList', data)
  },
  //  获取添加好友列表
  applyAddFriendList: (data) => {
    return axios('/index/Wangyi/applyAddFriendList', data)
  },
  addFriend: (data) => {
    return axios('/index/Wangyi/addFriend', data)
  },
  //  判断俩人是否是好友
  checkFriend: (data) => {
    return axios('/index/Wangyi/checkFriend', data)
  },
  applyAddFriend: (data) => {
    return axios('/index/Wangyi/applyAddFriend', data)
  },
  //  获取会员套餐
  getSetMealList:(data) => {
    return axios('/index/Vip/getSetMealList',data)
  },
  //  获取会员信息
  getUserVipInfo:(data) => {
    return axios('/index/Vip/getUserVipInfo',data)
  },
  //  购买会员 微信
  buySetMealWechat:(data) => {
    return axios('/index/Vip/buySetMealWechat',data)
  },
  //  购买会员 对公转
  transferResultVip:(data) => {
    return axios('/index/Vip/transferResultVip',data)
  },
  //  微信支付获取openid
  WechatRechargeOrgPhone:(data) => {
    return axios('/index/Vip/WechatRechargeOrgPhone',data)
  },
  //  判断用户是否可发布动态
  checkDynamicNewsAdd:(data) => {
    return axios('/index/other/checkDynamicNewsAdd',data)
  },
  //  删除动态
  delDynamicNews:(data) => {
    return axios('/phone/index/delDynamicNews',data)
  },
}
const api = {
  apiContent,
  apiOrg,
  apiMember,
  apiLogin
}
vue.prototype.$api = api
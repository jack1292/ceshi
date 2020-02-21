//
// let urlStr = 'http://192.168.2.250:8024' //
let urlStr = 'https://htjk.zexian.org.cn/' //
// let urlStr = 'http://tthtjk.zexian.org.cn' //
let localAnStore = [
  {// 用户名
    key: 'user',
    type: 'sessionStorage'
  },
  {//  用户角色
    key:'userType',
    type: 'cookie'
  },
  {//  用户标实
    key:'userToken',
    type: 'cookie'
  },
  {//  机构id
    key:'userId',
    type: 'cookie'
  },
  {//  用户邀请码
    key:'userCode',
    type: 'cookie'
  },
  {//  用户token im
    key:'sdktoken',
    type: 'cookie'
  },
  {//  用户id im
    key:'uid',
    type: 'cookie'
  },
  {// 当前的选中城市
    key: 'selectionAddress',
    type: 'sessionStorage'
  }
]
let defaultHeadImg = urlStr + '/' + 'uploads/images/man.jpg'
let defaultHeadImg2 = urlStr + '/' + 'uploads/images/nv.png'
export default {
  urlStr, // 域名地址
  localAnStore, // 存储地址
  defaultHeadImg, // 默认头像
  defaultHeadImg2 // 女
}
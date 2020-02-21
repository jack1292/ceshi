import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectionAddress:  {
      categoryname: "北京",
      city_id: 110000,
      parentid: 1,
      spell: "beijingshi"
    }, // 当前的选中城市，默认北京\
    user:null,    //  用户信息
    userType :'', //  用户角色
    userToken:'', //  用户标实
    // userPhone:'', //  用户手机号
    userCode:'',  //  用户邀请码
    userId:'',      //  机构id
    sdktoken:'',    //  im sdktoken
    uid:''          //  im uid
  },
  mutations: {

  },
  actions: {

  }
})

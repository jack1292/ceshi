import Vue from 'vue'
import Router from 'vue-router'
import orgRouter from './org'
import orgContentRouter from './orgContent'
import memberRouter from './member'
import memberContentRouter from './memberContent'
import nosignRouter from './nosign'
import nosignContentRouter from './nosignContent'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/nosign'
    },
    {
      path: '/nosign',
      component: () => import('../nosign/home'),
      children: nosignRouter,
    },
    {
      path: '/nosignContent',
      component: () => import('../nosign/contentBox'),
      children: nosignContentRouter,
    },
    {
      path: '/member',
      component: () => import('../member/home'),
      children: memberRouter,
    },
    {
      path: '/memberContent',
      component: () => import('../member/memberContent'),
      children: memberContentRouter,
    },
    {
      path: '/org',
      component: () => import('../org/home'),
      children: orgRouter,
    },
    {
      path: '/orgContent',
      component: () => import('../org/orgContent'),
      children: orgContentRouter,
    },
    {
      path: '/login',
      component: () => import('../login/home'),
      children: [
        {
          path: '',
          redirect: 'memberLogin'
        },
        {
          path: 'memberLogin', // 候选人登录
          meta:{
            title:'候选人登录'
          },
          component: () => import('../login/children/memberLogin')
        },
        {
          path: 'memberRegister', // 候选人注册
          meta:{
            title:'候选人注册'
          },
          component: () => import('../login/children/memberRegister')
        },
        {
          path: 'memberSetPass', // 候选人忘记密码
          meta:{
            title:'忘记密码'
          },
          component: () => import('../login/children/memberSetPass')
        },
        {
          path: 'memberBindPhone', // 绑定手机号
          meta:{
            title:'绑定手机号'
          },
          component: () => import('../login/children/memberBindPhone')
        },
        {
          path: 'orgLogin', // 机构登录
          meta:{
            title:'机构登录'
          },
          component: () => import('../login/children/orgLogin')
        },
        {
          path: 'orgRegister', // 机构注册
          meta:{
            title:'机构注册'
          },
          component: () => import('../login/children/orgRegister')
        },
        {
          path: 'orgSetPass', // 机构忘记密码
          meta:{
            title:'机构忘记密码'
          },
          component: () => import('../login/children/orgSetPass')
        },
        {
          path: 'orgBindPhone', // 绑定手机号
          meta:{
            title:'绑定机构'
          },
          component: () => import('../login/children/orgBindPhone')
        },
      ],
    },
    {
      path: '/agreement',
      meta:{
        title:'用户服务协议'
      },
      component: () => import('../login/agreement'),
    },

  ]
})


// let _cookie = {
//   _get: function (name) {
//     let _cookie = document.cookie;
//     let _start = _cookie.indexOf(name + "=");
//     if (_start != -1) {
//       _start += name.length + 1;
//       let _end = _cookie.indexOf(";", _start);
//       if (_end == -1) {
//         _end = _cookie.length;
//       }
//       return unescape(_cookie.substring(_start, _end));
//     }
//     return "";
//   }
// };

// 设立跳转免验证路由
// let noVerificationArr = ['login', 'nosign','nosignContent','agreement','memberContent/positionDetail','memberContent/orgDetail']
//
// // 设立导航守卫
router.beforeEach((to, from, next) => {
  // 目标正在前往强制跳转页，不需要拦截
  // let rs = false
  // noVerificationArr.map(item => {
  //   console.log(to.path.indexOf(item)!==-1)
  //   if (to.path.indexOf(item)!==-1) {
  //     rs = true
  //     next()
  //     return
  //   }
  // })
  // if (rs) {
  //   return
  // }
  // // 因为导航守卫会比 created 更早触发，所以要先获取本地数据
  // // let userType = _cookie._get('userType')
  // // 获取本地用户数据,当用户手动退出时，清空本地数据
  //
  // let user = JSON.parse(window.sessionStorage.getItem('user'))
  // if (user === null) {
  //   // 如果他曾经登录过机构端  sessionStorage ...
  //   // 如果用户没有登录，并且跳往的页面需要登录才能进入时，让他跳往登录页
  //   next({
  //     path: '/login/memberLogin'
  //   })
  // }
  // 如果上述条件都不符合，让其正常跳转
  const agent = navigator.userAgent
  const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  //console.log(to.path + ' == ' + location.pathname)
  if (isiOS && (to.path !== location.pathname) && location.pathname.length < 50) {
    location.assign(to.fullPath)
  } else {
    next()
  }
})

export default router
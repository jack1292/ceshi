import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base:"/web/",
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      meta:{
        title:'韵之装'
      },
      component: () => import('../page/home'),
      children: [
        {
          path: '',
          redirect: 'index'
        },
        {
          path: 'index',
          meta:{
            title:'韵之装'
          },
          component: () => import('../page/children/index'),
        },
        {
          path: 'daolan',
          meta:{
            title:'网站导览'
          },
          component: () => import('../page/children/daolan'),
        },
        {
          path: 'fenge',
          meta:{
            title:'风格体验吧'
          },
          component: () => import('../page/children/fenge'),
        },
        {
          path: 'user',
          meta:{
            title:'个人中心'
          },
          component: () => import('../page/children/user'),
        },
        {
          path: 'supermarket',
          meta:{
            title:'装修公司超市'
          },
          component: () => import('../page/children/supermarket'),
        },

      ],
    },
    {
      path: '/contents',
      component: () => import('../page/content'),
      children: [

        {
          path: 'fgDetail',
          meta:{
            title:'风格类型'
          },
          component: () => import('../page/children/fgDetail'),
        },
        {
          path: 'login',
          meta:{
            title:'登录'
          },
          component: () => import('../page/children/login'),
        },
        {
          path: 'xieyi',
          meta:{
            title:'用户协议'
          },
          component: () => import('../page/children/xieyi'),
        },
        {
          path: 'setPhone',
          meta:{
            title:'修改手机号'
          },
          component: () => import('../page/children/setPhone'),
        },
        {
          path: 'setName',
          meta:{
            title:'修改昵称'
          },
          component: () => import('../page/children/setName'),
        },
        {
          path: 'lianxiwomen',
          meta:{
            title:'联系我们'
          },
          component: () => import('../page/children/lianxiwomen'),
        },
        {
          path: 'myorder',
          meta:{
            title:'我的账单'
          },
          component: () => import('../page/children/myorder'),
        },
        {
          path: 'myyuyue',
          meta:{
            title:'我的预约单'
          },
          component: () => import('../page/children/myyuyue'),
        },
        {
          path: 'fangan',
          meta:{
            title:'方案详情'
          },
          component: () => import('../page/children/fangan'),
        },
        {
          path: 'pingjia',
          meta:{
            title:'评价'
          },
          component: () => import('../page/children/pingjia'),
        },
        {
          path: 'orgDetail',
          meta:{
            title:'公司详情'
          },
          component: () => import('../page/children/orgDetail'),
        },
        {
          path: 'orgText',
          meta:{
            title:'公司介绍'
          },
          component: () => import('../page/children/orgText'),
        },
        {
          path: 'orgAnliList',
          meta:{
            title:'案例列表'
          },
          component: () => import('../page/children/orgAnliList'),
        },
        {
          path: 'orgAnliDetail',
          meta:{
            title:'案例详情'
          },
          component: () => import('../page/children/orgAnliDetail'),
        },
        {
          path: 'orgSheji',
          meta:{
            title:'设计师详情'
          },
          component: () => import('../page/children/orgSheji'),
        },
        {
          path: 'mycard',
          meta:{
            title:'预约单'
          },
          component: () => import('../page/children/mycard'),
        },
        {
          path: 'orderother',
          meta:{
            title:'预约单'
          },
          component: () => import('../page/children/orderother'),
        },

      ],
    }
  ]
})


// // 设立导航守卫
router.beforeEach((to, from, next) => {
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
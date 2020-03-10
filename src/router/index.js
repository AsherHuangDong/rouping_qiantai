import Vue from 'vue'
import Router from 'vue-router'
import { dataSearch } from './dataSearch'
import { dataUpload } from './dataUpload'
import { homePage } from './homePage'
import { myDownload } from './myDownload'
import { myGroup } from './myGroup'
import { inform } from './inform'
import { informCenter } from './informCenter'
import { informDetail } from './informDetail'
import { personalCenter } from './personalCenter'
import { standard } from './standard'
import { standardDetail } from './standardDetail'


import { Message } from "iview";

import Login from '@/components/page/Login'
import register from '@/components/page/register'
import forgetThePassword from '@/components/page/forgetThePassword'
import supplement from '@/components/page/supplement'
Vue.use(Router);

const router = new Router({
  routes: [
    // 登录
    {
      path: '/',
      name: 'login',
      component: Login
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component: register
    },
    // 忘记密码
    {
      path: '/forgetThePassword',
      name: 'forgetThePassword',
      component: forgetThePassword
    },
    // 补充信息
    {
      path: '/supplement',
      name: 'supplement',
      component: supplement
    },
    {
      path: '/index',
      name: 'index',
      component: () => import("../components/page/index"),
      children: [
        dataSearch,
        dataUpload,
        homePage,
        myDownload,
        myGroup,
        inform,
        informCenter,
        informDetail,
        personalCenter,
        standard,
        standardDetail
      ]
    },
  ]
});
router.beforeEach((to, from, next) => {
  // console.log(to.path)
  // const permPathArr = JSON.parse(localStorage.getItem('permPath'))
  // const noPerm = ['/', '/index']
  // console.log(permPathArr);
  //console.log(permPathArr.indexOf(to.path))
  //if (permPathArr) {
  //   if (permPathArr.indexOf(to.path) !== -1 || noPerm.indexOf(to.path) !== -1) {
  //     sessionStorage.setItem('currentRoute', to.path)
  //     next()
  //     return null
  //   }
  //   Message.error('无权限操作');
  //   return null
  // }else{
  //   next();
  //   return null;
  // }
  console.log('to', to.path);
  if (to.path != "/" && to.path !='/register' && to.path != '/forgetThePassword') {
    if (localStorage.getItem('token') && localStorage.getItem('token') != null) {
      console.log('ffff')
      next();
    } else {
      window.newVue.$router.push('/')
      window.newVue.$Message.info("请先登陆");
      return null;
      //next();
    }
  } else {
    next();
  }

})



export default router

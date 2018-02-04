import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/homePage'      //主体页面
import systemConfig from './systemConfig'     //系统配置
import GoodluckManage from './GoodluckManage' //一路好运运营管理
import Partner from './Partner'               //合作方运营管理
import user from './user'                     //用户管理
import Freight from './Freight'               //运价管理
import vehicle from './vehicle'               //车辆管理
import tagHome from './tagHome'               //首页标签
import login from '@/components/login'
var routerConfig = [...tagHome, ...systemConfig, ...GoodluckManage, ...Partner, ...user, ...Freight, ...vehicle]

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/home/tagHome',
      children: routerConfig
    }
  ]
})

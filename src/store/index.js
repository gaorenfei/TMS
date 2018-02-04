import Vue from "vue";
//状态管理
import Vuex from "vuex";
// 使用Vuex
Vue.use(Vuex);

import login from "./modules/login";
import getters from "./getters";

//状态模块
var store = new Vuex.Store({
  modules: {
    login
  },
  getters
});

export default store;

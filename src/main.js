// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

// 引用elementUi库
import ElementUI from "element-ui";
// elementUI样式库
import "element-ui/lib/theme-default/index.css";
// 使用elementUi
Vue.use(ElementUI);

//axios配置导入
import Axios from "@/utils/axios";
//绑定全局
Vue.prototype.$http = Axios;

//导入状态管理模块
import vuexStore from "./store";

//阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;

import $ from "jquery";
window.$ = window.jquery = $;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store: vuexStore,
  template: "<App/>",
  components: { App }
});

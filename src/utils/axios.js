import axios from "axios";
import qs from "qs";

//对axios的配置
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.baseURL = "djtms";
//axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "/mock" : "";
// process.env.BASE_API;   //配置根接口地址

//POST传参序列化(添加请求拦截器)
// axios.interceptors.request
//   .use
// config => {
//   return config;
// },
// error => {
//   return Promise.reject(error);
// }
// ();

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    //对响应数据做些事
    // if(res.data.code == -10001) {
    //     MessageBox.alert('您已长时间未操作系统,请重新登录', '提示', {
    //         confirmButtonText: '确定',
    //         type: 'error',
    //         callback: action => {
    //             //localStorage.clear();
    //             // location.href = store.state.base.loginIp
    //         }
    //     })
    // }
    // if(res.data.code == -10002) {
    //     MessageBox.alert('抱歉,您无该权限,请于相关人员联系', '提示', {
    //         confirmButtonText: '确定',
    //         type: 'warning',
    //         callback: action => {

    //         }
    //     })
    // }
    return res;
  },
  error => {
    return error;
  }
);

export default axios;

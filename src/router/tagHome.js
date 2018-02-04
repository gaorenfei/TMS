/**
 * 首页
 */

let tagHomeConfig = [
    { path:'tagHome', name: 'tagHome', meta: { keepAlive:true }, component: resolve => require(['@/components/tagHome/tagHome'], resolve)},
    { path:'messageCenter', name: 'messageCenter', component: resolve => require(['@/components/tagHome/news'], resolve)},
] 
export default [...tagHomeConfig]
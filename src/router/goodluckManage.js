/**
 * 一路好运运营管理
 */


let GoodluckManage = [
  {
    path: 'TrafficManage',
    name: 'TrafficManage',
    meta: { hasSidebar: true },
    redirect: '/home/TrafficManage/WaybillManage',
    children: [
      { path: 'WaybillManage', name: 'WaybillManage', meta: { hh: true }, component: resolve => require(['@/components/GoodluckManage/TrafficManage/WaybillManage'], resolve) },
      { path: 'JourneyEvent', name: 'JourneyEvent', meta: { hh: true }, component: resolve => require(['@/components/GoodluckManage/TrafficManage/JourneyEvent'], resolve) },
      { path: 'AnomalousEvent', name: 'AnomalousEvent', meta: { hh: true }, component: resolve => require(['@/components/GoodluckManage/TrafficManage/AnomalousEvent'], resolve) },
      { path: 'BillManage', name: 'BillManage', meta: { hh: true }, component: resolve => require(['@/components/GoodluckManage/TrafficManage/BillManage'], resolve) },
    ],
    component: resolve => require(['@/components/GoodluckManage/TrafficManage/index'], resolve)
  },
  { path: 'ReviewManage', name: 'ReviewManage', meta: { hasSidebar: true }, component: resolve => require(['@/components/GoodluckManage/ReviewManage'], resolve) },
  { path: 'GoodluckManage', name: 'GoodluckManage', meta: { hasSidebar: true }, component: resolve => require(['@/components/GoodluckManage/GoodluckManage'], resolve) }
]
export default [...GoodluckManage]

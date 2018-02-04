/**
 * 运价管理
 */


let Freight = [
  {
    path: 'FreightGoodluck',
    name: 'FreightGoodluck',
    meta: { hasSidebar: true },
    redirect: '/home/FreightGoodluck/DriversFreight',
    children: [
      { path: 'DriversFreight', name: 'DriversFreight', meta: { hh: true }, component: resolve => require(['@/components/Freight/FreightGoodluck/DriversFreight'], resolve) },
      { path: 'AddService', name: 'AddService', meta: { hh: true }, component: resolve => require(['@/components/Freight/FreightGoodluck/AddService'], resolve) },
      { path: 'AdditionalCharge', name: 'AdditionalCharge', meta: { hh: true }, component: resolve => require(['@/components/Freight/FreightGoodluck/AdditionalCharge'], resolve) },
      { path: 'DriverCharge', name: 'DriverCharge', meta: { hh: true }, component: resolve => require(['@/components/Freight/FreightGoodluck/DriverCharge'], resolve) },
      { path: 'ConsignorCharge', name: 'ConsignorCharge', meta: { hh: true }, component: resolve => require(['@/components/Freight/FreightGoodluck/ConsignorCharge'], resolve) },
      { path: 'GoodsChargeCoefficient', name: 'GoodsChargeCoefficient', meta: { hh: true }, component: resolve => require(['@/components/Freight/FreightGoodluck/GoodsChargeCoefficient'], resolve) },
    ],
    component: resolve => require(['@/components/Freight/FreightGoodluck/index'], resolve)
  },
  { path: 'FreightPartner', name: 'FreightPartner', meta: { hasSidebar: true }, component: resolve => require(['@/components/Freight/FreightPartner'], resolve) }
]
export default [...Freight]

/**
 * 合作方运营管理
 */


let Partner = [
  {
    path: 'PartnerVehicleManage',
    name: 'PartnerVehicleManage',
    meta: { hasSidebar: true },
    redirect: '/home/PartnerVehicleManage/VehicleApplication',
    children: [
      { path: 'VehicleApplication', name: 'VehicleApplication', meta: { hh: true }, component: resolve => require(['@/components/Partner/PartnerVehicleManage/VehicleApplication'], resolve) },
      { path: 'VehicleCheckTable', name: 'VehicleCheckTable', meta: { hh: true }, component: resolve => require(['@/components/Partner/PartnerVehicleManage/VehicleCheckTable'], resolve) },
      { path: 'StationedVehicle', name: 'StationedVehicle', meta: { hh: true }, component: resolve => require(['@/components/Partner/PartnerVehicleManage/StationedVehicle'], resolve) }
    ],
    component: resolve => require(['@/components/Partner/PartnerVehicleManage/index'], resolve)
  },
  { path: 'PartnerTrafficManage', name: 'PartnerTrafficManage', meta: { hasSidebar: true }, component: resolve => require(['@/components/Partner/PartnerTrafficManage'], resolve) }
]
export default [...Partner]

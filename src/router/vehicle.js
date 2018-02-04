/**
 * 车辆管理
 */

let vehicleRouter = [
    { path:'fleetManage', name: 'fleetManage', component: resolve => require(['@/components/vehicle/fleetManage/fleetManage'], resolve)},
    { path:'fleetDetails', name: 'fleetDetails', component: resolve => require(['@/components/vehicle/fleetDetails/fleetDetails'], resolve)},
    { path:'alreadySin', name: 'alreadySin', component: resolve => require(['@/components/vehicle/contractFleet/alreadySin'], resolve)},
    { path:'nosignedSin', name: 'nosignedSin', component: resolve => require(['@/components/vehicle/contractFleet/nosignedSin'], resolve)},  
]
export default [...vehicleRouter]
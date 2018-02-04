/**
 * 系统配置
 */

let systemConfig = [
  {
    path: "goodLuck",
    name: "goodLuck",
    component: resolve =>
      require(["@/components/systemConfig/goodluck/goodLuck_zone.vue"], resolve)
  },
  {
    path: "partner",
    name: "partner",
    component: resolve =>
      require(["@/components/systemConfig/partner/partner.vue"], resolve)
  },
  {
    path: "addService",
    name: "addService",
    component: resolve =>
      require(["@/components/systemConfig/addService/addService.vue"], resolve)
  },
  {
    path: "goodsService",
    name: "goodsService",
    component: resolve =>
      require([
        "@/components/systemConfig/goodsService/goodsService.vue"
      ], resolve)
  },
  {
    path: "incrementService",
    name: "incrementService",
    component: resolve =>
      require([
        "@/components/systemConfig/incrementService/incrementService.vue"
      ], resolve)
  },
  {
    path: "vehicleBrand",
    name: "vehicleBrand",
    component: resolve =>
      require([
        "@/components/systemConfig/vehicleBrand/vehicleBrand.vue"
      ], resolve)
  },
  {
    path: "vehicleType",
    name: "vehicleType",
    component: resolve =>
      require([
        "@/components/systemConfig/vehicleType/vehicleType.vue"
      ], resolve)
  }
];
export default [...systemConfig];

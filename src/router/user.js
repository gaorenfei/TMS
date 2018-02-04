/**
 * 用户管理
 */

let userRouter = [
  {
    path: "VehicleCertifica",
    name: "VehicleCertifica",
    component: resolve =>
      require(["@/components/user/VehicleCertifica/index"], resolve)
  },
  {
    path: "VehicleFiles",
    name: "VehicleFiles",
    component: resolve =>
      require(["@/components/user/VehicleFiles/index"], resolve)
  },
  {
    path: "IdentityCertifica",
    name: "IdentityCertifica",
    component: resolve =>
      require(["@/components/user/IdentityCertifica/index"], resolve)
  },
  {
    path: "DriverCertifica",
    name: "DriverCertifica",
    component: resolve =>
      require(["@/components/user/DriverCertifica/index"], resolve)
  },
  {
    path: "RegisteredUser",
    name: "RegisteredUser",
    component: resolve =>
      require(["@/components/user/RegisteredUser/index"], resolve)
  }
]
export default [...userRouter]


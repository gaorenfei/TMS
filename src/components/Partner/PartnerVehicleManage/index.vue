<template>
  <div>
    <tab-common-bg :menuList='menuList'></tab-common-bg>
  </div>
</template>

<script>
import tabCommonBg from "@/components/public/commonBg";
export default {
  data() {
    return {
      menuList: [
        {
          name: "用车申请管理",
          number: "1",
          icon: "el-icon-menu",
          routerPath: "VehicleApplication"
        },
        {
          name: "车辆签到表",
          number: "2",
          icon: "el-icon-menu",
          routerPath: "VehicleCheckTable"
        },
        {
          name: "驻厂车辆",
          number: "3",
          icon: "el-icon-menu",
          routerPath: "StationedVehicle"
        }
      ]
    };
  },
  methods: {},
  created() {},
  components: {
    tabCommonBg
  }
};
</script>

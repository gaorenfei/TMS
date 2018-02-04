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
          name: "司机运费管理",
          number: "1",
          icon: "el-icon-menu",
          routerPath: "DriversFreight"
        },
        {
          name: "增值服务配置",
          number: "2",
          icon: "el-icon-menu",
          routerPath: "AddService"
        },
        {
          name: "附加收费配置",
          number: "3",
          icon: "el-icon-menu",
          routerPath: "AdditionalCharge"
        },
        {
          name: "司机扣费规则配置",
          number: "4",
          icon: "el-icon-menu",
          routerPath: "DriverCharge"
        },
        {
          name: "货主扣费规则配置",
          number: "5",
          icon: "el-icon-menu",
          routerPath: "ConsignorCharge"
        },
        {
          name: "货物收费系数配置",
          number: "6",
          icon: "el-icon-menu",
          routerPath: "GoodsChargeCoefficient"
        }
      ]
    };
  },
  methods: {},
  mounted() {},
  components: {
    tabCommonBg
  }
};
</script>

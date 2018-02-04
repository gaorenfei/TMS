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
          name: "运单管理",
          number: "2",
          icon: "el-icon-menu",
          routerPath: "WaybillManage"
        },
        {
          name: "在途事件",
          number: "3",
          icon: "el-icon-menu",
          routerPath: "JourneyEvent"
        },
        {
          name: "异常事件",
          number: "4",
          icon: "el-icon-menu",
          routerPath: "AnomalousEvent"
        },
        {
          name: "回单管理",
          number: "5",
          icon: "el-icon-menu",
          routerPath: "BillManage"
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

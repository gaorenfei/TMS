<template>
  <el-tabs v-model="activeName" class="user-tab-style">
    <el-tab-pane v-for="(item,index) of tabAry" :key="index" :label="item.label" :name="item.name">
      <slot :name="item.name"></slot>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      activeName: "all",
      tabAry: [
        { label: "全部", name: "all" },
        { label: "待审核", name: "audit" },
        { label: "已驳回", name: "dismissal" },
        { label: "已通过", name: "passed" }
      ]
    };
  },
  methods: {},
  watch: {
    activeName(val) {
      this.$emit("changeTab", val);
    }
  }
};
</script>
<style>
.user-tab-style {
  padding-top: 30px;
  width: 100%;
}
.user-tab-style .el-tabs__header {
  border: 0;
  margin: 0;
}
</style>

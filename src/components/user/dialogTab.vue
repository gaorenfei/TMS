<template>
  <div class="vehicle-license-pic-box fl">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane v-for="(item,index) of tabAry" :key="index" :label="item.label" :name="item.name">
        <div class="vehicle-license-pic">
          <div class="vehicle-license-whi"></div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      tabAry: [
        { label: "驾驶证正本", name: "first" },
        { label: "驾驶证副本", name: "second" },
        { label: "车辆照片", name: "third" }
      ]
    };
  },
  methods: {},
  watch: {
    activeName(val) {
      this.$emit("changeDialogTab", val);
    }
  }
};
</script>
<style>
.vehicle-license-pic {
  width: 360px;
  height: 230px;
  background: #f2f3f5;
  padding: 15px;
  border: 1px solid #dae1e9;
}
.vehicle-license-whi {
  background: #fff;
  height: 228px;
  border-radius: 20px;
}
</style>

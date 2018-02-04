<template>
  <div>
    <el-button type="danger" size="small" v-waves @click="handleDelete">删除</el-button>
  </div>
</template>
<script>
import waves from "@/directive/waves"; // 水波纹指令
import * as Interface from "./interface";
export default {
  props: ["item"],
  directives: {
    waves
  },
  data() {
    return {};
  },
  methods: {
    handleDelete() {
      var msg = "是否删除" + this.item.fcityName + "区域?";
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(_ => {
        var fcityCode = this.item.fcityCode;
        var deleteSendArr = {
          areaOpenParams: [
            {
              fname: this.item.fname,
              fprovinceCode: this.item.fprovinceCode,
              fcityName: this.item.fcityName,
              fcityCode: this.item.fcityCode
            }
          ]
        };

        this.$http.post(Interface.AREA_OPEN_CLOSE, deleteSendArr).then(res => {
          if (res.data.code == 100000) {
            this.$message({
              message: "区域删除成功!",
              type: "success"
            });
            this.$emit("updateData");
          } else {
            this.$message({
              message: "区域删除失败!",
              type: "error"
            });
          }
        });
      });
    }
  }
};
</script>

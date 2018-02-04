<template>
  <div class="slotTag">
    <el-tag
      v-for="(tag,index) in dynamicTags"
      :key="index"
      :closable="true"
      type="gray"
      @close="handleClose(tag)"
      class="tagMark"
    >
      {{param4?tag[param1][param2]+tag[param1][param4]:tag[param1][param2]}}
    </el-tag>

  </div>
</template>
<script>
export default {
  props: [
    "item",
    "custom",
    "deleteUrl",
    "serviceName",
    "param1",
    "param2",
    "param3",
    "param4"
  ],
  data() {
    return {
      dynamicTags: [],
      tabType: []
    };
  },
  methods: {
    handleClose(tag) {
      var sendObj = null;
      if (!this.param4) {
        sendObj = {
          fAreaId: this.item.fid,
          //fAddserviceId: tag.fAddserviceId
          [this.param3]: tag[this.param3]
        };
      } else {
        sendObj = { [this.param3]: tag.tAreaOpenCar[this.param3] };
      }
      var msg =
        "是否删除" +
        this.item.fcityName +
        "区域" +
        tag[this.param1][this.param2] +
        this.custom +
        "?";
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(_ => {
          this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
          this.$http.post(this.deleteUrl, sendObj).then(res => {
            if (res.data.code == 100000) {
              this.$emit("updateData");
            }
          });
        })
        .catch(_ => {});
    }
  },
  mounted() {
    this.dynamicTags = this.item.fService;
  },
  watch: {
    item() {
      this.dynamicTags = this.item.fService;
    }
  }
};
</script>
<style>
.slotTag {
  text-align: left;
  margin-left: 15px;
  padding-top: 5px;
}
.tagMark {
  margin-right: 10px;
  margin-bottom: 5px;
}
</style>

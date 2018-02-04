<template>
  <div class="certifica-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      height="300"
      >
      <el-table-column
        prop="order"
        label="序号"
        width="60"
        >
      </el-table-column>
      <el-table-column
        prop="auditState"
        label="审核状态"
        width="90"
        >
      </el-table-column>
      <el-table-column
        prop="carOwnerName"
        label="司机姓名"
        width="90"
        >
      </el-table-column>
      <el-table-column
        prop="carOwnerContacts"
        label="司机联系方式"
        width="110"
        >
      </el-table-column>
      <el-table-column
        prop="submissionTime"
        label="提交时间"
        width="100"
        >
      </el-table-column>
      <el-table-column
        prop="plateNumber"
        label="车牌号"
        width="90"
        >
      </el-table-column>
      <el-table-column
        prop="vehicleType"
        label="车辆类型"
        width="90"
        >
      </el-table-column>
      <el-table-column
        prop="VehicleSpecifica"
        label="车辆规格">
      </el-table-column>
      <el-table-column
        prop="firm"
        label="厂商"
        width="100"
        >
      </el-table-column>
      <el-table-column
        prop="model"
        label="型号">
      </el-table-column>
      <el-table-column
        prop="auditor"
        label="审核人">
      </el-table-column>
      <el-table-column
        prop="auditTime"
        label="审核时间"
        width="150"
        >
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作"
        width="100"
        >
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="handleApprove(scope.$index, scope.row)"
            type="text"
            size="small"
            class="btnClass"
            v-if="scope.row.auditState!='已驳回'"
            >
            {{scope.row.auditState=="待审核"?"审核":"修改"}}
          </el-button>
          <el-button
            @click.native.prevent="handleCheck(scope.$index, scope.row)"
            type="text"
            size="small"
            class="btnClass"
            v-if="scope.row.auditState!='待审核'"
            >
          查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: ["tableData"],
  data() {
    return {};
  },
  methods: {
    //审核
    handleApprove(index, row) {
      this.$emit("changeVisible");
    },
    //查看
    handleCheck(index, row) {}
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
.certifica-table {
  padding-top: 30px;
}
</style>

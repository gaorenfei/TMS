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
        width="80"
        >
      </el-table-column>
      <el-table-column
        prop="phoneNumber"
        label="手机号"
        >
      </el-table-column>
      <el-table-column
        prop="authenticaName "
        label="认证名"
        >
      </el-table-column>
      <el-table-column
        prop="userStatus "
        label="用户状态"
        >
      </el-table-column>
      <el-table-column
        prop="identityAuthentica"
        label="身份认证"
        >
      </el-table-column>
      <el-table-column
        prop="registrateTime"
        label="注册时间"
        >
      </el-table-column>
      <el-table-column
        prop="registrateSource"
        label="注册来源"
        >
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作"
        >
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="handleStop(scope.$index, scope.row)"
            type="text"
            size="small"
            class="btnClass"
            >
            停用
          </el-button>
          <el-button
            @click.native.prevent="handleCheck(scope.$index, scope.row)"
            type="text"
            size="small"
            class="btnClass"
            >
            查看
          </el-button>
          <el-button
            @click.native.prevent="handleResetPassword(scope.$index, scope.row)"
            type="text"
            size="small"
            class="btnClass"
            >
            重置密码
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
    //停用
    handleStop(index, row) {},
    //查看
    handleCheck(index, row) {},
    //重置密码
    handleResetPassword(index, row) {}
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
.certifica-table {
  padding-top: 30px;
}
</style>
